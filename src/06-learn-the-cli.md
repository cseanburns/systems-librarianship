# Learn the Command Line Interface (CLI)

## Introduction

There are two major interfaces
that we use to interact with our computers.
The most common interface is the 
graphical user interface, or GUI.
This interface largely emphasizes
non-textual interaction,
such as the mouse, fingers (touch screens),
remote controls (e.g., smart TVs),
and most recently,
wearable tech such as
VR headsets and like.
All of the above mechanisms for interacting
with our computer systems are worthwhile, but
more importantly, they are all suited to
specific ranges of engagement with our computers.
That is,
[they *afford* certain kinds of actions][dourish2001]
(Dourish, 2001).

The other major way of interfacing with
our computers is via the
command line interface, or CLI.
The CLI is also suited to
specific ranges of engagement, and
its the kind of engagement that often
allows us greater control over our systems.

One reason the CLI provides greater
control over our systems is because
the interaction is all text-based.
Text-based interaction requires more
specificity than graphical-based interaction.
By that I mean, it requires us to provide
written instructions to a computer and
to know what instructions to give it
when we want the computer to perform
some specific action.
This means that we have to memorize
some common instructions in order to
use our systems.
This is not necessarily difficult because
many of the most common instructions,
or *commands*,
are mnemonic, but
it does take some getting used to.

A second reason the CLI provides greater
control over the system is that because
it's text-based,
it can be automated.
We will not cover programming
in this work or course,
but know that all the commands
that we will learn can be put
in a text file,
made into an executable file,
and run like a program.
This makes text-based interaction
rather powerful.

## Basic Commands

In light of that,
I have developed two programs that
will help you remember these basic
commands.
The commands that I'll ask you to
learn encompass less than 0.3%
of the commands that are available
on a Linux system, but
they are the most commonly used commands.
Many of the other commands that are
available are for very specific purposes.
I'd estimate
that despite having used the Linux
command line for over 20 years,
that I've barely used 20% of them, and
I might be stretching my estimate.

The commands that I'll ask you to learn
and practice include the following:

```
list files and directories.................. ls
print name of current/working directory..... pwd
create a new directory...................... mkdir
remove or delete an empty directory......... rmdir
change directory............................ cd
create an empty file........................ touch
print characters to output.................. echo
display contents of a text file............. cat
copy a file or directory.................... cp
move or rename a file or directory.......... mv
remove or delete a file or directory........ rm
```

You will practice these commands using
the following program that I wrote
called [learn-the-cli][learnthecli].

I also developed a [flashcards][flashcards]
program that will help you learn an
additional fifteen commands.
This program is based on one created
by someone else for a different purpose
(see source code link above for credit).
I'll explain these additional commands
as we proceed through the semester.
In the meantime,
I'll ask that you periodically run
the ``flashcards`` program to
familiarize yourself with these commands.

## The Filesystem

In addition to the various commands
that I'll ask you to learn,
you will also have to learn the
structure of the Linux filesystem.
A filesystem has several meanings, but
in this context,
I refer to where the directories
on the Linux system are placed.
I find this to be the most difficult
thing that new Linux users have to learn
for a couple of reasons.
First, modern operating systems tend
to hide the filesystem from their users.
So even though, for example,
macOS is Unix,
many macOS users that I have taught
are completely unfamiliar with the
layout of directories on their system.
This is because,
per my observations,
macOS Finder does not show
the filesytem by default these days.
Instead it shows its users some common
locations for **folders**.
This might make macOS more usable to
most users, but
it makes learning the system more difficult.

What's common for both macOS and Linux
operating systems is a filesytem based on a
tree-like structure.
These filesystems begin at what's called a
**root** location.
The **root** location is referenced by
a forward slash: ``/``.
All directories **branch** off from root.
The location to any directory is called
a **PATH**.
For example, our home directories on
Linux will be located at the following PATH:

```
/home
```

That PATH begins at root ``/`` and ends at ``home``.

It is a little different for Windows users.
Since Windows is not Unix-like,
it uses a different filesystem hierarchy.
Many Windows users might be familiar with
the basics, such as the **C:** drive for the
main storage device or the **D:** drive for
an added USB stick.
As such, the Windows operating system
uses multiple root directories (C:, D:, E:, etc.)
I encourage you to read the following article on
[A quick introduction to the Linux filesystem for Windows users][quickWindows].
The article is published by *Red Hat*,
which makes its own distribution of Linux.

In short, learning the Linux filesystem
requires adopting a new mental model
about how the operating system organizes
its directories and files.
Like learning the basic commands,
it's not too hard,
but it may take time and practice
before it sticks.
To help learn it,
I wrote an additional program that
will let you practice navigating around
the Linux filesystem and making some
changes to it.
The program is called
[learn-the-filesystem][learnthefilesystem].
Before you use this program,
I would like to encourage you to read
another *Red Hat* article on
[Navigating your filesystem in the Linux terminal][navLinux].
It includes sections that my program will cover
that include:

- viewing file lists
- opening a folder (aka, a directory)
- closing a folder
- navigating directories
- absolute paths

## Bash: The Bourne Again Shell

I should point out that the
command line interface that we
are using on our Linux servers
is provided by a [shell][unixshell].
A shell is "both an interactive
command language and a scripting
language" (see link above).
We will use the shell strictly
as a [command language][comlanguage],
but if you're interested someday,
I'd encourage you to explore Bash
as a [scripting language][scripting]
(I personally script in Bash quite a lot).
There are a variety of shells
available for Linux and other Unix-like
operating systems, but
the most popular one and
the one we will be using is called
[Bash][bashshell].

Bash is an acronym for the
*Bourne Again Shell* because it's
based on the original Unix shell
called the Bourne shell,
written by
[Stephen Bourne][stephenbourne].
Bash itself was written by
[Brian Fox][bfox].

I think it's important to know
the history of the technologies
that we use, and
Bash has a super interesting
history that pre-exists Linux.
Therefore, I highly encourage you
listen to the
[Command Line Heroes][clh] episode titled
[Heroes in a Bash Shell][bashheroes],
narrated by
[Saron Yitbarek][syitbarek].
The episode recounts Brian Fox's
history with the Bash shell
while he worked for the
[Free Software Foundation][fsf]
in the 1980s.

## Conclusion

We will spend the next few weeks
practicing these commands and
learning the filesystem.
We'll do this because knowing
these things is integral to
accomplishing everything else in this work,
including installing and setting up
our content management systems and
the integrated library system.

In the video for this week,
I'll show you how to install the three
programs that I wrote or modified.
We will use ``git`` to download them.
The we will move the programs to a
specific directory in our
executable PATH.
This will allow us to run them
simply by typing their names.

## References

Dourish, P. (2001). *Where the Action Is: The Foundations of
Embodied Interaction*. MIT Press.
[https://doi.org/10.7551/mitpress/7221.001.0001][dourish2001]

[bashheroes]:https://www.redhat.com/en/command-line-heroes/season-3/heroes-in-a-bash-shell
[bashshell]:https://en.wikipedia.org/wiki/Bash_(Unix_shell)
[bfox]:https://en.wikipedia.org/wiki/Brian_Fox_(computer_programmer)
[clh]:https://www.redhat.com/en/command-line-heroes
[comlanguage]:https://en.wikipedia.org/wiki/Command_language
[dourish2001]:https://doi.org/10.7551/mitpress/7221.001.0001
[flashcards]:https://github.com/cseanburns/learn-the-commandline/blob/main/flashcards
[fsf]:https://en.wikipedia.org/wiki/Free_Software_Foundation
[learnthecli]:https://github.com/cseanburns/learn-the-commandline/blob/main/learn-the-cli
[learnthefilesystem]:https://github.com/cseanburns/learn-the-commandline/blob/main/learn-the-filesystem
[navLinux]:https://www.redhat.com/sysadmin/navigating-filesystem-linux-terminal
[quickWindows]:https://www.redhat.com/sysadmin/linux-filesystem-windows
[scripting]:https://en.wikipedia.org/wiki/Scripting_language
[stephenbourne]:https://en.wikipedia.org/wiki/Stephen_R._Bourne
[syitbarek]:https://saron.io/
[unixshell]:https://en.wikipedia.org/wiki/Unix_shell
