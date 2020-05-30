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
        <!-- include class names -->
        <button class="btn my-animation" id="btn">
        primary 
        </button>
        <article class="card my-animation">
        new article 
        </article>
        `
    },
    {
        language: "sass",
        code: `
        // include in my class personalize 
        // add the prefix "fluid-" in the mixin 
        .my-animation {
        @include fluid-bounce();
        }       
        `
    },
    {
        language: "javascript",
        code: `
        /* alternate my class name */
        function toggleClass(e) {
        e.currentTarget.classList.toggle('my-animation');
        }
        let myButton = document.getElementById('btn');
        byButton.addEventListener('click' , toggleClass);
        `
    }
]