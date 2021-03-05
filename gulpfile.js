/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const path = require('path');

const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const prettier = require('gulp-prettier');
const lessToJs = require('gulp-less-variables-to-file');
const LessAutoprefix = require('less-plugin-autoprefix');
const cssnano = require('gulp-cssnano');
const LessNpmImport = require('less-plugin-npm-import');
const addLessImportInline = require('./scripts/gulp-add-less-inline-import');

const pkg = require('./package.json');

const sourceFile = path.resolve(__dirname, './src/index.less');

// deprecated: 由于存在 hardcode 性质的 override 因此不再提供 less 输出
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

const antdIdeThemeFile = path.resolve(__dirname, './src/antd-ide-theme.less');

gulp.task('theme', () => {
  return gulp
    .src(antdIdeThemeFile)
    .pipe(
      less({
        javascriptEnabled: true,
        plugins: [
          new LessNpmImport({ prefix: '~' }),
          new LessAutoprefix({ browsers: pkg.browserslist }),
        ],
      }),
    )
    .pipe(prettier())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('./lib'))
    .pipe(cssnano())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('./lib'));
});

gulp.task('color-theme', () => {
  return gulp
    .src([
      path.resolve(__dirname, './color-theme/light.less'),
      path.resolve(__dirname, './color-theme/dark.less'),
    ])
    .pipe(
      less({
        javascriptEnabled: true,
        plugins: [
          new LessNpmImport({ prefix: '~' }),
          new LessAutoprefix({ browsers: pkg.browserslist }),
        ],
      }),
    )
    .pipe(gulp.dest('./_site'));
});
