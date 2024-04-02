# Install the Koha ILS

## Koha ILS

[Koha][koha] is an open source
"library management system",
otherwise called an integrated library system (ILS).
These kinds of systems provide modules
that perform specific kinds of functionality.
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

According to [Library Technology Guides][ltg_koha],
Koha is installed in
"4,040 libraries [around the world],
spanning 5,677 facilities or branches".
Most installations are in medium sized
or small libraries.
Koha is well represented in academic libraries,
but the majority of installations are in public libraries.

Although Koha is an open source ILS and
free to download, install, and administer
without external support,
librarians can hire companies that support
open source library management solutions, like 
[ByWater Solutions][bywater] or
the [Equinox Open Library Initiative][equinox]
These companies support ILS migration,
hosting, training, and more.
They also provide support for
other library software services, such as
open source discovery systems and
electronic resource management systems.

In addition to Koha,
[Evergreen][evergreen]
is also an open source integrated library system.
According to [Library Technology Guides][ltg_evergreen],
Evergreen is primarily installed at small and medium
size public libraries, and
most installations are in the U.S. and Canada.

There is currently a migration to what has been
called *library service platforms (LSP)* in recent years.
The LSP is a next generation ILS that is designed
from the start to integrate electronic resources.
For example, the ILS has an OPAC which was designed
to search a library's print collections.
Modern OPACs have been adapted for
electronic resources,
but they are still limited because of the older design model.
LSPs use a *discovery service* instead of an OPAC.
Discovery services are designed to search a
library's entire collection,
including the content in third party databases
and journals.
Example LSPs include
Ex Libris Primo (used by UK Libraries),
OCLC's WorldCat Discovery Service,
and open source solutions
like [Aspen Discovery][aspen] and [VuFind][vufind].

It is probably unnecessary to state that
integration of library systems like the ILS
and the LSP is a major part of modern libraries.
When we visit a library's website,
we will first interact with a normal website that
might be built on WordPress, [Drupal][drupal],
or some other content management system.
But these websites will link to the public
facing components of an ILS or LSP,
as well as other services, such
as bibliographic database, journal publishers,
ebook services, and more.
It may therefore be the systems librarians
job to help build and connect these services.
In this demo,
we will continue that work by installing,
configuring, and setting up the Koha ILS.

## Google Cloud Setup

Before we begin to install Koha,
we need to create a new virtual machine instance
and configure the Google firewall to allow HTTP
traffic to our Koha install.

### New Virtual Instance

The virtual instance we have been using does not meet
the memory (RAM) needs required by the
Koha integrated library system.
We therefore need to create a new virtual instance
that has more RAM.
As a refresher,
see the section titled **gcloud VM Instance** at
[Using gcloud Virtual Machines][using_gcloud].
However, we will modify the **Series** to **E2**
and set the **Machine Type** to **2 vCPU, 4 GB memory**.
All else,
including the operating system (Ubuntu 20.04),
should remain the same.
Note that this is a more expensive setup.
Therefore, feel free to delete this instance
at the end of the semester.

### Google Cloud firewall

Later, after we install Koha,
we will need to access the staff interface
on a special port for HTTP data.
All internet traffic to a server contains
metadata that identifies itself by port numbers.
The default port for HTTP is 80, and
the default port for HTTPS (encrypted) is 443.
Since we do not have encryption enabled,
this means we will only use port 80, but 
the staff interface will be identified by port 8080.

> How does a server know where to send internet traffic?
> Internet data is *packaged* in many forms.
> One of the most common forms are TCP packets.
> These packets contain *header* information that
> names the source IP, destination IP, source port, and destination port.
> When TCP packets arrive at a destination server,
> the operating system inspects the packet header for the port number.
> The OS then looks up the port number in a table that
> contains a mapping of ports to applications.
> When the OS makes the match,
> it sends the TCP packets to the application.
> In its default setup,
> the Apache2 web server
> handles traffic on port 80.

Firewalls are used to control incoming and
outgoing traffic via ports.
When we selected **Allow HTTP traffic** when
we created our virtual instance,
we instructed the Google Console firewall
to allow traffic through port 80.
We need to add a firewall rule to allow
web traffic through port 8080.
We will use port 8080 to access
the Koha staff interface.

> Please take a moment to read more about ports: [What is a
> computer port? | Ports in networking][ports].

To create a firewall rule to allow traffic
to port 8080,
go to the Google Cloud Console:

- Click on the *hamburger* ☰ icon at the top left.
- Click on **VPN Network**
- Click on **Firewall**
- At the top of the page, choose **Create a firewall rule**
  (do not choose **Create a firewall policy**)
    - Add name: **koha**
    - Add description: **open port 8080**
- Next to **Targets**, click on **All instances in the
  network**
- In the **Source IPv4 ranges**, add **0.0.0.0/0**
- Click on **Specified protocols and ports**
    - Click on TCP
    - Add **8080** in the **Ports** box
- Click on **Create**

## Install Koha Repo

### Server setup

Now let's log onto our new server and prepare
it for the Koha installation.

First we need to update our local repositories:

```
sudo apt update
```

And then upgrade our servers:

```
sudo apt upgrade
```

The next two commands help save disk space.
The `apt autoremove` command "is used
to remove packages that were automatically
installed to satisfy dependencies for other
packages and are now no longer needed
as dependencies changed or the package(s)
needing them were removed in the meantime"
(see `man apt`).
The `apt clean` command 
"clears out the local repository
of retrieved package files" (see `man apt-get`).
In the following example,
I combine both commands on one line:

```
sudo apt autoremove -y && sudo apt clean
```

Next we need to install **gnupg2**,
which is used to create digital signatures,
encrypt data, and aid in secure communication.

```
sudo apt install gnupg2
```

At the time of this demo,
the update above downloaded a new Linux kernel.
Using the new kernel requires a reboot.
The reboot command will disconnect
you from the server.
Just wait a minute or so and then re-connect.

```
sudo reboot now
```

### Add Koha Repository

When you run the `sudo apt update` command,
Ubuntu syncs the local repository database with
several remote repositories.
These remote repositories contain metadata about the
packages they contain.
The syncing process identifies if any new software
updates are available.
The remote repositories are also used to retrieve software.

We can add repositories to sync with and
to use to download software, and
this includes the Koha ILS.
To add the special Koha repository to
our system,
we use the following command:

> Most of the following commands require administrator
> access. Therefore, I will login as the **root** user to
> make it a bit easier. If you do not log in as the root
> user, be sure to use the `sudo` command.

```
sudo su
```

Add the Koha repository to our server:

```
echo 'deb http://debian.koha-community.org/koha stable main' | sudo tee /etc/apt/sources.list.d/koha.list
```

We then add the digital signature that verifies the above repo:

<!-- use for Ubuntu 22.04 or later 
```
wget -qO - https://debian.koha-community.org/koha/gpg.asc | gpg --dearmor -o /usr/share/keyrings/koha-keyring.gpg
```
-->

```
wget -q -O- https://debian.koha-community.org/koha/gpg.asc | sudo apt-key add -
```

## Install Koha

Next we need to update/sync the new repository
with the Koha remote repository.
This just means that we use `apt update` again.

```
apt update
```

Now we view the package information for Koha:

```
apt show koha-common
```

And install it:

```
apt install koha-common
```

The above command will download and install
a lot of additional software, and
therefore the process will take several minutes.

### Configure Koha

Next we need to edit some configuration
files for Koha:

```
nano /etc/koha/koha-sites.conf
```

In the above **koha-sites.conf** file,
change the line that contains 
the following information:

```
INTRAPORT="80"
```

To:

```
INTRAPORT="8080"
```

Next install and setup **mysql-server**:

```
apt install mysql-server
```

Next we set the root MySQL password
(the password below is not an actual
password that I use anywhere):

```
mysqladmin -u root password bibliolib1
```

When we installed Koha,
the Apache2 web server was installed 
with it as a prerequisite.
We need to enable URL rewriting and
[CGI][cgi] functionality.

```
a2enmod rewrite
a2enmod cgi 
```

Now we need to restart Apache2 in the normal way:

```
systemctl restart apache2
```

Next we create a database for Koha:

```
koha-create --create-db bibliolib
```

We need to tell Apache2 to listen on port 8080:

```
nano /etc/apache2/ports.conf 
```

And add:

```
Listen 8080
```

Make sure Apache configuration changes are valid:

```
apachectl configtest
```

If you get an error message,
trace the error in the file and line listed.

Let's restart Apache2.

```
systemctl restart apache2
```

We'll disable the default Apache2 setup,
enable traffic compression using **deflate**,
enable the **bibliolib** site,
and then reload Apache2's configurations and
restart again:

```
a2dissite 000-default
a2enmod deflate
a2ensite bibliolib
systemctl reload apache2
systemctl restart apache2
```

### Koha Web Installer

All the back end work is complete, and
like we did with WordPress and Omeka,
we can complete the installation through
a web installer.

First, get Koha username and password in the following file:

```
nano /etc/koha/sites/bibliolib/koha-conf.xml
```

Look for the ``<config>`` stanza (line number 252) and the
line beginning with ``<user>`` (line number 257).
The password is on the line after (line number 258).

Make sure your URL begins with **http** and not **https**,
and visit the web installer at:

```
http://IP-ADDRESS:8080
```

The documentation for the web installer is helpful.
One thing to do is to add sample libraries and sample patrons.
More generally, be sure to follow instructions as you
click through each step.

[Introduction to the Koha installation process][koha_web_installer]

## Public OPAC

When the install and setup are complete,
you will have access to the staff interface.
To view the public facing OPAC,
you need to make a setting change.

- Click on **More** in the top drop down box
- Click on **Administration**
- Click on **Global System Preferences**
- Click on **OPAC** in the left hand side bar
- Scroll down to the **OPACBaseURL** line.
- Enter the IP address of your server: **http://IP-ADDRESS**
- Click on **Save all OPAC Preferences**

Once you save these preferences,
you should be able to visit your public facing
OPAC at the server IP address.

## Additional Tasks

Once you've installed and setup Koha,
begin to learn the system.
Some example tasks:

- Create patron accounts
- Create bibliographic records
- Check out books to patrons
- Delete patron circulation history

## Conclusion

In this final section,
you learned how to install
and setup a Koha ILS installation
on a Linux server.

## References

Helpful documentation and demos:

- [Koha ILS][koha_ils] documentation.
- [Koha on Debian][kohaDebian]
- [Install Koha on Google Cloud Platform][youtubeKoha]

[aspen]:https://bywatersolutions.com/products/aspen-discovery
[bywater]:https://bywatersolutions.com/
[cgi]:https://en.wikipedia.org/wiki/Common_Gateway_Interface
[drupal]:https://www.drupal.org/
[equinox]:https://www.equinoxoli.org/
[evergreen]:https://evergreen-ils.org/
[kohaDebian]:https://wiki.koha-community.org/wiki/Koha_on_Debian
[koha]:https://koha-community.org/
[koha_ils]:https://koha-community.org/
[koha_web_installer]:https://koha-community.org/manual//22.11/en/html/installation.html
[ltg_evergreen]:https://librarytechnology.org/product/evergreen-equinox
[ltg_koha]:https://librarytechnology.org/product/koha
[ports]:https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/
[using_gcloud]:05-using-gcloud-virtual-machines.html
[vufind]:https://vufind.org/vufind/
[youtubeKoha]:https://www.youtube.com/watch?v=mzUop9R4sKc
