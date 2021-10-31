// -----------------------------------------------
//  Compile JS
//  @Desc: Include and compress JS files
// -----------------------------------------------
const filter = require('gulp-custom-filter');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const preprocess = require('gulp-preprocess');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const color = require('gulp-color');


module.exports = (asset, config) => {
  return gulp.src(asset.build('js'), { base: './' })
    .pipe(filter((file) => {
      if (asset.filter) {
        return asset.filter(file.history, config.filter);
      }
      return true;
    }))
    .pipe(gulpif('!**/*.min.js', uglify({
      mangle: false,
      // mangle-props: false,
      compress: {
          drop_console: false
      },
      output: {
          beautify: true,
          comments: true
      }
    })))
    .pipe(preprocess({
      context: {
        ENV: config.env,
        PATH: config.dist
      }
    }))
    .pipe(rename((path) => {
      path.dirname = path.dirname.replace(asset.src, asset.dest);

      if( path.basename.includes('.min') == false ){
        path.extname = path.extname.replace('js', 'min.js');
      }

      let pathUpdate = `${path.dirname}/${path.basename}${path.extname}`;
      console.log(color(`Compiling JS: ${pathUpdate}`, 'GREEN'));
    }))
    .pipe(gulp.dest(asset.dist()));
}
