Demo
====
A running demo is available [here](http://thomas-choquet.fr:8888) (low-cost server, may crash if too many concurrent request) 
Requirements
============
* PHP > 5.5
* [Composer](https://getcomposer.org/)
* Riot games API key

Installation
============
First, pull the repository. Then run :
```bash
composer install
```
You will be prompted to add your Riot Games API Key at the end of the process
That's it !

Dont forget to give the right permissions to app/cache, app/logs and app/sessions directories or you will encounter errors

You can then start a quick server by running :
```bash
php app/console server:run
```


