# Install WordPress

## Introduction

[WordPress][wpwiki] is a free and open source
content management system (CMS).
Originally, its focus was on providing
a platform for blogging, but
throughout the last decade plus,
it has become a general purpose CMS
that can serve as a website builder.
Two sites exist to provide access to WordPress:
[WordPress.com][wpcom] and [WordPress.org][wporg].
WordPress.com is a hosting solution,
which means that customers can sign up and
create a free WordPress site.
Since its hosted,
customers are only responsible for
their content and not for managing
the core WordPress installation and its updates.
Various paid plans can extend the functionality
offered to WordPress.com customers.

WordPress.org is maintained by
the [WordPress Foundation][wpfoundation], which 
oversees the development of the software and
which provides access to the WordPress software.
When we download the WordPress software,
we download it from WordPress.org.
Unlike the hosted solution,
when we install and setup WordPress
on our own servers,
we become responsible for administrating
its installation and for keeping the software updated.

WordPress is widely used software,
and because of that,
it's often the focus of attack.
Take a moment to read about the developers's
efforts to protect WordPress: [Security][wpsecurity].
We will not need to update our WordPress installs
during the course of this course, but
you should be familiar with the update process
in case you decide to maintain your install or
an install at a future date:
[Updating WordPress][updatingwp].

## Libraries and WordPress

Many libraries use WordPress as
as their main website and
a quick web search will reveal them.
For example, I quickly found an
example of a (beautiful) WordPress library site for
the [Reading Public Library (RPL)][rplwp]
in Massachusetts.
These library websites coordinate with additional
solutions that provide integrated library systems
and other electronic resource services.
RPL, for instance, connects their WordPress
installation,
which serves as their main website page,
with the open source [Evergreen ILS][evergreenils],
which serves their OPAC.
Check this by clicking on RPL's **Library Catalog** link,
and you will see that it takes you to a different URL.

> Aside: it is this need to coordinate so many services
> across all these websites that in part drives the need to
> develop standards for data exchange and work flow
> processes. For those of you have taken my electronic
> resource management course, you will recall we spent an
> entire module on this topic.

Many library websites are partitioned like this.
Thus, when we install WordPress soon,
it is as if we are only
installing the *front entrance*
to the library.
Libraries are generally like this.
They have one main website (like https://libraries.uky.edu)
but then connect to other sites that provide access
to OPACS, discovery systems, OverDrive or other eBook
vendors, bibliographic databases, and more.
This is part of the confusion
around how libraries provide electronic resources.
There are efforts to make all
these components connect more seamlessly
(e.g., through [discovery systems][disc_systems]),
but if we were to model this to the
walking around world,
it would be like having a library that
has multiple buildings,
where each building provides one thing:
one building for books,
one building for journals,
another building for other journals,
another building for another set of journals,
another building for looking up where to find journals,
another building for special collections,
and so on.
I digress.

You can read the announcement
about RPL's WordPress launch at:
[Reading Public Library Launches New WordPress Site][rpllaunch].
The announcement describes how
various plugins were used to offer patrons
additional functionality and
describes other basic changes
that come with the new site.
The plugins they added display
business hours and help manage events and
event attendees.

Plugins are often used with WordPress sites
to offer all sorts of additional capabilities.
Currently, there are nearly [60 thousand plugins][wp_plugins]
available for WordPress, but
some are of higher quality and utility than others.
In addition to the thousands of available plugins,
there are nearly [12 thousand free themes][wp_themes] for
WordPress sites.
Plus, many businesses offer paid themes or can
offer customized themes based on customer needs.
These themes can drastically alter the
appearance and usability of a WordPress site or
cater a site for a specific clientele,
such as a library.

## Installation

So far I have shown you how to install
software using two methods:

- using the `apt` command
- downloading from GitHub

In this lesson,
we are going to install WordPress by
downloading the most recent version
from WordPress.org
and installing it manually.
The WordPress application is available
via the `apt` command, but
the `apt` process makes it a bit more
confusing than it should be, oddly.

We are going to *kind of* follow
the documentation provided by WordPress.org.
You should read through the documentation ***before***
following my instructions, but
then follow the process I outline here instead
because the documentation uses some different
tools than we'll use.

Another reason we do this manually is because it
builds on what we have learned by building
our bare bones ILS.
That is, the two processes are similar.
In both cases,
we create a specific database for our platform,
we create a specific user for that database,
and we provide login credentials in a specific file.

First, *read through* **but don't follow** the following instructions:

[How to install WordPress][installWordPress]

## Customized Installation Process

After you have read through the WordPress.org
documentation,
follow the steps below to complete the manual install:

### Step 1: Requirements

All major software has dependencies.
For example, our bare bones OPAC depends on
MySQL and PHP to provide the database (MySQL) and
the glue (PHP) between our HTML and the database.
The same is true for WordPress.
However, since WordPress is much more complicated
software than our bare bones OPAC,
its dependencies are stricter.
This means that when
we plan to download software outside
of the `apt` ecosystem,
we need to make sure that our systems
meet the requirements for our installation.
The [WordPress.org Requirements][wprequirements] page
states that the WordPress installation requires
at least PHP version 7.4 and MySQL version 5.7.
We can check that our systems meet these
requirements with the following commands:

```
php --version
mysql --version
```

The output from `php --version` shows that our systems
have PHP 7.4.3,
which is greater than PHP 7.4.
The output from `mysql --version` show that our systems
have MySQL 8.0.36,
which is greater than MySQL 5.7.
This means we can proceed.

Next, we need to add some additional PHP
modules to our system to let WordPress operate
at full functionality.
We can install these using the `apt` command:

```
sudo apt install php-curl php-xml php-imagick php-mbstring php-zip php-intl
```

Then restart Apache2 and MySQL:

```
sudo systemctl restart apache2
sudo systemctl restart mysql
```

### Step 2: Download and Extract

The next step is to download and
extract the WordPress software,
which is downloaded as a **tar.gz** file.
This is a compressed archive file,
and is very much like a compressed
**zip** file.
Although we only download one file,
when we extract it with the `tar` command,
the extraction will result in a new directory
that contains multiple files and subdirectories.
The general instructions include:

1. Change to the **/var/www/html** directory.
1. Download the latest version of WordPress using the `wget`
   program.
1. Extract the package using the `tar` program.

Specifically, we do the following on the command line:

```
cd /var/www/html
sudo wget https://wordpress.org/latest.tar.gz
sudo tar -xzvf latest.tar.gz
```

As noted in the WordPress documentation,
this will create a directory
called **wordpress** in the same directory.
Therefore the full path of your
installation will located at
**/var/www/html/wordpress**

### Step 3: Create the Database and a User

The WordPress documentation describes how
to use **phpMyAdmin** to create the database
and a user for WordPress.
**phpMyAdmin** is a graphical front end to the
MySQL relational database that you would access
through the browser.
We are not going to install that because
I like to minimize the software that we install
on servers to reduce the server's security exposure.
Though you can use phpMyAdmin
from a different machine and
connect to the server,
this is a command line class anyway.
Therefore, we are going to create the WordPress database
and a database user using the same process we used
to create a database and user for our bare bones OPAC.
You already know this, but
the general instructions are:

1. Switch to the root Linux user
1. Login as the MySQL root user

Specifically, we do the following on the command line:

```
sudo su
mysql -u root
```

The `mysql -u root` command places
us in the MySQL command prompt.
The next general instructions are to:

1. Create a new user for the WordPress database
  1. Be sure to replace the Xs with a strong password
1. Create a new database for WordPress
1. Grant all privileges to the new user for the new database
1. Examine the output
1. Exit the MySQL prompt

Specifically, this means the following
(be sure to replaces the **Xs** with a unique
and strong password of your own):

```
create user 'wordpress'@'localhost' identified by 'XXXXXXXXX';
create database wordpress;
grant all privileges on wordpress.* to 'wordpress'@'localhost';
show databases;
\q
```

### Step 4: Set up wp-config.php

When we created our bare bones OPAC,
we created a file called **login.php**
that contained the name of the database (e.g., opacdb),
the name of the database user (e.g., opacuser),
and the user's password.
WordPress follows a similar process, but
instead of **login.php**,
it uses a file called **wp-config.php**.

Follow these general steps:

1. Change to the **wordpress** directory, if you haven't
   already.
1. Copy and rename the **wp-config-sample.php** file to
   **wp-config.php**.
1. Edit the file and add your WordPress database name, user
   name, and password in the fields for **DB_NAME**,
   **DB_USER**, and **DB_PASSWORD**.

This means that we specifically do the following:

```
cd /var/www/html/wordpress
sudo cp wp-config-sample.php wp-config.php
sudo nano wp-config.php
```

Using `nano`,
add your database name, user, and password
in the appropriate fields,
just like we did with our **login.php** file
for our bare bones OPAC.

Additionall, we want to disable FTP uploads
to the site.
To do that,
navigate to the end of the file and
add the following line:

```
define('FS_METHOD','direct');
```

### Step 5: **Optional**

The WordPress files were installed at
**/var/www/html/wordpress**.
This means that your site would be located at
a URL like:

```
http://11.111.111.11/wordpress
```

If you want to,
you can rename your **wordpress** directory
to something else.
The WordPress documentation
uses **blog** as an example.
But it could be something else,
like the name of a fictional library
that you might be using WordPress
to build a site.
If you decide to change it,
be sure to keep the name lowercase
and one word (no spaces and only alphabetic characters).
For example, if I want to change mine to **blog**, then:

```
sudo mv /var/www/html/wordpress /var/www/html/blog
```

### Step 6: Change File Ownership

WordPress will need to write to files
in the base directory.
Assuming your still in your base directory,
whether that is `/var/www/html/wordpress` or
`/var/www/html/blog` or like,
run the following command:

```
sudo chown -R www-data:www-data /var/www/html/wordpress
```

### Step 7: Run the Install Script

The next part of the process takes
place in the browser.
The location (URL) that you visit in the browser
depends on your specific IP address and also
includes the directory in **/var/www/html** that
we extracted WordPress to or that you renamed
if you followed **Step 5**.
Thus, if my IP address is 11.111.111.11 and
I renamed my directory to **blog**, then
I need to visit the following URL:

```
http://11.111.111.11/blog/wp-admin/install.php
```

**IF** I kept the directory named **wordpress**, then
this is the URL that I use:

```
http://11.111.111.11/wordpress/wp-admin/install.php
```

### Finishing installation

From this point forward,
the steps to complete the installation are
exactly the steps you follow using
WordPress's documentation.

Most importantly, you should see a **Welcome** screen
where you enter your site's information.
The site **Username** and **Password** *should not*
be the same as the username and password you used
to create your WordPress database in MySQL.
Rather, the username and password you enter here
are for WordPress users; i.e.,
those who will add content and manage the website.

**Two things to note:**

We have not setup **Email**
on our servers.
It's quite complicated to setup an email
server correctly and securely, but
it wouldn't work well without having a domain name
setup anyway.
So know that you probably should enter an email
when setting up the user account,
but it won't work.

Second, when visiting your site,
your browser may throw an error.
Make sure that the URL is set to **http**
and that it's not trying to access **https**.
Setting up an **https** site also generally
requires a domain name, but
we are not doing that here.
So if there are any problems accessing your
site in the browser,
be sure to check that the URL starts off with **http**.

## Conclusion

Congrats on setting up your WordPress library site.
It's now time to explore and build a website.
Use free themes and free plugins to alter
the look of the site, its usability, and
its functionality.
Try to create a nice looking website.
Generally, your goal for the next week
is to create an attractive, yet fictional,
*front entrance* for a library website.
It's also a break from the command line!

[installWordPress]:https://wordpress.org/documentation/article/how-to-install-wordpress/
[rpllaunch]:https://web.archive.org/web/20230927082116/https://www.bartlettinteractive.com/blog/libraries-using-wordpress
[rplwp]:https://readingpl.org/
[wp_plugins]:https://wordpress.org/plugins/
[wp_themes]:https://wordpress.org/themes/
[wpcom]:https://wordpress.com
[wporg]:https://wordpress.org
[wprequirements]:https://wordpress.org/about/requirements/
[wpsecurity]:https://wordpress.org/about/security/
[wpwiki]:https://en.wikipedia.org/wiki/WordPress
[wpfoundation]:https://wordpressfoundation.org/
[evergreenils]:https://evergreen-ils.org/
[updatingwp]:https://wordpress.org/documentation/article/updating-wordpress/
[disc_systems]:https://en.wikipedia.org/wiki/Discovery_system_(bibliographic_search)
