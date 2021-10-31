<?php

/**
 * Plugin Name: custom Blocks Suite
 * Plugin URI:  https://custom.com
 * Description: Supercharge your Gutenberg editor with high quality beautiful WordPress blocks. Ready-to-use ACF Blocks!
 * Version:     1.0
 * Author:      talib-uddeen abdul-hakeem
 * Author URI:  https://custom.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: custom
 */
if (!defined('ABSPATH')) {
    exit;
}

$register_custom_plugin_blocks_init = plugin_dir_path(__FILE__) . 'plugin-blocks-register.php';
$register_custom_theme_blocks_init = plugin_dir_path(__FILE__) . 'theme-blocks-register.php';


if (file_exists($register_custom_plugin_blocks_init)) {
    require_once $register_custom_plugin_blocks_init;
}

if (file_exists($register_custom_theme_blocks_init)) {
    require_once $register_custom_theme_blocks_init;
}

function acf_blocks_template($block) {

    $custom_theme_path = 'custom-theme-acf-blocks-templates/';
    $custom_plugin_path = 'custom-block-templates/';

    $custom_template_name = str_replace("acf/", "", $block['name']);
    // Look for a file in theme

    // if a theme block require file
    if ($theme_template = locate_template($custom_theme_path . $custom_template_name . '/' . $custom_template_name . '.php')) {
        require $theme_template;
    } else {
        // if a plugin block require file
        $custom_block_templates = plugin_dir_path(__FILE__) . $custom_plugin_path . $custom_template_name . '.php';
        require $custom_block_templates;
    }
}
