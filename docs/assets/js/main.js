const typesAnimation = [
    "bounce", "bounce-inset", "bounce-rotate",
    "fade", "fade-intermittent", "fade-left", "fade-right",
    "from-left", "from-right", "from-top", "from-bottom",
    "shake", "shake-rotate", "shake-vertical"
];

const links = [
    { to: "#home", text: "home" },
    { to: "#mixins", text: "mixins" },
    { to: "#examples", text: "examples" },
];

const completeLoading = function () {
    document.getElementById('app').style.visibility = 'visible';
    document.getElementById('loading-page').remove();
}

window.addEventListener('load', function () {
    completeLoading();
    new Vue({
        el: '#app',
        data: {
            typesAnimation,
            currentAnimation: '',
            links,
            selectedLink: window.location.hash,
        },
        components: { Square, TypeAnimation , CircleButton },
        computed: {
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
        },
        methods: {
            selectAnimation: function (text) {
                this.currentAnimation = text;
            },
            onLinkSelected: function (to) {
                this.selectedLink = to;
            }
        },
    });

});