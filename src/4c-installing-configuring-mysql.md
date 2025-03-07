# Installing and Configuring MySQL

## Introduction

We started our LAMP stack when we installed Apache on Linux.
We added extra functionality when we installed and configured PHP to work with Apache.
In this section, our objective is to complete the LAMP stack and install and configure [MySQL][mysql_wikipedia].

If you need a refresher on relational databases, see:
[Introduction to Relational Databases][intro_rel_databases].
However in the next section, we will explore the database basics from the command line.

## Install and Set Up MySQL

In this section, we'll learn how to install, setup, secure, and
configure the MySQL relational database so that it works with the Apache web server and the PHP programming language.

First, as normal, we make run the following commands to ensure our machines are fully updated:

```
sudo apt update
sudo apt upgrade
sudo apt autoremove
sudo apt clean
```

> Note that sometimes you will have to reboot your machine, mostly when you get a Linux kernel update.
> To do so, run `sudo reboot now`.
> This command will disconnect you from your machine.
> Wait a minute or two, and then reconnect.

Then we install the MySQL Community Server package.
The MySQL Community Server package is a **metapackage** that installs the latest, most secure version of MySQL,
regardless of the software's version number, as well as its dependencies.

```
sudo apt install mysql-server
```

The above install should be fine for us, but note that in some cases you first may want to specifically
confirm which versions are available via the `apt` command since some software (e.g., WordPress)
may require specific versions or above.
You can check that with the following:

```
apt policy mysql-server
```

After installing, you can confirm the version number with the following command
to ensure you know which version you are using:

```
mysql --version
```

The install process should start and enable the database server,
but we can check if it's running and enabled using the `systemctl` command.
Note that you are looking for the lines beginning with `Loaded` and `Active`.

```
systemctl status mysql 
```

Next we need to run a post installation script called `mysql_secure_installation`.
The script performs some security checks and creates a secure, baseline configuration of MySQL.
To do that, run the following command:

```
sudo mysql_secure_installation
```

When you run the above script, you'll get a series of prompts to respond to.
For most responses, you will want to respond with a **Y** for yes.
We will respond with a **Y** to the first question on validating passwords, but to keep things simple,
select **LOW** when prompted for the password validation policy.
This will enforce a weak password policy for testing, but note that in real-world scenarios,
we might want to select a more secure policy.
In the output below, I show how to respond to each question:

```
Validate passwords: Y
Password validation policy: 0 (zero) for LOW
Remove anonymous users: Y
Disallow root login remotely: Y
Remove test database and access to it: Y
Reload privilege tables now: Y
```

We can login to the database now.
In order to do so, we use the following command:

```
sudo mysql -u root
```

> **NOTE:** we need to distinguish between the regular user prompt of our Linux accounts and the MySQL prompt below.
> The default prompt for our user accounts has the following syntax: `user_name@computer_name:path$ `.
> In the following, I will indicate we are at the MySQL prompt with the following text: `mysql>`.
> Do not type that prompt when you are using MySQL.

When I connect to a MySQL server, I like to list the available databases.
To do this, we use the `show databases;` command.
Note that MySQL commands end with a semicolon:

```
mysql> show databases;
```

The following databases should be returned:

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)
```

To exit the MySQL server prompt and return to the Bash shell, we use the following command:

```
mysql> \q
```

## Create and Set Up a Regular User Account

We need to reserve the **root MySQL user** for special administrative cases
and create a **regular MySQL user** account for regular use cases.

To create a regular MySQL user, we use the MySQL `create` command.
In the command below, I create a new user called `opacuser` with a complex password.
The single quotes are quoting the password and are not the password itself.
Thus in the example below, the **Xs** indicate my password.

First, log back into the MySQL server:

```
sudo mysql -u root
```

At the MySQL prompt, create the new user:

```
mysql> create user 'opacuser'@'localhost' identified by 'XXXXXXXXX';
```

If the prompt returns a **Query OK** message,
then the new user should have been created without any issues.

## Create a Practice Database

As the root database user, we create a new database for the user account we just created.
We'll call this database `opacdb` and set the character encoding to UTF-8 to support international characters.
Then we run the MySQL `show` command to view the new database.
Next we grant `all privileges` on the database to the user account `opacuser`.

```
mysql> create database opacdb default character set utf8mb4 collate utf8mb4_unicode_ci;
mysql> show databases;
mysql> grant all privileges on opacdb.* to 'opacuser'@'localhost' with grant option;
```

Other than granting **all privileges**, we could limit the user to specific privileges, including:

- CREATE
- DROP
- DELETE
- INSERT
- SELECT
- UPDATE
- GRANT OPTION
  
Such privileges may be called operations or functions.
They allow MySQL users to use and modify the databases, where appropriate.
For example, we may want to limit the **opacuser** user account to only be able to use **SELECT** commands.
These decisions depend on the purpose of the database and our security risks.

Exit out of the MySQL database as the **root MySQL user**, and then exit out of the **root Linux user account**.
You should be back to your normal Linux user account:

```
mysql> \q
```

> Note: relational database keywords are often written in all capital letters: `CREATE`, `DROP`, `SELECT`, etc.
> As far as I know, this is simply a convention to make the code more readable.
> However, in most cases I'll write the keywords in lower case letters.
> This is simply because, by convention, *I'm lazy*.

## Logging in as Regular User and Creating Tables

We can now start doing MySQL work.
Note that when we login to the MySQL server, we leave the `bash` shell and enter the MySQL command line client.
By default, the prompt for the client is bare-bones.
We can make it more informative, though.
To do so, open your `.bashrc` file:

```
nano .bashrc
```

Scroll to the bottom of the file and add the following:

```
export MYSQL_PS1="[\d]> "
```

Then save and exit and source the file:

```
source ~/.bashrc
```

As a reminder, we've created a new MySQL user named `opacuser` and a new database for `opacuser` that is called `opacdb`.
When we run the `show databases` command as the `opacuser` user, we should see the `opacdb` database.
Note below that I use the `-p` option when logging back into MySQL as the `opacuser`.
This instructs MySQL to request the password for this user, it is required.

```
mysql -u opacuser -p
```

From the MySQL prompt, list the available databases and use the `use` command to switch to the new `opacdb` database:

```
mysql> show databases;
mysql> use opacdb;
```

A database is not worth much without data.
In the following code, I create and define a new table for our `opacdb` database.
The table will be called `books` that will contain data describing, er, some books.
We will keep this table very simple and use only four fields: `id`, `author`, `title`, and `copyright`.
The `id` field will function as a primary key (second to last line in the command below).
This key is used as a unique identifier for a record in the field.
When we create this key as a field called `id`, we state that it should be an integer `id` (or whole number),
that it should only be a positive number `unsigned`,
that it should not be empty `not null`, and
that with each record, it should increment by a single integer `auto_increment`.
When we create the `author` and `title` fields,
we say that these fields can have a maximum length of 150 characters and should not be empty.
When we create the `copyright` field, we limit it to the `year` data type,
which means it has to adhere to a specific syntax `YYYY`, and should not be empty. 

```
mysql> create table books (
        id int unsigned not null auto_increment,
        author varchar(150) not null,
        title varchar(150) not null,
        copyright year(4) not null,
        primary key (ID)
);
```

> Note: A relational database contains tables.
> If you are unfamiliar with this, you can think of a database as an overall Excel spreadsheet file and
> tables as specific sheets in the Excel file.
> There is quite a bit that goes into creating proper tables in database because the composition dictates how well
> data is described and how tables connect and interact with (or **relate to**) each other.
> However, we are going to keep things rather simple in this exercise. 

You can confirm that the table was created by running the following two commands.
The MySQL `show` command lists the tables in a database and the `describe` command describes a table's structure.

```
mysql> show tables;
mysql> describe books;
```

Congratulations! Now create some records for that table.

### Adding records into the table

We can populate our **opacdb** database with some data.
(I simply picked the first book listed from the NYTimes best lists of books for the years 2019-2022.)
We'll use the MySQL `insert` command to add our records into our `books` table.
We need to specify three fields when entering data: `author`, `title`, and `copyright`.
The `copyright` field is a date field, and it should conform to the `YYYY` syntax.
We do not need to specify data for the `id` field because that will be created and will increment automatically.

```
mysql> insert into books (author, title, copyright) values
('Jennifer Egan', 'The Candy House', '2022'),
('Imbolo Mbue', 'How Beautiful We Were', '2021'),
('Lydia Millet', 'A Children\'s Bible', '2020'),
('Julia Phillips', 'Disappearing Earth', '2019');
```

Now we can view all the records that we just created with the MySQL `select` command:

```
mysql> select * from books;
```

Success! Now let's test our table.

### Testing Commands

We will complete the following tasks to refresh our MySQL knowledge or begin to learn how it works.
We will:

- retrieve records or parts of records, 
- delete a record,
- alter the table structure so that it will hold more data, and
- add a record

> Note: each MySQL command ends with a semi-colon.
> Some of the following MySQL commands are single-line, but others are multi-line.
> Regardless if a MySQL command is one-line or multi-line, it doesn't end until it ends with a semi-colon.

Please run the following commands, one at a time:

```
mysql> select author from books;
mysql> select copyright from books;
mysql> select author, title from books;
mysql> select author from books where author like '%millet%';
mysql> select title from books where author like '%mbue%';
mysql> select author, title from books where title not like '%e';
mysql> select * from books;
mysql> alter table books add publisher varchar(75) after title;
mysql> describe books;
mysql> update books set publisher='Simon \& Schuster' where id='1';
mysql> update books set publisher='Penguin Random House' where id='2';
mysql> update books set publisher='W. W. Norton \& Company' where id='3';
mysql> update books set publisher='Knopf' where id='4';
mysql> select * from books;
mysql> delete from books where author='Julia Phillips';
mysql> insert into books
       (author, title, publisher, copyright) values
       ('Emma Donoghue', 'Room', 'Little, Brown \& Company', '2010'),
       ('Zadie Smith', 'White Teeth', 'Hamish Hamilton', '2000');
mysql> select * from books;
mysql> select author, publisher from books where copyright < '2011';
mysql> select author from books order by copyright;
mysql> \q
```

## Install PHP and MySQL Support

The next goal is to complete the connection between PHP and MySQL so that we can use both for our websites.

First install PHP support for MySQL.
We're installing some modules alongside the basic support.
These may or may not be needed, but I'm installing them to demonstrate some basics.

```
sudo apt install php-mysql php-mysqli
```

And then restart Apache and MySQL:

```
sudo systemctl restart apache2
sudo systemctl restart mysql
```

### Create PHP Scripts

In order for PHP to connect to MySQL, it needs to authenticate itself.
To do that, we will create a `login.php` file in in our document root's parent directory: `/var/www`.
We also need to change the group ownership of the file and its permissions (see note below).
This will allow the file to be read by the Apache web server but not by the world.
This prevents the password information from being accessible to web users.

```
cd /var/www
sudo touch login.php
sudo chmod 640 login.php
sudo chown :www-data login.php
ls -l login.php
sudo nano login.php
```

> **A Short Aside on File Ownership and Permissions**
> 
> We haven't covered in detail the concept of file ownership and permissions.
In short, files and directories are owned by users and by user groups.
When we run a command like `ls -l`, the output will show the file owner and the group owner:
> In the output below, the user `root` is the file owner and the group `www-data` is the group owner of the file `login.php`.
>
> ```
> -rw-r----- 1 root www-data    0 Feb 14 02:44 login.php
> ```
> 
> We change the file permissions with the `chmod` command.
> We change the file ownership with the `chown` command.
> In the above code snippet, the `chmod 640 login.php` command changes the file permissions to:
>
> - user owner: read, write
> - group owner: read only
> - other/world: no permissions
>
> For an in-depth tutorial, see [Linux Systems Administrations, Chapter 3.3 File Permissions and Ownership][files_burns]
>  
> When we created the file using the `sudo touch login.php` command, the use of `sudo` creates the file with `root` as the owner.
> The `chown :www-data login.php` command changes the group ownership to `www-data`.
> The `www:data` user is the Apache user.
>  
> Many services, like Apache, have corresponding users on the system.
> Files placed in our document root `/var/www/html` will be served on the web.
> Therefore, those files must have read access for **other/world**.
> But we don't want the `login.php` file to be accessible to the world since it contains login information for our MySQL user.
> Thus, in addition to modifying file ownership and permissions, we also place it in the parent directory `/var/www`.

In the file, add the following credentials.
If for some reason you used a different database name than `opacdb` and a different username than `opacuser`,
then you need to substitute your names below. 
You need to use your own password where I have the `Xs`:

```
<?php // login.php
$db_hostname = "localhost";
$db_database = "opacdb";
$db_username = "opacuser";
$db_password = "XXXXXXXXX";
?>
```

Next we create a new PHP file for our website.
This file will display HTML but will primarily be PHP interacting with our `opacdb` database.

Create a file titled `opac.php` in `/var/www/html`.

```
cd /var/www/html
sudo nano opac.php
```

Then copy over the following text.
I suggest you transcribe it, especially if you're interested in learning a bit of PHP.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MySQL Server Example</title>
</head>
<body>

    <h1>A Basic OPAC</h1>
    <p>We can retrieve all the data from our database and book table using a couple of different queries.</p>

    <?php
    // Load MySQL credentials securely
    require_once '/var/www/login.php';

    // Enable detailed MySQL error reporting
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Establish database connection
    $conn = new mysqli($db_hostname, $db_username, $db_password, $db_database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    echo "<h2>Query 1: Retrieving Publisher and Author Data</h2>";

    // Query using prepared statement
    $stmt = $conn->prepare("SELECT publisher, author FROM books");
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "<p>Publisher " . htmlspecialchars($row["publisher"]) .
             " published a book by " . htmlspecialchars($row["author"]) . ".</p>";
    }

    $stmt->close();

    echo "<h2>Query 2: Retrieving Author, Title, and Date Published Data</h2>";

    $stmt2 = $conn->prepare("SELECT author, title, copyright FROM books");
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    while ($row = $result2->fetch_assoc()) {
        echo "<p>A book by " . htmlspecialchars($row["author"]) .
             " titled <em>" . htmlspecialchars($row["title"]) .
             "</em> was released in " . htmlspecialchars($row["copyright"]) . ".</p>";
    }

    $stmt2->close();
    $conn->close();
    ?>

</body>
</html>

```

Save the file and exit out of `nano`.

### Test Syntax

After you save the file and exit the text editor, we need to test the PHP syntax.
If there are any errors in our PHP, these commands will show the line numbers causing errors or leading up to errors.
Nothing will output if all is well with the first command.
If all is well with the second command, HTML should be outputted:

```
sudo php -f /var/www/login.php
sudo php -f /var/www/html/opac.php
```

Now view the site by opening the public IP address for your server in your browser.
If all goes well, you should see the data in your `opacdb` database and `books` table rendered in your webpage.

## Conclusion

Congratulations! If you've reached this far, you have successfully created a LAMP stack.
In the process, you have learned how to install and set up MySQL, how to create MySQL root and regular user accounts,
how to create a test database with play data for practicing, and how to connect this with PHP for display on a webpage.

In regular applications of these technologies, there's a lot more involved,
but completing the above process is a great start to learning more.

[mysql_wikipedia]:https://en.wikipedia.org/wiki/MySQL
[intro_rel_databases]:https://mariadb.com/kb/en/introduction-to-relational-databases/
[files_burns]:https://cseanburns.github.io/linux_sysadmin/3c-file-perms-owns.html
