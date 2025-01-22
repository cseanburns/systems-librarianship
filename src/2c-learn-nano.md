# Text editors

As we learn more about how to work on the command line, we will acquire the need to write in plain text or edit configuration files.
Most configuration files for Linux applications exist in the ``/etc`` directory, and are regular text files.
For example, later in the semester we will install the [Apache Web Server][apache],
and we will need to edit Apache's configuration files in the process.

In order to edit and save text files, we need a text editor.
Programmers use text editors to write programs, but because programmers often work in graphical user environments,
they may often use graphical text editors or graphical [Integrated Development Environments (IDEs)][ide]. 
It might be that if you work in systems librarianship, that you will often use a graphical text editor,
but knowing something about how to use command line-based editors can be helpful.

## What is a Plain Text?

Plain text is the most basic way to store human-readable textual information.
Whenever we use a word processor program, like Microsoft Office, we are creating a complex series
of files that instruct the Office application how to display the contents of the file as well as how the contents are formatted and arranged.
This can easily be illustrated by using an archive manager to extract the contents of a **.docx** file.
Upon examination, most of the files in a single **.docx** file are plain text that are marked up in XML.
The files are packaged as a **.docx** file and then rendered by an application, commonly Microsoft Word, but any application
that can read **.docx** files will do.

A plain text file only contains [plain text][asciitable].
Its only arrangement is from top to bottom.
It does not allow for any kind of additional formatting, and it does not include media.
It is the closest thing the digital has to output produced by a typewriter, but
a [typewriter that's connected to the internet][tty].

A lot of content is written in plain text.
For example, HTML is written in plain text and the web browser uses the HTML markup to render how a page will look.

```
<p>This is using a HTML paragraph tag.
The web browser would render this like the other paragraphs on this page.
However, it's written in a code block,
which allows me to display the HTML as source code.</p>
```

The rendered result is not plain text but HTML, just like the rendered result of all those
XML files in a **.docx** file are not plain text but a **.docx** file.
Software is written in plain text files because programming languages cannot evaluate content that is not just text.
Those of you who have learned how to use the R programming language wrote your R code in plain text likely using the RStudio IDE.
For our purposes, we need plain text files to modify configuration files for the various programs that we will install later.

## Why Edit in Plain Text

Most of the time when we configure software, we might do it, for example,
by using our mouse to find the settings menu in some application that we are using.
All that does, for the most part, is make changes to some text file somewhere.
We will have to be more direct since we are working on the command line only.
That is, the kind of settings configurations we will do will require editing a variety
of plain text files that the programs will use to modify how they work.
Often the settings for programs can only be modified by editing their plain text configuration files.

## ``nano``

The [`nano`][nano] text editor is a fairly user-friendly command line text editor, but it requires some learning as a new command line user.
The friendliest thing about ``nano`` is that it is modeless,
which is what you're already accustomed to using.
This means `nano` can be used to enter and manipulate text without changing to insert or command mode.
It is also friendly because, like many graphical text editors and software, it uses control keys to perform its operations.

> A modal text editor has modes such as insert mode or command mode.
> In insert mode, the user types text as anyone would in any kind of editor or word processor.
> The user switches to command mode to perform operations on the text,
> such as find and replace, saving, cutting and pasting but cannot insert text as they would in insert mode.
> Switching between modes usually involves pressing some specific keys.
> In Vim and ed(1), my text editors of choice,
> the user starts in command mode and switches to insert mode by pressing the letter **i** or the letter **a**.
> The user may switch back to command mode by pressing the **Esc** key in Vim or by pressing the period in a new line in ed(1).

The tricky part to learning `nano` is that the control keys are assigned to different keystroke combinations than what
many graphical editors (or word processors) use by convention today.
For example, instead of Ctrl-c or Cmd-c to copy text, in `nano` you press the `M-6` key
(press `Alt, Cmd, or Esc key` and `6`) to copy.
Then to paste, you press `Ctrl-u` instead of the more common `Ctrl-v`.
Fortunately, `nano` lists the shortcuts at the bottom of the screen.

> `nano` is a text-editor with old origins.
> Specifically, it's a fork of the Unix `pico` editor.
> The keyboard shortcuts used by `nano` were carried over from the `pico` editor.
> These keyboard shortcuts were designed before the [Common User Access](cua) guidelines helped standardize the common keyboard
> shortcuts we use today for opening, saving, closing, etc files.

The shortcuts listed need some explanation, though.
The carat mark is shorthand for the keyboard's **Control (Ctrl)** key.
Therefore to **Save As** a file, we **write** out the file by pressing `Ctrl-o` (although `Ctrl-s` will work, too).
The **M-** key is also important, and depending on your keyboard configuration, it may correspond to your `Alt, Cmd, or Esc` keys.
To search for text, you press `^W`.
If your goal is to copy, then press **M-6** to copy a line.
Move to where you want to paste the text, and press **Ctrl-u** to paste.

We can start `nano` simply by typing `nano` on the command line.
This will open a new, unsaved file with no content.
Alternatively, we can start `nano` by specifying a file name after typing `nano`.
For example, if I want to open a file called **example.txt**, then I type the following command:

```
nano example.txt
```

If the file doesn't exist, this will start it.
If it does exit, then the above command will open it.

One of the other tricky things about `nano` is that the *menu bar* (really just a crib sheet, so to speak)
is at the bottom of the screen instead of at the top, which is where we are mostly accustomed to finding it these days.
Also, the `nano` program does not provide pop up dialog boxes.
Instead, all messages from `nano`, like what to name a file when we save it, appear at the bottom of the screen.

Lastly, `nano` also uses distinct terminology for some of its functions.
The most important function to remember is the **Write Out** function, which means to save.

For the purposes of this class, that's all you really need to know about `nano`.
Use it and get comfortable writing in it. Some quick tips:

1. `nano file.txt` will open and display the file named **file.txt**.
1. `nano` by itself will open to an empty page.
1. Save a file by pressing `Ctrl-o`.
1. Quit and save by pressing `Ctrl-x`.
1. Be sure to follow the prompts at the bottom of the screen.

## Other Editors

It's important to be familiar with `nano` because it's generally the default text editor on Linux operating systems nowadays.
However, if you are interested in using a command line text editor with familiar keyboard shortcuts,
then there are others you may want to try.
In the meantime, here are a couple of more friendly editors to test out.

### tilde

The [`tilde`](tilde) text editor is a user friendly text editor that uses conventional keybindings (like ctrl-s for saving, etc).

You can install it via the `apt` command:

```
sudo apt install tilde
```

### micro

The [`micro`](micro) text editor is also user friendly, and, like `tilde`, uses conventional key bindings.
Press **ctrl-g** to enter its help menu.
Use your arrow keys to read through it and learn more about its capabilities and its functions.
Press **ctrl-q** to exit the help menu.

You can install it via the `apt` command:

```
sudo apt install micro
```

## Editing `.bashrc`

By default, your Bash shell is probably white text on a black background.
We can add some color to this by modifying our Bash shell configuration file.
To do so, open the `.bashrc` file with `nano` or your text editor of choice:

```
nano ~/.bashrc
```

Scroll to the end of the file and add these two lines:

```
LS_COLORS='rs=0:di=04;31:fi=00;00:ex=01;93';
export LS_COLORS
```

Next, go to the line that starts with the text below, which is probably line 46:

```
# force_color_prompt=yes
```

And remove the comment character at the beginning (the pound sign).
The result should be:

```
force_color_prompt=yes
```

Save the file and exit `nano`, and then at the shell prompt, type the following command:

```
source ~/.bashrc
```

### LS_COLORS Note

The LS_COLORS setting is a bit complicated.
It contains several parameters separated by colons.
Let's break it down:

```
LS_COLORS='rs=0:di=04;31:fi=00;00:ex=01;93';
```

- `LS_COLORS`: A Bash environmental variable that holds the color values for the `ls` command.
- `rs=0`: This starting parameter resets text formatting to normal (non-bold, default colors, etc). It's placed at the beginning to ensure that we start from basic values.
- `di=04;31`: This sets the color of directory names (`di`) to be underlined (`04`) and red (`31`). If you'd rather directory names formatted in bold rather than underlined, you can change `04` to `01`. If you'd rather directory names to be green rather than red, you can change `31` to `32`. See other formatting properties here: [Configuring LS_COLORS][configuring_ls].
- `fi=00;00`: This sets the color of regular files. Because both values are zero (`00;00`), the `ls` command lists these with no special color or style.
- `ex=01;93`: This set the color of executable files (i.e., programs) to be bold (`01`) and bright yellow (`93`).

Feel free to play with the colors of the `ls` command.
Remember to run `source ~/.bashrc` to put the changes into effect.

## ed(1), Vi/Vim, Emacs

ed(1), Vi/Vim, and Emacs are the traditional Unix and Linux text editors.
I first started using Linux because I found `emacs`, but sometime during my early Linux years, I switched to `vim`.
Vim is a descendant of the `vi` text editor, which itself is a descendant of the `ed` editor.
None of these editors are user-friendly, but they are extremely powerful once you learn them, and they are still quite popular
(well, `ed` probably isn't all that popular).
There are plenty of online resources that provide tutorials on getting started with these text editors.
I won't teach how to use them because it will take too much time, but they are worth knowing about
because all three are important parts of Unix and Linux history.

## Conclusion

In the prior lesson, we learned how to use the Bash interactive shell.
We will continue to do that, but in the meantime, in this lesson, we begin to learn how to use a command line text editor, ``nano``.
I also introduce you to friendlier editors, `tilde` and `micro`, that you might prefer over `nano`.
We will use a text editor to edit configuration files and publish text to GitHub.
It's your choice what you want to use.

## My .nanorc

You can configure `nano` to look and behave in certain ways.
If you want to mimic the setup I have, then create a file called **.nanorc** in your home directory, and add the following to it:

```
# Syntax:
# set element fgcolor,bgcolor
set titlecolor brightwhite,blue
set statuscolor brightwhite,green
set errorcolor brightwhite,red
set selectedcolor brightwhite,magenta

set stripecolor yellow
set numbercolor cyan
set keycolor cyan
set functioncolor green

set speller "aspell -x -c"

## When soft line wrapping is enabled, make it wrap lines at blanks
## (tabs and spaces) instead of always at the edge of the screen.
set atblanks

## Use auto-indentation.
set autoindent

## Back up files to the current filename plus a tilde.
# set backup

## The directory to put unique backup files in.
# set backupdir "~/.backup"

## Use bold text instead of reverse video text.
set boldtext

## Remember the used search/replace strings for the next session.
set historylog

## Display line numbers to the left of the text.
set linenumbers

## Enable vim-style lock-files.  This is just to let a vim user know you
## are editing a file [s]he is trying to edit and vice versa.  There are
## no plans to implement vim-style undo state in these files.
set locking

## Remember the cursor position in each file for the next editing session.
set positionlog

## Do extended regular expression searches by default.
set regexp

## Allow nano to be suspended.
set suspend

## Use this tab size instead of the default; it must be greater than 0.
set tabsize 8

## Convert typed tabs to spaces.
set tabstospaces
```

[apache]:https://httpd.apache.org/
[asciitable]:https://www.rapidtables.com/code/text/ascii-table.html
[configuring_ls]:https://www.bigsoft.co.uk/blog/2008/04/11/configuring-ls_colors
[cua]:https://www.ibm.com/docs/en/zos/3.1.0?topic=reference-common-user-access-cua-guidelines
[ide]:https://en.wikipedia.org/wiki/Integrated_development_environment
[micro]:https://micro-editor.github.io/index.html
[nano]:https://www.nano-editor.org/
[tilde]:https://os.ghalkes.nl/tilde/
[tty]:https://www.youtube.com/watch?v=jxkygWI-Wfs
