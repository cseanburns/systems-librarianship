# Learn Git and GitHub

## Introduction

[Git][git] and [GitHub][github]
are some of the most popular tools
developers and others use to manage
source code and documentation.

For the remainder of this course,
we will use Git and GitHub to
document what we learn as we
proceed to install the following
technologies:

- the Apache2 web server
- the PHP scripting language
- the MySQL relational database
- the WordPress content management system
- the Omeka content management system
- the Koha integrated library system

## Git

`git` is a "free and open source
distributed version control system."
While it is primarily used by
software developers, researchers, and
others to manage software code and
documentation,
it is also quite useful for other
projects that are text-based.
For example, this entire handbook
is written in a text-editor,
marked up in [Markdown][markdown],
managed using `git`, and
publicly stored on a
[GitHub repository][syslibgithub].

## GitHub

GitHub is a hosting site for projects
and repositories managed using `git`.
Other `git`-based hosting sites exist,
such as [GitLab][gitlab], and
it is also possible to create self-hosted
repositories.
GitHub and GitLab provide social
features to enhance collaboration
on projects.
Each service has its own strengths,
and these differences largely come into play
with more advanced usage of `git`.
The basics among them are the same, though.

## Markdown

Markdown is a simplified and
highly versatile *markup* language.
Text marked up with Markdown can be
converted to other formats,
including HTML, PDF, DOCX, ODT, EPUB,
and more.
The basic formatting options offered
by Markdown include:

- headings
- bold
- italic
- blockquote
- ordered lists
- unordered lists
- code
- links
- images
- horizontal rule

More formatting options exist and
are listed in a helpful
[cheatsheet][markdowncheatsheet].

When you write your documentation,
you will mark it up with Markdown.
It doesn't require a lot.
The majority of the time,
I only use the above elements
(rarely do I use the images
or the horizontal rule elements).
Here is an example of a file
marked up with Markdown:

```
# Title

## Subtitle

This is a paragraph. Just add an empty line between
paragraphs to create new paragraphs.

For example, this is the second paragraph. I'm following
this paragraph with an unordered list:

- I can write in **bold** or use *italics*.
- I can add a [link to someplace](https://example.com).
- I can add `code` in a sentence with backticks.
- Next I use a blockquote to **not** quote Benjamin
  Franklin, who it is often attributed to, but to probably
  quote Xun Kuang, a [fourth century Confucian
  philosopher](https://www.fi.edu/benjamin-franklin/7-things-benjamin-franklin-never-said):

> Tell me and I forget. Teach me and I remember. Involve me
> and I learn. --Not Benjamin Franklin and probably Xun
> Kuang

And finally, a code block starts with three backticks on
their own line, followed by the code (or any kind of
pre-formatted text), followed by three closing backticks on
a their own line.
```

When you sync your documentation
to your GitHub,
your Markdown files will automatically
be rendered into HTML.
To facilitate it,
name your files in a systematic way and
use the **.md** file extension.
For example, when we install the Apache2
web server,
you can name it **apache2-documentation.md**.

## Motivation

We will be using these technologies
for four primary reasons.
First, these technologies see
widespread usage in the technology sector,
and this is true for library specific projects.
For example, the software code for the
Koha integrated library system is managed
with git and [stored on GitHub][kohagithub].
So is [Omeka][omekagithub].
WordPress also has a presence
on [GitHub][wpgithub].
Therefore I think it's important to
acquire some hands-on experience with
`git` and GitHub because it helps one
become part of those communities,
even if we have no intention to
contribute code to these projects.

Second, we will soon install and
configure these projects on our servers,
and doing so involves complicated processes.
Unlike the commands we have practiced so far,
the installation and configuration of these
technologies are not everyday tasks.
This means that documenting how we install
and configure them will help us reproduce
the steps at later times.
For example, I used to install, configure,
and setup Omeka for one of our LIS courses,
but I only had to do so once a year.
There was no way that I would remember
the installation process each year, but
by keeping detailed notes,
I was easily able to reproduce my steps
from the prior year.
This saved me tons of time.

Documentation can also serve to enhance
our workflows.
I was able to use my Omeka
notes to create scripts
to automate parts of the
configuration process.
For example, you can read
through my scripts for setting up
[Omeka for LIS 602][lis602omeka]
on GitHub.
Even if you don't code,
documentation can still improve
your workflows.

Third, the process of documenting
a complex series of steps
augments learning.
It's a way to reflect on our tasks and
to develop an eye for detail.

Lastly, I would know so much less
than I do about Linux and about
all these technologies if I hadn't
had access to the documentation efforts
that other people have contributed and
added to the web.
By sharing our notes on GitHub,
we contribute back to that ecosystem.

## How to Document

Because you will be
documenting technical information,
it will be important
to take notes of the commands
that you will be learning
and using in this course
and document those notes
in GitHub.

However,
as importantly,
you will want to describe
the processes you use
in learning Linux,
git, and more.
Therefore,
you should not just
record your commands.
You should also describe
what the commands do and
why you run various commands.
Use this book as an example,
which itself arose out of 
documenting the steps
needed to accomplish the goals
for this course.

## Setup Git and GitHub

The steps we'll take to begin
using Git and GitHub will be:

1. Create an account on GitHub
    - be sure to setup two factor authentication
2. Create a repository for your documentation
3. Create a markdown file to begin documenting
4. Begin documenting your process
5. Once you have documented your process, you can commit your file to your repository

You can edit and commit files
directly on GitHub.
Later I will show you how to
manage your GitHub documentation
from the command line
on your Linux virtual machines.

[git]:https://git-scm.com/
[github]:https://github.com
[markdown]:https://www.markdownguide.org/
[syslibgithub]:https://github.com/cseanburns/systems-librarianship
[gitlab]:https://about.gitlab.com/
[kohagithub]:https://github.com/Koha-Community/Koha
[omekagithub]:https://github.com/omeka/Omeka
[wpgithub]:https://github.com/WordPress/WordPress
[lis602omeka]:https://github.com/cseanburns/omeka_admin
[markdowncheatsheet]:https://www.markdownguide.org/cheat-sheet/
