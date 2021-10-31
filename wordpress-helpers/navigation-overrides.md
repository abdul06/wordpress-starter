
# replace in header.php for navigation menu
```php
<?php
    $args = array(
        'theme_location' => 'menu-1',
        'menu_id'        => 'primary-menu',
        'menu_class' => 'navbar-nav me-auto',
        'container_class' => 'site-header__primary-menu-container',
        'menu_item_class'  => 'nav-item',
        'menu_item_class_has_children'  => 'dropdown',
        'walker'          => new Has_Child_Walker_Nav_Menu()
    );

    wp_nav_menu($args);
?>
```

# setup to add bootstrap classes to wordpress menu
1. create new folder in inc/ dir in you theme, call it navigation-overriders.php for example
2. include it into your functions.php folder in the root of your theme
```php

/**
 * Add custom navigation overrides
 */
require get_template_directory() . '/inc/navigation-overrides.php';
```

3. copy this block to the file you created... maybe its called "navigation-overrides.php"
```php
<?php
// https://stackoverflow.com/questions/14464505/how-to-add-class-in-li-using-wp-nav-menu-in-wordpress

/**
 * add class to menu item "li" element
 *
 * @param array $atts - list of classes on ul element that has "submenu"
 * @param stdClass $item -
 * @param stdClass $args -
 * @param int $depth - level where item is located
 *
 * @return array return rebuild class_list array
 *
 * resource:
 * https://stackoverflow.com/questions/26180688/how-to-add-class-to-link-in-wp-nav-menu
 * https://www.generacodice.com/en/articolo/3224125/wordpress---how-do-i-know-if-a-menu-item-has-children&amp;quest;#alt7230434
 */

function add_class_to_menu_item($class_list, $item, $args) {

    if(isset($args->menu_item_class) && in_array('menu-item-has-children', $class_list)) :
        $class_list[] = $args->menu_item_class;
        $class_list[] = $args->menu_item_class_has_children;

    elseif (isset($args->menu_item_class)) :
        $class_list[] = $args->menu_item_class;
    endif;

    return $class_list;
}
add_filter('nav_menu_css_class', 'add_class_to_menu_item', 1, 3);


/**
 * add class to menu item link "a" element
 *
 * @param array $atts -
 * @param stdClass $item -
 * @param stdClass $args -
 * @param int $depth - level where item is located
 *
 * @return array return rebuild class_list array
 *
 * resource:
 * https://wordpress.stackexchange.com/questions/10118/add-class-to-specific-link-in-custom-menu
 */
function add_class_to_menu_item_link($atts, $item, $args, $depth){

    // check if the item is in the menu-1
    if( $args->theme_location == 'menu-1' && $depth === 0) :
        // add the desired attributes:
        $class = "nav-link";
        // concat to class so we do not override what is already in there
        $atts['class'] = (!empty($atts['class'])) ? $atts['class'].' '.$class : $class;

    elseif( $args->theme_location == 'menu-1' && $depth === 1) :
        // add the desired attributes:
        $class = "dropdown-item";
        // concat to class so we do not override what is already in there
        $atts['class'] = (!empty($atts['class'])) ? $atts['class'].' '.$class : $class;
    endif;


    if( $args->theme_location == 'menu-1' && !empty($item->has_children)) :

        $class = "dropdown-toggle";
        $atts['class'] = (!empty($atts['class'])) ? $atts['class'].' '.$class : $class;
        // add data attribute
        $atts['data-bs-toggle'] = 'dropdown';
    endif;

    return $atts;
}
add_filter('nav_menu_link_attributes', 'add_class_to_menu_item_link', 10, 4);

/**
 * add a class to menu "ul" element with "submenu" as class
 *
 *
 * @param array $class_list - list of classes on ul element that has "submenu"
 * @param stdClass $args - Whether to force a new directory scan. Default false.
 *
 * @return array return rebuild class_list array
 *
 * resource:
 * https://stackoverflow.com/questions/5034826/wp-nav-menu-change-sub-menu-class-name
 */
function add_to_sub_menu_class( $class_list, $args ) {

    if( $args->theme_location == 'menu-1') :
        $class_list[] = 'dropdown-menu';
    endif;

    return $class_list;
}
add_filter('nav_menu_submenu_css_class', 'add_to_sub_menu_class' , 10, 3);

/**
 * setup walker to add has_children to each item stdClass
 *
 * resource:
 * https://www.generacodice.com/en/articolo/3224125/wordpress---how-do-i-know-if-a-menu-item-has-children&amp;quest;#alt7230437
 */
class Has_Child_Walker_Nav_Menu extends Walker_Nav_Menu {
    public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        if ( ! $element ) :
            return;
        endif;

        // set has_children to a 1 or none depends on existing
        $element->has_children = !empty( $children_elements[ $element->{$this->db_fields['id']} ] );

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }
}
```


