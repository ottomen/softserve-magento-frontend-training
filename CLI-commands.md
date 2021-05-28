# Magento 2 CLI commands list

You should be logged in to the Magento server, to be able to use Magento commands, and you should be under `/var/www/<magento_root>/` or `/var/www/html/<magento_root>/` directory. All commands are placed in the `bin` folder. 
Run all Magento CLI commands as the [Magento file system owner](https://devdocs.magento.com/guides/v2.3/config-guide/cli/config-cli.html#config-install-cli-first).

### Cache management commands

Clear cache.

```
bin/magento c:c
```

Remove the files from the pub/static folder: 
```
rm -rf pub/static/*
```
Remove the files from the var/view_preprocessed folder: 
```
rm -rf var/view_preprocessed/*
```
Summary of available caching commands.

```
bin/magento cache:{enable/disable/clean/flush/status}
```
Doc for Caching commands: [link](https://devdocs.magento.com/guides/v2.3/config-guide/cli/config-cli-subcommands-cache.html)

### Magento modes

Magento has default, develop, and production modes. Production mode also has better performance because static view files are populated in the pub/static directory and because of code compilation. As its name implies, default mode is how Magento operates if no other mode is specified. Default mode enables you to deploy the Magento application on a single server without changing any settings. However, default mode is not as optimized for production as is production mode.

Get the current mode:
```
bin/magento deploy:mode:show
```
Set mode:
```
bin/magento deploy:mode:set {production/developer/default}
```
Doc for modes commands: [link](https://devdocs.magento.com/guides/v2.4/config-guide/cli/config-cli-subcommands-mode.html)

### Upgrade the Magento database schema and data

Anytime you perform an action that causes the Magento database schema or data to change, you must update them by running the command discussed in this section. A partial list of reasons follows:

- Magento software was upgraded using the command line
- Some component was updated using the command line
- Some component was enabled or disabled using the command line

Start the upgrade:
```
bin/magento setup:upgrade
```
Don't forget to use `bin/magento cache:clean` after upgrade command.

### Deploy static view files 
The static view files deployment command enables you to write static files to the Magento file system when the Magento software is set for production mode. Static view files are located in the `<magento_root>/pub/static` directory, and some are cached in the `<magento_root>/var/view_preprocessed` directory as well. 

```
bin/magento setup:static-content:deploy
```
Doc for Deploy static view files command: [link] (https://devdocs.magento.com/guides/v2.3/config-guide/cli/config-cli-subcommands-static-view.html)

### Admin user management

```
bin/magento admin:user:{create/unlock}
```

Doc for Admin users commands: [link](https://devdocs.magento.com/guides/v2.3/install-gde/install/cli/install-cli-subcommands-admin.html)

bin/magento admin:user:create --admin-firstname="Arthur" --admin-lastname="Shevchenko" --admin-email=ashev4@softserveinc.com --admin-user=ashev4 --admin-password=Yfd6SE+;

### JavaScript Bundling

JavaScript bundling is an optimization technique you can use to reduce the number of server requests for JavaScript files. Bundling accomplishes this by merging multiple JavaScript files together into one file to reduce the number of page requests.
JavaScript bundling does not work unless Magento is in production mode. Once in production mode, JavaScript bundling can only be enabled using the CLI.
Enable JavaScript bundling:
```
bin/magento config:set dev/js/enable_js_bundling 1
```
Optimize bundling by minifying JavaScript files:
```
bin/magento config:set dev/js/minify_files 1
```

Enable cache busting on static file URLs. This ensures users get the latest version of the assets anytime they update:
```
bin/magento config:set dev/js/merge_files 0
```
Run static files deployment:
```
bin/magento setup:static-content:deploy
```
Clear the cache:
```
bin/magento cache:clean config
```

Doc for JavaScript Bundling commands: [link](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/themes/js-bundling.html)

### Docker

docker-compose run --rm deploy

ls -la

docker cp $(pwd) volcon-local_fpm_1:/app/

docker exec -ti volcon-local_fpm_1 bash

mv volcon-local/* ./

### Mailhog 

http://magento2.docker:8025


### DB

mysql --host db -u magento2 -pmagento2 magento2

SELECT VERSION();
show databases;
use magento2;
show tables;

SHOW COLUMNS FROM patch_list;

SELECT * FROM patch_list;

DELETE FROM patch_list WHERE patch_id = 760;

### Dump

docker-compose run --rm deploy mysqldump --host db -u magento2 -pmagento2 magento2 catalog_product_entity_text > text.sql 
docker-compose run --rm deploy mysqldump --host db -u magento2 -pmagento2 magento2 catalog_eav_attribute > attr.sql