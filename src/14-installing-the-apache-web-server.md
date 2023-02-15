# Installing the Apache Web Server

## Introduction

[Apache][apache] is an HTTP server,
otherwise called web server software.
Other HTTP server software exists.
Another big one is [nginx][nginx].
At its most basic,
an HTTP server essentially makes files
available to others who are able to establish a
connection to the computer and view the files
with a web browser.
Ergo, a web browser is,
at its most basic,
a file viewer.

It's important to understand
the basics of an HTTP server, and
therefore I ask you to read Apache's
[Getting Started][gettingStarted] page before
proceeding with the rest of this section.
Each of the main sections on that page describe
the important elements that make up and serve a website,
including

- clients, servers, and URLs
- hostnames and DNS
- configuration files and directives
- web site content
- log files and troubleshooting

## Installation

Before we install Apache,
we need to update our systems first.

```
sudo apt update
sudo apt -y upgrade
```

Once the machine is updated,
we can install Apache2 using ``apt``.
First we'll use ``apt search`` to identify
the specific package name.
I already know that a lot of results
will be returned,
so let's **pipe** the ``apt search`` command
through ``head`` to look at the initial results:

```
sudo apt search apache2 | head
```

The package that we're interested in
happens to be named **apache2** on Ubuntu.
This package name is not a given.
On other distributions,
like Fedora,
the Apache package is called **httpd**.
To learn more about the **apache2** package,
let's examine it with the ``apt show`` command:

```
apt show apache2
```

Once we've confirmed that **apache2** is the package
that we want,
we install it with the ``apt install`` command.
Press **Y** to agree to continue after running
the command below:

```
sudo apt install apache2
```

## Basic checks

One thing that makes Apache2, and
some other web servers,
powerful is the library of modules that
extend Apache's functionality.
We'll come back to modules soon.
For now,
we're going to make sure the
server is up and running,
configure some basic things, and
then create a basic web site.

To start,
let's use ``systemctl`` to acquire
some info about **apache2** and
make sure it is *enabled* and *running*:

```
systemctl list-unit-files apache2.service
systemctl status apache2
```

The output shows that **apache2** is enabled,
which means that it will start running automatically
when the computer gets rebooted.

The output of the second command also shows
that **apache2** is active,
which means that it has started working.

## Creating a web page

Since **apache2** is up and running,
let's look at the default web page.

There are two ways we can look
at the default web page.
We can use a command line web browser.
There are a number available, but
I like ``w3m``.

We can also use our regular web browsers
and view the site by entering the
IP address of the server
in our browser URL bar.

To check with ``w3m``,
we have to install it first:

```
sudo apt install w3m
```

Once it's installed,
we can visit our default site using the
loopback IP address
(aka, *localhost*).
From the command line on our server,
we can run either of these two commands:

```
w3m 127.0.0.1
w3m localhost
```

We can also get the subnet/private IP address
using the ``ip a`` command, and
then use that with ``w3m``.
For example, if ``ip a`` showed that my NIC
has an IP address of **10.0.1.1**, then
I could use ``w3m`` with that IP address:

```
w3m 10.0.1.1
```

If the **apache2** installed and
started correctly,
then you should see the
following text at the top
of the screen:

**Apache2 Ubuntu Default Page**  
**It works!**

To exit ``w3m``,
press **q** and then **y** to confirm exit.

To view the default web page using
a regular web browser,
like Firefox, Chrome, Safari, Edge, or etc.,
you need to get your server's public IP address.
To do that,
log into the
[Google Cloud Console][gcloudConsole].
In the left hand navigation panel,
hover your cursor over the **Compute Engine** link, and
then click on **VM instances**.
You should see your **External IP** address
in the table on that page.
You can copy that external IP address or
simply click on it to open it in a new browser tab.
Then you should see the graphical version of the
**Apache2 Ubuntu Default Page**.

> Note that most browsers nowadays may try to force HTTPS
> mode, and they also often hide the protocal from the URL.
> If your web page is not loading, make sure your URL is
> **http://IP-ADDRESS** and not **https://IP-ADDRESS**.

Please take a moment to read through
the text on the default page.
It provides important information about
where Ubuntu stores configuration files and
what those files do, and
the document root,
which is where website files are stored.

## Create a Web Page

Let's create our first web page.
The default page described above provides
the location of the document root at
**/var/www/html**.
When we navigate to that location
on the command line,
we'll see that there is already an **index.html**
file located in that directory.
This is the **Apache2 Ubuntu Default Page**
that we visited above in our browsers.
Let's rename that **index.html** file,
and create a new one:

```
cd /var/www/html/
sudo mv index.html index.html.original
sudo nano index.html
```

> Note: we use ``sudo`` in this directory because we are
> working on files and directories outside our home
> directories. Thus, be careful here about the commands you
> run. Any mistake may result in deleting necessary files or
> directories.

If you know HTML,
then feel free to write some
basic HTML code to get started.
Otherwise, you can re-type the content below
in ``nano``, and
then save and exit out.

```
<html>
<head>
<title>My first web page using Apache2</title>
</head>
<body>

<h1>Welcome</h1>

<p>Welcome to my web site.
I created this site using the Apache2 HTTP server.</p>

</body>
</html>
```

If you have your site open in your web browser,
reload the page, and you should see
the new text.

You can still view the original default page by
specifying its name in the URL.
Remember that web browsers are,
at their most basic,
simply file viewers.
So it makes sense that you simply
have to specify the name of the file
you want to view.
For example, if your **external IP address** is
**55.222.55.222**, then you'd specify it like so:

```
http://55.222.55.222/index.html.original
```

## Conclusion

In this section,
we learned about the Apache2 HTTP server.
We learned how to install it on Ubuntu,
how to use systemd (``systemctl``) commands
to check its status,
how to create a basic web page in ``/var/www/html``,
how to view that web page using the ``w3m``
command line browser and 
our regular graphical browser,

In the next section,
we will install PHP,
which will provide the language
needed to connect to MySQL,
and thus enable more data
driven web sites.

[nginx]:https://nginx.org/en/
[apache]:https://httpd.apache.org/
[gettingStarted]:https://httpd.apache.org/docs/2.4/getting-started.html
[gcloudConsole]:https://console.cloud.google.com/
