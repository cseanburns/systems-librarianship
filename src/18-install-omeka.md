# Install Omeka

[Omeka][omeka] is an
"Open-source web publishing platforms for sharing
digital collections and creating media-rich online exhibits."
Most if not all of you have already used Omeka
in a prior course.
Here our task is not to learn information/knowledge organization,
per se,
but to learn how to administer the Omeka digital library platform.

## The Task

So far we have created our own bare bones OPAC/ILS
and we have downloaded, installed, and configured
WordPress on our servers.
We will use the same basic process to download,
install, and configure Omeka.

However, instead of providing comprehensive instructions,
your goal is to take what you learned from the
bare bones OPAC/ILS and WordPress assignments,
and apply them to the Omeka installation and setup.
Below are some additional **prerequisites** that you
should complete first.
After you've completed them,
move on to the **General Steps** section to
remind yourself of the overall process.

You can do it!
Be sure to ask and discuss on our chat server.

## Prerequisites

When we installed WordPress,
we installed most of the prerequisites
that Omeka needs, but
there are a couple of additional things we need to do.

Some prerequisites:

- Install ImageMagick: this is a suite of utilities to work with photo files.
  It's used by Omeka to create thumbnail images of any photo uploaded to the
  digital library. See [Imagemagick][imagemagick] for more information.

```
sudo apt install imagemagick
```

- Enable Apache `mod_rewrite`. This is an Apache module used to rewrite URLs.
  Omeka uses this to create appropriate URLs for items and collections in its
  digital libraries.

```
sudo a2enmod rewrite
```

You should be instructed to restart Apache after enabling **rewrite**:

```
sudo systemctl restart apache2
```

## General Steps

You have already completed all the steps below when you
created a bare bones OPAC/ILS and installed WordPress.
Your task is to apply what you've learned by completing
an Omeka installation on your own.
(You can work together and discuss on our chat server.)

**Note** that the process is very similar to what we have
already done with our bare bones OPAC/ILS and
our WordPress installations.
Use this handbook to remind
you of the specific commands.
In short, you are going to complete the following steps:

- Create a new user and a new database in MySQL for the
  Omeka installation (do not re-use the WordPress database,
  user, or credentials).
- Use `wget` from your server to download Omeka Classic as a
  Zip file and extract it in `/var/www/html`:
    - https://github.com/omeka/Omeka/releases/download/v3.1/omeka-3.1.zip
    - unzip it with the `unzip` command, which you will have
      to install with the `apt` command.
    - the extracted directory will be named **omeka-3.1**.
      You might want to **rename** it simply **omeka**.
- In the extracted directory, find the **db.ini** file and
  add your database credentials, and replace all values
  containing **XXXXXX**, with the appropriate information.
  This is the same thing we did with the **login.php** file
  for our bare bones OPAC/ILS and the **wp-config.php** file
    for WordPress.
- Use the `chown` command like we did with WordPress on the
  `files` directory in the `omeka` directory. The user and
  owner should again be **www-data**.
- Restart Apache2 and MySQL
- In your web browser, go to
  **http://your-ip-address/omeka/** and complete the setup
  via the web form, just like you did with WordPress.

## Helpful Links

The user manual below is helpful, but
it does not provide explicit instructions.

Be sure to download **Omeka Classic** and not **Omeka S**.

- Omeka: [https://omeka.org/][omeka]
- Omeka Classic: [https://omeka.org/classic/][omeka_classic]
- Omeka Classic User Manual: [https://omeka.org/classic/docs/][omeka_user_manual]

[imagemagick]:https://imagemagick.org/index.php
[omeka]:https://omeka.org/
[omeka_classic]:https://omeka.org/classic/
[omeka_user_manual]:[https://omeka.org/classic/docs/]
