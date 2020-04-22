const { src, dest, task, watch, series } = require("gulp");
const sass = require("gulp-sass");
const bulkSass = require("gulp-sass-bulk-import");
const autoprefixer = require('gulp-autoprefixer');



function sassTask() {
    return (
        src("./sass/**/*.scss")
            .pipe(bulkSass())
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(autoprefixer())
            .pipe(dest("./css/main.min.css"))
    );
}

function defaultTask() {
    watch("sass/*.scss", series("sass"))
}

task("sass", sassTask);
task("default", defaultTask);

