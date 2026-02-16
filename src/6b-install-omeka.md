# Install Omeka Classic

[Omeka Classic][omeka_classic] is an open source web publishing platform for sharing digital collections and creating media-rich online exhibits.
Most if not all of you have already used Omeka in a prior course.
Here our task is not to practice information/knowledge organization, but to learn how to administer the Omeka digital library platform.

## The Task

So far we have created a:

- bare bones OPAC/ILS, and
- downloaded, installed, and configured WordPress on our servers.

We will use the same basic process to download, install, and configure Omeka.

Instead of providing comprehensive instructions, your goal is to take what you learned from the
bare bones OPAC/ILS and WordPress assignments, and apply them to the Omeka installation and setup.
Below are some additional **prerequisites** that you should complete first.
After you've completed them, move on to the **General Steps** section to
remind yourself of the overall process.

## Prerequisites

When we installed WordPress, we installed most of the prerequisites that Omeka needs, but
there are a couple of additional things we need to do.

Some prerequisites:

- Make sure your system is fully updated first: `sudo apt update` etc.
- Check that your installed versions of PHP and MySQL meet [Omeka's system requirements][system_requirements_omeka].
- Check that required PHP extensions (especially `mysqli` and `exif`) are installed and enabled.
- Install [ImageMagick][imagemagick]: this is a suite of utilities to work with photo files.
  Omeka uses ImageMagick to create thumbnail images of photos uploaded to the digital library.
  Visit the ImageMagick link above for more information.

```
sudo apt install imagemagick
```

- Enable Apache `mod_rewrite`.
  This is an Apache module used to rewrite URLs.
  Omeka uses this to create user friendly URLs for items and collections in its digital libraries.

```
sudo a2enmod rewrite
```

You should be instructed to restart Apache after enabling `mod_rewrite`:

```
sudo systemctl restart apache2
```

## General Steps

Below is a list of the general steps you need to use to install Omeka.
Generally, you have already completed these steps when you created a bare bones ILS and installed WordPress.
Your task is to apply what you've learned when doing those prior assignments by completing an Omeka installation on your own.

**Note**: let me emphasize that the process is very similar to what
we have already done with our bare bones ILS and our WordPress installations.
Use this handbook to remind you of the specific commands.

In short, you are going to complete the following steps:

- Create a new user and a new database in MySQL for the Omeka installation
  (do not re-use the WordPress database, user, etc credentials or names of databases or tables).
- Use `wget` from your server to download the latest Omeka Classic release as a Zip file and extract it in `/var/www/html`:
    - Download page: [https://omeka.org/classic/download/][omeka_classic_download]
    - Unzip it with the `unzip` command, which you might have to install with the `apt` command.
    - The extracted directory will include the release version in its name.
    - You want to **rename** it simply `omeka` or something else of your choosing (like `digital_library`).
      Remember that names of files and directories should not have spaces in them.
- In the extracted directory, find the `db.ini` file and add your new database credentials.
  Replace all values containing `XXXXXX` with the appropriate information.
  This is the same thing we did with the `login.php` file for our bare bones ILS and the `wp-config.php` file for WordPress.
- Use the `chown` command like we did with WordPress on the `files` directory in the `omeka` directory.
  On Ubuntu, one option is to set ownership to `www-data:www-data`, but the key requirement is that the web server can write to `omeka/files`.
- Restart Apache2. Restart MySQL only if you run into connection or service issues.
- In your web browser, go to `http://your-ip-address/omeka/` and complete the setup via the web form, just like you did with WordPress.

## Helpful Links

**Note**: The user manual below is helpful, but it does not provide explicit instructions.

Be sure to download **Omeka Classic** and not **Omeka S**.

- Omeka: [https://omeka.org/][omeka]
- Omeka Classic: [https://omeka.org/classic/][omeka_classic]
- Omeka Classic User Manual: [https://omeka.org/classic/docs/][omeka_user_manual]

## Conclusion

The purpose of this exercise is to apply what you've learned in
creating, installing, and setting up both the bare bones ILS and WordPress on your systems.
The same basic logic is used in all these processes, even if the specifics vary.
But all in all:
Have fun.
Go slow.
Read the documentation.
Pay attention to the details.
Use this textbook to search for how we did things in prior installations.

[imagemagick]:https://imagemagick.org/index.php
[omeka_classic]:https://omeka.org/classic/
[omeka_classic_download]:https://omeka.org/classic/download/
[omeka]:https://omeka.org/
[omeka_user_manual]:https://omeka.org/classic/docs/
[system_requirements_omeka]:https://omeka.org/classic/docs/Installation/System_Requirements/
