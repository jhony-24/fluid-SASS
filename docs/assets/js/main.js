var completeLoading = function () {
    document.getElementById('app').style.visibility = 'visible';
    document.getElementById('loading-page').remove();
}

var downloadFile = function (self,path, filename) {
    let a = document.createElement('a');
    a.href = path + filename;
    a.download = filename;
    a.target = '_blank';
    a.click();
    self.isDownload = true;
    setTimeout(function(){
        self.isDownload = false;
    },1000);
}

window.addEventListener('load', function () {

    completeLoading();

    var components = { SquareMotion, TypeAnimation, CircleButton, TemplateCode };
    var methodsDownload = {
        downloadCSS: function () { downloadFile(this,'assets/css/', 'animations.css'); },
        downloadSASS: function () { downloadFile(this,'assets/zip/', 'sass.zip'); }
    }
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
        }
    }

    const initialState = {
        typesAnimation,
        links,
        currentAnimation: '',
        selectedLink: window.location.hash,
        totalAnimations: typesAnimation.length,
        isDownload: false,
        isCopy: false,
    }

    new Vue({
        el: '#app',
        data: initialState,
        components: { ...components },
        computed: { ...computedAnimations },
        methods: { ...methodsAnimationSquare, ...methodsDownload }
    });

});