# Using gcloud for Virtual Machines 

## Virtual Machines

Our goal in this section is to create a **virtual machine (VM)** *instance*.
A VM is basically a virtualized operating system that runs on a host operating system.
That host operating system may also be Linux, but it could be Windows or macOS.
In short, when we use a VM, it means instead of installing an operating system
(like Linux, macOS, Windows, etc) on a physical machine, we use VM software to mimic the process.
The VM thus runs on top of our main OS.
Think of the VM as an app, where the app is a fully functioning operating system.

> There are many ways to do virtualization.
> According to [Red Hat][virt_redhat], there is data virtualization, desktop virtualization,
> server virtualization, OS virtualization, (which is the technology we cover here),
> and network functions virtualization.

In this course, we're going to use gcloud (via Google) to provide our VMs.
There are other cloud service providers available that you can explore on your own.
You can also play with [VirtualBox][virtualbox] (on your own), which I've used in prior classes,
to install VMs on your own computers.

## Google Cloud (`gcloud`)

### Google Account

We need a Google account to create our VMs.
I imagine you already have a Google account, but if not, then create one at [https://www.google.com][google].
Be sure to use your personal Google account for this project.

### Google Cloud (`gcloud`) Project

After signing into Google, we're going to perform the following steps:

1. Create a Google Cloud project.
1. Enable billing for that project.
1. Create a VM (aka *virtual instance*) on Google Cloud.
1. Install the `gcloud` CLI software on our personal machines to connect to our remote VM;
    - alternatively, use the web interface (details below) to connect to our remote VM.

> Although I include most of the instructions on this page to perform these steps,
> it is imperative that you **read through Google's instructions** also.

#### Create a Project

After signing into your Google account,
proceed to **Step 1** at the top of the  [Install the gcloud CLI][gcloud_install] page to create a new project.
Review the page on [creating and managing projects][gcloud_projects].

When you create your project, you can name it anything, but try to name it something to do with this project.
E.g., I might use the name **syslib_624**.
*Avoid spaces in the names of your project.*
Click on the **Create** button, and leave the organization field set to **No Organization**.
Make sure you've selected your project, and then click on **Enable** for **Compute Engine API**.

#### Google Billing

Second, set up a billing account for your gcloud project.
This means there is a cost associated with this product,
but the machines we'll build require few resources and the cost should be minimal.
In the past, I usually pay about $1 or $2 per month.
[Follow Step 2][gcloud_install] to enable billing for the new project.
See also the page on how to [create, modify, or close your self-serve Cloud Billing account][google_billing].

## VM Instance

Next, log into [Google Cloud Console][gcloud_console].
This should take you to the Google Cloud Dashboard page.

Here we'll create a **virtual machine (VM)** *instance*.
As a reminder, a VM is a virtualized operating system.
We will use software to mimic the process of installing an operating system on Google's servers. 

Google Cloud offers a number of Linux operating systems for VMs.
We're going to use the Ubuntu operating system and specifically the Ubuntu 22.04 LTS version.
We are not going to install a graphical user interface (GUI) on our Ubuntu servers.
Rather, we will use a command line interface (CLI) to do most of our work.

You should be on the page where you create a new VM, but if not:

- Click on the three horizontal bars at the top left of the screen.
- Hover over the **Compute Engine** link, and then select **VM Instances**.
- In the window, select the project that you created earlier.
    - E.g., for me, I'll use the project name **syslib_624**.
- Next, click on **Create Instance**.
- Change the name for your **instance**.
    - E.g., I'll name mine, **spring_2026** (no spaces) 

If you are already on the Create VM page, then:

- Change the name for your **instance**.
    - E.g., I chose **fall-2026** (no spaces) 
- Use default **Region** and **Zone**.
- Make sure **E2 (Low cost, day-to-day computing)** is selected.
- Under the **Machine type** drop down box, select **e2-micro (0.25-2 vCPU (1 shared core), 1 GB memory)**
    - This is the lowest cost virtual machine and perfect for our needs.

Next, click on the **OS and storage** link in the left hand navigation section.

- Click on the **Change** button.
- Under **Operating system**, select **Ubuntu**.
- Under **Version**, select **Ubuntu 22.04 LTS x86/64**
- Leave **Boot disk type** be set to **Balanced persistent disk**
- Disk size should be set to **10 GB**.
- Click on the **Select** button.

Next, click on the **Networking** link in the left hand navigation section.

- Check the **Allow HTTP Traffic** button
- Finally, click on the **Create** button to create your VM instance.

> What is Ubuntu?
> Ubuntu is a **distribution** of Linux.
> A new version of Ubuntu is released every six months.
> The 22.04 signifies that this is the April 2022 version.
> The LTS signifies **Long Term Support**.
> LTS versions are released every two years.
> Canonical LTD, the owners of Ubuntu, provide five years standard support for LTS versions.
> Thus, Ubuntu 22.04 is supported through June 2027.
>
> LTS versions of Ubuntu are more stable than non-LTS versions of Ubuntu.
> The latter receive nine months of standard support and generally implement cutting edge technology.
> Cutting edge technology is not always desirable for server operating systems, which often prioritize stability.
>
> Each version of Ubuntu has a code name.
> Ubuntu 22.04 LTS has the code name **Jammy Jellyfish**.
> You can see a list of versions, code names, release dates, and
> more on Ubuntu's [Releases][ubuntu_releases] page.

## Install the `gcloud` CLI

In this section, we install the `gcloud` CLI software to connect to our virtual machines on Google Cloud.
Using the `gcloud` CLI is a more advanced way to connect to our VMs.
If you prefer, you can connect to your VM using Google's web interface.
Skip to the
[Connect To Our VM](https://cseanburns.github.io/systems-librarianship/2a-using-gcloud-virtual-machines.html#using-the-web-interface)
section if you prefer the web interface insetad of installing this software.

Using the `gcloud` CLI will allow us to connect to remote server using our own terminal applications.
The **[Install the gcloud CLI][gcloud_install]** page provides instructions for different operating systems.

There are installation instructions for macOS, Windows, Chromebooks, and various Linux distributions.
Follow these instructions closely for the operating system that you're using.

> Note that for macOS, you have to choose among three different CPU/chip architectures.
> If you have an older macOS machine (before November 2020 or so), it's likely that you'll select **macOS 64-bit (x86_64)**.
> If you have a newer macOS machine, then it's likely you'll have to select **macOS 64-bit (arm64, Apple M1 silicon).**
> It's unlikely that any of you are using a 32-bit macOS operating system.
> If you're not sure which macOS system you have, then let me know and I can help you determine the appropriate platform.
> Alternatively, follow these instructions to find your processor information:
>
> - click on the Apple menu
> - choose **About This Mac**
> - locate the **Processor** or **Chip** information

After you have downloaded the `gcloud` CLI for your particular OS and CPU architecture,
you will need to open a command prompt/terminal on your machines to complete the instructions
that describe how to install the gcloud CLI.
macOS uses the Terminal app, which can be located using Spotlight.
Windows users can use the Command Prompt or Powershell.

### Windows Users

Windows users will download a regular **.exe** file, and launch the installer in the regular Windows way.
Please follow the rest of the instructions for Windows.

### macOS Users

**macOS** users may need to complete some setup work before installing Google Cloud.
First, open your Terminal.app and run the following code:

```
xcode-select --install
```

Once the Xcode developer tools are installed, you need to install the macOS Homebrew package manager.
To do so, follow the instructions here:

[Homebrew][homebrew]

After Homebrew is installed, use the `brew` command to install [pyenv][pyenv].

```
brew install pyenv
```

And then use `pyenv` to install the latest version of Python.
For example, to install the [latest release of Python][python3] (as of November 2025):

```
penv install 3.14.0
```

Finally, you can install the Google Cloud application using the steps outlined below.
Or you can use the steps outlined in the [Google Cloud Interactive installation][gcloud_interactive].

See also:

[Setting up a Python development environment][python_dev]

Once the above is complete on macOS,
download the `gcloud` **.tar.gz** file and extract it using the `tar` command.
The **.tar.gz** file may have been downloaded to your **Downloads** folder.
First, in your Terminal.app, move that file to your home directory.
The following assumes the downloaded file is named
`google-cloud-cli-darwin-x86_64.tar.gz`, but it's likely different for you, so modify as appropriate:

```
mv ~/Downloads/google-cloud-cli-darwin-arm.tar.gz $HOME
```

Then move to your home directory with the `cd` command:

```
cd $HOME
```

And extract the file there:

```
tar -xzf google-cloud-cli-darwin-arm.tar.gz
```

Once extracted, a new directory will be created in your home directory.
Move there with the `cd` command:

```
cd google-cloud-sdk
```

Modify the file names in the commands above, as appropriate.

### Initialize the `gcloud` CLI

Regardless if you're using macOS or Windows, you will now initialize your Google Cloud installation the same way.
First, scroll down the install page to the section titled [**Initializing the gcloud CLI**][g_init].
In your terminal, run the initialization command.
Per the instructions at the above page, it should be something like so:

```
gcloud init
```

And continue to follow the instructions in the documentation.

## Connect to our VM

Below, if you installed the `gcloud` CLI software, proceed.
If you did not, scroll down to the **Using the Web Interface** section.

### Using `gcloud` CLI

After the new VM machine has been created, you connect to it via the command line.
macOS users will connect to it via their Terminal.app.
Windows users can connect to it via their Command shell or Powershell.

If you have used `ssh` before, note that we use a slightly different `ssh` command to connect to our VMs.
The syntax follows this pattern:

```
gcloud compute ssh --zone "zone-info" "name-info" --project "project-id"
```

You need to replace the values in the double quotes in the above command
with the values located in your Google Cloud console and in your VM instances section.
You can select the **SSH** drop down box to copy the exact `gcloud` command to connect to your server.

### Using the Web Interface

If you did not install `gcloud` CLI, then you can connect through the Google Cloud Console website.
To do so:

1. Click on the drop down arrow next to the `SSH` button for your VM instance.
1. Select, **Open in browser window**.
1. Authorize it to allow **SSH-in-browser to connect to VMs**.
1. A terminal in a browser window should appear.

## Update our Ubuntu VM

Once you have access to the command line on your remote Linux virtual instance,
you will need to update your OS.
The VM will include a recently updated version of Ubuntu 22.04, but it may not be completely updated.
Thus the first thing we need to do is update our machines.
Since this is an Ubuntu machine, use the following two commands to update your machines.
Type the first command in, wait for it to complete, and then type the second command.
**READ the OUTPUT** closely.
It will ask you to continue.
Press **Y** to continue (lowercase **y** is fine).

```
sudo apt update
sudo apt -y upgrade
```

You are done!
To exit the VM, type the `exit` command:

```
exit
```

Typing `exit` at the prompt will always close our connection to our remote servers.

## Snapshots (Optional)

You have installed a pristine version of Ubuntu, but mistakes will happen while learning how to use your machines.
If you want, you can backup this pristine version of the operating system.
This will allow you to restore the server if something goes wrong later.

**NOTE:** Snapshots incur extra costs, and it's pretty easy to create a new VM instance.
Therefore, it's okay to create snapshots later when you are working on your projects.
This will reduce costs until needed.

To get started:

1. In the left hand navigation panel, click **Compute Engine** and then **Snapshots**.
2. At the top of the page, click on **Create Snapshot**.
3. Provide a name for your snapshot: e.g., **ubuntu-1**.
4. Provide a description of your snapshot: e.g., **This is a new install of Ubuntu 22.04.**
5. Choose your **Source disk**.
6. Choose a **Location** to store your snapshot.
    - To avoid extra charges, choose **Regional**.
    - From the drop down box, select the same location (zone-info) your VM has
7. Click on **Create**

**<p style="color:red">Please monitor your billing for this to avoid costs that you do not want to incur.</p>**

## Conclusion

Congratulations!
You have just completed your first installation of a Linux server.

To summarize, in this section you learned about and created a VM with gcloud.
This is a lot! 
After this course is completed, you will be able to fire up a virtual machine on short notice and deploy websites and more.

[distrowatch]:https://distrowatch.com/
[gcloud_console]:https://console.cloud.google.com/
[gcloud_install]:https://cloud.google.com/sdk/docs/install-sdk
[gcloud_interactive]:https://cloud.google.com/sdk/docs/downloads-interactive#linux-mac
[gcloud_projects]:https://cloud.google.com/resource-manager/docs/creating-managing-projects#gcloud
[g_init]:https://cloud.google.com/sdk/docs/install-sdk#initializing_the
[google_billing]:https://cloud.google.com/billing/docs/how-to/manage-billing-account
[google]:https://www.google.com
[homebrew]:https://brew.sh/
[pyenv]:https://github.com/pyenv/pyenv
[python3]:https://www.python.org/
[python_dev]:https://cloud.google.com/python/docs/setup
[ubuntu_releases]:https://wiki.ubuntu.com/Releases
[ubuntuReleases]:https://wiki.ubuntu.com/Releases
[virt_redhat]:https://www.redhat.com/en/topics/virtualization/what-is-a-virtual-machine
[virtualbox]:https://www.virtualbox.org/
