# Installing and Configuring MySQL

## Introduction

We started our LAMP stack when we installed
Apache2 on Linux, and
then we added extra functionality when
we installed and configured PHP to work with Apache2.
In this section,
our objective is to complete
the LAMP stack and install and
configure [MySQL][wikipediaMySQL].

If you need a refresher on relational databases, see:
[Introduction to Relational Databases][introRelDatabases].

## Install and Set Up MySQL

In this section, we'll learn how to install,
setup, secure, and configure the MySQL
relational database so that it works
with the Apache2 web server and
the PHP programming language.

First, let's install MySQL Community Server, and
then log into the MySQL shell
under the **MySQL root** account.

```
sudo apt install mysql-server
```

This should also start and
enable the database server, but
we can check if it's running and enabled
using the ``systemctl`` command:

```
systemctl status mysql 
```

<!--
Next we need to run a post installation script
called ``mysql_secure_installation``
that sets up the MySQL root password and 
performs some security checks.
To do that, run the following command, and
**be sure to save the MySQL root password you create**:

```
sudo mysql_secure_installation
```

Here you create a root password
for the MySQL database server.
**Be sure to save that password.**
When you run the above script,
you'll get a series of prompts
to respond to like below.
Press **enter** for the first prompt,
press **Y** for the prompts marked **Y**,
and input your own password.
Since this server is exposed to the internet,
be sure to use a complex password.

```
Enter the current password for root (enter for none):
Set root password: Y
New Password: XXXXXXXXX
Re-enter new password: XXXXXXXXX
Remove anonymous users: Y
Disallow root login remotely: Y
Remove test database and access to it: Y
Reload privilege tables now: Y
```
-->

We can login to the database to test it.
In order to do so,
we have to become the **root Linux user**,
which we can do with the following command:

```
sudo su
```

> Note: we need to be careful when we enter commands on the
> command line, because it's a largely unforgiving computing
> environment. But we need to be especially careful when we
> are logged in as the Linux root user. This user can delete
> anything, including files that the system needs in order
> to boot and operate.

After we are Linux root,
we can login to MySQL,
run the ``show databases;`` command, and
then exit with the ``\q`` command:

> **NOTE:** we need to distinguish between the regular user
> prompt of our Linux accounts and the MySQL prompt below.
> In the following, I will use the greater than symbol \> to
> represent the MySQL prompt. Do not type that prompt when
> you are using MySQL.

```
root@hostname:~# mysql -u root
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.0.32-0ubuntu0.20.04.2 (Ubuntu)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.002 sec)
```

> Note: If we are logging into the root database account
> as the root Linux user, we don't need to enter our password.

## Create and Set Up a Regular User Account

We need to reserve the **root MySQL user** for
special use cases and
instead create a **regular MySQL user**, or
more than one MySQL user, as needed.

To create a regular MySQL user,
we use the ``create`` command.
In the command below,
I'll create a new user called **opacuser**
with a complex password within the single quotes
at the end (marked with a series of Xs here for demo purposes):

```
> create user 'opacuser'@'localhost' identified by 'XXXXXXXXX';
```

If the prompt returns a **Query OK** message,
then the new user should have been created without any issues.

## Create a Practice Database

As the root database user,
let's create a new database for a regular, new user.

The regular user will be
granted **all privileges**
on the new database,
including all its tables.
Other than granting **all privileges**,
we could limit the user to specific privileges, including:
**CREATE, DROP, DELETE, INSERT, SELECT, UPDATE, and GRANT OPTION**.
Such privileges may be called operations or functions, and
they allow MySQL users to use and modify the databases,
where appropriate.
For example,
we may want to limit the **opacuser** user to
only be able to use **SELECT** commands.
It totally depends on the purpose of the database and
our security risks.

```
> create database opacdb;
> grant all privileges on opacdb.* to 'opacuser'@'localhost';
> show databases;
```

Exit out of the MySQL database
as the **root MySQL user**, and
then exit out of the **root
Linux user account**, and
you should be back to your
normal Linux user account:

```
> \q
root@hostname:~# exit
```

> Note: relational database keywords are often written in
> all capital letters. As far as I know, this is simply a
> convention to make the code more readable. However, in
> most cases I'll write the keywords in lower case letters.
> This is simply because, by convention, I'm super lazy.

## Logging in as Regular User and Creating Tables

We can now start doing MySQL work.
As a reminder,
we've created a new MySQL user named **opacuser** and
a new database for **opacuser** that is called **opacdb**.
When we run the ``show databases`` command as
the **opacuser** user,
we should see the **opacdb** database.
Note below that I use the ``-p`` option.
This instructs MySQL to request the password
for the **opacuser** user, which
is required to log in.

```
mysql -u opacuser -p
> show databases;
> use opacdb;
```

A database is not worth much without data.
In the following code,
I create and define a new table for our **opacdb** database.
The table will be called **books**, and
it will contain data describing some books.
We will keep this table very simple and
use only three fields:

```
> create table books 
    -> (
    -> id int unsigned not null auto_increment,
    -> author varchar(150) not null,
    -> title varchar(150) not null,
    -> copyright date not null,
    -> primary key (id)
    -> );
Query OK, 0 rows affected (0.07 sec)

> show tables;
> describe books;
```

Congratulations! Now create some records for that table.

### Adding records into the table

We can populate our **opacdb** database
with some data.
(I simply picked the first book listed from
the NYTimes best lists of books for the years
2019-2022.)
We'll use the ``insert`` command to add our records
into our **distribution** table:

```
> insert into books (author, title, copyright) values
    -> ('Jennifer Egan', 'The Candy House', '2022-04-05'),
    -> ('Imbolo Mbue', 'How Beautiful We Were', '2021-03-09'),
    -> ('Lydia Millet', 'A Children\'s Bible', '2020-05-12'),
    -> ('Julia Phillips', 'Disappearing Earth', '2019-05-14');
> select * from books;
```

Success! Now let's test our table.

### Testing Commands

We will complete the following tasks
to refresh our MySQL knowledge:

- retrieve some records or parts of records, 
- delete a record,
- alter the table structure so that it will hold more data, and
- add a record:

```
> select author from books;
> select copyright from books;
> select author, title from books;
> select author from books where author like '%millet%';
> select title from books where author like '%mbue%';
> select author, title from books where title not like '%e';
> select * from books;
> alter table books
    -> add publisher varchar(75) after title;
> describe books;
> update books set publisher='Simon \& Schuster' where id='1';
> update books set publisher='Penguin Random House' where id='2';
> update books set publisher='W. W. Norton \& Company' where id='3';
> update books set publisher='Knopf' where id='4';
> select * from books;
> delete from books where author='Julia Phillips';
> insert into books
    -> (author, title, publisher, copyright) values
    -> ('Emma Donoghue', 'Room', 'Little, Brown \& Company', '2010-08-06'),
    -> ('Zadie Smith', 'White Teeth', 'Hamish Hamilton', '2000-01-27');
> select * from books;
> select author, publisher
    -> from books
    -> where copyright < '2011-01-01';
> select author from books order by copyright;
> \q
```

## Install PHP and MySQL Support

The next goal is to complete the connection
between PHP and MySQL so that
we can use both for our websites.

First install PHP support for MySQL.
We're installing some modules alongside the basic support.
These may or may not be needed,
but I'm installing them to demonstrate some basics.

```
sudo apt install php-mysql php-mysqli
```

And then restart Apache2 and MySQL:

```
sudo systemctl restart apache2
sudo systemctl restart mysql
```

### Create PHP Scripts

In order for PHP to connect to MySQL,
it needs to authenticate itself.
To do that,
we will create a **login.php** file
in **/var/www/html**.
We also need to change the group ownership
of the file and its permissions so that
the file can be read by the Apache2 web server
but not by the world,
since this file will store password information.

```
cd /var/www/html/
sudo touch login.php
sudo chmod 640 login.php
sudo chown :www-data login.php
ls -l login.php
sudo nano login.php
```

In the file,
add the following credentials.
If you used a different database name than **opacdb**
and a different username than **opacuser**,
then you need to substitute your names below. 
You need to use your own password where
I have the Xs:

```
<?php // login.php
$db_hostname = "localhost";
$db_database = "opacdb";
$db_username = "opacuser";
$db_password = "XXXXXXXXX";
?>
```

Next we create a new PHP file for our website.
This file will display HTML but
will primarily be PHP interacting with our
**books** database.

Create a file titled **opac.php**.

```
sudo nano opac.php
```

Then copy over the following text
(I suggest you transcribe it, especially
if you're interested in learning a bit of PHP, but
you can simply copy and paste it into the ``nano`` buffer):

```
<html>
<head>
<title>MySQL Server Example</title>
</head>
<body>

<h1>A Basic OPAC</h1>

<p>We can retrieve all the data from our database and book table
using a couple of different queries.</p>

<?php

// Load MySQL credentials
require_once 'login.php';

// Establish connection
$conn = mysqli_connect($db_hostname, $db_username, $db_password) or
  die("Unable to connect");

// Open database
mysqli_select_db($conn, $db_database) or
  die("Could not open database '$db_database'");

echo "<h2>Query 1: Retrieving Publisher and Author Data</h2>";

// Query 1
$query1 = "select * from books";
$result1 = mysqli_query($conn, $query1);

while($row = $result1->fetch_assoc()) {
	echo "<p>Publisher " . $row["publisher"] .
		" published a book by " . $row["author"] .
		".</p>";
}

mysqli_free_result($result1);

echo "<h2>Query 2: Retrieving Author, Title, Date Published Data</h2>";

$result2 = mysqli_query($conn, $query1);
while($row = $result2->fetch_assoc()) {
	echo "<p>A book by " . $row["author"] .
		" titled <em>" . $row["title"] .
		"</em> was released on " . $row["copyright"] .
		".</p>";
}

// Free result2 set
mysqli_free_result($result2);

/* Close connection */
mysqli_close($conn);

?>

</body>
</html>
```

Save the file and exit out of ``nano``.

### Test Syntax

After you save the file and exit the text editor,
we need to test the PHP syntax.
If there are any errors in our PHP,
these commands will show the line numbers
that are causing errors or leading up to errors.
Nothing will output if all is well with the first command.
If all is well with the second command, HTML should be outputted:

```
sudo php -f login.php
sudo php -f index.php
```

## Conclusion

Congratulations! If you've reached this far,
you have successfully created a LAMP stack.
In the process,
you have learned how to install and set up MySQL,
how to create MySQL root and regular user accounts,
how to create a test database
with play data for practicing, and
how to connect this with PHP for display on a webpage.

In regular applications of these technologies,
there's a lot more involved, but
completing the above process is a great start to
learning more.

[wikipediaMySQL]:https://en.wikipedia.org/wiki/MySQL
[introRelDatabases]:https://mariadb.com/kb/en/introduction-to-relational-databases/
[mariadbDocs]:https://mariadb.org/documentation/
