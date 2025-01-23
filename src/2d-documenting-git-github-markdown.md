# Documenting with Git, GitHub, and Markdown

## Introduction

Documentation is the cornerstone of effective communication and knowledge sharing.
It ensures that processes are understood, tasks are reproducible, and
collaborators can contribute to shared goals.
In this section, we learn how to use Git, GitHub, and Markdown as tools for managing and presenting documentation efficiently.
Specifically, Git with GitHub offer robust version control and collaboration capabilities.
Markdown, a markup language with a simple syntax, facilitates clean, professional documentation compatible with multiple platforms.

## Create a GitHub Account

Let's start by creating an account on GitHub:

1. **Visit the GitHub Website**: [GitHub's website][github].
2. **Sign Up**: Click on the "Sign Up" button usually located at the top right corner of the page. 
3. **Enter Your Details**: You will be prompted to enter some basic information:
   - **Username**: Choose a unique username that will be your identity on GitHub. Select a name that reflects your personal or professional identity. It will be visible publicly.
   - **Email Address**: Provide a valid, personal email address (not university email address). This will be used for account verification and communication.
   - **Password**: Create a strong password. Use a mix of letters, numbers, and symbols for better security.
4. **Choose a Plan**: GitHub offers various plans. Select the free option, which is fine for most individual users.

### Tips for New Users

- **Profile Information**: After creating your account, consider adding more details to your profile, like a profile picture and bio, to make it more personable.
- **Security**: Set up two-factor authentication for added security.
- **Learning Resources**: GitHub has a [wealth of tutorials and guides][github_docs] to help you get started. Utilize these to familiarize yourself with GitHub's features and best practices.

## Create a Repository (Repo) on GitHub

Now that you have a GitHub account, your next step is to create a repository (repo) for your documentation project.
I outline the steps below, but see the official documentation:
[Creating a new repository][github_repo].
To get started:

- Click the green **New** button in the upper left corner on your home page.
- In the **Owner/Repository name** field, add a name for your repo:
    - Use a descriptive name and avoid spaces and special characters.
- Add an optional description:
    - This helps later in case you eventually create lots of repos.
- Keep it public.
- Click to add a README file:
    - This serves as the main page of your repository on GitHub.
- Choose an open source license, if you want.
- Click the **Create repository** button.

### Edit README

You should now see your repository's home page, and you will be viewing the default, empty README.md file.
Let's edit this file on GitHub:

- Click the pencil icon at the top right of that README.md file.
- This opens an editor. Put the cursor after the heading and press Enter.
- Add some text that describes the project. You can add a better description later.
- Use Markdown code to edit the text you add.

#### Markdown Basics

Markdown is a simple markup language for formatting plain text,
which can later be rendered as HTML or even as a PDF, DOCX, etc.
It's a very popular markup language in tech industries, and it's easy to get started.

Here's a quick guide to the most commonly used Markdown syntax:

##### Headings

Create headings using the pound `#` symbol before your text.
The number of pound `#` symbols indicates the level of the heading.
Heading level 1 indicates the main heading and so forth.

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

##### Emphasis

- **Bold**: To make text bold, wrap it in double asterisks or double underscores:
    - For example, `**bold**` or `__bold__`.
- *Italic*: To italicize text, wrap it in single asterisks or single underscores:
    - For example, `*italic*` or `_italic_`.

##### Lists

- **Unordered Lists**: Use asterisks, plus signs, or hyphens to create bullet point lists.
- Use indentation to create sub-items in a list.
  
      ```markdown
  * Item 1
  * Item 2
    * Subitem 1
    * Subitem 2
  ```

- **Ordered Lists**: Use numbers followed by periods for an ordered list.

  ```markdown
  1. First item
  2. Second item
     1. Subitem 2.1
     2. Subitem 2.2
  ```

##### Links and Images

- **Links**: To create a named link, wrap the link text in brackets `[ ]`, and then wrap the URL in parentheses `( )`. 
    - For example, `[GitHub](https://github.com)` will be [GitHub](https://github.com).
    - Add a link title: `[GitHub](https://github.com "GitHub Code Repo")`.
    - Use reference-style links: `[GitHub][github]`. Then refer to the full URL elsewhere in the document. For example, I usually add the reference at the end: `[github]:https://github.com`.
- **Images**: Similar to links, but start with an exclamation mark, followed by the alt text in brackets, and the URL in parentheses. 
    - For example, `![Alt text](image-url.jpg)`.
    - In this example, the file **image-url.jpg** must be in the same directory as the Markdown file. It's good practice to organize project files. In this case, I would suggest creating an images directory in the project home and storing images there, with good, descriptive names. Then use a relative path to link to the image: `![Alt text](images/image-url.jpg)` where `images/` is the directory name and `image-url.jpg` is the image file name.

##### Code

- **Inline Code**: Use a single backtick to wrap your code in text.
    - For example: `` `inline code` ``.
- **Code Blocks**: For larger sections of code, use three backticks or indent
  with four spaces.
  
The following code:
  
\```  
your code here  
\```

Will render as:
  
```
your code here
```

##### Blockquotes

To create a blockquote, use the greater than symbol `>` at the beginning of a line.
For nested blockquotes, use multiple `>` symbols.

This code:

```
> This is a blockquote.
>> This is a nested blockquote.
```

Will render as:

> This is a blockquote.
>> This is a nested blockquote.

##### Horizontal Rules

Create a horizontal line or rule by using three or more asterisks, dashes, or underscores on a new line.

```
---
```

The above will render as:

---

##### Additional Tips

- **Whitespace and Line Breaks**: In Markdown, paragraphs are automatically created when text is separated by an empty line.
  To create a new line without starting a new paragraph, end a line with two or more spaces.
- **Escaping Markdown**: To display a Markdown character, precede it with a backslash (`\`). For example, `\*demo italicizing\*`.

### Preview and Save

As you edit your README.md file, you can click the **Preview** tab to see how it will be rendered.

Once you are finished editing, save with the following steps:

- Click on the **Commit changes...** button.
- A pop-up will appear. Update the **Commit message** or leave as-is:
    - When you make more substantive edits, you will want to leave descriptive commit messages.
    - This helps with with version control.
- Press the **Commit changes** button.
- Then click on the repo link to return to your repo's homepage.

#### File Naming Conventions

[README][readme] files serve as a *de facto* standard file.
They provide a description of the project, outline its purpose, or provide instructions on using the repository.
As you work on your projects, you can return to edit your README file to add more information about your work.

In the process of working on your project, you will create other files, and you want to name them well.
Good file names help to organize and maintain a clear and efficient documentation system.
They help provide and ensure:

1. **Clarity and Accessibility**: To save time and reduce confusion, use well-named files:
    - They make it easier to identify and understand your files at a glance.
3. **Ease of Navigation**: Use consistent naming to aid navigating through files.
4. **System Compatibility**:
    - Avoid spaces in file names. They cause issues in URLs and command-line operations.
    - Avoid special characters like `!`, `$`, `#`, `%`, etc. They have specific functions in certain environments or scripts, including shell environments.
    - Name files with single words or combine words using:
        - camelCase: `serverSetupGuide.md`,
        - underscores: `server_setup_guide.md`, or
        - hyphens: `server-setup-guide.md`.

#### The Importance of `.md` Extension for Markdown Files

File name extensions are not always necessary, especially on Linux and Unix systems.
However, when it comes to Markdown files, add the `.md` extension (e.g., `README.md` rather than just `README`).
This helps in the following ways:

1. **GitHub Rendering**: GitHub automatically renders files with a `.md` extension as formatted Markdown.
   This means your documentation will be displayed with the intended formatting (like headers, lists, links, etc.) when viewing it on GitHub.
3. **Editor Support**: Most code editors use file extensions, like `.md`, and provide appropriate syntax highlighting.
4. **Consistency and Recognition**: Using a file extension, like `.md`, helps users identify the file type and its intended use.

For instance, naming a file `installation_guide.md` ensures that GitHub renders the file as a Markdown document
and displays all formatting correctly in the browser.
This enhances readability and makes the documentation more user-friendly.
Your text editor will also recognize the file extension and colorize the syntax appropriately.

## *Gitting* Started

Now that we've set up our GitHub repo, it's time to return to our virtual machines.
`git` is already installed on these machines, but it needs to be configured.

### Git Configuration

First, connect to your remote server and run the commands below to begin configuring `git`.
In the example commands below, note the quotes around the **Your Name** command.
Replace **Your Name** with your name and keep those quotes.
You don't need quotes in the commands for setting your **github_username** and **email address**.
Simply replace your info in the respective places.
Use the same information you used when setting up your GitHub account.
Run these commands separately:

```
git config --global user.name "Your Name"
git config --global user.name github_username
git config --global user.email youremail@example.com
```

Next, configure `git` to use the name **main** as your default branch.
The second command instructs `git` to use `nano` as your default editor.
Run these two commands as-is, but if you are using a different text editor (like `tilde` or `micro`),
be sure to lookup the appropriate command for that editor
(it's just `tilde` or `micro`, though).
Keep the quotes around the editor name, which should be the name of the executable (i.e., program name) for your text editor.

```
git config --global init.defaultBranch main
git config --global core.editor "nano"
```

Verify the above settings with the following command:

```
git config --list
```

For additional details, see the Git documentation on getting started:

- [Getting Started - First-Time Git Setup][git_started]

Next, we need to configure how `git` and GitHub work together.

### Generate SSH Keys

We need to secure our `git` and GitHub connection and repositories.
We do that first by creating an SSH key.

On the server:

1. Generate a new ssh key with the following command:
    1. `ssh-keygen -t ed25519 -C "your_email@example.com"`
    2. Use the same email that you used when signing up with GitHub.
2. Copy your SSH public key to your clipboard:
    1. View it with this command: `cat ~/.ssh/id_ed25519.pub`.
    2. Then select it with your mouse and copy it.
    3. Open GitHub and visit Settings.
    4. In the Access section of sidebar, click **SSH and GPG keys**
    5. Click **New SSH key** or **Add SSH key**
    6. In the **Title** field, add a descriptive label for the new key:
        1. For example, the name of the machine you used to generate the key.
    7. Select the key type: authentication.
    8. Paste your SSH public key in the **Key** field.
    9. Click **Add SSH key**
    10. See the official documentation here: [Adding a New SSH Key][github_ssh_add]
3. On your virtual machine, setup the SSH public key as your signing key:
    1. `git config --global gpg.format ssh`
    2. `git config --global user.signingkey $HOME/.ssh/id_ed25519.pub`
    3. `git config --global commit.gpgsign true`
    4. See the documentation at: [Telling Git About Your Signing Key][github_signing_key]

### Clone Your Repo

Now that you have `git` configured to work with GitHub, clone your repo to your virtual machine.

- Return to GitHub and your repo's homepage.
- Click the green **Code** drop down button.
- Make sure the SSH option is selected.
- Copy the command, which should have the following syntax:
    - `git@github.com:repo_user/repo_name.git`
    - **repo_user** should be your GitHub username.
    - **repo_name.git** should be your repo's name.
- Return to your Linux virtual machine, and run the following command to clone your repo:
    - `git clone git@github.com:repo_user/repo_name.git`
    - This command will create a new directory named after your repo.

### Stage, Commit, and Push Your Repo

Now use your text editor (e.g., `nano`) to make changes to your repository.
Navigate to your repo's directory on your virtual machine:

```
cd repo_name
```

Create and open a new file.
I'll use **entry_one.md** as an example file name, but feel free to choose a different name:

```
nano entry_one.md
```

Add whatever you'd like here to get started.
When completed, save the file and exit `nano`.

Now we need to **push** our changes to our GitHub repo.
First, **stage** the changes with the `git add` command:

```
git add entry_one.md
```

Then **commit** the changes and add a commit message with the `-m` option:

```
git commit -m "commit message here"
```

Then **push** the commit to our GitHub URL (i.e., **origin**) and **main** branch:

```
git push origin main
```

Visit your repo's homepage on GitHub to see the update.

Whenever we add, edit, or delete a file or directory in our local repo,
we follow the stage (add), commit, and push steps above.
You can monitor the status of your local repository with the following command:

```
git status
```

### Pull

Your remote repository is located on GitHub.
Your local repository is located on your virtual instance.
Get used to working on your documentation in your local repository.
However, if you mix it up and make edits to files on your remote repository via the GitHub web interface,
then you need sync your local and remote repositories before switching back to local work.
To do that, you need to run a `pull` command:

```
cd repo_name
git pull origin main
```

If you often switch between local and remote repo work, the repos will quickly grow apart and it will be hard to merge them later.

### Git Basics

Now that we've covered the basic practice, let's review some concepts.

#### Repos

The first Git concept to learn is the repository concept.
Git uses two kinds of repositories:

- local repository (repo)
- remote repository (repo)

The local repo is a project directory (or folder) on your computer.
I will use the term directory and not folder since the former term is more commonly used in tech fields.
The project directory contains all the project files and any sub-directories for the project.

The remote repo is where we send, retrieve, or sync the files and directories that are contained in the local repo.
We can retrieve projects from other repos that other people or organizations have created, if those repos are public.

With Git and GitHub, we can start a project on the local system (i.e., our computers)
or start a project by creating a remote repo on GitHub and then cloning it to our local system.

### Branches

The second Git concept to learn is:

- branches

When you configure a directory on your local system to become a Git project, you create a default branch for your project.
For small projects, we might only work in the default branch.
The default branch will be named **main**.

However, since Git is a version control system,
we can create additional branches to test or work on different components of our projects without messing with the main branch.
For large or complex projects, we would work and switch among different branches.
A large project might be a big website, an software application, or even an operating system.
Working in non-main branches (e.g., a testing branch),
allows us to develop components of our project without interfering with the main branch, which might be at a stable version of our project. And then when we are ready, we can merge a testing branch with our main branch,
or we can delete the testing branch if we don't want to use it.

We will primarily work with the default, main branch with our projects,
but you should read the [Git documentation on branches][git_branches].

For future reference, here's a nice cheat sheet of [Git commands][git_commands].

[git_branches]:https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
[git_commands]:https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
[git]:https://git-scm.com/
[github_docs]:https://docs.github.com/en
[github]:https://github.com
[github_repo]:https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
[github_signing_key]:https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key
[github_ssh_add]:https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
[git_started]:https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup
[readme]:https://en.wikipedia.org/wiki/README
