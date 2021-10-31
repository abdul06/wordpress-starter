create_dir:
	mkdir -p data/db
	mkdir -p data/dump
	mkdir -p html

download_wordpress_project_to_html_dir:
	curl -s https://wordpress.org/latest.tar.gz | tar xvz -C ./html; mv ./html/wordpress/* ./html/; rm -rf ./html/wordpress


copy_wp_config_to_html_dir:
	cp ./wp-config-templates/wp-config-local.php html/
	cp ./wp-config-templates/wp-config.php html/

# be careful not to remove your theme....
remove_generic_themes:
	rm -rf html/wp-content/themes/*

setup_wordpress_env: create_dir download_wordpress_project_to_html_dir copy_wp_config_to_html_dir





init_reload: init_nvm_12 run_gulp_reload

reload: run_gulp_reload

# watch: init_nvm_12 run_gulp

nvm_12:
	source $(HOME)/.nvm/nvm.sh ;\
	nvm use 12

init_nvm_12:
	@echo "starting node version 12..."
	source $(HOME)/.nvm/nvm.sh ;\
	nvm use 12

run_gulp:
	npm run start

run_gulp_reload:
	@echo "run gulp with reload..."
	npm run start:reload
