<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */


/**
 * Local configurations information
 *
 * If you are working in a local/desktop devlelopment environment and want to
 * keep your config seperate, we recommend using a 'wp-config-local.php' file,
 * which you should also make sure you .gitignore
 *
 */


if (file_exists(dirname(__FILE__) . '/wp-config-local.php') && strpos($_SERVER['HTTP_HOST'], 'localhost') > -1) {
    #IMPORTANT: ensure your local config does not include wp-settings.php
    require_once(dirname(__FILE__) . '/wp-config-local.php');
} else if (file_exists(dirname(__FILE__) . '/wp-config-dev.php') && strpos($_SERVER['HTTP_HOST'], '[dev_url]') > -1) {
    //dev site Setting
    require_once(dirname(__FILE__) . '/wp-config-dev.php');
} else {
    // default to a production url
    require_once(dirname(__FILE__) . '/wp-config-prod.php');
}

if (!defined('WPCF7_AUTOP')) {
    define('WPCF7_AUTOP', false);
}

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
if (!defined('WP_DEBUG')) {
    define('WP_DEBUG', false);
}
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH'))
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
