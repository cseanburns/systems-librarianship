# Managing Software

## Introduction

ManyLinux distributions use a **package manager** to handle the installation, upgrades, and uninstalls of the software on a system.
The Ubuntu distribution uses a package manager called `dpkg` and a front-end called `apt` (advanced package tool).
We will use `apt` to install, update, and remove software from our servers.

## ``sudo``

To use the package manager, we will need the `sudo` command.
The `sudo` command allows us to <q>execute a command as another user</q> (see ``man sudo``).
By default, the `sudo` command <q>executes a command as the superuser</q> (see `man 8 sudo`).

The name of the **superuser** account is **root**.
Th root user can perform administrative tasks that regular users cannot.
For security purposes, regular accounts may not add, remove, or update software on a system,
nor may they modify most files or directories outside their home directories.
Using `sudo` allows regular users who have administrative privileges to perform maintenance tasks on our systems
by using executing commands as the root user.
Some consider this safer than logging in as the root user.

Not all regular users can use the `sudo` command.
On regular Ubuntu distributions, users must belong to the **sudo** group in order to run the `sudo` command.
The `groups` command will return a list of groups that your account belongs to.
On the Ubuntu version used by the Google Cloud Platform (GCP), your user should belong in the **google-sudoers** group.
The difference between the **sudo** group on regular Ubuntu distributions and
the **google-sudoers** GCP version is that regular users in the **google-sudoers** group are not prompted for their password.

Down the line, we will use the `sudo` command to modify files, create directories, and perform other maintenance tasks needed to
install and manage software.
In this lesson, we will use `sudo` along with the `apt` commands to update our systems and install software.

### ``sudo`` syntax

The `sudo` command is simple to use.
When necessary, we use `sudo` by pre-pending it to the regular commands that we have already learned.
In our home directories, for example, we don't need to use `sudo` to create a new directory with the `mkdir` command.
Instead we type something like `mkdir data` to create a new directory/folder called **data**.
But our regular user doesn't own the files or directories outside our home directory.
For example, when we downloaded my `bash` scripts to the `/usr/local/bin` directory,
we used `sudo` since don't own that directory.
If I want to create a **data** directory in **/usr/local/bin**, then I have to use sudo at the beginning of my command:

```
cd /usr/local/bin
sudo mkdir data
```

Or, without changing to that directory, I can just specify the full path:

```
sudo mkdir /usr/local/bin/data
```

Or if I want to create a file in some other directory outside my home directory, then I have to use sudo there, too:

```
cd /srv
sudo touch data.csv
```

Or, without changing to that directory, I can specify the full path:

```
sudo touch /srv/data.csv
```

## apt

We will use `sudo` in the above ways soon enough, but for now, we will use `sudo` to install, update,
and uninstall software on our systems.

Next I'll demonstrate the `apt` commands that we'll need.

### `sudo apt update`

Your system keeps a record of what software is installed on your system and their version numbers.
The `sudo apt update` command updates that list and compares the update to what's installed.
That is, if you have a piece of software called **acme1.1** on your system, and **acme1.2** is available, then
running `sudo apt update` will let you know that you can upgrade to **acme1.2**.
It's good practice to run `sudo apt update` before installing or upgrading your system.
This lets your system upgrade to the most recent version of what you want to install.

In short, the command to download new package information is:

```
sudo apt update
```

### ``sudo apt upgrade``

Once the list of packages have been updated, you can **upgrade** with the `sudo apt upgrade` command if there are any upgrades.
When you run this command, and if there are any upgrades, you will be prompted to proceed.
You can press **Y** to proceed, or **N** to cancel.

This command is simply:

```
sudo apt upgrade
```

### ``apt search``

If you want to install a piece of software, then you have to install it using its package name.
Sometimes that means we have to search for the name of the package.
This `apt` command does not require the use of `sudo`.
`sudo` is not required because `apt search` does not modify the system.
It simply helps you search for a package name.

For example, the `man` pages provide helpful documentation about how to use the commands on our systems, but
the `man` pages can also be dense and not straightforward.

Fortunately, there's an application called `tldr`.
This is a community-driven application that provides simple help pages and examples of how to use some of the most commonly used commands.

To search for the `tldr` package, we execute the following command:

```
apt search tldr
```

This returns a list of results that match the search query.
One of those results is the `tldr` package, which is simply named **tldr**.
Not all packages are simply named, which is why we need to search for the specific name.

> Note that sometimes when we search for a package, the list of results is quite long.
> In those cases, pipe the above command through the `less` pager to page through the results:
> `apt search <packagename> | less`

## `apt show`

If we want more specific information about a package, we can use the `apt show` command along with the package name.
Therefore, to get more information about the `tldr` application, we execute the following command:

```
apt show tldr
```

This will return a fuller description of the package (usually), as well as the URL to the application's website, plus other details.
We do not need to use `sudo` because we are not modifying the system.
We are only retrieving information.

## `sudo apt install`

To install the `tldr` application, we use the `sudo apt install` command along with the package name.
We want to make sure that the name of the package is exactly what was returned from the `apt search` command.
In the `tldr` case, it's pretty straightforward.
To install:

```
sudo apt install tldr
```

## `sudo apt remove`

In order to remove a package, we use the `sudo apt remove` command.
I like to add the `--purge` option because this also removes system configuration files that I probably do not need.
That is, some applications install configuration files (configs) in the `/etc` directory.
Adding `--purge` will remove those configs.

To remove a package and its system configuration files (if any), we run the command with the package name:

```
sudo apt --purge remove tldr
```

Some configs are stored in your home directory.
Generally only end user applications install configs in our home directories.
The `--purge` option will not remove those configs; instead, we have to remove them manually if we want.

### `sudo apt autoremove`

One of the great things about `dpkg` and `apt` is that it installs and handles software **dependencies** really well.
Few computer applications are self-contained, and they often require other software to operate.
These other software are called **dependencies**.
When we uninstall (or remove) applications, the package manager does not auto uninstall those dependencies that were installed with it.
We use the `autoremove` command to uninstall those, which helps keep our systems clean:

```
sudo apt autoremove
```

### ``sudo apt clean``

When we install packages, some files are installed with them.
The `sudo apt clean` removes those extra files and frees up disk space.
It's a simple command:

```
sudo apt clean
```

## The `dpkg` Command

If you use Windows, then you are likely familiar with downloading and installing `.exe` files.
On macOS, the equivalent are `.dmg` files.
The Ubuntu distribution has an equivalent file.
These are `.deb` files.
These files can be installed using the `dpkg` command:

```
sudo dpkg -i <file_name.deb>`
```

Like with `exe` or `dmg` files, you want to be careful installing `deb` files you find on the web.
Unlike software managed by the `apt` system, these files are not monitored and can contain malicious code.

You can generally use `apt` to remove applications installed with `dpkg`.
Or, you can uninstall an application installed with `dpkg` with `dpkg`:

```
sudo dpkg --purge <application_name>
```

In most cases, stick with `apt`.

## Conclusion

The `apt` command makes it quite easy to manage software on our systems.
We will use this command to install more complicated software later.
Here's a list of commands we covered:

- `sudo apt update`
- `sudo apt upgrade`
- `apt search`
- `apt show`
- `sudo apt install`
- `sudo apt --purge remove`
- `sudo apt autoremove`
- `sudo apt clean`

### To locate and install software

```
sudo apt update
apt search <package_name>
apt show <package_name>
sudo apt install <package_name>
```

### To remove software and purge related files

```
sudo apt --purge remove <package_name>
sudo apt autoremove
sudo apt clean
```

### To keep system up to date

```
sudo apt update
sudo apt upgrade
sudo apt autoremove
sudo apt clean
```
