<?php
// Register theme Blocks
// This is only for theme block registration!!!!!
add_action('acf/init', 'custom_register_theme_blocks');


function create_meta_for_block($name, $enqueue = true, $description = null, $css_file_name = null, $icon = null) {
    $style_path = '/assets/dist/css/styles-custom-theme-acf-blocks/' . $name . '/';

    if (empty($description)) {
        $description = $name .  ' block default description....';
    }

    if (empty($css_file_name)) {
        $css_file_name = $name . '.css';
        $css_file_path = get_stylesheet_directory_uri() . $style_path . $css_file_name;
    } else {
        $css_file_path = get_stylesheet_directory_uri() . $style_path . $css_file_name;
    }

    if (empty($icon)) {
        $icon = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"></defs><title/><g data-name="22-chat" id="_22-chat"><polygon class="acfb_svg_icon" points="31 3 1 3 1 23 8 23 14 29 14 23 31 23 31 3"/><line class="acfb_svg_icon" x1="7" x2="25" y1="9" y2="9"/><line class="acfb_svg_icon" x1="7" x2="25" y1="13" y2="13"/><line class="acfb_svg_icon" x1="7" x2="25" y1="17" y2="17"/></g></svg>';
    }


    $setup_meta_data =  array(
        'name'              => $name,
        'mode'                => 'preview',
        'title'             => __($name . ' block'),
        'description'       => __($description),
        'render_callback'   => 'acf_blocks_template',
        'category'          => 'custom-theme-blocks',
        'icon'              => $icon,
    );

    // Setup an anonymous function
    // https://stackoverflow.com/questions/1499862/can-you-store-a-function-in-a-php-array
    // https://www.php.net/manual/en/functions.anonymous.php
    if ($enqueue === true) {
        $enqueue_assets_setup = function () use ($name, $css_file_path) {
            wp_enqueue_style($name, $css_file_path, array(), '20210910');
        };

        $setup_meta_data['enqueue_assets'] = $enqueue_assets_setup;
    }


    return $setup_meta_data;
};

function custom_register_theme_blocks() {

    // check function exists.
    if (function_exists('acf_register_block_type')) {


        // TEST BLOCK
        acf_register_block_type(create_meta_for_block('custom-test'));


        // HOME PAGE BLOCKS
        acf_register_block_type(create_meta_for_block('home-hero', false));
    }
}
