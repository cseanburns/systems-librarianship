# Library Search

In this section, we're going to explore the `yaz-client`.
The `yaz-client` is an information retrieval client that uses the Z39.50/SRU protocols to query bibliographic databases, like library catalogs and repositories.
For those unfamiliar, Z39.50 is a standard protocol in libraries for sharing, querying, and retrieving bibliographic information between library databases.
Its development in the 1970s pre-dates the web, and its continued use illustrates the evolution of information retrieval systems since the 1970s.
The protocol is maintained by the [*Library of Congress*][locz3950].

The `yaz-client` is an SRU client as well.
SRU (Search/Retrieve via URL) and SRW (Search/Retrieve Web service) are modern internet and web-based successors to Z39.50.
These protocols offer modern flexibility and more simplicity in accessing and sharing bibliographic records than Z39.50.
See OCLC's page on [SRW/U][srw_u_oclc] for more information and The Library of Congress's documentation page: [SRU/CQL][sru_loc].

The `yaz-client` allows us to interact with these protocols directly from the command line.
This provides a hands-on opportunity with the underlying mechanics of digital library searches and data retrieval.

However, this exploration is only partly about learning a tool.
More so, it's about understanding the history and ongoing development of information retrieval systems.
This is a crucial (and fun!) part of library and information science.

In order for us to use the `yaz-client`, we need to connect to a library database.
Fortunately, LSPs (library service platforms) can function as **SRU** targets for applications like `yaz-client`.
For example, see the [ExLibris tutorial][sru_exlibris] on enabling and using SRU in Alma, its LSP product.
We will connect to an Alma database in the following tutorial.

## Installing `yaz`

First, let's get started by installing the `yaz-client`.
Use the `apt` instructions from the prior lesson to locate the name of the `yaz` client.

First search for the name of the software:

```
apt search yaz
```

The package name happens to be `yaz`, but you never know!
To get information about the program, we use the `apt show` command:

```
apt show yaz
```

The details help confirm that this is the program we want to install.
Note that the output also returns a URL to the program's homepage on the web.
Visit that link to read more about the software and its documentation.

To install `yaz`, run the following command:

```
sudo apt install yaz
```

## Documentation

The documentation for the `yaz-client` can be accessed via its manual page or on the web.
To access the man page, see:

```
man yaz-client
```

`yaz` is able to search quite a few bibliographic attributes, including many **metadata** fields.
To see which attributes are available to `yaz`, see:

```
man bib1-attr
```

The Library of Congress also provides an overview of the **bib1-attr** documentation,
but it's less comprehensive:
[Bib-1 Attribute Set][bib1_attr]

Complete documentation for the `yaz-client` can be found on its homepage:
[YAZ][yaz_client]

## Using `yaz`

To start the `yaz` program, run the `yaz-client` command.

```
yaz-client
```

This creates a new command line interface with a new prompt:

```
Z>
```

In this new interface, we can connect to a library's OPAC or discovery service.
To do so, we use the `open` command followed by the server address.
The following `open` command establishes a connection to the University of Kentucky's library catalog:

```
Z> open saalck-uky.alma.exlibrisgroup.com:1921/01SAA_UKY
```

## Queries

Queries are constructed using Prefix Query Format (PQF), sometimes called prefix query notation.
In the context of PQF, this is a way of structuring queries where the operator (e.g., AND, NOT, OR)
precedes the operands (e.g., search terms, attributes, fields).

Each query begins with a *command* followed by a search syntax articulated in PQF.
The list of commands is described in the COMMANDS section of `man yaz-client`.
The main command we'll use is the `find` command, which may be abbreviated as `f`.
Let's see some examples:

### Example 1

To search for the term **information** in the *title* field
and the term **library science** in the *Library of Congress Subject Heading* (LCSH) field,
we use the following query:

```
Z> find @and @attr 1=4 "information" @attr 1=21 "library science"
```

Let's break that down:

- `find` is the command that sends a search request
- `@and` is the operator signifying a Boolean AND search of the next two attributes
- `@attr 1=4` instructs the query to search for the term in the Title field
- `"information"` is the term for the Title search
- `@attr 1=21` instructs the query to search for the term in the subject heading field
- `"library science"` is the second search term for the subject heading search

The search returns a hit count but does not display the records.
To peruse the results, we use the `show` command.
To show the first record:

```
show 1
```

To show the second record:

```
show 2
```

And so forth.

### Example 2

Search for works with subject headings *library science* and *philosophy*.
In this example, I abbreviate the `find` command as `f`:

```
Z> f @and @attr 1=21 "library science" @attr 1=21 "philosophy"
```

- `@attr 1=21` instructs the query to search for the term *library science* in the subject heading field
- `@attr 1=21` instructs the query to search for the term *philosophy* in the subject heading field

### Example 3

Find where personal name is "mcmurtry, larry".

```
Z> f @attr 1=1 "mcmurtry, larry"
```

- `@attr 1=1` instructs the query to search for the term *mcmurtry, larry* in the personal name field.

### Example 4

Find where the term "c programming language" appears in the **Any** field.

```
Z> f @attr 1=1016 "c programming language"
```

- `@attr 1=1016` instructs the query to search for the term in **Any** field.

Finally, we can exit the `yaz` client with the `quit` command:

```
Z> quit
```

## Advanced Usage

Let's open the `yaz-client` again but with the `-m` option.
According to the `yaz-client` man page, the `-m` option
instructs the client to append bibliographic records to a file.
In the example below, I arbitrarily name the file `records.marc`. 

```
$ yaz-client -m records.marc
```

Again, we use the `open` command to connect to the library's catalog.
Then use the `find` command to search the catalog.
Use the `show` command to examine some of the retrieved records.
Then use the `quit` command to exit the `yaz-client`.

```
Z> open saalck-uky.alma.exlibrisgroup.com:1921/01SAA_UKY
Z> find @and @attr 1=4 "information" @attr 1=21 "library science"
Z> show 1
Z> show 2
Z> show 3
Z> quit
```

However, this time when we exit the `yaz-client`, we can examine all the records we retrieved.
The default file type isn't human friendly.
We can take a look at the first few lines of the file first:

```
head records.marc
```

Then we can use the `file` command to determine its file type:

```
file records.marc
records.marc: MARC21 Bibliographic
```

Fortunately, we can convert the MARC file to friendlier formats.
For example, using the `yaz-marcdump` command, we can convert the file to JSON,
which is a <q>standard text-based format for representing structured data</q>
([JSON][json_mdn]).

```
yaz-marcdump -o json records.marc > records.json
```

We then use the `jq` command, a JSON processor, to format the JSON for better readability:

```
jq . records.json > records-formatted.json
```

With the records formatted, we can use the `less` command to scan the file, but
the `jq` command is quite powerful and we can use it to query and examine specific fields in the JSON-formatted MARC records.

> Note: learning `jq` and MARC is beyond the scope of this work.
> However, if you are new to MARC or need a reminder, see:
> [MARC 21 Format for Bibliographic Data][marc_loc].
> The `jq` homepage also provides a nice tutorial: [jq Tutorial][jq_tutorial].

But as an example,
the following command extracts the **650 Subject** field with the **a** (Topical term) subfields for our entries:

```
jq '.fields[] | select(has("650")) | .["650"].subfields[] | select(has("a")) | .a' records-formatted.json
```

Or we can examine general subdivisions (`$x` subfield) of the 650 subfields and tabulate the data
by piping through `sort`, `uniq -c`, and `sort`:

```
jq '.fields[] | select(has("650")) | .["650"].subfields[] | select(has("x")) | .x' records-formatted.json | sort | uniq -c | sort
```

For other fields to examine, see the [MARC 21 Reference Materials sheet][loc_marc].

### `jq` breakdown

Selects all fields:

```
jq '.fields[]' records-formatted.json
```

Selects all **650** fields:

```
jq '.fields[] | select(has("650"))' records-formatted.json
```

Selects only the subfields from the **650** fields:

```
jq '.fields[] | select(has("650")) | .["650"].subfields[]' records-formatted.json
```

Selects only the **x** subfields from the **650** fields:

```
jq '.fields[] | select(has("650")) | .["650"].subfields[] | select(has("x")) | .x' records-formatted.json
```

Selects only the **z** subfields (Geographic subdivision) from the **650** fields:

```
jq '.fields[] | select(has("650")) | .["650"].subfields[] | select(has("z")) | .z' records-formatted.json
```

### Other formats

We can convert the original MARC data to XML:

```
yaz-marcdump -o marcxml records.marc > records.xml
```

We can query the XML data with the `xmlstarlet` command, which is similar to `jq` but for XML structured data.

### Downloading All Results

The process above saved only records we examined with the `show` command.
The following `find` query locates 120 records and then the `show` command below allows us to save to file all 120 records.

```
$ yaz-client
Z> set_marcdump records.new
Z> open saalck-uky.alma.exlibrisgroup.com:1921/01SAA_UKY
Z> find @and @attr 1=4 "technology" @attr 1=21 "library science"
Z> show 1 +120
Z> quit
```

Then convert that to JSON:

```
yaz-marcdump -o json records.new > records_new.json
```

Then we can follow the steps above to convert to JSON and examine the file with `jq`.
One thing we learn with bigger data sets is that data gets messy.
In the 120 records, I found differences in capitalization, usage of punctuation, and other variations that are mistakes.
The following command helps to clean some of that up.
The command is technically a one-liner, but I've broken it up on multiple lines by including a backslash at the end `\`.

```
jq '.fields[] | select(has("650")) | .["650"].subfields[] | select(has("a")) | .a' records_new.json |\
sort | \
sed 's/\.//g' | \
awk '{ print tolower($0) }' | \
sort | \
uniq -c | \
sort -n
```

In the following, I add a final `sed` and `awk` command on the last two lines.
The final `sed` command deletes the most common subject heading, which is **library science**.
Since these are all **library science** records, including it in the results is meaningless.
The final `awk` command sums the number of records from the tabulated count.

```
jq '.fields[] | select(has("650")) | .["650"].subfields[] | select(has("a")) | .a' records_new.json |\
sort | \
sed 's/\.//g' | \
awk '{ print tolower($0) }' | \
sort | \
uniq -c | \
sort -n | \
sed '$d' | \
awk '{ sum+=$1 } END{print sum}'
```

Because these commands are query agnostic, they can be used to examine subject headings in the catalog from other queries.
We can even select for other subfields, like the `z` **650** subfield to get the geographical divisions and
use that to map out the geographies reported in the subject headings in a catalog.

## Conclusion

Z39.50 is often presented as an abstract information retrieval concept even though it has played a central
part of searching online catalogs and databases for nearly 50 years.
The protocol, using tools like `yaz`, can be used to build search interfaces to bibliographic data.
For example, see:

- [A Guide to the PHP YAZ Library for Information Retrieval](https://reintech.io/blog/guide-to-php-yaz-library-information-retrieval)
- [Fun with bibliographic indexes, bibliographic data management software, and Z39.50](https://sites.nd.edu/emorgan/2013/11/fun/)
If you are interested in establishing a connection to the Library of Congress's catalog,
use the following server address:

```
Z> open z3950.loc.gov:7090/voyager
```

[bib1_attr]:https://www.loc.gov/z3950/agency/defns/bib1.html
[jq_tutorial]:https://jqlang.github.io/jq/tutorial/
[json_mdn]:https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON
[loc_marc]:https://www.loc.gov/marc/umb/um07to10.html
[locz3950]:https://www.loc.gov/z3950/agency/
[marc_loc]:https://www.loc.gov/marc/bibliographic/
[sru_exlibris]:https://developers.exlibrisgroup.com/alma/integrations/SRU/
[sru_loc]:https://www.loc.gov/standards/sru/
[srw_u_oclc]:https://www.oclc.org/research/areas/data-science/srw.html
[yaz_client]:https://www.indexdata.com/resources/software/yaz/
