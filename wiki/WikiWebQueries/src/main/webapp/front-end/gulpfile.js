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
    "foundation_js":"./public/js/plugins/",
    "motion_ui":"./bower_components/motion-ui/src/",
    "services": "./public/js/services/",
    "modules":"./public/js/modules/",
    "wiki_assets":"./public/js/assets/"
};

gulp.task("styles-foundation", function(){
    return gulp.src(paths.foundation_scss+"foundation.scss")
        .pipe(sass({
            includePaths: [paths.foundation_scss]
        }))
        .pipe(concat("foundation.css"))
        .pipe(gulp.dest(paths.foundation_css))
    ;    
});

gulp.task("scripts-foundation", function(){
    return gulp.src([
        paths.foundation_services+"*.js",
        paths.foundation_components+"**/*.js",
        paths.foundation_apps+"*.js"
    ])
    .pipe(concat("foundation.js"))
    .pipe(gulp.dest(paths.foundation_js));
});

gulp.task("scripts-services", function(){
    return gulp.src([
        paths.services+"*.js"
    ])
    .pipe(concat("services.js"))
    .pipe(gulp.dest(paths.wiki_assets));
});

gulp.task("scripts-modules", function(){
    return gulp.src([
        paths.modules+"*.js",
        "!"+paths.modules+"login.js"
    ])
    .pipe(concat("modules.js"))
    .pipe(gulp.dest(paths.wiki_assets));
});

gulp.task("clean-styles-foundation", function(){
    return gulp.src(paths.foundation_css+"foundation.css", {read:false})
            .pipe(clean({force:true}))
    ;
});

gulp.task("clean-scripts-foundation", function(){
    return gulp.src(paths.foundation_js+"foundation.js", {read:false})
            .pipe(clean({force:true}))
    ;
});

gulp.task("clean-scripts-services", function(){
    return gulp.src(paths.wiki_assets+"services.js", {read:false})
            .pipe(clean({force:true}))
    ;
});

gulp.task("clean-scripts-modules", function(){
    return gulp.src(paths.wiki_assets+"modules.js", {read:false})
            .pipe(clean({force:true}))
    ;
});

gulp.task("clean-styles", ["clean-styles-foundation"]);

gulp.task("clean-scripts",["clean-scripts-foundation", "clean-scripts-services", "clean-scripts-modules"]);

gulp.task("styles",["styles-foundation"]);

gulp.task("scripts",["scripts-foundation", "scripts-services", "scripts-modules"]);

gulp.task("default", ["clean-styles","clean-scripts","styles", "scripts"]);