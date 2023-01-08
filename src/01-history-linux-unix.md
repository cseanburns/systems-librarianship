# History of Unix and Linux

An outline of the history of Unix and Linux.

## Location: Bell Labs, part of AT&T (New Jersey), late 1960s through early 1970s

- Starts with an operating system called Multics.
- Multics was a time sharing system
    - That is, more than one person could use it at once.
- But Multics had issues and was slowly abandoned
- [Ken Thompson][thompson] found an old PDP-7. Started to write UNIX.
    - The [ed][ed1] line editor was written.
    - Pronounced e.d. but generally sounded out.
- This version of UNIX would later be referred to as *Research Unix*
- [Dennis Ritchie][ritchie], the creator of the C programming language,
  joined Thompson's efforts.

## Location: Berkeley, CA (University of California, Berkeley), early to mid 1970s

- The code for UNIX was not 'free software'
  but low cost and easily shared.
- Ken Thompson visited Berkeley and helped install [Version 6 of UNIX][unix6]
- [Bill Joy][billjoy] and others contributed heavily
    - Joy created the [vi][nvi] text editor,
    a descendant of the popular [Vim][vim] editor,
    many other important programs, and was a co-founder of Sun Microsystems
- This installation of UNIX would eventually become known
  as the Berkeley Software Distribution, or BSD.

## AT&T

- Until its breakup in 1984,
  AT&T was not allowed to profit off patents
  that were not directly related to its telecommunications businesses.
- This agreement with the US government helped
  protect the company from monopolistic charges,
  and as a result, they could not commercialize UNIX.
- This changed after the breakup.
  System V UNIX became the standard bearer of commercial UNIX.

## Location: Boston, MA (MIT), early 1980s through early 1990s

- In the late 1970s, [Richard Stallman][stallman] noticed
  that software began to become commercialized.
    - As a result, hardware vendors stopped sharing
    the code they developed to make their hardware work.
- Software code became eligible for copyright protection with
  the Copyright Act of 1976
- Stallman, who thrived in a *hacker culture*,
  began to battle against this turn of events.
- Stallman created the [GNU project][gnuproject],
  the free software philosophy, GNU Emacs,
  a popular and important text editor,
  and he wrote many other programs.
- The GNU project is an attempt to create a completely
  **free software** operating system,
  that was Unix-like, called GNU.
- By the early 1990s, Stallman and others had developed
  all the utilities needed to have a full operating system,
  except for a kernel, which they called [GNU Hurd][gnuhurd].
- This included the Bash shell, written by [Brian Fox][bfox].
- The GNU philosophy includes several propositions
  that define free software:

> The four freedoms, per GNU Project:
> 0. The freedom to run the program as you wish,
> for any purpose (freedom 0).
> 1. The freedom to study how the program works,
> and change it so it does your computing as you wish (freedom 1).
> Access to the source code is a precondition for this.
> 2. The freedom to redistribute copies so you can help others (freedom 2).
> 3. The freedom to distribute copies of your modified
> versions to others (freedom 3).
> By doing this you can give the whole community a chance
> to benefit from your changes.
> Access to the source code is a precondition for this.

[The Four Freedoms][fourfreedoms]

## The Unix wars and the lawsuit, late 1980s through the early 1990s

- AT&T, after its breakup, began to commercialize Unix,
  and differences in AT&T Unix and BSD Unix arose.
- The former was aimed at commercialization,
  and the latter aimed at researchers and academics.
- UNIX Systems Laboratories, Inc. (USL, part of AT&T)
  sued Berkeley Software Design, Inc.
  (BSDi, part of the University of California, Berkeley)
  for copyright and trademark violations.
- USL ultimately lost the case,
  but the lawsuit delayed adoption of BSD Unix.

## Linux, Linus Torvalds, University of Helsinki, Finland, early 1990s

- On August 25, 1991, [Linus Torvalds][linustorvalds]
  announced that he had started working on a **free**
  operating system kernel for the 386 CPU architecture
  and for his specific hardware.
- This [kernel][kernel] would later be named **Linux**.
- Linux technically refers only to the kernel.
    - An operating system kernel handles startup,
    devices, memory, resources, etc.
    - A kernel does not provide user land utilities---the
    kinds of software they people use when using computers.
- Torvalds' motivation was to learn about OS development
  but also to have access to a Unix-like system.
    - He already had access to an Unix-like system
    called [MINIX][minix],
    but MINIX had technical and copyright restrictions.
- Torvalds has stated that if a BSD or
  if GNU Hurd operating system were available,
  then he may not have created the Linux kernel.
- But Torvalds and others took the GNU utilities
  and created what is now called Linux or GNU/Linux.

## Distributions, early 1990s through today

- Soon after the Linux development,
  people would create their own Linux and
  GNU based operating systems and would distribute them.
- As such, these Linux operating systems became 
  referred to as *distributions*.
- The two oldest distributions that are still in 
  active development include:
  - [Slackware][slackware]
  - [Debian][debian]

## Short History of BSD, 1970s through today

- Unix version numbers 1-6 eventually led to BSD 1-4.
- At BSD 4.3, all versions had some AT&T code.
    - Desire to remove this code led to BSD Net/1.
- All AT&T code was removed by BSD Net/2.
- BSD Net/2 was ported to the Intel 386 processor.
    - This became 386BSD and was made available in 1992,
    a year after the Linux kernel was released.
- 386BSD split into two projects:
  - [NetBSD][netbsd]
  - [FreeBSD][freebsd]
- NetBSD split into another project: [OpenBSD][openbsd].
- All three of these BSDs are still in active development.
- From a bird's eye point of view, they each have different focuses:
    - NetBSD focuses on portability (MacOS, NASA)
    - FreeBSD focuses on wide applicability 
      (WhatsApp, Netflix, PlayStation 4, MacOS)
    - OpenBSD focuses on security 
      (has contributed a number of very important applications)

> MacOS is based on [Darwin][puredarwin],
> is [technically UNIX][unix], and is
> partly based on FreeBSD with some code
> coming from the other BSDs.
> See [Why is macOS often referred to as 'Darwin'?][whydarwin]
> for a short history.

## Short History of GNU, 1980s through today

- The GNU Hurd is still under active development,
  but it's the pre-production state.
- The last release was 0.9 on December 2016.
- A complete OS based on the GNU Hurd can be downloaded and ran.
  For example: [Debian GNU/Hurd][debianhurd]

## Free and Open Source Licenses

In the free software and open source landscape,
there are several important free and/or open source
licenses that are used.
The two biggest software licenses are
based on the software used by GNU/Linux
and the software based on the BSDs.
They each take very different approaches to free
and/or open source software.
The biggest difference is this:

- Software based on software licensed under the GPL
must also be licensed under the GPL.
This is referred to as [copyleft][copyleft] software,
and the idea is to propagate free software.
    - [GNU General Public License (GPL)][gnugpl]
- Software based on software licensed under the BSD
license may be closed source and
primarily must only attribute the original source code and author.
    - [BSD License][bsdlicense]

[bfox]:https://opuslogica.com/
[billjoy]:https://en.wikipedia.org/wiki/Bill_Joy
[BSD]:https://en.wikipedia.org/wiki/Berkeley_Software_Distribution
[bsdlicense]:https://opensource.org/licenses/BSD-3-Clause
[copyleft]:https://www.gnu.org/licenses/copyleft.en.html
[debian]:https://www.debian.org/
[debianhurd]:https://www.debian.org/ports/hurd/
[ed1]:https://en.wikipedia.org/wiki/Ed_(text_editor)
[fourfreedoms]:https://www.gnu.org/philosophy/free-sw.html
[freebsd]:https://www.freebsd.org/
[gnugpl]:https://www.gnu.org/licenses/gpl-3.0.en.html
[gnuhurd]:https://www.gnu.org/software/hurd/
[gnuproject]:https://www.gnu.org/gnu/gnu.html
[kernel]:https://www.kernel.org/
[linustorvalds]:https://www.cs.helsinki.fi/u/torvalds/
[minix]:https://www.minix3.org/
[netbsd]:https://www.netbsd.org/
[nvi]:https://sites.google.com/a/bostic.com/keithbostic/vi/
[openbsd]:https://www.openbsd.org/
[puredarwin]:http://www.puredarwin.org/
[ritchie]:https://www.bell-labs.com/usr/dmr/www/
[slackware]:http://www.slackware.com/
[stallman]:https://en.wikipedia.org/wiki/Richard_Stallman
[thompson]:http://cs.bell-labs.co/who/ken/
[unix6]:https://en.wikipedia.org/wiki/Berkeley_Software_Distribution
[unix]:https://www.opengroup.org/membership/forums/platform/unix
[vim]:https://www.vim.org/
[whydarwin]:https://apple.stackexchange.com/questions/401832/why-is-macos-often-referred-to-as-darwin
