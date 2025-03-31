# Creating a Bare Bones Cataloging Module

If you have worked with an integrated library system (ILS) or a more modern library service platform (LSP),
then you know that an OPAC or discovery system, respectively,
is simply one [module out of several that makeup an ILS or LSP][ERM_ILS].
Other modules include acquisitions, authority files, circulation, course reserves, patron management, and more.
In the prior section, we created one of those modules: a bare bones OPAC.
In this section, we are going to create a bare bones cataloging module in the same kind of way.

Up until this point, you have added records to your OPAC using the MySQL command interface.
But unless you are a full time database administrator or programmer,
it's unlikely that you would add data to your system via that interface.
Instead you would use an application via a fancy graphical user interface, i.e., integrated library system.
The reason we started off with MySQL is not because you would necessarily use this interface on a daily basis.
Rather, it's because I want you to understand the foundations of these technologies and
the how they get translated for users when they become web applications.

## Creating the HTML Page and a PHP Cataloging Page

Like in the last exercise, the first thing we do is create a basic HTML page that
contains a form for entering our bibliographic data.
Again, our cataloging *module* will not be real world like.
The goal here is to build an intuition about how these technologies work and
to provide some grounding if you do want to pursue a more technical path.

The form that we will create needs to mirror the data structure in the **books** table that we created in our prior lesson.
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

Then I'll use a text editor to create the index.html file and add the content:

```
cd cataloging
sudo nano index.html
```

In **index.html**, we add the following content:

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
		<input type="number" name="copyright" id="copyright" min="1000" max="2300" required>

		<input type="submit" value="Submit">
	</form>
</body>
</html>
```

## PHP Insert Script

The **index.html** page will provide a user interface, that is, a form, for entering our bibliographic data.
However, the PHP script is needed to communicate and add the data from our form into our MySQL database and **books** table.

Also, just as the HTML form has to match the data structure of the **books** table,
the PHP script also needs to match the form from the HTML page and the data structure in the **books** table.

Here is the PHP script, which I call **insert.php**, which you'll notice was referenced in the HTML code above:

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Cataloging: Data Entry</title>
</head>
<body>

<h1>Cataloging: Data Entry</h1>

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
?>

<p><a href='index.html'>Return to Cataloging Page</a></p>
<p><a href='../mylibrary.html'>Return to Library Home Page</a></p>
</body>
</html>
```

## Security

Since our HTML and PHP files allow us to enter data into our MySQL database from a simple web interface,
we need to limit access to the module.
In a real-world situation, modules like these would have a variety of security measures in place to prevent wrongful data entry.
In our case, we will rely on a simple authorization mechanism provided by the Apache2 server called [htpasswd][htpasswd].

First, we create an authentication file in our **/etc/apache2** directory,
which is where the **Apache2** web server stores its configuration files.
The file will contain a **hashed** password and a username we give it.
In the following command to set the password, I set the username to **libcat**, but it could be anything:

```
sudo htpasswd -c /etc/apache2/.htpasswd libcat
```

Next we need to tell the Apache2 web server that we will use the `htpasswd` to control access to our cataloging module.
To do that, we use a text editor to open the **apache2.conf** file.

```
sudo nano /etc/apache2/apache2.conf
```

In the **apache2.conf** file, look for the code block / stanza below.
We are interested in the third line in the stanza, which is line 172 for me, and probably is for you, too.

```
<Directory /var/www/>
  Options Indexes FollowSymLinks
  AllowOverride None
  Require all granted
</Directory>
```

**Carefully**, we need to change the word **None** to the word **All**:

```
<Directory /var/www/>
  Options Indexes FollowSymLinks
  AllowOverride All
  Require all granted
</Directory>
```

Next, change to the **cataloging** directory and use our text editor to create a file called **.htaccess**
(note the leading period in the file name):

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

If you get a **Syntax OK** message, then restart Apache2 and check its status:

```
sudo systemctl restart apache2
systemctl status apache2
```

### Permissions and Ownership

The Apache2 web server has a user account on your Linux server.
The account name is **www-data**, and it's account details are stored in the **/etc/passwd** file:

```
grep "www-data" /etc/passwd
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
```

From the output, we can see that the **www-apache** user's home directory is **/var/www** and
its default shell is **/usr/sbin/nologin**.
See `man nologin` for details, but in short, the `nologin` prevents the **www-data** account to be able to login to a shell.

> You can compare the output of the above `grep` command with your account
> information that is stored in **/etc/passwd**. Use the following command:
> `grep $USER /etc/passwd` to do so. You'll see, for example, that your home
> directory is listed there as well as your default shell, which is `bash`.

The benefit with having Apache2 a user is that we can limit file permissions and ownership to this user.

The general guidelines for this are as follows:

- Static files (like HTML, CSS, JS) might not need to be writable by the Apache
  server, so they could be owned by a different user (like your own user
  account) but be readable by **www-data**.
- Directories where Apache needs to write data (like upload directories) or
  applications that need write access should be owned by **www-data**.
- Configuration files (incl. files like **login.php**) should be readable by
  **www-data** but not writable, to prevent unauthorized modifications.

We can initiate this guidelines with the `chown` and `chmod` commands:

1. Change the group ownership of **/var/www/html** to **www-data**:

        sudo chown :www-data /var/www/html

2. Set the **setgid bit** on **/var/www/html**. This command makes it so that
   any new files and directories created within **/var/www/html** will inherit
   the group ownership of the parent directory (**www-data**, in this case).
   While this ensures that group ownership is inherited, the user ownership of
   new files will still be the user that creates the files. In our case, since
   we use `sudo` to work in this directory, that means that the user owner for
   subsequent files and directories will be the Linux **root** user.

        sudo chmod -R g+s /var/www/html

## Get Cataloging!

Now visit your cataloging module.
You should be required to enter the username and password that you created with `htpasswd`.

## Conclusion

In the last lesson, we created a very bare bones OPAC that would allow patrons to search our catalog.
In this lesson, we learned how to create a bare bones cataloging module that would allow librarians
to add bibliographic data and records to the OPAC.

Now try this:

1. Add some records using the above form, and then return to your OPAC and
   conduct some queries to confirm that the new records have been added.
2. Use the MySQL command line interface to view the new records, just
   like we did a couple of lessons ago.

In a production level environment, we would add quite a bit more functionality and security.
Our MySQL database would contain many more tables that allow storing data related to the modules listed above.
We would also like to make our modules graphically attractive and provide more content.
That would mean we would add [Cascading Style Sheets (CSS)][css] and [JavaScript][javascript]
to create an attractive and usable interface.
But that would be a whole other book.

[ERM_ILS]:https://cseanburns.github.io/electronic_resource_mgmt/04-erm-ils.html#administration
[css]:https://en.wikipedia.org/wiki/CSS
[javascript]:https://en.wikipedia.org/wiki/JavaScript
[htpasswd]:https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-18-04
