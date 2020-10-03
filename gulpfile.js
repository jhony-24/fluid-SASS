const { src, dest, task, watch, series } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');

function sassTask() {
    return (
        src("./scss/animations.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(autoprefixer())
            .pipe(dest("./css/"))
    );
}

function defaultTask() {
    watch("scss/*.scss", series("scss"))
}

task("scss", sassTask);
task("default", defaultTask);

