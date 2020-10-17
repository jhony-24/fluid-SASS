// the page is complete 
var completeLoading = function () {
    document.getElementById('app').style.visibility = 'visible';
    document.getElementById('loading-page').remove();
}

// download files 
var downloadFile = function (self, path, filename) {
    let a = document.createElement('a');
    a.href = path + filename;
    a.download = filename;
    a.target = '_blank';
    a.click();
    self.isDownload = true;
    setTimeout(function () {
        self.isDownload = false;
    }, 2000);
}

window.addEventListener('load', function () {

    completeLoading();

    // all components in app
    var components = { SquareMotion, TypeAnimation, CircleButton, TemplateCode };

    // all methods to downlaod all files
    var methodsDownload = {
        downloadCSS: function () { downloadFile(this, 'assets/css/', 'animations.css'); },
        downloadSASS: function () { downloadFile(this, 'assets/scss/', 'scss.zip'); }
    }

    const prefixAnimation = "fluid-";
    //animate the square in mixins and classes
    var methodsAnimationSquare = {
        selectAnimation: function (text) {
            this.currentAnimation = prefixAnimation + text;
            document.querySelector('.square-main').addEventListener('webkitAnimationEnd', (event) => {
                event.target.classList.remove(this.currentAnimation);
                setTimeout(() => {
                    this.currentAnimation = '';
                },event.elapsedTime);
            });
        },
        selectAnimationCategory: function (nameCategory) {
            this.currentCategory = nameCategory;
        },
        onLinkSelected: function (to) {
            this.selectedLink = to;
            const BEFORE_POSITION = 'BEFORE_POSITION';
            let getOnlyId = this.selectedLink.replace('#', '');
            let offsetTop = document.getElementById(getOnlyId).offsetTop;
            let i = parseInt(sessionStorage.getItem(BEFORE_POSITION)) || 0;
            let minHeight = 144;
            let duration = 1;
            if (offsetTop < i) {
                let interval = setInterval(function () {
                    if (i <= offsetTop) {
                        clearInterval(interval);
                        sessionStorage.setItem(BEFORE_POSITION, parseInt(offsetTop));
                    }
                    i -= 10;
                    window.scrollTo(0, i - minHeight);
                }, duration);
            }
            else {
                let interval = setInterval(function () {
                    if (i >= offsetTop) {
                        clearInterval(interval);
                        sessionStorage.setItem(BEFORE_POSITION, parseInt(i));
                    }
                    i += 10;
                    window.scrollTo(0, i - minHeight);
                }, duration);
            }
            document.title = "Fluid-sass | " + getOnlyId;
        },
    }

    // get states when is pressed some elements
    var computedAnimations = {
        allAnimations: function () {
            return this.typesAnimation[this.currentCategory];
        },
        classSelected: function () {
            let current = this.currentAnimation;
            return function (text) {
                return {
                    'type-animation-selected': (current === text)
                };
            }
        },
        categorySelected: function () {
            let current = this.currentCategory;
            return function (text) {
                return {
                    'type-animation-selected-category': (current === text)
                }
            }
        },
        totalAnimations: function () {
            let secondValKey = 1;
            let lengthTypeAnimations = Object.entries(this.typesAnimation).map(function (current) {
                return current[secondValKey].length;
            });
            let totalUnionLength = lengthTypeAnimations.reduce(function (accumulator, current) {
                return accumulator + current;
            });
            return totalUnionLength;
        },
        getAnimationCategoryNames: function () {
            let names = [];
            for (let current in typesAnimation) {
                names.push(current);
            }
            return names;
        },
        activeColorLinkSelected : function() {
            return (value) => {
              let colors = this.themes.themeNavLinkColors;
              return value ? colors.primary : colors.normal;
          }
        }
    }

    var computedGetDataToTable = {
        allClassnamesAnimation: function() {
            let animations = this.typesAnimation;
            let allAnimations = [];
            for(let typeAnimation in animations) {
                for(let animation of animations[typeAnimation]) {
                    allAnimations.push({
                        typeAnimation,
                        animation
                    })
                }
            }
            return allAnimations;
        },
        fieldsClassnamesTable : function() {
            return [
                "Index",
                "Classname or mixin animation",
                "Type of animation"
            ]
        }
    }

    var methodsExample = {
        copied: function () {
            this.isCopy = true;
            setTimeout(function () {
                this.isCopy = false;
            }.bind(this), 2000);
        }
    }

    var methodsTheme = {
        setNavLinkColors : function() { 
            let prop = getComputedStyle(document.documentElement);
            this.themes.themeNavLinkColors = {
                primary : prop.getPropertyValue('--color-primary'),
                normal : prop.getPropertyValue('--color-text-normal'), 
            }
        },                               
        onChangeTheme : function() {
            this.setNavLinkColors();
        }
    }

    // initial state of the app
    const initialState = {
        typesAnimation,
        links,
        examples,
        currentAnimation: '',
        currentCategory: 'bounce',
        selectedLink: window.location.hash,
        isDownload: false,
        isCopy: false,
        themes : {
            mode : null,
            themeNavLinkColors: {}
        },

    }

    let themeProvider = new ThemeProvider();
    // instance app 
    window.app = new Vue({
        el: '#app',
        data: initialState,
        components: { ...components },
        computed: { ...computedAnimations,...computedGetDataToTable },
        methods: { ...methodsAnimationSquare, ...methodsDownload, ...methodsExample,...methodsTheme },
        created() {
            themeProvider.setDefaultTheme();
            this.setNavLinkColors();
            this.onLinkSelected('#home');
        }
    });

});