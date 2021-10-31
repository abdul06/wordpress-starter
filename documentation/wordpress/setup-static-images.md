# Static image file setup

# Php static image file setup


```php
<?php echo file_get_contents(__DIR__ . '/../svg/undraw_test.svg'); ?>

<?php echo  get_stylesheet_directory_uri() . '/svg/test-logo.svg' ?>
<?php echo  get_stylesheet_directory_uri() . '/[folder_name_in_theme]/test-logo.svg' ?>
```


# scss background static image files setup
background-image: url($image-path  + '[image_name].jpg')
background: url($image-path + 'bg-hero.jpg')

