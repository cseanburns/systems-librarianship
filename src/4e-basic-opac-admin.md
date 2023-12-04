# Creating a Bare Bones Cataloging Module

If you have worked with an integrated library system
(or took my electronic resource management class),
then you know that an OPAC is simply one module out
of several that makeup an integrated library system (ILS).
Integrated library systems, and the
newer library service platforms (LSP),
provide [other modules for other types of work][ERMILS].
These include modules for acquisitions, authority files,
circulation, course reserves, patron management, and more.

In this section,
we are going to create a bare bones cataloging module in
the same kind of way that we created a bare bones OPAC.
Up until this point,
you have been adding records to your OPAC
using the MySQL command interface.
But unless you are a full time database administrator
or programmer,
it's unlikely that you would add data to your system
via that interface.
Instead you would use a fancy graphical user interface,
which is what integrated library systems provide.
The reason we started off with MySQL is not because
you would necessarily use this interface on a daily basis.
Rather, it's because I want you to understand the
foundations of these technologies.

## Creating the HTML Page and a PHP Cataloging Page

Like in the last excerise,
the first thing we do is create a basic HTML page that
contains a form for entering our bibliographic data.
Again, our cataloging *module* will not be
real world like.
The goal here is to build an intuition about
how these technologies work and
to also provide some grounding if you do want
to pursue a more technical path.

The form that we will create also needs to mirror
the data structure in the **books** table that we
created in our prior lesson.
That means it will only contain four fields:

- author
- title
- publisher
- copyright

I'll call this page **index.html**.
I'll create a new directory for this module:

```
cd /var/www/html
sudo mkdir cataloging
```

Then I'll use nano to create the index.html
file and add the content:

```
cd cataloging
sudo nano index.html
```

In **index.html**, 
we add the following content:

```
<!DOCTYPE html>
<html>
<head>
	<title>Enter Records</title>
</head>
<body>
	<h1>OPAC Library Administration</h1>

	<p>This is the library administration page for entering records into the OPAC.</p>
	<p>Please do not use this page unless you are an authorized cataloger.</p>

	<form action="insert.php" method="post">
		<label for="author">Author:</label>
		<input type="text" name="author" id="author" required><br><br>

		<label for="title">Book Title:</label>
		<input type="text" name="title" id="title" required><br><br>

		<label for="publisher">Publisher:</label>
		<input type="text" name="publisher" id="publisher" required><br><br>

		<label for="copyright">Copyright:</label>
		<input type="date" id="copyright" name="copyright">

		<input type="submit" value="Submit">
	</form>
</body>
</html>
```

## PHP Insert Script

The **index.html** page will provide a user interface,
that is, a form,
for entering our bibliographic data.
However, the PHP script is needed
to communicate and add the data from our
form into our MySQL database and **books** table.

Also, just as the HTML form has to
match the data structure of the **books** table,
the PHP script also needs to match the form
from the HTML page and the data structure
in the **books** table.

Here is the PHP script,
which I call **insert.php**:

```
<?php

// Load MySQL credentials
require_once '../login.php';

// Establish connection
$conn = mysqli_connect($db_hostname, $db_username, $db_password) or
  die("Unable to connect");

// Open database
mysqli_select_db($conn, $db_database) or
  die("Could not open database '$db_database'");

// Prepare and bind SQL statement
$stmt = $conn->prepare("INSERT INTO books (author, title, publisher, copyright) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $author, $title, $publisher, $copyright);

// Set parameters and execute statement
$author = $_POST["author"];
$title = $_POST["title"];
$publisher = $_POST["publisher"];
$copyright = $_POST["copyright"];

if ($stmt->execute() === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();

echo "<p>Return to the cataloging page: <a href='http://11.111.111.111/cataloging/'>http://11.111.111.111/cataloging/</a></p>";
?>
```

## Security

Since our HTML and PHP files allow us
to enter data into our MySQL database
from a simple web interface,
we need to limit access to the module.
Again, in a real-world situation,
modules like these would have a variety of
security measures in place to prevent
wrongful data entry.
In our case,
we will rely on a simple authorization
mechanism provided by the Apache2 server
called [htpasswd][htpasswd].

First, we create an authentication file
in our **/etc/apache2** directory,
which is where the **Apache2** web server
stores its configuration files.
The file will contain a **hashed** password
and a username we give it.
In the following command,
I set the username to **libcat**, but
it could be anything:

```
sudo htpasswd -c /etc/apache2/.htpasswd libcat
```

Next we need to tell the Apache2 web server
that we will use the `htpasswd` to control
access to our cataloging module.
To do that,
we use `nano` to open the **apache2.conf** file.
We need

```
sudo nano /etc/apache2/apache2.conf
```

In the **apache2.conf** file,
look for the following code block / stanza.
We are interested in the third line in the stanza,
which is line 173 for me, and
probably is for you, too.

```
<Directory /var/www/>
  Options Indexes FollowSymLinks
  AllowOverride None
  Require all granted
</Directory>
```

Carefully, we need to change the word
**None** to the word **All**:

```
<Directory /var/www/>
  Options Indexes FollowSymLinks
  AllowOverride All
  Require all granted
</Directory>
```

Next, change to the **cataloging** directory and
use `nano` to create a file called **.htaccess**
(note the leading period):

```
cd /var/www/html/cataloging
sudo nano .htaccess
```

Add the following content to **.htaccess**:

```
AuthType Basic
AuthName "Authorization Required"
AuthUserFile /etc/apache2/.htpasswd
Require valid-user
```

Check that the configuration file is okay:

```
apachectl configtest
```

If you get a **Syntax OK** message,
then restart Apache2 and
check its status:

```
sudo systemctl restart apache2
systemctl status apache2
```

Now visit your cataloging module.
You should be required to enter the username
and password that you created with `htpasswd`.

## Conclusion

In the last lesson,
we created a very bare bones OPAC
that would allow patrons to
search our catalog.
In this lesson,
we learned how to create a very
bare bones cataloging module
that would allow librarians
to add bibliographic data
and records to our OPAC.

Add some records using the above form,
and then return to your OPAC and
conduct some queries to confirm
that the new records have been added.

You can also use the MySQL command line
interface to view the new records,
just like we did a couple of lessons ago.

In a production level environment,
we would add quite a bit more.
Our MySQL database would contain
many more tables that allow storing
data related to the modules listed above.
We would also like to make our modules
graphically attractive and provide more content.
That would mean we would add
[Cascading Style Sheets (CSS)][css] and
[JavaScript][javascript] to create an
attractive and usable interface.
But that would be a whole other class.

[ERMILS]:https://cseanburns.net/WWW/ERM-book/04-erm-ils.html#administration
[css]:https://en.wikipedia.org/wiki/CSS
[javascript]:https://en.wikipedia.org/wiki/JavaScript
[htpasswd]:https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-18-04
