# Creating a Bare Bones OPAC

In this section,
we're going to create a bare bones and
very basic OPAC.
The idea is simply to acquire an
intuition and understanding of how data
from a relational database is
retrieved and entered using
various technologies.

A real integrated library system
is much more complex than what
we are doing here, but
the fundamental ideas are the same:
we enter data into a database,
and we retrieve data from a database.
And then a whole slew of other technologies
are added to present the data in a user-friendly
way: HTML, CSS, and JavaScript.

Integrated library systems (ILS) also provide
multiple modules for patron management,
acquisitions, circulation, cataloging,
serials management, authorities, reporting,
and so forth
(see [Koha: About](koha-about)].
All of those modules rely on some kind
of underlying relational database,
like MySQL
(which is what Koha uses).
And this results in a complex,
interconnected set of tables.
We are working with only one table
in our database,
the **books** table.
In reality, an ILS will rely on
dozens of tables.

In the prior section,
we created a MySQL database
called **opacdb**.
That database has one table,
called **books**.
Then we created a file that
used PHP to retrieve the data
from the **books** table
and present it on a web page.

In this section,
we are going to use different
PHP code that will allow us
to search the **books** table
and retrieve results based
on our search query.
In this way,
we are more closely mimicking
an OPAC,
even though we're still far from
creating anything that's full fledged.

## Creating the HTML Page and a PHP Search Page

The first thing we do is
create a basic HTML page that
contains a form for entering queries.
We'll call this HTML page with the form
**opacbb.html** (just a made up name).
When a user clicks on the submit button
in the form,
the form will activate a PHP script
called **search.php**.
That **search.php** will establish
a connection to the OPAC database
that we already have created.
Our PHP script will contain a special
MySQL query that will allow us to
search all the fields in our **books** table.
The it will iterate through each row of
the **books** table and return results
that match our query.
We also add two date fields to our form
to limit results by publication dates,
which we labeled as **copyright** in our
MySQL **books** table.

### HTML Form

Here is the HTML for our search page:

```
<html>
<head>
<title>MySQL Server Example</title>
</head>
<body>

<h1>A Basic OPAC</h1>

<p>In the form below,
<b>optionally</b> enter text in the search field.
You can search by author, title, or publisher.
Capitalization is not necessary.
It's okay to enter partial information,
like part of an author's, title's, or publisher's name.</p>

<p>The date fields are <b>required</b>.
You can use the date fields to limit results.
I added some extra records,
which you can view to know what you can query:</p>

<p><a href="http://11.111.222.222/opac.php">http://11.111.222.222/opac.php</a></p>

<p>This is very much a toy, stripped down OPAC.
The records are basic.
Not only do they not conform to MARC,
but they don't even conform to something
as simple as Dublin Core.
I also don't provide options
to select different fields,
like author, title, or publisher fields.
Instead the search field below searches
all the fields in our <b>books</b> table.
The key idea is to get a sense,
an intuition, of how an OPAC works, though.</p>

<h2>My Basic Library OPAC</h2>
<form method="post" action="search.php">
    <label for="search">Search:</label>
    <input type="text" name="search" id="search">
    <br>
    <label for="start_date">Start Date:</label>
    <input type="date" name="start_date" id="start_date">
    <br>
    <label for="end_date">End Date:</label>
    <input type="date" name="end_date" id="end_date">
    <br>
    <input type="submit" value="Search">
</form>


</body>
</html>
```

### PHP Search Script

Here is the PHP for our search script:

```
<?php
// Load MySQL credentials
require_once 'login.php';

// Establish connection
$conn = mysqli_connect($db_hostname, $db_username, $db_password) or
  die("Unable to connect");

// Open database
mysqli_select_db($conn, $db_database) or
  die("Could not open database '$db_database'");

// Check if search query was submitted
if (isset($_POST['search'])) {
    // Sanitize user input to prevent SQL injection attacks
    $search = mysqli_real_escape_string($conn, $_POST['search']);

    // Get the start and end dates for the date range
    $start_date = mysqli_real_escape_string($conn, $_POST['start_date']);
    $end_date = mysqli_real_escape_string($conn, $_POST['end_date']);

    // Build the MySQL query with a WHERE
    // clause that includes the date range filter
    $query = "SELECT * FROM books WHERE
	    (author LIKE '%$search%' OR
		title LIKE '%$search%' OR
		publisher LIKE '%$search%') AND
		copyright BETWEEN '$start_date' AND '$end_date'";

    // Execute the query
    $result = mysqli_query($conn, $query);

    // Check if any results were returned
    if (mysqli_num_rows($result) > 0) {
        // Loop through the results and output them
        while ($row = mysqli_fetch_assoc($result)) {
            echo "ID: " . $row["id"] . "<br>";
            echo "Author: " . $row["author"] . "<br>";
            echo "Title: " . $row["title"] . "<br>";
            echo "Publisher: " . $row["publisher"] . "<br>";
            echo "Copyright: " . $row["copyright"] . "<br><br>";
        }
    } else {
        echo "No results found.";
    }

    // Free up memory by closing the MySQL result set
    mysqli_free_result($result);
}

// Close the MySQL connection
mysqli_close($conn);

echo "<p>Return to search page: <a href='http://11.111.222.222/opacbb.php'>http://11.111.222.222/opacbb.php</a></p>";

?>
```

## Modifications

Replace my IP address (11.111.222.222) above
with your IP address.
Add more records,
using MySQL,
to your **books** table,
and test your queries.

To add records to your **books** table,
recall that we used the **insert into**
MySQL statements.
Here's the example from the prior lesson.
Use it to add titles that are of interest to you.

First connect to the MySQL server:

```
mysql -u opacuser -p
```

Then run the `insert` command with
the data for the new records:

```
insert into books
(author, title, publisher, copyright) values
('Emma Donoghue', 'Room', 'Little, Brown \& Company', '2010-08-06'),
('Zadie Smith', 'White Teeth', 'Hamish Hamilton', '2000-01-27');
```

## Conclusion

In this lesson,
we created a very bare bones OPAC
simply to express the fundamental idea
of how data is stored and retrieved on the web.
In reality, what separates an OPAC,
or a discovery service in a modern
integrated library system
or library service platform,
from other databases on the web
is the structure of the records
that are stored in the relational database.
Such records are structured using MARC.
Our records are very simply structured,
but still,
I hope this helps in creating an intuition
about how OPACs and like function.

[koha-about]:https://koha-community.org/about/
