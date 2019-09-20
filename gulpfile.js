const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const gulpFont = require("gulp-font");

function style() {
    return gulp
        .src("./src/sass/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch("./public/*.html").on("change", browserSync.reload);
    gulp.watch("./src/sass/**/*.scss", style);
    gulp.watch("./src/views/**/*.pug", browserSync.reload);
}

function font() {
    return gulp
        .src("./src/fonts/**/*.{ttf,}", { read: false })
        .pipe(
            gulpFont({
                ext: ".scss",
                fontface: "./src/fonts",
                relative: "/fonts",
                dest: "./public/fonts",
                embed: ["woff"],
                collate: false
            })
        )
        .pipe(gulp.dest("./public/fonts"));
}

font.description = "Generate web font package from ttf and otf files.";

exports.font = font;
exports.style = style;
exports.watch = watch;