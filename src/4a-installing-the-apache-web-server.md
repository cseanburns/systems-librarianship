# Installing the Apache Web Server

## Introduction

In this section, we focus on a fundamental component of the internet's infrastructure:
the web server, or alternatively called the HTTP server.

The web server is the software that makes websites available in your browsers.
The basic function is to make files on the web server accessible to others via their web browsers.
At a basic level, the web is a worldwide network of resources, and
the web browser retrieves and displays files from web servers, much like a file explorer does for local files.
At a more advanced level, HTTP supports more than simple file access; with server-side code
it can provide dynamic content, APIs, and more.

Knowing how a web server functions is crucial for anyone wanting to manage or deploy web services.
There are many [web servers available][web_servers_wiki], but in this session,
I will guide you through installing and using the [Apache][apache] web server.
Apache is one of the most popular web server applications.
We will learn how to install it, configure it, and conduct basic checks to ensure its operation.
We will end this lesson by creating your first web page on your first web server.

It's important to understand the basics of an HTTP server,
and therefore I ask you to read Apache's [Getting Started][getting_started]
page before proceeding with the rest of this section.
Each of the main sections on that page describe the important elements
that make up and serve a website.
These elements include:

- clients, servers, and URLs
- hostnames and DNS
- configuration files and directives
- web site content
- log files and troubleshooting

## Installation

Before we install Apache, we need to update our systems first.
This helps ensure we download and install the latest secure version available in our configured Ubuntu repositories.

```
sudo apt update
sudo apt -y upgrade
```

Once the machine is updated, we can install Apache using `apt`.
First we'll use `apt search` to identify the specific package name.
I know that a lot of results will be returned, so I will **pipe** `|` the output from `apt search` command
through the `head` command to look at the initial results:

```
apt search apache2 | head
```

The package that we're interested in happens to be named `apache2` on Ubuntu.
The name of this package is not a given, though.
On other distributions, like Fedora, the Apache package is called `httpd`.
This is why it's important to learn and use `apt search <package_name>` and `apt show <package_name>` commands
to locate desired packages before installing.

```
apt show apache2
```

Once we've confirmed that `apache2` is the package that we want,
install it with the `apt install <package_name>` command.
Press **Y** to agree to continue after running the command below:

```
sudo apt install apache2
```

## Basic checks

Once it is installed, we need to make sure the server is up and running,
configure some basic things, and create a basic web site.

To start, I use the `systemctl` command to acquire status info about `apache2` and
make sure it is *enabled* and *running*:

```
systemctl status apache2
```

The output may be overwhelming at first glance, so I advise you to read each line slowly.
In particular, look for key lines that show its **Active** and **Loaded** status.
For example, the output shows that `apache2` is **enabled**, which is the default for this software.
The term **enabled** means that the software starts automatically on reboot.
The output should also state that the software is **active**.
This means that `apache2` is running.

## Creating a web page

Since `apache2` is active, let's look at the default web page.

There are (at least) two ways we can look at the default web page.
We can use a command line web browser or a graphical web browser, like Firefox, Chrome, etc.

### Text-Based Web Browser

We have lots of command line browsers to use.
I like `w3m` because it defaults to Vim keybindings, but many like `elinks`.

To check the site with `w3m`, we have to install it first:

```
sudo apt install w3m
```

Or if you want to try `elinks`, run:

```
sudo apt install elinks
```

Once the text based browser is installed, we can visit our default site using its loopback IP address.
The loopback address is named `localhost` and always points to the local machine.
It is useful for testing services, connections, and more locally.
From the command line on our server, we can run either of these two commands to view localhost:

```
w3m 127.0.0.1
```

Or:

```
w3m localhost
```

> If you elected to use `elinks`, just replace `w3m` with it.

We can also acquire the system's [private IP address][private_ip_wiki] using the `ip a` command.
There are different address ranges for the private networks.
On your home network, your private IP address for your laptop or phone might begin with `192.168.x.x`.
On our virtual instances, the address often begins with the number **10** and looks like `10.128.0.99`,
though this can vary by network.
The difference deals with the size of the private networks.
In any case, to use the private IP address with `w3m` from the virtual machine's command line, we run,
assuming the private IP address for my local machine is `10.128.0.99`:

```
w3m 10.128.0.99
```

If `apache2` is installed and started correctly, you should see the following text:

**Apache2 Ubuntu Default Page**  
**It works!**

To exit `w3m` or `elinks`, press **q** and then **y** to confirm exit.

### Graphical Browser

To view the default web page from a browser on your local machine (outside the VM),
like Firefox, Chrome, Safari, or Edge, you need to get your server's
[public IP address][ip_address_wiki].
To do that, log into the [Google Cloud Console][gcloud_console]
click on the **Compute Engine** link, and then click on **VM instances**.
You should see your **External IP** address in the table on that page.
You can copy that external IP address or simply click on it to open it in a new browser tab.
If successful, you should see the graphical version of the **Apache2 Ubuntu Default Page**.

If the page does not load, confirm that your VM allows inbound HTTP traffic on port 80.
On Google Cloud, this means applying an **Allow HTTP traffic** firewall rule to the instance
or creating a rule in the VPC firewall. This is the same setting you enabled when creating
your virtual machine.

> Note that most browsers nowadays try to force a secure HTTPS mode.
> If your web page is not loading, make sure your URL is **http://IP-ADDRESS**
> and not **https://IP-ADDRESS**.

Please take a moment to read through the text on the default page.
It provides important information about where Ubuntu stores configuration files,
what those files do, and the document root, which is where website files are stored.

## Create a Web Page

Let's create your first web page on your first web server.
The default page described above provides the location of the **document root** at `/var/www/html`.
The **document root** may reside at a different location on a different Linux operating system,
so it's important to verify that location.
Remember that the web is, at its simplest, a worldwide network of resources.
The web server is what provides access to part of the filesystem.
That point of access is called the **document root**.

When we navigate to the document root on the command line,
we'll see that there is an `index.html` file located in that directory.
This is the **Apache2 Ubuntu Default Page** that we visited above in our browsers.
Most web servers look for a file specifically named `index.html` and serve that as the default.
Let's rename that `index.html` file, in order to back it up, and create a new one:

```
cd /var/www/html/
sudo mv index.html index.original.html
sudo nano index.html
```

> Note: we use `sudo` in this directory
> because we are working on files and directories outside our home directories.
> Thus, be careful here about the commands you run.
> Any mistake may result in deleting necessary files or directories.

If you know HTML, then feel free to write some basic HTML code to get started.
Otherwise, you can re-type the content below in `nano` or a similar editor, and then save and exit out.

```
<html>
<head>
<title>My first web page using Apache</title>
</head>
<body>

<h1>Welcome</h1>

<p>Welcome to my web site.
I created this site using the Apache HTTP server.</p>

</body>
</html>
```

If you have your site open in your web browser, reload the page, and you should see the new text.

You can still view the original default page by specifying its name in the URL.
Remember that web browsers are, at their most basic, resource viewers.
So it makes sense that you simply have to specify the name of the file you want to view.
For example, if your **public IP address** is `55.222.55.222`, then you'd specify it like so:

```
http://55.222.55.222/index.original.html
```

## Conclusion

In this section, we learned about the Apache HTTP server.
We learned how to install it on Ubuntu, how to use a `systemctl` command to check its status,
how to create a basic web page in `/var/www/html`,
how to view that web page using the `w3m` command line browser and in our graphical browser.

In the next section, we will install PHP,
which will provide the language needed to connect to the relational database MySQL.
This will enable more data-driven websites and begin to transform our sites
from basic file viewers to full-fledged applications.

[apache]:https://httpd.apache.org/
[getting_started]:https://httpd.apache.org/docs/2.4/getting-started.html
[gcloud_console]:https://console.cloud.google.com/
[web_servers_wiki]:https://en.wikipedia.org/wiki/Comparison_of_web_server_software
[private_ip_wiki]:https://en.wikipedia.org/wiki/Private_network
[ip_address_wiki]:https://en.wikipedia.org/wiki/IP_address
