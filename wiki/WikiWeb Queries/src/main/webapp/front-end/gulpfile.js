var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var clean = require("gulp-clean");

var paths = {
    "foundation_scss":"./bower_components/foundation-apps/scss/",
    "foundation_css":"./public/css/plugins/",
    "foundation_services":"./bower_components/foundation-apps/js/angular/services/",
    "foundation_components":"./bower_components/foundation-apps/js/angular/components/",
    "foundation_apps":"./bower_components/foundation-apps/js/angular/",
    "foundation_js":"./public/js/plugins/"
};

gulp.task("styles", function(){
    gulp.src(paths.foundation_scss+"foundation.scss")
        .pipe(sass({
            includePaths: [paths.foundation_scss]
        }))
        .pipe(concat("foundation.css"))
        .pipe(gulp.dest(paths.foundation_css))
    ;    
});

gulp.task("scripts", function(){
    return gulp.src([
        paths.foundation_services+"*.js",
        paths.foundation_components+"**/*.js",
        paths.foundation_apps+"*.js"
    ])
    .pipe(concat("foundation.js"))
    .pipe(gulp.dest(paths.foundation_js));
});

gulp.task("clean-styles", function(){
    return gulp.src("foundation.css")
            .pipe(clean())
            .pipe(gulp.dest(paths.foundation_css))
    ;
});

gulp.task("clean-scripts", function(){
    return gulp.src("foundation.js")
            .pipe(clean())
            .pipe(gulp.dest(paths.foundation_js))
    ;
});

gulp.task("default", ["clean-styles","clean-scripts","styles", "scripts"]);