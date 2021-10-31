

## Other resources
- Check top level item
https://stackoverflow.com/questions/26180688/how-to-add-class-to-link-in-wp-nav-menu
```php
function atg_menu_classes($classes, $item, $args) {
    if($args->theme_location == 'topnav') {
      $classes[] = 'nav-link';
    }
    return $classes;
  }
  add_filter('nav_menu_css_class', 'atg_menu_classes', 1, 3);
```

- add function to use Has_Child_Walker_Nav_Menu that was created
https://www.generacodice.com/en/articolo/3224125/wordpress---how-do-i-know-if-a-menu-item-has-children&amp;quest;#alt7230437
```php
function my_menu_dropdown( $output, $item, $depth, $args ) {
    if ( $item->has_children ) {
        # concat onto menu item it is has a child
        $output .= '<a href="#" class="expand-menu-toggle"><i class="fal fa-angle-down"></i></a>';
    }
    return $output;
}
add_filter( 'walker_nav_menu_start_el', 'my_menu_dropdown', 10, 4 );
```
