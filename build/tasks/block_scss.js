// -----------------------------------------------
//  Compile Sass
//  @Desc: Compile and compress sass files for output to the css directory
// -----------------------------------------------
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const filter = require('gulp-filter-by');
const gulp = require('gulp');
const color = require('gulp-color');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const preprocess = require('gulp-preprocess');
const postcss = require('gulp-postcss');
const reportError = require('../utils/error.js');

module.exports = (asset, config, ignoreFiles, browserSync, build_type='block_scss') => gulp.src(asset.build(build_type), { base: './' })
  .pipe(plumber({
    errorHandler: reportError,
  }))
  .pipe(filter((file) => {
    if (asset.filter) {
      return asset.filter(file.history, config.filter);
    }
    return true;
  }))
  .pipe(sassLint({
    files: { ignore: ignoreFiles }
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(preprocess({
    context: {
      ENV: config.env,
      CDN: config.dist,
    },
  }))
  .pipe(cleanCSS({ compatibility: 'ie11' }))
  .pipe(postcss([autoprefixer()]))
  .pipe(rename((path) => {
    let block_path = 'tqa-theme-acf-blocks-templates';
    let new_block_path = 'assets/dist/css/styles-tqa-theme-acf-blocks';
    path.dirname = path.dirname.replace(block_path, new_block_path);
    const pathUpdate = `${path.dirname  }/${  path.basename  }${path.extname}`;
    console.log(color(`Compiling SCSS: ${pathUpdate}`, 'CYAN'));
  }))
  .pipe(gulp.dest(asset.dist()))
  .pipe(browserSync.stream());

