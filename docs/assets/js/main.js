const typesAnimation = [
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
    "spring", "shake", "fromLeft", "splash",
];


window.addEventListener('load', function () {

    document.getElementById('app').style.visibility = 'visible';
    document.getElementById('loading-page').remove();

    new Vue({
        el: '#app',
        data: {
            typesAnimation,
            currentAnimation: ''
        },
        components: { Square, TypeAnimation },
        computed: {
            allAnimations: function () {
                return this.typesAnimation;
            },
            circleTextAnimationSelect: function () {
                let current = this.currentAnimation;
                return (current !== '') ? ('! ' + current) : 'GO!';
            }
        },
        methods: {
            selectAnimation: function (text) {
                this.currentAnimation = text;
            }
        },
    });
});