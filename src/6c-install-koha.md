# Install the Koha ILS

## Introduction

In the prior sections, we built a WordPress site that functions as our library's front-facing presence.
Then we built an Omeka site that could serve as our library's digital library.
In this section, we complete our library web infrastructure by installing the [Koha ILS][koha_ils].

Koha is a free and open source library system that provides modules
for patron accounts, circulation, cataloging, serials, an OPAC, and more.
The process of installing and using Koha is more complicated
than the processes we used to install and use WordPress and Omeka.
This is because Koha, like other ILS software,
is a complex project that must provide a lot of different functionality for a library and its patrons.
Fortunately, the [Koha documentation][koha_docs] makes the process pretty straightforward.

## Koha ILS

Koha is an open source <q>library management system</q>,
otherwise called an [integrated library system (ILS)][ils_wiki].
These systems provide modules that perform specific ranges of functionality.
Koha's modules include:

- Administration
- Patron management
- Cash management
- Circulation
- Cataloging
- Course reserves
- Serials
- Acquisitions
- Reports
- OPAC

According to [Library Technology Guides][koha_ltg] (March 2026),
<q>Koha has been installed in 4,783 libraries [around the world], spanning 6,273 facilities or branches.</q>
Most installations are in medium sized or small libraries.
Koha is well represented in academic libraries, but the majority of installations are in public libraries.

Although Koha is an open source ILS and free to download, install, and administer without external support,
librarians can hire companies that support open source library management solutions,
like [ByWater Solutions][bywater] or the [Equinox Open Library Initiative][equinox]
These companies support ILS migration, hosting, training, and more.
They also provide support for other library software services,
such as open source discovery systems and electronic resource management systems.

In addition to Koha, [Evergreen][evergreen] is an open source integrated library system.
According to [Library Technology Guides][evergreen_ltg], Evergreen is primarily installed at small and medium
size public libraries, and most installations are in the U.S. and Canada.

There is currently a migration to what has been called *library service platforms (LSP)* in recent years.
LSPs are a next generation ILS designed from the start to integrate electronic resources.
For example, the ILS has an OPAC that was designed originally to search a library's print collections.
While modern OPACs have been adapted for electronic resources,
they are still limited because of the older design model.
LSPs use a *discovery service* instead of an OPAC.
Discovery services are designed to search a library's entire collection,
including the content in third party databases and journals.
Example LSPs include Ex Libris Primo, OCLC's WorldCat Discovery Service, and
open source solutions like [Aspen Discovery][aspen] and [VuFind][vufind].

The integration of library systems like the ILS and the LSP is a major aspect of library services.
When we visit a library's website,
we first interact with a normal website that might be built on
WordPress, [Drupal][drupal], or another content management system.
These websites will link to the public facing components of an ILS or LSP, as well as other services,
such as bibliographic databases, journal publishers, ebook services, and more.
It may therefore be the systems librarian's job to help build and connect these services.
In this demo, we will continue that work by installing, configuring, and setting up the Koha ILS.

## Google Cloud Setup

Before we begin to install Koha, we need to create a new virtual machine instance
and configure the Google firewall to allow HTTP traffic to our Koha install.

### New Virtual Instance

The virtual instances we have been using do not meet the memory (RAM) needs
required by the Koha integrated library system.
We therefore need to create a new virtual instance that has more RAM.
We will also need a bigger disk since Koha takes up more disk space.
Check [Koha System Requirements][sys_req_koha] for details.

As a refresher for creating a VM,
see the section titled **gcloud VM Instance** at [Using gcloud Virtual Machines][using_gcloud].
In our new VMs, we'll use the following parameters:

- Machine Configuration: e2-medium (2 vCPU, 1 core, 4 GB memory)
- OS and storage: Ubuntu 24.04 LTS, 20GB Hard Disk
- Networking:
    - Allow HTTP traffic
- Network Tag:
    - koha-staff-8080
    - koha-opac-8081

Make sure your virtual machine includes those above two network tags:
**koha-staff-8080** and **koha-staff-8081**.
Otherwise, your site will not load in your browser.

All else, including the operating system (Ubuntu 24.04 LTS), should remain the same.
Note that this is a more expensive setup.
Therefore, feel free to delete this instance when you are done with this project to avoid incurring extra costs.

### Google Cloud firewall

Later, after we install Koha, we will need to access the staff and public interfaces
on special ports for HTTP data.
All internet traffic to a server contains metadata that identifies itself by port numbers.
The default port for HTTP is 80, and the default port for HTTPS (encrypted) is 443.
Since we do not have encryption enabled, this means we will not use port 443.
Instead, we will configure the firewall to access the staff interface through port 8080 and
the public interface through port 8081.
This HTTP-only setup is for short-lived lab use;
in any long-term deployment, we would protect staff and public traffic with HTTPS.

> How does a server know where to send internet traffic?
> Internet data is *packaged* in many forms.
> One of the most common forms are TCP packets.
> These packets contain *header* information that names the source IP, destination IP, source port, and destination port.
> When TCP packets arrive at a destination server, the operating system inspects the packet header for the port number.
> The OS looks up the port number in a table that contains a mapping of ports to applications.
> When the OS makes the match, it sends the TCP packets to the application.
> In its default setup, the Apache2 web server handles traffic on port 80.

Firewalls are used to control incoming and outgoing traffic via ports.
We selected **Allow HTTP traffic** when we created our virtual instance on Google Cloud,
and we instructed the Google Console firewall to allow traffic through port 80.
We need to add a firewall rule to allow web traffic through port 8080 and port 8081.

> Please take a moment to read more about ports: [What is a computer port? | Ports in networking][ports].

To create the firewall rules, go to the Google Cloud Console:

We'll add two firewall rules to open traffic on two ports.
Opening these ports will allow us to connect to Koha's staff and public interfaces.
Follow these steps to create two firewall rules:

#### Firewall Rule 1: Port 8080

- Click on the hamburger icon.
- Click on VPN Network.
- Click on Firewall.
- At the top of the page, choose Create a firewall rule (Do not choose Create a firewall policy):
    - Add name: koha-staff-8080
    - Add description: Open port 8080 for the Koha staff interface
- Next to Targets, click on Specified target tags.
- In Target tags, add our tag name: koha-staff-8080.
- In the Source IPv4 ranges, we allow access from anywhere (0.0.0.0/0) to simplify setup. In a real deployment, you might want to restrict administrative access to port 8080 to specific IP addresses.
- Click on Specified protocols and ports
    - Click on TCP
    - Add 8080 in the Ports box
- Click on Create

#### Firewall Rule 1: Port 8081

- Create a second firewall rule
    - Add name: koha-opac-8081
    - Add description: Open port 8081 for the Koha opac interface
- Next to Targets, click on Specified target tags.
- In Target tags, add our tag name: koha-opac-8081.
- In the Source IPv4 ranges, we allow access from anywhere (0.0.0.0/0) to simplify setup. In a real deployment, you may or may not want to restrict public access to port 8080 to specific IP addresses.
- Click on Specified protocols and ports
    - Click on TCP
    - Add 8081 in the Ports box
- Click on Create

**These firewall rules must match the ports we configure below in Koha and Apache.**

## Install Koha Repo

After you've created your virtual machine, set up the firewall rules, but before we begin to install Koha,
connect to your machine and start `tmux`.
Using tmux will be useful in in case you get disconnected:

```
tmux
```

`tmux` is a [terminal multiplexer][tmux].
If you are disconnected while you are working,
re-establish your connection to your virtual machine, and run the following command to re-open your session:

```
tmux attach
```

> If `tmux` is not installed, then install it with `sudo apt install tmux`.
> See `man tmux` for more information on how to use `tmux`, if interested,
> or search the web for other tutorials.
> It's a powerful program and can do a lot more than re-attach from disconnected sessions.

### Server setup

Now let's log onto our new server and prepare it for the Koha installation.

First we need to update our local repositories:

```
sudo apt update
```

And then upgrade the server:

```
sudo apt upgrade
```

The next two commands help save disk space.
As a reminder, the `apt autoremove` command
<q>is used to remove packages that were automatically installed to satisfy
dependencies for other packages and are now no longer needed as dependencies changed or the package(s) 
needing them were removed in the meantime</q> (see `man apt`).
The `apt clean` command <q>clears out the local repository of retrieved package files</q>
(see `man apt-get`).
In the following example, I combine both commands on one line:

```
sudo apt autoremove -y && sudo apt clean
```

### Add Koha Repository

When you run the `sudo apt update` command,
Ubuntu syncs the local repository database with several remote repositories.
These remote repositories contain metadata about the packages they contain.
The syncing process identifies if any new software updates are available.
The remote repositories are also used to retrieve software.

We can add repositories to sync with and to use to download software, and this includes the Koha ILS.
First, we use the following three commands set up the signing keys to ensure
that we're downloading the authentic software.

```
sudo apt install apt-transport-https ca-certificates curl
sudo mkdir -p --mode=0755 /etc/apt/keyrings
sudo curl -fsSL https://debian.koha-community.org/koha/gpg.asc -o /etc/apt/keyrings/koha.asc
```

Next, become the `root` user with the following command:

```
sudo su
```

And paste the following into your terminal.
Be careful about getting this correctly copied and pasted:

```
tee /etc/apt/sources.list.d/koha.sources <<EOF
Types: deb
URIs: https://debian.koha-community.org/koha/
Suites: 25.05
Components: main
Signed-By: /etc/apt/keyrings/koha.asc
EOF
```

Use `cat /etc/apt/sources.list.d/koha.sources` to view and verify that the contents
match the input above.

Then `exit` the root Linux user account and return to your regular user account:

```
exit
```

> Explanation of the above command:
> The `tee` command reads input and directs output both to a file and to the screen.
> `<<EOF` represents a [Here document][heredoc] or `heredoc`,
> where `EOF` represents the **delimiting identifier**.
> The `heredoc` ends with `EOF` on a line of its own.

## Install MariaDB

The Koha ILS can use either the MySQL relational database or [MariaDB][mariadb].
The latter is a [fork][fork] of the MySQL relational database, and for most uses,
it works exactly the same as MySQL.

Since Koha defaults to MariaDB, we'll use that.
We'll install it first in case it helps to let Koha know, so to speak,
that it's using MariaDB as Koha is installed.

```
sudo apt update
sudo apt install mariadb-server
```

## Install Koha

Next we need to update/sync the new repository with the Koha remote repository.
This just means that we use `apt update` again.

```
sudo apt update
```

Now we review the package information for Koha:

```
apt show koha-common
```

Then we install the Koha integrated library system.
This is a large metapackage, and it will take several minutes to download and install.
This is where `tmux` may come in handy, in case you lose your connection to your server. 

```
sudo apt install koha-common
```

### Opening Ports

Like all integrated library systems, Koha has a staff interface and a public interface.
The staff interface provides access to its modules, including cataloging,
patron management, and so forth.
The public interface provides access to Koha's OPAC.
We wil configure Koha to use different [ports][ports_wiki] for the staff and public interfaces.
Specifically, we will configure Koha to access the staff interface through port 8080 and
the public interface through port 8081.

We are going to edit the file at `/etc/koha/koha-sites.conf`.
Since this is an important configuration file, we should make a copy of it first:

```
sudo cp /etc/koha/koha-sites.conf /etc/koha/koha-sites.conf.backup
```

Next, use your text editor to open `/etc/koha/koha-sites.conf`.
At the end of the `INTRAPORT=` line, add `8080`.
At the end of the `OPACPORT=` line, add `8081`:

```
INTRAPORT="8080"
OPACPORT="8081"
```

## Apache2 Setup

The Apache2 web server software was installed when we installed Koha, but
Koha requires that we enable a few Apache modules with the `a2enmod` command.

```
sudo a2enmod rewrite cgi headers proxy_http
sudo systemctl restart apache2
```

We've already configured Koha to listen on ports 8080 and 8081, but
we also need to configure Apache2 to do so also.
Again, since this is an important configuration file, make a copy:

```
cp /etc/apache2/ports.conf /etc/apache2/ports.conf.backup
```

Then use your text editor to open `/etc/apache2/ports.conf`.
Under `Listen 80` at the top of the file, add the following two lines:

```
Listen 8080
Listen 8081
```

## Create Koha Instance

Koha comes with several commands to create and initiate the install.
In the following command, we'll use the `koha-create` command to create a Koha library called `bibliolib`.
Feel free to use an alternate name, but
be sure it's a single word with no spaces or non-alpha characters.
Use lowerspace characters, too.
Then we'll restart Apache2.

```
sudo koha-create --create-db bibliolib
sudo systemctl restart apache2
```

## Additional Apache2 Configurations

The following commands configure Apache2 a bit more.
As we've learned, the `/var/www/html` directory normally serves as the
web document root on fresh Apache2 installs.
The `a2dissite 000-default` command below turns this off.
The `a2enmod deflate` command turns on [network compression][mod_deflate].
This means that data from the Koha server is compressed before it's sent to a client machine.
The `a2ensite bibliolib` enables the new bibliolib library, which has already been configured by Koha.

```
sudo a2dissite 000-default
sudo a2enmod deflate
sudo a2ensite bibliolib
```

Next we reload Apache2's new configurations and restart it:

```
sudo systemctl reload apache2
sudo systemctl restart apache2
```

## Koha Web Installer

All the back end work is complete, and like we did with WordPress and Omeka,
we can complete the installation through a web installer.
First, we get the user name and password using the `koha-passwd` command.
Be sure to save this info:

```
sudo koha-passwd bibliolib
```

Example output:

```
Username for bibliolib: koha_bibliolib
Password for bibliolib: M(x_d40k.{;_=;zG
Press enter to clear the screen...
```

Next, get the public IP address for our machine in order to visit the Koha site
and complete the installation.
If the public IP address for my machine is `123.12.123.12`, then
I would visit the site using the staff port:

```
http://123.12.123.12:8080
```

You should see a welcome screen with an onboarding process.
Follow the steps, and be sure to complete the forms and select the default options
unless you want to change them.
Just be sure to read through what is offered.

The documentation for the web installer is helpful.
Enter the username and password from the `sudo koha-passwd bibliolib` command.
Note that it might take a while to step through the installer.

One thing to do is to add sample libraries and sample patrons during the install.
More generally, be sure to follow instructions as you click through each step.
Add lots of samples to play around with after the install completes.

When you are on the last page of the install, create an **Administrator identity**, and
be sure to save this information.

[Introduction to the Koha installation process][koha_web_installer]

## Public OPAC

Once you've complete the install and onboarding process,
you can visit your public OPAC at:

```
http://123.12.123.12:8081
```

When the install and setup are complete, you can login with the admin credentials
that you created during the web installer process, and
you will have access to the staff interface.

It may help later to make a setting change in the admin site.
In Koha staff view:

- Click on **More** in the top drop down box
- Click on **Administration**
- Click on **System Preferences**
- Click on **OPAC** in the left hand side bar
- Scroll down to the `OPACBaseURL` line.
- Enter the IP address of your server: `http://IP-ADDRESS`
- Click on **Save all OPAC Preferences**

## Additional Tasks

Once you've installed and setup Koha, begin to learn the system.
Try the following:

- Import or create patron accounts
- Import or create bibliographic records
- Check out books to patrons
- Delete patron circulation history

## Conclusion

In this final section, you learned how to install and setup a Koha ILS installation on a Linux server.
Your next step is to use your WordPress install to finalize your public facing library website.
This website should include links to your Omeka-based digital library and
to your Koha-based OPAC.

Congratulations!

## References

Helpful documentation and demos:

- [Koha ILS][koha_ils] documentation.
- [Koha on Debian][koha_debian]

[aspen]:https://bywatersolutions.com/products/aspen-discovery
[bywater]:https://bywatersolutions.com/
[drupal]:https://www.drupal.org/
[equinox]:https://www.equinoxoli.org/
[evergreen]:https://evergreen-ils.org/
[evergreen_ltg]:https://librarytechnology.org/product/evergreen-equinox
[fork]:https://en.wikipedia.org/wiki/Fork_(software_development)
[heredoc]:https://en.wikipedia.org/wiki/Here_document
[ils_wiki]:https://en.wikipedia.org/wiki/Integrated_library_system
[koha_debian]:https://wiki.koha-community.org/wiki/Koha_on_Debian
[koha_docs]:https://wiki.koha-community.org/wiki/Koha_on_Debian_and_Ubuntu
[koha_ils]:https://koha-community.org/
[koha_ltg]:https://librarytechnology.org/product/koha
[koha_web_installer]:https://koha-community.org/manual/latest/en/html/installation.html
[mariadb]:https://mariadb.com/
[mod_deflate]:https://httpd.apache.org/docs/current/mod/mod_deflate.html
[ports]:https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/
[ports_wiki]:https://en.wikipedia.org/wiki/Port_(computer_networking)
[sys_req_koha]:https://koha-community.org/download-koha/
[tmux]:https://en.wikipedia.org/wiki/Tmux
[using_gcloud]:2a-using-gcloud-virtual-machines.html
[vufind]:https://vufind.org/vufind/
