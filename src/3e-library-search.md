# Library Search

We're going to explore the `yaz-client`,
a tool that serves
as a gateway to
information retrieval
using the Z39.50 protocol.
For those unfamiliar,
Z39.50 is a standard protocol
in libraries for
sharing, querying, and retrieving bibliographic information
between library databases.
Development and usage
began in the 1970s,
which of course pre-dates the web,
and this is a testament to the evolution of
information retrieval systems since the 1970s.
The protocol is maintained by the
[*Library of Congress*][locz3950].

SRU (Search/Retrieve via URL) and
SRW (Search/Retrieve Web service)
are modern web-based successors to Z39.50.
They offer more flexibility
in accessing and sharing bibliographic records.
The `yaz-client` allows us to interact
with these protocols
directly from the command line,
which provides a hands-on experience
with the underlying mechanics of
digital library searches and data retrieval.

This exploration is not
only about learning a tool;
it's about understanding the
history and ongoing development
of information retrieval systems,
a crucial aspect in
library and information science.

> SRU uses URL query strings, which is similar to web searches.
> SRW utilizes [SOAP][soap], which is more complex but allows for more data exchange.

## Installing `yaz`

Use the `apt` instructions
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
Visit that link to
read more about the software.

To install it,
we use the `sudo apt install` command:

```
sudo apt install yaz
```

## Documentation

The documentation for the
`yaz-client` can be accessed
via its manual page or on the web.
See:

```
man yaz-client
```

For attribute documentation:

```
man bib1-attr
```

The Library of Congress also
provides an overview of the **bib1-attr**,
but it's less comprehensive:

[https://www.loc.gov/z3950/agency/defns/bib1.html](bib1-attr @loc.gov)

Complete documentation for the
`yaz-client` can be found on its
homepage:

[https://www.indexdata.com/resources/software/yaz/](yaz-client)

## Using `yaz`

The command to start
the `yaz` program is
`yaz-client`.

Open yaz-client:

```
yaz-client
```

This starts a separate command line
interface with a new prompt:

```
Z>
```

In this new interface,
we can connect to a library's
OPAC or discovery service.
To do so,
we use  the `open` command
followed by the server address:

```
open saalck-uky.alma.exlibrisgroup.com:1921/01SAA_UKY
```

## Queries

Queries are constructed
using Prefix Query Notation (PQN).
In the context of PQN,
this is a way of structuring
queries where the operator
(e.g., AND, NOT, OR)
precedes the operands
(e.g., search terms, attributes, fields).

Each query begins with a *command*.
The list of commands are
described in `man yaz-client`
in the COMMANDS section.
The main command we'll use
is the `find` command,
which may be abbreviated
down to the `f` command.
Let's see some examples:

### Example 1

To find title with word
'information' and
the Library of Congress Subject Heading
'library science',
we use the following query:

```
find @and @attr 1=4 "information" @attr 1=21 "library science"
```

In the above:

- `find` is the command that sends a search request
- `@and` is the operator signifying a Boolean AND search of multiple attributes
- `@attr 1=4` instructs the query to search for the term in the Title
- `"information"` is the first search term for the Title search
- `@attr 1=21` instructs the query to search for the term in the Subject-heading
- `"library science"` is the second search term for the subject heading search

### Example 2

Find with subject headings "library science" and "philosophy"

```
f @and @attr 1=21 "library science" @attr 1=21 "philosophy"
```

### Example 3

Find where personal name is "mcmurtry, larry"

```
f @and @attr 1=1 "mcmurtry, larry"
```

### Example 4

Find any for "c programming language"

```
f @attr 1=1016 "c programming language"
```

## Conclusion

Z39.50 is often presented as an abstract
information retrieval concept
even though it has played a central
part of searching online catalogs and database
for nearly 50 years.
The protocol,
along with tools like `yaz`
can be used to build
search interfaces to bibliographic data.
For example,
see:

- [A Guide to the PHP YAZ Library for Information Retrieval](https://reintech.io/blog/guide-to-php-yaz-library-information-retrieval)
- [Fun with bibliographic indexes, bibliographic data management software, and Z39.50](https://sites.nd.edu/emorgan/2013/11/fun/)

[locz3950]:https://www.loc.gov/z3950/agency/
[soap]:https://en.wikipedia.org/wiki/SOAP
