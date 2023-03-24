# Install Omeka

So far we have created our own bare bones OPAC/ILS
and we have downloaded, installed, and configured
WordPress on our servers.
We will use the same basic process to download,
install, and configure Omeka.

However, instead of providing comprehensive instructions,
your goal is to take what you learned from the
bare bones OPAC/ILS and WordPress assignments,
and apply them to the Omeka installation and setup.
Below are some additional prerequisites that you
should complete first.
Afte you've completed them,
move on to the General Steps section to
remind yourself of the overall process.

You can do it.
Be sure to ask and discuss on our chat server.

## Prerequisites

When we installed WordPress,
we installed most of the prerequisites
that Omeka needs, but
there are a couple of additional things we need to do.

Some prerequisites:

- Install ImageMagick

```
sudo apt install imagemagick
```

- Enable Apache `mod_rewrite`:

```
sudo a2enmod rewrite
```

Then restart Apache:

```
sudo systemctl restart apache2
```

## General Steps

Your task is to complete the installation on your own.
Note that the process is very similar to what we have
already done with our bare bones OPAC/ILS and
our WordPress installations.
Use the WordPress guide to remind
you of the specific commands.
In short, you are going to complete the following steps:

- Create a new user and a new database for Omeka (do not
  re-use the WordPress database, user, or credentials).
- Use `wget` from your server to download Omeka Classic as a
  Zip file and extract it:
    - https://github.com/omeka/Omeka/releases/download/v3.1/omeka-3.1.zip
    - unzip it with the `unzip` command
- In the extracted directory, find the **db.ini** file and
  add your database credentials. This is the same thing we
  did with the **login.php** file for our bare bones OPAC/ILS and
  the **wp-config.php** file for WordPress.
- Use the `chown` command like we did with WordPress on the
  files and directories in the Omeka directory but you only
  have to do this for the **files** directory.
- Restart Apache2 and MySQL
- In your web browser, go to
  http://your-ip-address/omeka/collections/admin and
  complete the setup.

## Helpful Links

- Omeka: https://omeka.org/
- Omeka Classic: https://omeka.org/classic/
- Omeka Classic User Manual: https://omeka.org/classic/docs/
