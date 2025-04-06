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
Fortunately, the documentation makes the process pretty straightforward.
We will rely on that documentation and other resources to install Koha and complete our library's interconnected web presence.

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

According to [Library Technology Guides][koha_ltg] (April 2025),
<q>Koha has been installed in 4,484 libraries [around the world], spanning 6,273 facilities or branches.</q>
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
The LSP is a next generation ILS designed from the start to integrate electronic resources.
For example, the ILS has an OPAC that was designed to search a library's print collections.
Modern OPACs have been adapted for electronic resources,
but they are still limited because of the older design model.
LSPs use a *discovery service* instead of an OPAC.
Discovery services are designed to search a library's entire collection, including the content in third party databases and journals.
Example LSPs include Ex Libris Primo (used by UK Libraries),
OCLC's WorldCat Discovery Service, and open source solutions
like [Aspen Discovery][aspen] and [VuFind][vufind].

The integration of library systems like the ILS and the LSP is a major aspect of library services.
When we visit a library's website,
we first interact with a normal website that might be built on
WordPress, [Drupal][drupal], or some other content management system.
These websites will link to the public facing components of an ILS or LSP, as well as other services,
such as bibliographic databases, journal publishers, ebook services, and more.
It may therefore be the systems librarians job to help build and connect these services.
In this demo, we will continue that work by installing, configuring, and setting up the Koha ILS.

## Google Cloud Setup

Before we begin to install Koha, we need to create a new virtual machine instance
and configure the Google firewall to allow HTTP traffic to our Koha install.

### New Virtual Instance

The virtual instances we have been using do not meet the memory (RAM) needs
required by the Koha integrated library system.
We therefore need to create a new virtual instance that has more RAM.
I will also use a bigger disk, to be sure, since Koha takes up more disk space.
Check [Koha System Requirements][sys_req_koha] for details.

As a refresher for creating a VM,
see the section titled **gcloud VM Instance** at [Using gcloud Virtual Machines][using_gcloud].
In this lesson,
we will use for the **Series** an **E2** and set
the **Machine Type** to **2 vCPU, 4 GB memory**, and up the disk size to 20GB.
Under **Networking**, click on **Allow HTTP traffic**.
In the **Network tags** box, add the following tag name: `koha-8080`.

All else, including the operating system (Ubuntu 22.04), should remain the same.
Note that this is a more expensive setup.
Therefore, feel free to delete this instance at the end of the semester to avoid incurring extra costs.

### Google Cloud firewall

Later, after we install Koha, we will need to access the staff interface on a special port for HTTP data.
All internet traffic to a server contains metadata that identifies itself by port numbers.
The default port for HTTP is 80, and the default port for HTTPS (encrypted) is 443.
Since we do not have encryption enabled, this means we will only use port 80, but 
the staff interface will be identified by port 8080.

> How does a server know where to send internet traffic?
> Internet data is *packaged* in many forms.
> One of the most common forms are TCP packets.
> These packets contain *header* information that names the source IP, destination IP, source port, and destination port.
> When TCP packets arrive at a destination server,the operating system inspects the packet header for the port number.
> The OS looks up the port number in a table that contains a mapping of ports to applications.
> When the OS makes the match, it sends the TCP packets to the application.
> In its default setup, the Apache2 web server handles traffic on port 80.

Firewalls are used to control incoming and outgoing traffic via ports.
We selected **Allow HTTP traffic** when we created our virtual instance on Google Cloud,
and we instructed the Google Console firewall to allow traffic through port 80.
We need to add a firewall rule to allow web traffic through port 8080.
We will use port 8080 to access the Koha staff interface.

> Please take a moment to read more about ports: [What is a computer port? | Ports in networking][ports].

To create a firewall rule to allow traffic to port 8080, go to the Google Cloud Console:

- Click on the *hamburger* icon.
- Click on **VPN Network**.
- Click on **Firewall**.
- At the top of the page, choose **Create a firewall rule** (Do not choose **Create a firewall policy**):
    - Add name: `koha-opac`
    - Add description: **Open port 8080 for the OPAC**
- Next to **Targets**, click on **Specified target tags**.
- In **Target tags**, add our tag name: `koha-8080`.
- In the **Source IPv4 ranges**, add **0.0.0.0/0**
- Click on **Specified protocols and ports**
    - Click on TCP
    - Add **8080** in the **Ports** box
- Click on **Create**

## Install Koha Repo

### Server setup

Now let's log onto our new server and prepare it for the Koha installation.

First we need to update our local repositories:

```
sudo apt update
```

And then upgrade our servers:

```
sudo apt upgrade
```

The next two commands help save disk space.
As a reminder, the `apt autoremove` command
<q>is used to remove packages that were automatically installed to satisfy dependencies for other packages and
are now no longer needed as dependencies changed or the package(s) needing them were removed in the meantime</q> (see `man apt`).
The `apt clean` command <q>clears out the local repository of retrieved package files</q> (see `man apt-get`).
In the following example, I combine both commands on one line:

```
sudo apt autoremove -y && sudo apt clean
```

Next we need to install `gnupg2` and `apt-transport-https`.
`gnupg2` is used to create digital signatures, encrypt data, and aid in secure communication.

```
sudo apt install gnupg2 apt-transport-https
```

At the time of this demo, the update above downloaded a new Linux kernel.
Using the new kernel requires a reboot.
The reboot command will disconnect you from the server.
If you need to reboot your server, use the command below, then wait a minute or so and re-connect.

```
sudo reboot now
```

### Add Koha Repository

When you run the `sudo apt update` command,
Ubuntu syncs the local repository database with several remote repositories.
These remote repositories contain metadata about the packages they contain.
The syncing process identifies if any new software updates are available.
The remote repositories are also used to retrieve software.

We can add repositories to sync with and to use to download software, and this includes the Koha ILS.
To add the special Koha repository to our system, we use the following command:

> Most of the following commands require administrator access.
> Therefore, I will login as the `root` user to make it a bit easier.
> If you do not want to log in as the root user, be sure to use the `sudo` command.

```
sudo su
```

Add the Koha repository to our server:

```
echo 'deb http://debian.koha-community.org/koha stable main' | sudo tee /etc/apt/sources.list.d/koha.list
```

Now, download and install the GPG key in the `trusted.gpg.d` directory:

```
wget -qO- https://debian.koha-community.org/koha/gpg.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/koha.gpg > /dev/null
```

You can inspect the key and make sure it was signed by the relevant people:

```
gpg --show-keys /etc/apt/trusted.gpg.d/koha.gpg
```

The output should include an email from the `koha-community.org`.

## Install Koha

Next we need to update/sync the new repository with the Koha remote repository.
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

The above command will download and install a lot of additional software, and therefore the process will take several minutes.

### Configure Koha

Next we need to edit some configuration files for Koha.
First, create a backup of the default configuration file:

```
cd /etc/koha/
cp koha-sites.conf koha-sites.conf.backup
```

Now open the configuration file in `nano` or your preferred text editor:

```
nano /etc/koha/koha-sites.conf
```

In the `koha-sites.conf` file, change the line that contains the following information:

```
INTRAPORT="80"
```

To:

```
INTRAPORT="8080"
```

Next install and setup `mysql-server`:

```
apt install mysql-server
```

Next we set the root MySQL password.
Replace `X`s with your password:

```
mysqladmin -u root password XXXXXXXX
```

When we installed Koha, the Apache2 web server was installed with it as a prerequisite.
We need to enable URL rewriting and [CGI][cgi] functionality.

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

And under the `Listen 80` line, add:

```
Listen 8080
```

Make sure Apache configuration changes are valid:

```
apachectl configtest
```

If you get an error message, trace the error in the file and line listed.

Let's restart Apache2.

```
systemctl restart apache2
```

We'll disable the default Apache2 setup, enable traffic compression using `deflate`,
enable the **bibliolib** site, and then reload Apache2's configurations and restart again:

```
a2dissite 000-default
a2enmod deflate
a2ensite bibliolib
systemctl reload apache2
systemctl restart apache2
```

### Koha Web Installer

All the back end work is complete, and like we did with WordPress and Omeka,
we can complete the installation through a web installer.

First, get Koha username and password in the following file:

```
nano /etc/koha/sites/bibliolib/koha-conf.xml
```

Look for the `<config>` stanza (line number 252) and
the line beginning with `<user>` (line number 257).
The password is on the line after (line number 258).
You will need this info to login to the Koha web interface.

Make sure your URL begins with `http` and not `https`, and visit the web installer at:

```
http://IP-ADDRESS:8080
```

The documentation for the web installer is helpful.
Enter the username and password from the `koha-conf.xml` file.
Note that it might take a while to step through the installer.

One thing to do is to add sample libraries and sample patrons during the install.
More generally, be sure to follow instructions as you click through each step.
Add lots of samples to play around with after the install completes.

When you are on the last page of the install, create an **Administrator identity**, and
be sure to save this information.

[Introduction to the Koha installation process][koha_web_installer]

## Public OPAC

When the install and setup are complete, you can login with your admin credentials, and
you will have access to the staff interface.
To view the public facing OPAC, you need to make a setting change.
In Koha:

- Click on **More** in the top drop down box
- Click on **Administration**
- Click on **System Preferences**
- Click on **OPAC** in the left hand side bar
- Scroll down to the `OPACBaseURL` line.
- Enter the IP address of your server: `http://IP-ADDRESS`
- Click on **Save all OPAC Preferences**

Once you save these preferences, you should be able to visit your public facing OPAC at the server IP address.

## Additional Tasks

Once you've installed and setup Koha, begin to learn the system.
Try the following:

- Create patron accounts
- Create bibliographic records
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
- [Install Koha on Google Cloud Platform][youtube_koha]

[aspen]:https://bywatersolutions.com/products/aspen-discovery
[bywater]:https://bywatersolutions.com/
[cgi]:https://en.wikipedia.org/wiki/Common_Gateway_Interface
[drupal]:https://www.drupal.org/
[equinox]:https://www.equinoxoli.org/
[evergreen]:https://evergreen-ils.org/
[koha_debian]:https://wiki.koha-community.org/wiki/Koha_on_Debian
[koha_web_installer]:https://koha-community.org/manual//22.11/en/html/installation.html
[evergreen_ltg]:https://librarytechnology.org/product/evergreen-equinox
[koha_ltg]:https://librarytechnology.org/product/koha
[ports]:https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/
[using_gcloud]:2a-using-gcloud-virtual-machines.html
[vufind]:https://vufind.org/vufind/
[youtube_koha]:https://www.youtube.com/watch?v=mzUop9R4sKc
[ils_wiki]:https://en.wikipedia.org/wiki/Integrated_library_system
[sys_req_koha]:https://koha-community.org/download-koha/
[koha_ils]:https://koha-community.org/
