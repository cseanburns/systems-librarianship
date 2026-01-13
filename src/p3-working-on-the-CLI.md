# Learning the Command Line

It's now more common for people today
to learn how to use a computer via a
graphical user interface (GUI), but
there are benefits to learning a
command line interface (CLI).
In this section,
we learn some of the basics
of using the [Bash shell][bash] as our CLI.
Our primary goal is to learn how
to use the CLI as a file manager and
to do basic text editing.
However, if you find this interface appealing,
know that Bash is a
[full-fledged programming language][bashprogramming], and
I encourage you to explore it as a scripting language.

There are three reasons,
from a systems administration/librarianship
point of view,
to prefer the CLI over the GUI.

* First, a GUI entails extra software (desktop environment, window manager,
  display server), and the more software we have on a server, the more
resources (memory, CPU, storage, etc) that software
consumes. We would much rather have our machine's resources being used to
provide the services we build them to do than to run irrelevant software.
* Second, the extra software a GUI requires means that we expose our systems to
  additional security risks. That is, every time we install more software on
our servers, the server becomes more vulnerable because all software can have
bugs. This means that we want to be conservative, careful, and protective of our
systems. This is especially true for production systems.
* Third, graphical user interfaces do not provide a good platform for
  automation, at least not as well as command line interfaces do. Working on
the command line, because it is a text-based environment, in what is known as a
[shell][shell], is a reproducible process and easier to script. That is not as
easily true in a GUI.

Fortunately, Linux, and
many other Unix-like operating systems,
have the ability to operate without graphical user interfaces.
This is one reason among many why these operating systems
have done well in the server market.

In this section,
our focus is learning the command line environment.
We will do this using the Bash shell and learn how to use the shell,
navigate around the filesystem, perform basic tasks, and explore other
functions and utilities the shell has to offer.

[shell]:https://en.wikipedia.org/wiki/Unix_shell
[bash]:https://en.wikipedia.org/wiki/Bash_(Unix_shell)
[bashprogramming]:https://www.redhat.com/sysadmin/learn-bash-scripting
