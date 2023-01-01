# Install the Koha ILS

Preliminary notes on setting up [Koha ILS][kohails] on Google Cloud.

Helpful documentation and demos:

- [Koha on Debian][kohaDebian]
- [Install Koha on Google Cloud Platform][youtubeKoha]

[kohails]:https://koha-community.org/
[kohaDebian]:https://wiki.koha-community.org/wiki/Koha_on_Debian
[youtubeKoha]:https://www.youtube.com/watch?v=mzUop9R4sKc

## Pre-setup

```
apt-get update
apt-get upgrade
apt-get autoremove -y 
apt-get install gnupg2
```

## Prep Koha

Add Koha to repos:

```
echo 'deb http://debian.koha-community.org/koha stable main' | sudo tee /etc/apt/sources.list.d/koha.list
```

Use the first one but listing the second just in case:

```
wget -qO - https://debian.koha-community.org/koha/gpg.asc | gpg --dearmor -o /usr/share/keyrings/koha-keyring.gpg
#wget -q -O- https://debian.koha-community.org/koha/gpg.asc | sudo apt-key add -
```

## Install Koha:

```
apt-get update
apt-get install koha-common
nano /etc/koha/koha-sites.conf
sudo apt-get install mysql-server
mysqladmin -u root password bibliolib1
a2enmod rewrite
a2enmod cgi 
systemctl restart apache2
koha-create --create-db bibliolib
nano /etc/apache2/ports.conf 
systemctl restart apache2
a2dissite 000-default
a2enmod deflate
a2ensite bibliolib
systemctl reload apache2
systemctl restart apache2
```

## Get username and password

```
nano /etc/koha/sites/bibliolib/koha-conf.xml
```

## Run the web installer at:

Be sure to follow instructions.

```
http://IP-ADDRESS:8080
```
