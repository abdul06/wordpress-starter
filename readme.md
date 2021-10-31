Technologies used are PHP 7, MySQL, Apache

## Good to know
local url: http://localhost:2020/
## Getting Started
1. create a folder in your machine to house project
2. In the project root, create and "html" and "data" folder
```bash
mkdir html; mkdir data
```

3. Clone full wordpress root into html folder
```bash
curl -s https://wordpress.org/latest.tar.gz | tar xvz -C ./html; mv ./html/wordpress/* ./html/; rm -rf ./html/wordpress
```

4. Create "dump" and "db" folders in data folder
```bash
mkdir data/db; mkdir data/dump
```

5. Remove previous themes
```bash
rm -rf html/wp-content/themes/*
```

6. [Creating structure for new themes](./documentation/wordpress/create-wordpress-structure.md)


* initial folder struture
```
root
│   README.md
│
└───html/ (wordpress proejct is in this folder)
│   │   wp-config.php
│   │   wp-config-local.php
│   │   ...
│   └───wp-admin/
│   │	...
│   └───wp-content/
│   │   |
│   │	└───plugins/
│   │   |
│   │	└───themes/
│   │   │	|
│   │	│	└───[theme_1]/
│   │   │	|
│   │	│	└───[theme_2]/
│   │   │	|
│   │	│	└───[theme_3]/
│   │   |
│   │	└───uploads/ (hidden folder)
│   │
│   └───wp-includes/
│   │	...
│   
└───data (hidden folder)
│   │
│   └───db/
│   │	...
│   └───dump/
│       │   [db_name].sql
│   	│	...
```



## Adding database to project
1. Download latest production database
2. Add sql file to /data/dumb/ path
3. Example: /data/dumb/[db_name].sql
4. add uploads folder from production
5. example: /html/wp-content/uploads

## Setup local 
* Create a wp-config-local.php file by copying wp-config-sample.php
run make command or copy files to manually to correct directory

```bash
make copy_wp_config_to_html_dir
```

```bash
cp ./wp-config-templates/wp-config-local.php html/
cp ./wp-config-templates/wp-config.php html/
```


## Run docker and setup database 
```bash
$ docker-compose up -d // this will setup docker containers
$ docker ps //make note of database created
$ docker exec -it wordpress-starter-wordpress_wpdb_1 bash // the container name you read after running docker ps
$ mysql -uroot -proot //lanches sql cli in docker once in linux environment
$ show databases;
$ create database wordpress; //only create database if missing
$ use wordpress; //goes into database
$ show tables; //should be empty at this point
$ source /docker-entrypoint-initdb.d/[db_name].sql //this is the file in the /data/dump folder
```
