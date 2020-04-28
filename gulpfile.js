const { src, dest, task, watch, series } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');

function sassTask() {
    return (
        src("./sass/animations.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(autoprefixer())
            .pipe(dest("./css/"))
    );
}

function defaultTask() {
    watch("sass/*.scss", series("sass"))
}

task("sass", sassTask);
task("default", defaultTask);

