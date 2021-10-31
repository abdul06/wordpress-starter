/* eslint-disable */
// -----------------------------------------------
// Paths
// @Desc: Expected file/directory locations and applicable output settings
// -----------------------------------------------
module.exports = config => ({
  env: {
    local: `https://localhost:${config.port}`,
    dev: 'https://[dev_url].something.com',
    prod: 'https://www.[prod_url].com',
  },
  ignore: [
    '**/*reset.scss',
    '**/*mixins.scss',
    '**/*shame.scss',
    '**/vendor/**/*.scss',
    '**/plugins/**/*.scss',
  ],
  core: {
    dir: 'core',
    watch(type) {
      return `${this.dir}/${type}/**/*.${type}`;
    },
  },
  global: {
    dir: 'html/wp-content/themes/[theme_name]/assets',
    theme_dir: 'html/wp-content/themes/[theme_name]',
    theme_blocks_dir: 'html/wp-content/themes/[theme_name]/tqa-theme-acf-blocks-templates',
    plugin_blocks_dir: 'html/wp-content/plugins/[theme_name]-block-framework/tqa-block-templates',
    src: 'src',
    dest: 'dist',
    js: {
      includes: ['**/*.js'],
      excludes: ['**/_*/*.js', '**/_*.js'],
    },
    scss: {
      includes: ['**/*.scss'],
      excludes: ['**/_*/*.scss', '**/_*.scss'],
    },
    block_scss: {
      includes: ['**/*.scss'],
      excludes: ['**/_*/*.scss', '**/_*.scss'],
    },
    build(type) {

      let directory = `${this.dir}/${this.src}/**/*`;
      if (type == 'block_scss'){
        directory = `${this.theme_blocks_dir}/**/*`;
      }

      const glob = [];
      this[type].includes.forEach((value) => {
        glob.push(directory + value);
      });

      this[type].excludes.forEach((value) => {
        glob.push(`!${directory}${value}`);

      });
      return glob;
    },
    dist() {
      return '.';
    },
    watch(type) {
      return `${this.dir}/${this.src}/${type}/**/*.${type}`;
    },
    watchThemeBlocks(type) {
      return `${this.theme_blocks_dir}/**/*.${type}`;
    },
    watchTheme(type) {
      return `${this.theme_dir}/**/*.${type}`;
    },
    // watchGutenBlock(type) {
    //   return `${this.dir}/../../../plugins/[theme_name]-blocks/src/**/*.${type}`;
    // },
  },
});
