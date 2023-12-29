# Library Search

We're going to explore the `yaz-client`,
a powerful tool that serves
as a gateway to the
world of advanced information retrieval
using the Z39.50 and SRU/SRW protocols.
For those unfamiliar,
Z39.50 is a longstanding standard
in library science for
querying and retrieving information
from remote databases,
a testament to the evolution of
information retrieval systems since the 1970s.
SRU (Search/Retrieve via URL) and
SRW (Search/Retrieve Web service)
are modern web-based successors to Z39.50,
offering more flexibility
in accessing and sharing bibliographic records.
The `yaz-client` allows us to interact
with these protocols
directly from the command line,
providing a hands-on experience
with the underlying mechanics of
digital library searches and data retrieval.
This exploration is not
just about learning a tool;
it's about understanding the
rich history and ongoing development
of information retrieval systems,
a crucial aspect of your journey
in library and information science.

## Installing `yaz`

Use the instructions
from the prior lesson
to install the `yaz` client.

First we need to search
for the name of the software:

```
apt search yaz
```

The program that we are
interested in is called `yaz`.
To get information about the program,
we use the `apt show` command:

```
apt show yaz
```

The details help confirm
that this is the program
we want to install.
Note that the output also
returns a URL to the program's
homepage on the web.
Visit that link
read more about the software.

To install it,
we use the `sudo apt install` command:

```
sudo apt install yaz
```

## Using `yaz`

The command to start
the `yaz` program is
`yaz-client`.

Open yaz-client:

```
yaz-client
```

This starts a separate command line
interface with a new prompt: **Z>**

In this new interface,
we can connect to UK Libraries using
the `open` command followed by the
server address:

```
open saalck-uky.alma.exlibrisgroup.com:1921/01SAA_UKY
```

## Documentation

Queries are constructed using Prefix Query Notation

For `yaz-client` documentation:

```
man yaz-client
```

For attribute documentation:

```
man bib1-attr
```

Less informative but the web version is here:

[https://www.loc.gov/z3950/agency/defns/bib1.html](bib1-attr @loc.gov)

## Queries

Find title with word 'information' and LCSH 'library science'

```
f @and @attr 1=4 "information" @attr 1=21 "library science"
```

Find with subject headings "library science" and "philosophy"

```
f @and @attr 1=21 "library science" @attr 1=21 "philosophy"
```

Find where personal name is "mcmurtry, larry"

```
f @and @attr 1=1 "mcmurtry, larry"
```

Find any for "c programming language"

```
f @attr 1=1016 "c programming language"
```


