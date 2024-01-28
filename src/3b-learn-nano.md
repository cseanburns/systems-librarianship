# Text editors

As we learn more about
how to work on the command line,
we will acquire the need to write
in plain text or edit
configuration files.
Most configuration files for Linux
applications exist
in the ``/etc`` directory,
and are regular text files.
For example,
later in the semester
we will install the
[Apache Web Server][apache], and
we will need to edit
Apache's configuration
files in the process.

In order to edit and save text files, 
we need a text editor.
Programmers use text editors
to write programs,
but because programmers 
often work in
graphical user environments,
they may often use 
graphical text editors or graphical
[Integrated Development Environments (IDEs)][ide]. 
It might be that if you work
in systems librarianship,
that you will often use
a graphical text editor,
but knowing something about
how to use command line-based
editors can be helpful.

## What is a Plain Text?

Plain text is the most basic
way to store human-readable textual information.
Whenever we use a word processor program,
like Microsoft Office,
we are creating a complex series
of files that instruct the Office application
how to display the contents of the file as
well as how the contents are formatted
and arranged.
This can easily be illustrated by
using an archive manager to extract
the contents of a **.docx** file.
Upon examination,
most of the files in a single **.docx**
file are plain text that are
marked up in XML.
The files are packaged as a **.docx**
file and then rendered by an application,
commonly Microsoft Word,
but any application
that can read **.docx** files will do.

A plain text file only contains
[plain text][asciitable].
Its only arrangement is from top
to bottom.
It does not allow for any kind of
additional formatting,
and it does not include media.
It is the closest thing the digital
has to output produced by a typewriter, but
a [typewriter that's connected to the internet][tty].

A lot of content is written in plain text.
For example, HTML is written in plain text
and the web browser uses the HTML markup to
render how a page will look.

```
<p>This is using a HTML paragraph tag.
The web browser would normally render this like
the other paragraphs on this page.
However, it's written in a code block,
which allows us to display the HTML tags
and appear as if it's real source code.</p>
```

The rendered result is not plain text but HTML,
just like the rendered result of all those
XML files in a **.docx** file are not
plain text but a **.docx** file.
Softare is written in plain text files
because programming languages cannot
evaluate content that is not just text.
Those of you who have learned how to
use the R programming language wrote
your R code in plain text likely using
the RStudio IDE.
For our purposes,
we need plain text files to
modify configuration files for
the various programs that we will
install later.

## Why Edit in Plain Text

Most of the time when we configure software,
we might do it, for example,
by using our mouse to find the settings
menu in some application that we are using.
All that does, for the most part,
is make changes to some text file somewhere.
We will have to be more direct since
we are working on the command line only.
That is, the kind of settings configurations we
will do will require editing a variety
of plain text files that the programs
will use to modify how they work.
Often the settings for programs can only
be modified by editing their plain text
configuration files.

## ``nano``

The [``nano``][nano] text editor
is a fairly user-friendly
command line text editor, but
it requires some learning
as a new command line user.
The friendliest thing about
``nano`` is that it is modeless,
which is what you're
already accustomed to using.
This means ``nano`` can be used
to enter and manipulate text
without changing to
insert or command mode.
It is also friendly because,
like many graphical text editors
and software,
it uses control keys
to perform its operations.

> A modal text editor has modes such as insert mode or
> command mode. In insert mode, the user types text as
> anyone would in any kind of editor or word processor. The
> user switches to command mode to perform operations on the
> text, such as find and replace, saving, cutting and
> pasting but cannot insert text as they would in insert
> mode. Switching between modes usually involves pressing
> some specific keys. In Vim and ed(1), my text editors of
> choice, the user starts in command mode and switches to
> insert mode by pressing the letter **i** or the letter
> **a**. The user may switch back to command mode by
> pressing the **Esc** key in Vim or by pressing the period
> in a new line in ed(1).

The tricky part to learning ``nano`` is that
the control keys are assigned
to different keystroke combinations
than what
many graphical editors
(or word processors) use
by convention today.
For example,
instead of Ctrl-c or Cmd-c to copy text,
in ``nano`` you press the ``M-6`` key
(press ``Alt, Cmd, or Esc key``
and ``6``) to copy.
Then to paste,
you press ``Ctrl-u`` instead
of the more common ``Ctrl-v``.
Fortunately, ``nano`` lists
the shortcuts at the bottom
of the screen.

> `nano` is a text-editor with old origins. Specifically, it's a fork of the
> Unix `pico` editor. The keyboard shortcuts used by `nano` were carried over
> from the `pico` editor. These keyboard shortcuts were designed before the
> [Common User Access](cua) guidelines helped standardize the common keyboard
> shortcuts we use today for opening, saving, closing, etc files.

The shortcuts listed
need some explanation, though.
The carat mark is shorthand
for the keyboard's **Control (Ctrl)** key.
Therefore to **Save As** a file,
we **write** out the file
by pressing ``Ctrl-o``
(although ``Ctrl-s`` will work, too).
The **M-** key is also important,
and depending on your keyboard
configuration,
it may correspond to your
``Alt, Cmd, or Esc`` keys.
To search for text,
you press ``^W``,
If your goal is to copy,
then press **M-6**
to copy a line.
Move to where you want
to paste the text,
and press **Ctrl-u**
to paste.

We can start ``nano`` simply
by typing ``nano`` on the command line.
This will open a new, unsaved file
with no content.
Alternatively, we can start ``nano``
by specifying a file name after typing ``nano``.
For example, if I want to open a file
called **example.txt**,
then I type the following command:

```
nano example.txt
```

If the file doesn't exist,
this will create it.
If it does exit, then
the above command will open it.

One of the other tricky things about ``nano``
is that the *menu bar*
(really just a crib sheet, so to speak)
is at the bottom of
the screen instead of at the top,
which is where we are mostly accustomed to
finding it these days.
Also, the ``nano`` program does not provide
pop up dialog boxes.
Instead, all messages from ``nano``,
like what to name a file when we save it,
appear at the bottom of the screen.

Lastly, ``nano`` also uses distinct terminology
for some of its functions.
The most important function to remember
is the **Write Out** function,
which means to save.

For the purposes of this class,
that's all you really
need to know about ``nano``.
Use it and get comfortable writing in it.
Some quick tips:

1. ``nano file.txt`` will open and display the file named **file.txt**.
1. ``nano`` by itself will open to an empty page.
1. Save a file by pressing ``Ctrl-o``.
1. Quit and save by pressing ``Ctrl-x``.
1. Be sure to follow the prompts at the bottom of the screen.

## tilde

It's important to be familiar with
`nano` because it's generally the default
text editor on Linux operating systems nowadays.
However, if you are interested in using a
command line text editor with familiar keyboard shortcuts,
then feel free to try out the `tilde` text editor.
You can install it via the `apt` command:

```
sudo apt install tilde
```

## Conclusion

In the prior lesson,
we learned how to use the
Bash interactive shell.
We will continue to do that,
but in the meantime,
in this lesson,
we begin to learn how to use
a command line text editor, ``nano``.
We will use ``nano`` to edit
configuration files and publish
text to GitHub.

[apache]:https://httpd.apache.org/
[cua]:https://www.ibm.com/docs/en/zos/3.1.0?topic=reference-common-user-access-cua-guidelines
[ide]:https://en.wikipedia.org/wiki/Integrated_development_environment
[nano]:https://www.nano-editor.org/
[tty]:https://www.youtube.com/watch?v=jxkygWI-Wfs
[asciitable]:https://www.rapidtables.com/code/text/ascii-table.html
