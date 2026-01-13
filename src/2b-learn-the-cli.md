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
and more recently,
wearable tech such as
VR headsets and the like.
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
it's the kind of engagement that
allows greater control over
the fundamental uses of our systems.

One reason the CLI provides greater
control over our systems is because
the interaction is text-based.
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

The big gotcha with a text-based
interface with the computer
is that it requires specificity.
We have to be fairly exact
in our commands.
This exactitude requires
an **attention to detail**.
Little things like misplaced punctuation,
missing punctuation,
incorrect capitalization or indentation,
and misspelled words
can cause errors or
prevent the execution of our programs.
It's important to proceed slowly
on the command line and
to **pay attention to the messages**
the screen displays
when we run commands.

## Basic Commands

In light of that,
I have developed two programs that
will help you learn and remember
basic Linux shell commands.
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
I've barely used 20% of them, and
I might be stretching my estimate.

The first set of commands that
I'll ask you to learn and
practice include the following:

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
the program that I wrote
called [learn-the-cli][learnthecli]
(I will show you how to install
this and the other programs shortly).

I also developed a [flashcards][flashcards]
program that will help you learn,
or at least become familiar,
with an additional 45 commands.
(This program is based on one created
by someone else for a different purpose;
see source code link above for credit).
I'll explain these additional commands
as we proceed through the semester.
In the meantime,
I'll ask that you periodically run
the ``flashcards`` program to
familiarize yourself with these commands,
which includes the ones in the list above
but also a few additional ones.

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
to hide (abstract away)
the filesystem from their users.
So even though, for example,
macOS is Unix,
many macOS users that I have taught
are completely unfamiliar with the
layout of directories on their system.
This is because,
per my observations,
macOS Finder does not show
the filesystem by default these days.
Instead it shows its users some common
locations for **folders**.
This might make macOS more usable to
most users, but
it makes learning the system more difficult.

What's common for both macOS and Linux
operating systems is a filesystem based on a
tree-like structure.
These filesystems begin at what's called a
**root** location.
The **root** location is referenced by
a forward slash: ``/``.
All directories **branch** off from root.
The location to any directory is called
a **PATH**.
For example, our home directories on
Linux are located at the following PATH:

```
/home/USER
```

That PATH begins at the root directory ``/``,
proceeds to the directory named ``home``, and
then ends in our **USER** directory,
which will share the same name as our usernames.
As an example,
if my username on a Linux system is **sb**,
then my home directory will be located at:

```
/home/sb
```

It is a little different for Windows users.
Since Windows is not Unix-like,
it uses a different filesystem hierarchy.
Many Windows users might be familiar with
the basics, such as the **C:** drive for the
main storage device or the **D:** drive for
an added USB stick.
As such, the Windows operating system
uses multiple root directories (C:, D:, E:, etc.).
I encourage you to read the following article on
[A quick introduction to the Linux filesystem for Windows users][quickWindows].
The article is published by *Red Hat*,
which makes its own Linux distribution.

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
(I personally script in Bash quite a lot, and both
learn-the-cli and flashcards were written in `bash`).
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
to listen to the
[Command Line Heroes][clh] episode titled
[Heroes in a Bash Shell][bashheroes],
narrated by
[Saron Yitbarek][syitbarek].
The episode recounts Brian Fox's
history with the Bash shell
while he worked for the
[Free Software Foundation][fsf]
in the 1980s.

## Next Steps

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
I'll show you how to install the
programs that I wrote or modified.
We will use ``git`` to download them.
Then we will move the programs to a
specific directory in our
executable PATH.
This will allow us to run them
simply by typing their names.

## Installation

To install my practice programs,
log in to your Linux virtual instances, and
run the following commands.
You will learn more about these commands shortly.

First, let's take a look at the contents
of your home directory
(the default directory you're in when
you connect to your virtual machine):

```
ls
```

Most likely,
nothing will be listed.

Now let's retrieve the programs
using the ``git`` command:

```
git clone https://github.com/cseanburns/learn-the-commandline.git
```

Run the ``ls`` command again, and
you'll see a new directory called
``learn-the-commandline``:

```
ls
```

Next, copy the programs to an executable path:

```
sudo cp learn-the-commandline/* /usr/local/bin
```

Run the first program and
work through it in order to learn
some of the basic commands:

```
learn-the-cli
```

When ready,
run the second program in order
to learn about the Linux filesystem:

```
learn-the-filesystem
```

Finally, periodically run the
``flashcards`` program to refresh your
memory of the basic commands, plus
some other commands that you'll learn
about soon:

```
flashcards
```

After working through the
`learn-the-cli` program a few times,
you can continue
to practice with the
`learn-the-cli-module` program.
This is a modified version that
allows you to focus on specific
learning modules.

### Resources

Here are some additional resources
for learning Bash and Linux shell commands:

- [explainshell.com](https://explainshell.com) : helps explain the parts of a shell command
- [shellcheck.net](https://www.shellcheck.net/) : helps debug a shell script
- [The Art of the Command Line](https://github.com/jlevy/the-art-of-command-line) : describes the fundamentals of Bash and the command line

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
