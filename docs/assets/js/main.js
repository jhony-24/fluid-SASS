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
        downloadSASS: function () { downloadFile(this, 'assets/zip/', 'sass.zip'); }
    }

    //animate the square in mixins and classes
    var methodsAnimationSquare = {
        selectAnimation: function (text) {
            this.currentAnimation = text;
            document.querySelector('.square-main').addEventListener('webkitAnimationEnd', (event) => {
                event.target.classList.remove(this.currentAnimation);
                this.currentAnimation = '';
            });
        },
        onLinkSelected: function (to) {
            this.selectedLink = to;
            let getOnlyId = this.selectedLink.replace('#', '');
            let offsetTop = document.getElementById(getOnlyId).offsetTop;
            let i = 0;
            let minHeight = 144;
            let duration = 1;
            let interval = setInterval(function () {
                if (i >= offsetTop) {
                    clearInterval(interval);
                }
                i += 10;
                window.scrollTo(0, i - minHeight);
            }, duration);
            document.title = "Fluid-sass | " + getOnlyId;
        },
    }

    // get states when is pressed some elements
    var computedAnimations = {
        allAnimations: function () {
            return this.typesAnimation;
        },
        textAnimationSelected: function () {
            let current = this.currentAnimation;
            return (current !== '') ? ('! ' + current) : '';
        },
        classSelected: function () {
            let current = this.currentAnimation;
            return function (text) {
                return {
                    'type-animation-selected': (current === text)
                };
            }
        },
        totalAnimations: function () {
            let secondValKey = 1;
            let lengthTypeAnimations = Object.entries(typesAnimation).map(function (current) {
                return current[secondValKey].length;
            });
            let totalUnionLength = lengthTypeAnimations.reduce(function (accumulator, current) {
                return accumulator + current;
            });
            return totalUnionLength;
        },
        getAnimationCategoryNames : function() {
            let names = [];
            for( let current in typesAnimation) {
                names.push(current);
            }
            return names;
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

    // initial state of the app
    const initialState = {
        typesAnimation,
        links,
        examples,
        currentAnimation: '',
        selectedLink: window.location.hash,
        isDownload: false,
        isCopy: false,
    }

    // instance app 
    new Vue({
        el: '#app',
        data: initialState,
        components: { ...components },
        computed: { ...computedAnimations },
        methods: { ...methodsAnimationSquare, ...methodsDownload, ...methodsExample }
    });

});