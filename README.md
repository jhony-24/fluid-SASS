<p align="center">
    <img src="./fluid.png" />
</p>

## What is Fluid-Sass?

Fluid sass in a scss library to create fluid animations based on movement, just include the mixin in your class and edit it as you like to create fast and beautiful animations.
There are currently **20** animations available.

## Properties of mixins sass
These properties allow you to customize the way your animations happen.

* **$name** Animation name, by default it has the name of the mixin.
* **$duration** Duration of the animation to run.
* **$iteration** How many times will the default animation be repeated is 1.

```scss
@mixin  keyframes-from-left($name  :from-left , $duration : .3s , $iteration  :1) {
    @include animation(( name : $name , duration : $duration, iteration : $iteration )){
        @include frame(10%,(translateX:-100%));
        @include frame(60%,(translateX:20px));
    }    
}
```

## How to Integration
See a sample of how to integrate development code in HTML, SCSS and for more dynamism in Javascript.

### SASS
```scss
// include in my class personalize, add the prefix "fluid-" in the mixin
.my-animation {
    @include fluid-bounce();
}
```

### HTML 
```html
<!-- include class names -->
<button class="btn my-animation" id="btn-login">
    primary
</button>
<article class="card my-animation">
    new article
</article>
```

### Javascript
```javascript
/* alternate my class name */
let myButton = document.getElementById('btn-login');
byButton.addEventListener('click' , function (e) {
    e.currentTarget.classList.toggle('my-animation');
});

```

See the documentation in the following url [fluid-sass documentation](https://jhony-24.github.io/fluid-sass)
