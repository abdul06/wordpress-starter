<?php
// Register Blocks
add_action('acf/init', 'custom_register_plugin_blocks');

function custom_register_plugin_blocks() {

    // check function exists.
    if (function_exists('acf_register_block_type')) {

        // // register a block block.
        // acf_register_block_type(array(
        //     'name'              => 'custom-test',
        //     'mode'				=> 'preview',
        //     'title'             => __('test block'),
        //     'description'       => __('initial test block....'),
        //     'render_callback'   => 'acf_blocks_template',
        //     'category'          => 'custom-blocks',
        //     'icon'              => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"></defs><title/><g data-name="22-chat" id="_22-chat"><polygon class="acfb_svg_icon" points="31 3 1 3 1 23 8 23 14 29 14 23 31 23 31 3"/><line class="acfb_svg_icon" x1="7" x2="25" y1="9" y2="9"/><line class="acfb_svg_icon" x1="7" x2="25" y1="13" y2="13"/><line class="acfb_svg_icon" x1="7" x2="25" y1="17" y2="17"/></g></svg>',
        //     'enqueue_assets' => function(){
        // 	        wp_enqueue_style( 'custom-blocks', plugin_dir_url( __FILE__ ) . 'css/custom_block_styles.css' );
        //     },
        // ));

    }
}
