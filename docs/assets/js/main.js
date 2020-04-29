var completeLoading = function () {
    document.getElementById('app').style.visibility = 'visible';
    document.getElementById('loading-page').remove();
}


window.addEventListener('load', function () {

    completeLoading();

    var components = { SquareMotion, TypeAnimation, CircleButton }
    var methodsDownload = {
        downloadCSS: function () {
            let a = document.createElement('a');
            a.href = 'assets/css/animations.css';
            a.download = 'animations.css';
            a.target = "_blank";
            a.click();
        },
        downloadSASS: function () {

        }
    }
    var methodsAnimationSquare = {
        selectAnimation: function (text) {
            this.currentAnimation = text;
        },
        onLinkSelected: function (to) {
            this.selectedLink = to;
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
        currentAnimation: '',
        links,
        selectedLink: window.location.hash,
    }

    new Vue({
        el: '#app',
        data: initialState,
        components: { ...components },
        computed: { ...computedAnimations },
        methods: { ...methodsAnimationSquare, ...methodsDownload }
    });

});