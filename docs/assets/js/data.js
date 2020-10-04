var typesAnimation = {
    bounce: ["bounce", "bounce-inset", "bounce-rotate","bounce-expand-x","bounce-expand-y"],
    fade: ["fade", "fade-intermittent", "fade-left", "fade-right", "fade-rotate",],
    from: ["from-left", "from-right", "from-top", "from-bottom",],
    shake: ["shake", "shake-rotate", "shake-vertical", "shake-cross","shake-skew-x","shake-skew-y"],
    d3: ["d3-rotate", "d3-triangle",],
}


var links = [
    { to: "#home", text: "home" },
    { to: "#mixins", text: "mixins and class" },
    { to: "#integration", text: "integration", },
    { to: "#downloads", text: "downloads" },
];

var examples = [
    {
        language: "html",
        code: `
        <link rel="stylesheet" href="animations.css" />
        <header class="header-component">
            <button class="fluid-shake-vertical">
                Sign in
            </button>
            <button class="fluid-shake-vertical" id="btn>
                Sign up
            </button>
        </header>`
    },
    {
        language: "scss",
        code: `
        // page.scss
        @import "animations";
        
        .header-component {
            @include fluid-bounce();
        }
        .button-component {
            @include fluid-shake-vertical();
        }`
    },
    {
        language: "javascript",
        code: `
        /* alternate my class name */
        function toggleClass(e) {
            e.currentTarget.classList.toggle('fluid-shake-vertical');
        }
        let myButton = document.getElementById('btn');
        byButton.addEventListener('click' , toggleClass);
        `
    }
]