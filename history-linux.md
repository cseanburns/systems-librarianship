# History of Unix and Linux

The history of modern computer operating systems
is a fascinating tale of innovation, collaboration, and
the struggle to balance commercial interests
with the ideals of free and open-source software.
The story of Unix, and by extension, Linux,
begins in the late 1960s at Bell Telephone Labs,
a research program that was part of AT&T in New Jersey,
with an operating system called [Multics][multics].
Multics was a time-sharing system that allowed
multiple users to access it simultaneously.

[multics]:https://multicians.org/history.html

[Ken Thompson][ken], a computer programmer at Bell Labs,
had been working on Multics when AT&T
decided to withdraw from the project.
He found an old PDP-7 and started to write a
new operating system that would later be named UNIX.
The initial version of UNIX was created
with the help of the [ed line editor][ed],
pronounced "e.d." but generally sounded out.
Thompson was later joined in his efforts by [Dennis Ritchie][dmr],
the creator of the C programming language.
This version of UNIX became known as Research Unix.

[ken]:http://cs.bell-labs.co/who/ken/
[ed]:https://en.wikipedia.org/wiki/Ed_(text_editor)
[dmr]:https://www.bell-labs.com/usr/dmr/www/

UNIX gained popularity and was eventually installed at
the University of California, Berkeley,
in the early to mid-1970s.
The code for UNIX was not "free software"
but was low-cost and easily shared.
Bill Joy and others contributed heavily,
and Joy created the vi text editor,
a descendant of the popular Vim editor,
as well as many other important programs.
This installation of UNIX would eventually become
known as the Berkeley Software Distribution, or BSD.

Until its breakup in 1984,
AT&T was not allowed to profit off patents that
were not directly related to its telecommunications businesses.
This agreement with the US government protected
the company from monopolistic charges,
and as a result,
they could not commercialize UNIX.
This changed after the breakup,
and System V UNIX became the standard bearer of commercial UNIX.

In the early 1980s through the early 1990s,
in Boston, MA, at MIT,
Richard Stallman noticed that software
began to become commercialized.
As a result, hardware vendors stopped sharing the code
they developed to make their hardware work.
Software code became eligible for copyright protection
with the Copyright Act of 1976,
and Stallman began to battle against this turn of events.
He created the GNU project,
the free software philosophy, GNU Emacs,
a popular and important text editor, and many other programs.
The GNU project was an attempt to create a
completely free software operating system,
that was Unix-like, called GNU.
By the early 1990s,
Stallman and others had developed all the
utilities needed to have a full operating system,
except for a kernel,
which they called GNU Hurd.
This included the Bash shell,
written by Brian Fox.

The GNU philosophy includes several propositions
that define free software, including the four freedoms:

0. The freedom to run the program as you wish, for any
   purpose (freedom 0).
1. The freedom to study how the program works and change it
   so it does your computing as you wish (freedom 1). Access
   to the source code is a precondition for this.
2. The freedom to redistribute copies so you can help others
   (freedom 2).
3. The freedom to distribute copies of your modified
   versions to others (freedom 3). By doing this, you can
   give the whole community a chance to benefit from your
   changes. Access to the source code is a precondition for
   this.

In the late 1980s through the early 1990s,
AT&T began to commercialize UNIX,
and differences in AT&T UNIX and BSD UNIX arose.
The former was aimed at commercialization,
and the latter aimed at researchers and academics.
UNIX Systems Laboratories, Inc. (USL, part of AT&T)
sued Berkeley Software Design, Inc.
(BSDi, part of the University of California, Berkeley) for
copyright and trademark violations.
USL ultimately lost the case,
but the lawsuit delayed adoption of BSD Unix.

In the early 1990s,
at the University of Helsinki, Finland,
a young computer science student named Linus Torvalds
announced that he had started working on a
free operating system kernel for the 386 CPU
architecture and for his specific hardware.
This kernel would later be named Linux.
Linux technically refers only to the kernel,
which handles startup, devices, memory, resources,
and other core functions of an operating system.
However, a kernel does not provide user land utilities,
which are the kinds of software people use when using computers.

Torvalds' motivation for creating Linux was
to learn about operating system development and
to have access to a Unix-like system.
He already had access to a Unix-like system called MINIX,
but MINIX had technical and copyright restrictions.
Torvalds has stated that if a BSD or GNU Hurd
operating system were available,
he may not have created the Linux kernel.
Nonetheless, Torvalds and others took the
GNU utilities and created what is now called Linux or GNU/Linux.

Soon after the development of Linux,
people began creating their own Linux and
GNU-based operating systems and distributing them.
As such, these Linux operating systems became
referred to as *distributions*.
The two oldest distributions that are still in
active development include Slackware and Debian.

The history of the BSD operating system dates back to the 1970s,
with Unix versions 1-6 eventually leading to BSD 1-4. At BSD 4.3,
all versions had some AT&T code.
The desire to remove this code led to BSD Net/1.
All AT&T code was removed by BSD Net/2.
BSD Net/2 was then ported to the Intel 386 processor,
which became 386BSD and was made available in 1992,
a year after the Linux kernel was released.
386BSD split into two projects: NetBSD and FreeBSD.
NetBSD split into another project, OpenBSD.
All three of these BSDs are still in active development,
and each has a different focus. NetBSD focuses on portability,
FreeBSD focuses on wide applicability,
and OpenBSD focuses on security and has
contributed a number of important applications.

In the free software and open-source landscape,
there are several important free and/or
open-source licenses that are used.
The two biggest software licenses are based on the software
used by GNU/Linux and the software based on the BSDs.
They each take very different approaches to
free and/or open-source software.
The GNU General Public License (GPL)
requires that software based on software licensed
under the GPL must also be licensed under the GPL,
which is referred to as copyleft software,
and the idea is to propagate free software.
On the other hand,
the BSD License allows software based on software
licensed under the BSD license to be closed source
and primarily requires only attribution to
the original source code and author.
