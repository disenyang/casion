
'use strict';

// var utils = require('./utils');

var gulp = require('gulp');

var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var concat = require('gulp-concat');

var babel = require('gulp-babel');

var fs = require("fs");



gulp.task("js:min", function(){ // 定义一个使用 Orchestrator 实现的任务（task）

  let data = fs.readFileSync("../node_modules/vue/package.json","utf-8"); 
  
  try{
    data = JSON.parse(data);
  }catch(e){
    data = {version: ''};
  }

  let version = data.version || '';

  gulp.src([
    '../node_modules/vue/dist/vue.min.js', 
    "../node_modules/vue-router/dist/vue-router.min.js", 
    "../node_modules/vue-resource/dist/vue-resource.min.js"])
    .pipe(concat(`vue-combo-${version}.min.js`))
    // .pipe(rename('vue.combo.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('../public/third_party/vue-combo'));
});



gulp.task("js:common", function(){ // 定义一个使用 Orchestrator 实现的任务（task）

  let data = fs.readFileSync("../node_modules/vue/package.json","utf-8"); 
  
  try{
    data = JSON.parse(data);
  }catch(e){
    data = {version: ''};
  }

  let version = data.version || '';

  gulp.src([
    '../node_modules/vue/dist/vue.common.js', 
    "../node_modules/vue-router/dist/vue-router.common.js", 
    "../node_modules/vue-resource/dist/vue-resource.common.js"])
    .pipe(concat(`vue-combo-${version}.common.js`))
    // .pipe(rename('vue.combo.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('../public/third_party/vue-combo'));
});