# Searching with grep

We have available some powerful utilities and programs
to process, manipulate, and analyze text files.
In this section, we will focus on the ``grep`` utility,
which offers some advanced methods for searching
the contents of text files.

## Grep

The ``grep`` command is one of my most often used commands.
The purpose of ``grep`` is to "print lines that match patterns"
(see ``man grep``).
In other words, it searches text, and
it's super powerful.

``grep`` works line by line.
So when we use it to search a file for a **string** of text,
it will return the whole line that matches the string.
This **line by line** idea is part of the history of
Unix-like operating systems,
and it's important to remember that most utilities
and programs that we use on the commandline
are line oriented.

> "A string is any series of characters that are interpreted
> literally by a script. For example, 'hello world' and 'LKJH019283'
> are both examples of strings." -- [Computer Hope][computerhope].
> More generally, it's a type of data structure. 

To visualize how ``grep`` works,
let's consider a file called
**operating-systems.csv** with content
as seen below:

```
OS, License, Year
Chrome OS, Proprietary, 2009
FreeBSD, BSD, 1993
Linux, GPL, 1991
macOS, Proprietary, 2001
Windows NT, Proprietary, 1993
Android, Apache, 2008
```

We can use ``grep`` to search
for anything in that file.
Let's start with a search for the string **Chrome**.
Notice that even though the string **Chrome** only appears once,
and in one part of a line,
``grep`` returns the entire line.

**Command:**

```
grep "Chrome" operating-systems.csv
```

**Output:**

```
Chrome OS, Proprietary, 2009
```

### Case Matching

Be aware that, *by default*, ``grep`` is case-sensitive,
which means a search for the string **chrome**,
with a lower case **c**,
would return no results.
However, many Linux command line utilities
can have their functionality extended
through commnad line options.
``grep`` has an ``-i`` option
that can be used to
to ignore the case of the search string.
In the following examples,
``grep`` returns nothing in the first search
since we do not capitalize the string **chrome**.
However, adding the ``-i`` option results in success
since `grep` is instructed to ignore case:

**Command:**

```
grep "chrome" operating-systems.csv
```

**Output:**

None.

**Command:**

```
grep -i "chrome" operating-systems.csv
```

**Output:**

```
Chrome OS, Proprietary, 2009
```

### Invert Matching

`grep` can do inverse searching.
That is, we can search for lines
that **do not** match our string 
using the `-v` option.
Options can often be combined
for additional functionality.
We can combine `-v` to inverse search
with `-i` to ignore the case.
In the following example,
we search for
all lines that
do not contain the
string **chrome**:

**Command:**

```
grep -vi "chrome" operating-systems.csv
```

**Output:**

```
FreeBSD, BSD, 1993
Linux, GPL, 1991
iOS, Proprietary, 2007
macOS, Proprietary, 2001
Windows NT, Proprietary, 1993
Android, Apache, 2008
```

### Regular Expressions

Sometimes data files,
like spreadsheets,
contain header columns in the
first row.
We can use ``grep`` to remove
the first line of a file by
inverting our search and
selecting all lines not matching
"OS" at the start of a line.
Here the carat key ``^`` is
a **regex** indicating the
start of a line.
Again, this ``grep`` command returns
all lines that do not match the
string **os** at the start of a line,
ignoring case:

**Command:**

```
grep -vi "^os" operating-systems.csv
```

**Output**:

```
Chrome OS, Proprietary, 2009
FreeBSD, BSD, 1993
Linux, GPL, 1991
iOS, Proprietary, 2007
macOS, Proprietary, 2001
Windows NT, Proprietary, 1993
Android, Apache, 2008
```

Alternatively, since we know that
the string **Year** comes
at the end of the first line,
we can use ``grep`` to invert search for that.
Here the dollar sign key ``$``
is a **regex** indicating the
end of a line.
Like the above,
this ``grep`` command returns all lines that
do not match the string **year**
at the end of a line,
ignoring case.
The result,
in this specific instance,
is exactly the same as the last command:

**Command**:

```
grep -vi "year$" operating-systems.csv
```

**Output**:

```
Chrome OS, Proprietary, 2009
FreeBSD, BSD, 1993
Linux, GPL, 1991
iOS, Proprietary, 2007
macOS, Proprietary, 2001
Windows NT, Proprietary, 1993
Android, Apache, 2008
```

The ``man grep`` page lists other options,
but a couple of other good ones include:

### Count Matches

Get a count of the matching lines
with the `-c` option.
For example,
let's get a total count of rows
in our file excluding the header
by adding the `-c` option:

```
grep -vic "year$" operating-systems.csv
```

### Alternate Matching

We separate the strings with a vertical bar ``|``
(the **infix operator**)
to match any string on either side.
This is similar to a Boolean OR search.
Since there's at least one match in the following string,
there is at least one result.

Here is an example where only one string
returns a true value since
the file contains **bsd** but not **atari**:

**Command:**

```
grep -Ei "(bsd|atari)" operating-systems.csv
```

**Output:**

```
FreeBSD, BSD, 1993
```

Here's an example where both strings evaluate to true:

**Command:**

```
grep -Ei "(bsd|gpl)" operating-systems.csv
```

**Output:**
```
FreeBSD, BSD, 1993
Linux, GPL, 1991
```

### Whole Word Matching

By default, ``grep`` will return results where the
string appears within a larger word,
like **OS** in **macOS**.

**Command:**

```
grep -i "os" operating-systems.csv
```

**Output:**

```
OS, License, Year
Chrome OS, Proprietary, 2009
iOS, Proprietary, 2007
macOS, Proprietary, 2001
```

However, we might want to limit results so that
we only return results where **OS** is a complete word.
To do that, we can surround the string with
special characters:

**Command:**

```
grep -i "\<os\>" operating-systems.csv
```

**Output:**

```
OS, License, Year
Chrome OS, Proprietary, 2009
```

Sometimes I find it hard to remember
the backslash and angle bracket combinations
because they're too much alike HTML syntax but
not exactly like HTML syntax.
Fortunately, ``grep`` has a ``-w`` option
to match whole words:

**Command:**

```
grep -wi "os" operating-systems.csv
```

**Output:**

```
OS, License, Year
Chrome OS, Proprietary, 2009
```

### Context Matches

Sometimes we want the context for a result;
that is,
we might want to print lines
that surround our matches.
For example,
to print the matching line plus the two lines
after the matching line using the ``-A NUM`` option,
where **NUM** equals the number of lines
to return after the matching line:

**Command:**

```
grep -i "linux" -A2 operating-systems.csv
```

**Output:**

```
Linux, GPL, 1991
macOS, Proprietary, 2001
Windows NT, Proprietary, 1993
```

Or, print the matching line plus the two lines
before the matching line using the ``-B NUM`` option:

**Command**

```
grep -i "linux" -B2 operating-systems.csv
```

**Output:**

```
Chrome OS, Proprietary, 2009
FreeBSD, BSD, 1993
Linux, GPL, 1991

```

We can combine many of the variations.
Here I search for the whole word **BSD**,
case insensitive, and
print the line before and the line after
the match:

**Command:**

```
grep -iw -C1 "bsd" operating-systems.csv
```

**Output:**

```
Chrome OS, Proprietary, 2009
FreeBSD, BSD, 1993
Linux, GPL, 1991
```

### Halt Matching

We can use another option to
stop returning results after some
number of hits.
Here I use ``grep`` to return
a search for the string "proprietary"
and stop after the first hit:

**Command:**

```
grep -i -m1 "proprietary" operating-systems.csv
```

**Output:**

```
Chrome OS, Proprietary, 2009
```

### Returning Line Numbers

We can add the ``-n`` option to
instruct ``grep`` to tell us the
line number for each hit.
Below we see that the string
"proprietary" is found on lines
2, 5, and 6.

**Command:**

```
grep -in "proprietary" operating-systems.csv
```

**Output:**

```
2:Chrome OS, Proprietary, 2009
5:macOS, Proprietary, 2001
6:Windows NT, Proprietary, 1993
```

### Character Class Matching

We can use ``grep`` to search for
patterns in strings instead of literal words.
Here we use what's called **character classes**
and **repetition** to search for five letter words
that contain any English character **a through z**:

**Command:**

```
grep -Eiw "[a-z]{5}" operating-systems.csv
```

**Output:**

```
Linux, GPL, 1991
macOS, Proprietary, 2001
```

Or four letter numbers,
which highlights the years:

**Command:**

```
grep -Eiw "[0-9]{4}" operating-systems.csv
```

**Output:**

```
Chrome OS, Proprietary, 2009
FreeBSD, BSD, 1993
Linux, GPL, 1991
macOS, Proprietary, 2001
Windows NT, Proprietary, 1993
Android, Apache, 2008
```

``grep`` can also search for words that
begin with some letter and end with some letter
and with a specified number of letters between.
Here we search for words that start with **m**,
end with **s**, and have three letters in the middle:

**Command:**

```
grep -Eiw "m.{3}s" operating-systems.csv
```

**Output:**

```
macOS, Proprietary, 2001
```

## Practice

Here let's practice looking at the **auth.log** file.
This file records all attempts to login to the system:

First, we change directory to ``/var/log``.

Second, we use ``less`` to peruse the **auth.log** file.

Third, we do a simple ``grep`` search for the string
**invalid user** and
pipe that through another grep command
that examines IP addresses.

Fourth, we do another simple search for a longer
string and pipe that through other commands to
sort the data.

```
cd /var/log
less auth.log
grep -E "session opened for user (sean|root)" auth.log | less
grep "invalid user" auth.log | grep -Eo "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" | sort | uniq -c | sort
grep "Connection closed by invalid user" auth.log | cut -d" " -f11 | sort | uniq -c | sort |less
grep "Connection closed by invalid user" auth.log | cut -d" " -f11 | sort | uniq -c | sort -r |less
```

## Conclusion

``grep`` is very powerful, and
there are more options listed in its ``man`` page.

> Note that I enclose my search strings in double quotes.
> For example: ``grep "search string" filename.txt``
> It's not always required to enclose a search string
> in double quotes,
> but it's good practice because
> if your string contains more than one word or
> empty spaces, the search will fail.

The Linux (and other Unix-like OSes) command line
offers a lot of utilities to examine data.
It's fun to learn and practice these.
Despite this, you do not have to become
an advanced ``grep`` user.
For most cases,
simple ``grep`` searches work well.

If you want to learn more,
there are many ``grep`` tutorials on the web.

[computerhope]:https://www.computerhope.com/jargon/s/string.htm
