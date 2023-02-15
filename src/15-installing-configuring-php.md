# Installing and Configuring PHP

## Introduction

Client-side programming languages,
like JavaScript,
are handled by the browser.
Major browsers like Firefox, Chrome, Safari, Edge, etc.
all include [JavaScript engines][jsEngine] that use
just-in-time compilers to execute JavaScript code
(Mozilla has a [nice description][mozillaJS] of the process.)
From an end user's perspective,
you basically install JavaScript when you install a web browser.

[PHP][php], on the other hand,
is a server-side programming language,
which means it must be installed on the server
in order to be used.
From a system or web administrator's perspective,
this means that not only does PHP have be installed
on a server, but
it must also be configured to work with the HTTP server,
which in our case is Apache2.

The main use of PHP is to interact with databases,
like MySQL, MariaDB, PostgreSQL, etc.,
in order to create data-based page content.
To begin to set this up,
we have to:

1. Install PHP and relevant Apache2 modules
2. Configure PHP and relevant modules to work with Apache2
3. Configure PHP and relevant modules to work with MySQL

## Install PHP 

As usual, we will use ``apt install``
to install PHP and relevant modules.
Then we will restart Apache2
using the ``systemctl`` command.
Use ``apt show [package_name]``
to read more about each package
we will install.
The first command below installs
the **php** and the **libapache2-mod-php**
packages.
The latter package is used to
create a connection between PHP
and Apache2.

```
sudo apt install php libapache2-mod-php
sudo systemctl restart apache2
```

We can check its status and
see if there are any errors:

```
systemctl status apache2
```

## Check Install

To check that it's been installed and that
it's working with Apache2,
we can create a small PHP file in our
web document root.
To do that,
we ``cd`` to the ``/var/www/html/`` directory
and create a file called **info.php**:

```
cd /var/www/html/
sudo nano info.php
```

In that file,
add the following text,
then save and close the file:

```
<?php
phpinfo();
?>
```

No visit that file using the external IP address
for your server.
For example, in Firefox, Chrome, etc, go to:

```
http://55.333.55.333/info.php
```

> Again, be sure to replace the IP below with the IP address
> of your server and be sure to use **http** and not
> **https**.

You should see a page that provides system information
about PHP, Apache2, and the server.
The top of the page should look like Figure 1 below:

<figure>
<img src="images/24-phpinstall.png"
alt="PHP install page"
title="PHP install page">
<figcaption>
Fig. 1. A screenshot of the title of the PHP install page.
</figcaption>
</figure>

## Basic Configurations

By default, when Apache2 serves a web page,
it looks for and serves a
[file titled **index.html**][modDirDocs],
even if it does not display that file in the URL bar.
Thus, ``http://example.com/`` actually
resolves to ``http://example.com/index.html``
in such cases.

However, if our plan is to provide for PHP,
we want Apache2 to default to a file
titled **index.php** instead of
**index.html** file.
To configure that,
we need to edit the **dir.conf** file
in the **/etc/apache2/mods-enabled/** directory.
In that file there is a line that starts with
**DirectoryIndex**.
The first file in that line is **index.html**, and then
there are a series of other files that Apache2 will
look for in the order listed.
If any of those files exist in the document root,
then Apache2 will serve those before proceeding to the next.
We simply want to put **index.php** first and let
**index.html** be second on that line.
Before modifying this file,
it's good practice to create a backup
of the original.
So we will use the ``cp`` command
to create a copy with a new name,
and then we will use ``nano``
to edit the file.

```
cd /etc/apache2/mods-enabled/
cp dir.conf dir.conf.bak
sudo nano dir.conf
```

Next we change the line to this:

```
DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
```

Whenever we make a configuration change,
we can use the ``apachectl`` command to
check our configuration:

```
apachectl configtest
```

If we get a **Syntax Ok** message,
we can reload the Apache2 configuration and
restart the service:

```
sudo systemctl reload apache2
sudo systemctl restart apache2
```

## Create an index.php File

Now create a basic PHP page.
``cd`` back to the Apache2
document root directory and
use ``nano`` to create and
open an ``index.php`` file:

```
cd /var/www/html/
sudo nano index.php
```

Let's add some HTML and PHP to it.
We will add PHP that functions as a
simple [browser detector][httpUserAgent].
Add the following code:

```
<html>
<head>
<title>Broswer Detector</title>
</head>
<body>
<p>You are using the following browser to view this site:</p>

<?php
echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";

$browser = get_browser(null, true);
print_r($browser);
?>
</body>
</html>
```

Next, save the file and exit ``nano``.
In your browser,
visit your external IP address site
(again, replace your server's IP address):

```
http://55.333.55.333/
```

Although your **index.html** file still exists
in your document root,
Apache2 now returns the **index.php** file
instead.
However, if for some reason the **index.php**
was deleted,
then Apache2 would revert to the **index.html** file
since that's what is listed next in the **dir.conf**
**DirectoryIndex** line.

## Conclusion

In this section,
we installed PHP and configured it work with Apache2.
We also created a simple PHP test page
that reported our browser user agent information
on our website.

In the next section,
we'll learn how to complete the LAMP stack
by adding the MySQL relational database
to our setup.

[php]:https://www.php.net/
[jsEngine]:https://en.wikipedia.org/wiki/JavaScript_engine
[mozillaJS]:https://blog.mozilla.org/javascript/
[modDirDocs]:https://httpd.apache.org/docs/current/mod/mod_dir.html
[httpUserAgent]:https://stackoverflow.com/questions/8754080/how-to-get-exact-browser-name-and-version
