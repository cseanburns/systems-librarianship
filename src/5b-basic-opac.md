# Creating a Bare Bones OPAC

In this section, we're going to create a bare bones, very basic OPAC.
The idea is simple: to acquire an intuition and understanding of how data
from a relational database is retrieved and entered using LAMP technologies.

A real integrated library system (ILS) is much more complex than what we are doing here, but
the fundamental ideas are the same:
we enter data into a database, and we retrieve data from a database.
In practice, a whole slew of other technologies are added to present the data in a user-friendly way: HTML, CSS, and JavaScript.

ILSes provide modules for patron management, acquisitions, circulation, cataloging,
serials management, authorities, reporting, and sometimes more (see [Koha: About][koha_about]).
Those modules rely on some kind of underlying relational database, like MySQL (which is what Koha uses).
And this results in a complex, interconnected set of tables.
We are working with only one table in our database, the **books** table.
In reality, an ILS will rely on dozens of tables.

In the prior section, we created a MySQL database called **opacdb**, which has one table, called **books**.
We also created a PHP file to retrieve the data from the **books** table and present it on a web page.

In this section, we are going to use different PHP code that will allow us to search the **books** table.
In this way, we more closely mimic an OPAC.

## Creating the HTML Page and a PHP Search Page

The first thing we do is create a basic HTML page that contains a form for entering queries.
We'll call this HTML page with the form **mylibrary.html**.
When a user clicks on the submit button in the form, the form will activate a PHP script called **search.php**.
That **search.php** will establish a connection to the OPAC database that we already have created.
Our PHP script will contain a special MySQL query that will allow us to search all the fields in our **books** table.
Then it will iterate through each row of the **books** table and return results that match our query.
We also add two date fields to our form to limit results by publication dates,
which we labeled as **copyright** in our MySQL **books** table.

### HTML Form

Here is the HTML for our search page, titled **mylibrary.html**:

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>MySQL Server Example</title>
	</head>
<body>

	<h1>A Basic OPAC</h1>

	<p>In the form below, <b>optionally</b> enter text in the search field.
	You can search by author, title, or publisher.
	Capitalization is not necessary.
	It's okay to enter partial information, like part of an author's, title's, or publisher's name.</p>

	<p>The date fields are <b>required</b>.
	You can use the date fields to limit results.
	I added some extra records, which you can view to know what you can query:</p>

	<p><a href="opac.php">OPAC</a></p>

	<p>This is very much a toy, stripped down
	<a href="https://en.wikipedia.org/wiki/Online_public_access_catalog">OPAC</a>.
	The records are basic.
	Not only do they not conform to <a href="https://www.loc.gov/marc/">MARC</a>,
	they don't even conform to something as simple as <a href="https://www.dublincore.org/">Dublin Core</a>.

	<p>I also don't provide options to select different fields, like author, title, or publisher fields.
	Instead the search field below searches all the fields (author, title, publisher) in our <b>books</b> table.</p>

	<p>The key idea is to get a sense of how an OPAC works, though.</p>

	<h2>My Basic Library OPAC</h2>

	<form method="post" action="search.php">
		<label for="search">Search (optional):</label>
		<input type="text" name="search" id="search">
		<br>
		<label for="start_date">Start Date:</label>
		<input type="date" name="start_date" id="start_date" required>
		<br>
		<label for="end_date">End Date:</label>
		<input type="date" name="end_date" id="end_date" required>
		<br>
		<input type="submit" value="Search">
	</form>

</body>
</html>
```

### PHP Search Script

Here is the PHP for our search script, which should be named **search.php**:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Results</title>
<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
</style>
</head>
<body>

    <h1>Search Results</h1>

    <?php
    // Load MySQL credentials
    require_once '/var/www/login.php';

    // Enable MySQL error reporting
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Establish connection
    $conn = new mysqli($db_hostname, $db_username, $db_password, $db_database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $search = trim($_POST['search']);
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];

        // Prepared statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM books 
                                WHERE (author LIKE ? OR title LIKE ? OR publisher LIKE ?) 
                                AND copyright BETWEEN ? AND ?");

        // Use wildcard search
        $search_param = "%$search%";
        $stmt->bind_param("sssss", $search_param, $search_param, $search_param, $start_date, $end_date);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "<table>";
            echo "<tr><th>ID</th><th>Author</th><th>Title</th><th>Publisher</th><th>Copyright</th></tr>";

            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . htmlspecialchars($row["id"]) . "</td>";
                echo "<td>" . htmlspecialchars($row["author"]) . "</td>";
                echo "<td>" . htmlspecialchars($row["title"]) . "</td>";
                echo "<td>" . htmlspecialchars($row["publisher"]) . "</td>";
                echo "<td>" . htmlspecialchars($row["copyright"]) . "</td>";
                echo "</tr>";
            }

            echo "</table>";
        } else {
            echo "<p>No results found.</p>";
        }

        $stmt->close();
    }

    $conn->close();
    ?>

    <p><a href="mylibrary.html">Return to search page</a></p>

</body>
</html>
```

## Modifications

Add more records, using MySQL, to your **books** table, and test your queries.
To add records to your **books** table, recall that we used the **insert into** MySQL statements.
Here's the example from the prior lesson.
Use it to add titles that are of interest to you.

First connect to the MySQL server:

```
mysql -u opacuser -p
```

Then run the `insert` command with the data for the new records:

```
insert into books
(author, title, publisher, copyright) values
('Emma Donoghue', 'Room', 'Little, Brown \& Company', '2010'),
('Zadie Smith', 'White Teeth', 'Hamish Hamilton', '2000');
```

## Conclusion

In this lesson, we created a very bare bones OPAC simply to express the fundamental idea
of how data is stored and retrieved on the web.
In reality, what separates an OPAC, or a discovery service in a modern integrated library system
or library service platform, from other databases on the web is the structure of the records
that are stored in the relational database.
Such records are structured using MARC.
Our records are very simply structured, but still, I hope this helps in creating an intuition
about how OPACs and like function.
In the next section, we will learn how to enter data into our catalog,
thereby mimicking the cataloging module of an integrated library system.

[koha_about]:https://koha-community.org/about/
