# Installing and Configuring PHP

## Introduction

Client-side programming languages, like JavaScript, are handled entirely by the browser.
To do this, browsers like Firefox, Chrome, Safari, Edge, and others include [JavaScript engines][js_engine] that use
just-in-time compilers to execute JavaScript code (see [JavaScript Engine, Mozilla][js_mozilla]).

From an end user's perspective, you basically install JavaScript when you install a web browser.

[PHP][php], on the other hand, is a server-side programming language.
This means it must be installed on the server.
Unlike with JavaScript, the browser does not execute PHP directly;
instead, the web server processes the PHP and sends the resulting HTML or other content to the browser.

From a system or web administrator's perspective,
this means that PHP has to be installed and configured to work with the web/HTTP server.
In our case, we have to install and configure PHP on our virtual instances to work with the Apache web server software.

One of the primary uses of PHP is to interact with databases, like MySQL, MariaDB, PostgreSQL, etc.,
in order to create data-driven content.
To begin to set this up, we have to:

1. Install PHP and relevant Apache modules
2. Configure PHP and relevant modules to work with Apache
3. Configure PHP and relevant modules to work with MySQL

## Install PHP

As usual, we will use `apt install` to install PHP and relevant modules.
Then we will restart Apache using the `systemctl` command.
Use `apt show <package_name>` to read more about each package we will install.
The first command below installs the **php** and the **libapache2-mod-php** packages.
The latter package is used to create a connection between PHP and the Apache web server.

```
sudo apt install php libapache2-mod-php
sudo systemctl restart apache2
```

Once installed, you want to confirm the installed version with the following command.
This is because other software (e.g., WordPress, etc.) might require a specific version for that software to work.

```
php -v
```

After we restart Apache, we need to check its status and see if there are any errors in the log output:

```
systemctl status apache2
```

## Check Installation

Next we check that PHP has been installed and that it's working with Apache.
We can create a small PHP file in our web document root.
To do that, we `cd` to the document root, `/var/www/html/`, and create a file called **info.php**:

```
cd /var/www/html/
sudo nano info.php
```

In that file, add the following text, then save and close the file:

```
<?php
phpinfo();
?>
```

Now visit that file using the public IP address for your server.
If the public IP address for my virtual machine is `203.0.113.10`, then in Firefox, Chrome, etc, I would open:

```
http://203.0.113.10/info.php
```

> Again, be sure to replace the IP below with the IP address of your server and
> be sure to use **http** and not **https**.

You should see a page that provides system information about PHP, Apache, and the server.
The top of the page should look like Figure 1 below:

<figure>
<img src="images/4b-phpinstall.png"
alt="PHP install page"
title="PHP install page">
<figcaption>
Fig. 1. A screenshot of the title of the PHP install page.
</figcaption>
</figure>

Once you've confirmed that PHP is installed and functioning,
you should delete it since it exposes detailed systems information:

```
sudo rm /var/www/html/info.php
```

## Basic Configurations

By default, when Apache serves a web page, it looks for a [file titled `index.html`][mod_dir_docs] and serves that,
even if it does not display that file in the URL bar.
Thus, `http://example.com/` actually resolves to `http://example.com/index.html` in such cases.
However, if our plan is to provide PHP,
we want Apache to default to a file titled `index.php` instead of the `index.html` file.
In these cases, `http://example.com/` would actually resolve to `http://example.com/index.php`.

To configure that, we need to edit the `dir.conf` file in the `/etc/apache2/mods-enabled/` directory.
In that file there is a line that starts with `DirectoryIndex` followed by a list of files.
The first file listed in that line is `index.html`,
and then there are a series of other files that Apache looks for in the order listed.
Apache checks that list and prioritizes these in order of appearance.
If any of those files exist in the document root, then Apache serves those before proceeding to the next.
We want Apache to prioritize the `index.php` file first and `index.html` second.
Before modifying this file, it's good practice to create a backup of the original.
So we will use the `cp` command to create a copy with a new name, and then we will use `nano` to edit the file.

```
cd /etc/apache2/mods-enabled/
sudo cp dir.conf dir.conf.bak
sudo nano dir.conf
```

Next we change the line to this, so that `index.php` is first in line:

```
DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
```

Whenever we make a configuration change, we should use the `apachectl` command to check our configuration:

```
apachectl configtest
```

If we get a `Syntax Ok` message, we can reload the Apache configuration, restart the service, and check its status:

```
sudo systemctl reload apache2
sudo systemctl restart apache2
systemctl status apache2
```

## Create an index.php File

Now create a basic PHP page.
`cd` back to the Apache document root directory and use `nano` to create and open an `index.php` file:

```
cd /var/www/html/
sudo nano index.php
```

Let's add some HTML and PHP to it.
We will add PHP that functions as a simple [browser detector][http_user_agent].
Add the following code:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browser Detector</title>
</head>
<body>
    <h1>Browser & OS Detection</h1>
    <p>You are using the following browser to view this site:</p>

    <?php
    $user_agent = $_SERVER['HTTP_USER_AGENT'];

    // Browser Detection
    if (stripos($user_agent, 'Edge') !== false) {
        $browser = 'Microsoft Edge';
    } elseif (stripos($user_agent, 'Firefox') !== false) {
        $browser = 'Mozilla Firefox';
    } elseif (stripos($user_agent, 'Chrome') !== false && stripos($user_agent, 'Chromium') === false) {
        $browser = 'Google Chrome';
    } elseif (stripos($user_agent, 'Chromium') !== false) {
        $browser = 'Chromium';
    } elseif (stripos($user_agent, 'Opera Mini') !== false) {
        $browser = 'Opera Mini';
    } elseif (stripos($user_agent, 'Opera') !== false || stripos($user_agent, 'OPR') !== false) {
        $browser = 'Opera';
    } elseif (stripos($user_agent, 'Safari') !== false && stripos($user_agent, 'Chrome') === false) {
        $browser = 'Safari';
    } else {
        $browser = 'Unknown Browser';
    }

    // OS Detection
    if (stripos($user_agent, 'Windows') !== false) {
        $os = 'Windows';
    } elseif (stripos($user_agent, 'Mac') !== false || stripos($user_agent, 'Macintosh') !== false) {
        $os = 'Mac';
    } elseif (stripos($user_agent, 'Linux') !== false) {
        $os = 'Linux';
    } elseif (stripos($user_agent, 'iOS') !== false || stripos($user_agent, 'iPhone') !== false || stripos($user_agent, 'iPad') !== false) {
        $os = 'iOS';
    } elseif (stripos($user_agent, 'Android') !== false) {
        $os = 'Android';
    } else {
        $os = 'Unknown OS';
    }

    // Output Result
    echo "<p>Your browser is <strong>$browser</strong> and your operating system is <strong>$os</strong>.</p>";
    ?>

</body>
</html>
```

Next, save the file and exit `nano`.
In your browser, visit your site at its public IP address (again, replace your server's IP address):

```
http://55.333.55.333/
```

Although your `index.html` file still exists in your document root, Apache now returns the `index.php` file instead.
If for some reason PHP fails, then the `index.html` file would be served next
since that's what is listed next in the `dir.conf` file on the `DirectoryIndex` line.

## Conclusion

In this section, we installed PHP and configured it to work with Apache.
We also created a simple PHP test page that reported our browser user agent information on our website.

In the next section, we'll learn how to complete the LAMP stack by adding the MySQL relational database to our setup.

[php]:https://www.php.net/
[js_engine]:https://en.wikipedia.org/wiki/JavaScript_engine
[js_mozilla]:https://blog.mozilla.org/javascript/
[mod_dir_docs]:https://httpd.apache.org/docs/current/mod/mod_dir.html
[http_user_agent]:https://stackoverflow.com/questions/8754080/how-to-get-exact-browser-name-and-version
