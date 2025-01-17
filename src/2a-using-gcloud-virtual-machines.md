# Using gcloud for Virtual Machines 

## Virtual Machines

Our goal in this section is to create a **virtual machine (VM)** *instance*.
A VM is basically a virtualized operating system that runs on a host operating system.
That host operating system may also be Linux, but it could be Windows or macOS.
In short, when we use virtual machines, it means instead of installing an operating system
(like Linux, macOS, Windows, etc) on a physical machine, we use virtual machine software to mimic the process.
The virtual machine, thus, runs on top of our main OS.
It's like an app, where the app is a fully functioning operating system.

In this course, we're going to use gcloud (via Google) to provide us with virtual machines.
There are other cloud service providers available that you can explore on your own.
You can also play with [VirtualBox][virtualbox] (on your own), which I've used in prior classes, to install virtual machines
on your own computers.

## Google Cloud / gcloud

### Google Account

We need to have a personal Google account to get started with gcloud.
I imagine most of you already have a Google account, but if not, go ahead and create one at [https://www.google.com][google].

### Google Cloud (gcloud) Project

Next we will need to create a project on the [Google Cloud website][gcloud].

Follow **Step 1** at the top of the **[Install the gcloud CLI][gcloudInstall]** page to create a new project.
Also, review the page on [creating and managing projects][gcloudProjects].

When you create your project, you can name it anything, but try to name it something to do with this course.
E.g., I am using the name **syslib-YEAR** (replace **YEAR** with the actual year).
Avoid using spaces when naming your project.

Then click on the **Create** button, and leave the organization field set to **No Organization**.

### Google Billing

The second thing to do is to set up a billing account for your gcloud project.
This does mean there is a cost associated with this product,
but the good news is that our bills by the end of the semester should only amount to $5 to 10 dollars, at most.
**[Follow Step 2][gcloudInstall]** to enable billing for your new project.
See also the page on how to **[create, modify, or close your self-serve Cloud Billing account][googleBilling]**.

At the end of the semester, I'll remind you that you may want to delete your virtual machines.
If you don't do this, you will continue to be billed for them.

### Install the gcloud CLI to connect to our virtual machines

> **NOTE:** We install the gcloud CLI to connect to our virtual machines from our personal computers.
> I suggest this process because it offers more functionality but it's also a bit advanced.
> If you think you'd like to skip this process for now and try later, we can use an alternate method to connect to our virtual machines.
> I'll describe the alternate method to connect below in the **Connect to our VM** section.
> If you would prefer to use the alternate method, skip to the **gcloud VM Instance section**.

After you have set up billing, the next step is to install gcloud on your local machines. 
The **[Install the gcloud CLI][gcloudInstall]** page provides instructions for different operating systems.

There are installation instructions for macOS, Windows, Chromebooks, and various Linux distributions.
Follow these instructions closely for the operating system that you're using.
Note that for macOS, you have to choose among three different CPU/chip architectures.
If you have an older macOS machine (before November 2020 or so), it's likely that you'll select **macOS 64-bit (x86_64)**.
If you have a newer macOS machine, then it's likely you'll have to select **macOS 64-bit (arm64, Apple M1 silicon).**
It's unlikely that any of you are using a 32-bit macOS operating system.
If you're not sure which macOS system you have, then let me know and I can help you determine the appropriate platform.
Alternatively, follow these instructions to find your processor information:

- click on the Apple menu
- choose **About This Mac**
- locate the **Processor** or **Chip** information

After you have downloaded the gcloud CLI for your particular OS and CPU architecture,
you will need to open a command prompt/terminal on your machines to complete the instructions that describe how to install the gcloud CLI.
macOS uses the Terminal app, which can located using Spotlight.
Windows user can use Command.exe, which can be located by search also.

Windows users will download a regular **.exe** file, but macOS users will download a **.tar.gz** file.
Since macOS is Unix, you can use the ``mv`` command to move that file to your ``$HOME`` directory.
Then you extract it there using the ``tar`` command, and once extracted you can change to the directory that it
creates with the ``cd`` command.
For example, if you are downloading the X86_64 version of the gcloud CLI, then you would run the following commands:

For macOS users, this assumes the **.tar.gz** file was downloaded to your default Downloads folder:

```
cd ~/Downloads/
mv google-cloud-cli-392.0.0-darwin-x86_64.tar.gz ~/
cd ~/
tar -xzf google-cloud-cli-392.0.0-darwin-x86_64.tar.gz
cd google-cloud-sdk
```

Modify the above commands, as appropriate, if you're using the M1 or the M2 version of the gcloud CLI.

### Initializing the gcloud CLI

**As above, please follow the instructions from the Google Cloud documentation for your operating system.**

Once you have downloaded and installed the gcloud CLI program, you need to initialize it on your local machine.
Scroll down on the [install page][gcloudInstall] to the section titled **Initializing the gcloud CLI**.
In your terminal/command prompt, run the initialization command, per the instructions at the above page:

```
gcloud init
```

And continue to follow the instructions from the prompt and from the Google Cloud documentation page above.

## gcloud VM Instance

Once you've initialized gcloud, log into [Google Cloud Console][gcloudConsole], which should take you to the Dashboard page.

Our first goal is to create a **virtual machine (VM)** *instance*.
As a reminder, a VM is basically a virtualized operating system.
That means instead of installing an operating system (like Linux, macOS, Windows, etc) on a physical machine,
software is used to mimic the process. 

gcloud offers a number of Linux-based operating systems to create VMs.
We're going to use the Ubuntu operating system and specifically the Ubuntu 22.04 LTS version.

> Ubuntu is a Linux distribution.
> There are many, many distributions of Linux, and most are probably listed on the [DistroWatch][distrowatch] site.
> A new version of Ubuntu is released every six months.
> The 22.04 signifies that this is the April 2022 version.
> LTS signifies **Long Term Support**.
> LTS versions are released every two years, and Canonical LTD, the owners of Ubuntu,
> provide standard support for LTS versions for five years.
>
> LTS versions of Ubuntu are stable.
> Non-LTS versions of Ubuntu receive nine months of standard support, and generally apply cutting edge technology,
> which is not always desirable for server operating systems.
> Each version of Ubuntu has a code name.
> 24.10 has the code name **Oracular Oriole**.
> You can see a list of versions, code names, release dates, and more on Ubuntu's [Releases][ubuntuReleases] page.

We will create our VM using the gcloud console.
To do so, follow these steps from the Project page:

- Click on the hamburger icon (three vertical bars) in the top left corner.
- Click on **Compute Engine** and then **VM instances**
- Make sure your project is listed.
- Next, click on **Create Instance**.
- Provide a name for your **instance**.
    - E.g., I chose **main-ubuntu** (no spaces) but you are free to use any name you prefer
- In the **Machine configuration** section, make sure **E2** is selected.
- In the **Machine type** section, select **e2-micro (2 vCPU, 1 core, 1 GB memory)**
    - This is the lowest cost virtual machine and perfect for our needs.
- In the left navigation section, click on **OS and storage**.
    - Click on **CHANGE**, and a side bar on the right of the screen open up.
    - In the sidebar, select **Ubuntu** from the **Operating system** drop down box.
    - Click on **Version** and select **Ubuntu 22.04 LTS x86/64**
    - Leave **Boot disk type** be set to **Balanced persistent disk**
    - Leave disk size to **10 GB**.
    - Click on the **Select** button.
- In the left navigation section, click **Networking**.
    - Check the **Allow HTTP Traffic** button
- Finally, click on the **Create** button to create your VM instance.

> Later in the semester when we install Koha, we will need to create a virtual machine with more CPUs and memory.
> We will be charged more for those machines.
> Since we do not yet need the extra resources, we will start off with fairly low powered machines.

## Connect to our VM

After the new VM machine has been created, we need to connect to it.

### Using gcloud CLI

We use a ``ssh`` command to connect to our VMs.
The syntax follows this pattern:

```
gcloud compute ssh --zone "zone-info" "name-info" --project "project-id"
```

macOS users will use that command using their Terminal.app.
Windows users can connect to it via their command prompt (CMD.exe or PowerShell).

To get the specific connection command for your virtual instance, click on the **SSH** drop down menu.
Select **View gcloud command**.
Copy and paste that command in your OS terminal.

### Using the web interface

If you elected not to install the gcloud CLI, you can connect via the web interface.
Click on the **SSH** drop down menu, and select **Open in browser window**.
This will open a terminal window in your browser.

### Connection Differences

If you connect using the gcloud CLI method, your username on your virtual machine will be based on the username on your personal machine.
However, if you connect using the web interface, your username on your virtual machine will be based on your Google account username.
This has important ramifications, especially if you decide to use change connection methods.

The main ramification is that you will have two different home directories on your virtual machine.
For example, if my username for my Google account is **sean_burns**,
then my home directory on the virtual machine will be **/home/sean_burns** if I connect via the web interface.

But if my username on my personal computer is **sean**,
then my home directory on the virtual machine will be **/home/sean** if I connect via the gcloud CLI.

Keep this in mind.

### Quick Shell Information
  
When you log into your machines, you'll see a command prompt with the following format:

```
username@machine_name:~$
```

This is where we type our commands.
It's not obvious right away, but the command prompt displays our location in the file system.
By default, you will be located in your home directory, which is indicated by the `~` tilde in your prompt.

## Update our Ubuntu VM

The VM will include a recently updated version of Ubuntu 22.04, but it may not be completely updated.
Therefore the first thing we need to do is update our machines.
On Ubuntu, we'll use the following commands, which you should run also:

```
sudo apt update
sudo apt -y upgrade
sudo apt -y autoremove
sudo apt clean
```

You should run these commands at least weekly to keep your system updated.

## Disconnecting

To exit and disconnect from the remote system, type `exit`, like so:

```
exit
```

If you are using the gcloud CLI, you should exit back to your personal machine's terminal prompt.
Pay attention to the messages upon logout.
If you get the following message:

```
Updates are available for some Google Cloud CLI components. To install them, please run:
gcloud components update
```

Then run that command in your own terminal app and click **Y** (yes) when prompted:

```
gcloud components update
```

Once updated, you can close your terminal app.

If you are using the web interface, the window should close.

## Snapshots (Optional)

> This is entirely optional at this point.
> You may want to consider doing this when we begin to install a LAMP stack and content management systems
> because it'll help you recover your system if something gets messed up.
> But as of now, if we mess up our system, it's pretty trivial to delete the virtual instance and start a new one.

Lastly, we have installed a pristine version of Ubuntu, but it's likely that we will mess something up as we work on our systems.
Or it could be that our systems may become compromised at some point.
Therefore, we want to create a snapshot of our newly installed Ubuntu server.
This will allow us to restore our server if something goes wrong later.

To get started:

1. In the left hand navigation panel, click on **Snapshots**.
2. At the top of the page, click on **Create Snapshot**.
3. Provide a name for your snapshot: e.g., **ubuntu-1**.
4. Provide a description of your snapshot: e.g.,

    This is a new install of Ubuntu 22.04.

5. Choose your **Source disk**, which should be the name of your virtual instance (e.g., **main-ubuntu**).
6. Choose a **Location** to store your snapshot.
    - To avoid extra charges, choose **Regional**.
    - From the drop down box, select the same location (zone-info) your VM has
7. Click on **Create**

**<p style="color:red">Please monitor your billing for this to avoid costs that you do not want to incur.</p>**

## Conclusion

Congratulations!
You have just completed your first installation of a Linux server.

To summarize, in this section, you learned about and created a VM with gcloud.
This is a lot! 
After this course is completed, you will be able to fire up a virtual machine on short notice and deploy websites and more.

[distrowatch]:https://distrowatch.com/
[gcloudConsole]:https://console.cloud.google.com/
[gcloud]:https://cloud.google.com/?hl=en
[gcloudInstall]:https://cloud.google.com/sdk/docs/install-sdk
[gcloudProjects]:https://cloud.google.com/resource-manager/docs/creating-managing-projects#gcloud
[googleBilling]:https://cloud.google.com/billing/docs/how-to/manage-billing-account
[google]:https://www.google.com
[ubuntuReleases]:https://wiki.ubuntu.com/Releases
[virtualbox]:https://www.virtualbox.org/

