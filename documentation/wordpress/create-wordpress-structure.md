# Download wordpress;
https://wordpress.org/download/


# add wordpress project to and add project to html folder
curl -s https://wordpress.org/latest.tar.gz | tar xvz -C ./html; mv ./html/wordpress/* ./html/; rm -rf ./html/wordpress


# Createing New Theme Structure
1. Go to theme builder
https://underscores.me/
https://github.com/automattic/_s

2. input details
- Theme name: [theme_name]
- Theme slug: [theme_name]
- author: talib-udden abdul-hakeem
- author uri: [author_url].com
- description: [theme description]
- _sassify!: check

example:
- Theme name: aloha-vet
- Theme slug: aloha-vet
- author: talib-udden abdul-hakeem
- author uri: talibabdulhakeem.com
- description: aloha vet wordpress theme
- _sassify!: check



add downloaded theme to theme folder

/html/wp-content/themes/



# File and data to remove from theme
1. styles.css 
- Delete data inside of file

2. Delete
package.json
js/
composer.json
.stylelintrc.json
.eslintrc

3. Add all files except readme from theme_assest_template
