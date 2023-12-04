# Managing Software

## Introduction

Most Linux distributions use
what's called a **package manager** to
handle the installation, upgrades, and
uninstalls of the software on a system.
The Ubuntu distribution uses a
package manager called ``dpkg`` and
a front-end called ``apt``
(advanced package tool).
We will use ``apt`` to install,
update, and remove software
from our servers.

## ``sudo``

In order to do the above tasks,
we will need to use
the ``sudo`` command.
The ``sudo`` command allows us to
"execute a command as another user"
(see ``man sudo``).
If we have multiple users on a system,
and if we have their passwords,
then we could use ``sudo`` to run
commands as if we were logged into
their accounts.

However, the main use of ``sudo``
is to execute a command as the **root** user.
The root user is the **superuser** account
and as such,
this user can perform administrative tasks
that regular users cannot.
For security purposes,
regular accounts may not add, remove, or
update software on a system, nor
may they modify most files or directories
outside their home directories.
Using ``sudo`` allows regular users to
perform maintenance tasks on our systems
by executing commands as the root user.
Some consider this safer than logging
in as the root user.

Not all regular users can use
the ``sudo`` command.
On regular Ubuntu distributions,
users must belong to the **sudo** group
in order to run the ``sudo`` command.
The ``groups`` command will return
a list of groups that your account belongs to.
On the Ubuntu version used by the
Google Cloud Platform (GCP),
the group of interest is called **google-sudoers**.
The difference between the **sudo** group
on regular Ubuntu distributions and
the GCP version is that regular users in the
**google-sudoers** group are not prompted for
their password.

Down the line,
we will need to use the ``sudo`` command
to modify files, create directories, and
perform other maintenance tasks needed to
install and manage software.
In this lesson, we will use ``sudo`` along
with the ``apt`` commands to update our
systems and install software.

### ``sudo`` syntax

The ``sudo`` command is simple to use.
When necessary,
we use ``sudo`` by pre-pending it to
the regular commands that we have already
learned.
In our home directories, for example,
we don't need to use ``sudo`` to
create a new directory with the ``mkdir``
command.
Instead we just type
``mkdir data`` to create a new
directory/folder called **data**.
But outside our home directory,
for example, in the directory
**/usr/local/bin**.
We need to use ``sudo`` to do such things.
(This is why I used the ``sudo`` command
when I showed you how to copy the
**Learn the Commandline** programs to
**/usr/local/bin**.)
If I want to create a **data** directory
in **/usr/local/bin**, then
I have to use sudo at the beginning of
my command:

```
cd /usr/local/bin
sudo mkdir data
```

Or, without changing to that directory,
I can just specify the full path:

```
sudo mkdir /usr/local/bin/data
```

Or if I want to create a file in
some other directory outside my
home directory, then
I have to use sudo there, too:

```
cd /etc
sudo touch data.csv
```

Or, without changing to that directory,
I can specify the full path:

```
sudo touch /etc/data.csv
```

## apt

We will use ``sudo`` in the above
ways soon enough, but for now,
we will use ``sudo`` to install,
update, and uninstall software on
our systems.

Next I'll demonstrate the ``apt``
commands that we'll need.

### ``sudo apt update``

Your system keeps a record of
what software is installed on your
system and their version numbers.
The ``sudo apt update`` command
updates that list and compares
the update to what's installed.
That is, if you have a piece of
software called **acme1.1** on your system,
and **acme1.2** is available, then
running ``sudo apt update`` will
let you know that you can upgrade to
**acme1.2**.
It's good practice to run ``sudo apt update``
before installing or upgrading your system
because this lets your system upgrade to
the most recent version of what you want
to install.

In short, this command is simply:

```
sudo apt update
```

### ``sudo apt upgrade``

Once your list of software has been updated,
you can **upgrade** with the ``sudo apt upgrade``
command if there are any upgrades.
When you run this command, and if
there are any upgrades,
you will be prompted to proceed.
You can press **Y** to proceed, or
**N** to cancel.

This command is simply:

```
sudo apt upgrade
```

### ``apt search``

If you want to install a piece
of software, then
you have to install it using its
package name.
Sometimes that means we have to
search for the name of the package.
This is one of the ``apt`` commands
that does not require the use of ``sudo``.
``sudo`` is not required because
``apt search`` does not modify the system.
It simply helps you search for a package name.

For example, the ``man`` pages provide
helpful documentation about how to use
the commands on our systems, but
the ``man`` pages can also be dense and
not straightforward.

Fortunately, there's an application called
``tldr`` that is a community-driven application
that provides simple help pages and examples
of how to use some of the most commonly used
commands.

To search for the ``tldr`` package,
we execute the following command:

```
apt search tldr
```

This returns a list of results that
match the search query.
One of those results is the ``tldr`` package,
which is simply named **tldr**.
Not all packages are simply named,
which is why we need to search for the
specific name.

> Note that sometimes when we search for a package, the list
> of results is quite long. In those cases, pipe the above
> command through the ``less`` pager to page through the
> results: ``apt search <packagename> | less``

## ``apt show``

If we want more specific information
about the package,
we can use the ``apt show`` command
along with the package name.
Therefore, to get more information
about the ``tldr`` application,
we execute the following command:

```
apt show tldr
```

This will return a fuller description
of the package (usually), as well
as the URL to the application's website,
plus other details.
We do not need to use ``sudo`` here
because we are not modifying the system.
We are only retrieving information.

## ``sudo apt install``

To install the ``tldr`` application,
we use the ``sudo apt install`` command
along with the package name.
We want to make sure that the name of the
package is exactly what was returned from
the ``apt search`` command.
In the ``tldr`` case,
it's pretty straightforward, and to install:

```
sudo apt install tldr
```

## ``sudo apt remove``

In order to remove a package,
we use the ``sudo apt remove``
command.
I like to add the ``--purge`` option
because this also removes system configuration
files that I probably do not need.
That is, some applications
install configuration files (configs).
Configs are files that set application preferences
in the **/etc** directory.
Adding ``--purge`` will remove those configs.

To remove a package and
its system configuration files (if any),
we run the above command with the package name.

```
sudo apt --purge remove tldr
```

Some configs are stored in your home directory.
Generally only end user applications install
configs in our home directories.
The ``--purge`` option will not remove those configs;
instead, we have to remove them manually if we want.

### ``sudo apt autoremove``

One of the great things about ``dpkg`` and ``apt``
is that it installs and handles software
**dependencies** really well.
Dependencies are other software that software
depends upon to run.
That is, few computer applications are self-contained, and
they often require other technology.
When we uninstall (or remove) applications,
the package manager does not auto uninstall those
dependencies that were installed with it.
We use the autoremove command to uninstall those:

```
sudo apt autoremove
```

### ``sudo apt clean``

When we install packages,
some files are installed with them.
The ``sudo apt clean`` removes those
extra files and frees up disk space.
It's a simple command:

```
sudo apt clean
```

## Conclusion

The ``apt`` command makes it quite easy
to manage software on our systems.
We will use this command to install more
complicated software later.
Here's a list of commands we covered:

- ``sudo apt update``
- ``sudo apt upgrade``
- ``apt search``
- ``apt show``
- ``sudo apt install``
- ``sudo apt --purge remove``
- ``sudo apt autoremove``
- ``sudo apt clean``
