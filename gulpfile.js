/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const path = require('path');

const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const prettier = require('gulp-prettier');
const lessToJs = require('gulp-less-variables-to-file');
const addLessImportInline = require('./scripts/add-less-inline-import');

const sourceFile = path.resolve(__dirname, './src/index.less');

gulp.task('less', () => {
  return gulp
    .src(sourceFile)
    .pipe(addLessImportInline())
    .pipe(less())
    .pipe(prettier())
    .pipe(rename('theme.less'))
    .pipe(gulp.dest('./lib'))
    .pipe(lessToJs())
    .pipe(rename('theme.js'))
    .pipe(prettier())
    .pipe(gulp.dest('./lib'));
});

gulp.task('color-theme', () => {
  return gulp
    .src([
      path.resolve(__dirname, './color-theme/light.css'),
      path.resolve(__dirname, './color-theme/dark.css'),
    ])
    .pipe(gulp.dest('./_site'));
});
