// Docs
// https://gulpjs.com/docs/en/getting-started/watching-files
// -----------------------------------------------
// Dependencies
// -----------------------------------------------
const argv = require('minimist')(process.argv.slice(1), { boolean: true });
const gulp = require('gulp');
// const path = require('path');
const browserSync = require('browser-sync').create();

// -----------------------------------------------
// Command Line Args
// -----------------------------------------------
const config = {
  cwd: argv.cwd || process.cwd(),
  dev: argv.dev || false,
  env: argv.env || 'prod',
  reload: argv.reload || false,
  port: argv.port || '2222',
};

config.root = config.cwd;

// -----------------------------------------------
// Import Libs
// -----------------------------------------------
const JS = require('./build/tasks/js.js');
const SCSS = require('./build/tasks/scss.js');
const BLOCK_SCSS = require('./build/tasks/block_scss.js');
const Path = require('./build/config.js')(config);

// -----------------------------------------------
//  Dist Tasks
// -----------------------------------------------


// used for testing or manual run of compiling gulp styles
function style() {
  return SCSS(Path.global, config, Path.ignore, browserSync);
}
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

function blockStyle() {
  return BLOCK_SCSS(Path.global, config, Path.ignore, browserSync, 'block_scss');
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.blockStyle = blockStyle;

function js() {
  return JS(Path.global, config);
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp jstask
exports.js = js;

// -----------------------------------------------
//  Watch and Reload Tasks
// -----------------------------------------------


function watchTask() {

  gulp.watch(Path.global.watch('js'), js);
  gulp.watch(Path.global.watch('scss'), style);
  gulp.watch(Path.global.watchThemeBlocks('scss'), blockStyle);

  // use --reload to trigger core taks
  if (config.reload) {
    browserSync.init({
      open: 'local',
      proxy: 'localhost:2020',
      port: 8080,
    });
  }

  // use --reload to trigger core task
  if (config.reload) {
    gulp.watch(Path.global.watch('js')).on('change', browserSync.reload);
    gulp.watch(Path.global.watchTheme('php')).on('change', browserSync.reload);
    // gulp.watch(Path.global.watchPluginBlocks('php')).on('change', browserSync.reload);
  }
};


// // -----------------------------------------------
// //  Tasks Runners
// // -----------------------------------------------

exports.default = gulp.series(gulp.parallel(js, style, blockStyle), watchTask );
