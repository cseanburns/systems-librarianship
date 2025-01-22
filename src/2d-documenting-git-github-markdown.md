# Documenting with Git, GitHub, and Markdown

## Introduction

## Create a GitHub Account

Let's start by creating an account on GitHub:

1. **Visit the GitHub Website**: Navigate to [GitHub's website][github].
2. **Sign Up**: Click on the "Sign Up" button usually located at the top right corner of the page. 
3. **Enter Your Details**: You will be prompted to enter some basic information:
   - **Username**: Choose a unique username that will be your identity on GitHub. Select a name that reflects your personal or professional identity. It will be visible publicly.
   - **Email Address**: Provide a valid, personal email address (not university email address). This will be used for account verification and communication.
   - **Password**: Create a strong password. Use a mix of letters, numbers, and symbols for better security.
4. **Choose a Plan**: GitHub offers various plans. Select the free option. This is fine for most individual users.
6. **Verify Your Email Address**: After completing the sign-up process, GitHub will send a verification email to the address you provided.
   Click on the verification link in that email to activate your account.

### Tips for New Users

- **Profile Information**: After creating your account, consider adding more details to your profile, like a profile picture and bio, to make it more personable.
- **Security**: Set up two-factor authentication for added security.
- **Learning Resources**: GitHub has a wealth of tutorials and guides to help you get started. Utilize these to familiarize yourself with GitHub's features and best practices.

#### File Naming Conventions

Use good names for files because file names help with organizing and maintaining a clear and efficient documentation system.
Good file names provide:

1. **Clarity and Accessibility**: To save time and reduce confusion, use well-named files. This makes it easier to identify and understand your files at a glance.
2. **Ease of Navigation**: Use consistent naming to aid navigating through files.
3. **System Compatibility**: Avoid certain characters, like spaces and special characters, in file names. They will cause issues in different operating systems.

For the sake of system compatibility, follow these guidelines:

- Use single words or combine words using camelCase, underscores (`_`), or hyphens (`-`):
    - For example:
        - `ServerSetupGuide.md`,
        - `server_setup_guide.md`, or
        - `server-setup-guide.md`.
- Avoid spaces in file names. They cause issues in URLs and command-line operations.
- Avoid special characters like `!`, `$`, `#`, `%`, etc. They have specific functions in certain environments or scripts.

#### The Importance of `.md` Extension for Markdown Files

File name extensions are not always necessary, especially on Linux and Unix systems.
However, when it comes to Markdown files, add the `.md` extension.
This helps in the following ways:

1. **GitHub Rendering**: GitHub automatically renders files with a `.md` extension as formatted Markdown.
   This means your documentation will be displayed with the intended formatting (like headers, lists, links, etc.) when viewing them on GitHub.
3. **Editor Support**: Most code editors recognize `.md` files and provide syntax highlighting.
4. **Consistency and Recognition**: Using the `.md` extension helps users and systems alike to quickly identify the file type and its intended use.

For instance, naming a file `InstallationGuide.md` ensures that GitHub renders it as a Markdown document and displays all formatting correctly in the browser.
This enhances readability and makes the documentation more user-friendly.

## Create a Repository (Repo) on GitHub

Now that you have a GitHub account, you will want to create a repository or repo for your documentation project.
I outline the steps below, but see the official documentation:
[Creating a new repository][github_repo].

- Click the green **New** button in the upper left corner on your home page.
- In the **Owner/Repository name** field, add a name for your repo:
    - Use a descriptive name and avoid spaces and special characters.
- Add an optional description:
    - This helps later in case you eventually create lots of repos.
- Keep it public.
- Click to add a README file
- Choose an open source license, if you want.
- Then click the **Create repository** button.

[github_repo]:https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

### Edit README

You should now see your repository's home page, and
you should be viewing the default, but empty, README.md file.
Let's edit this file on GitHub:

- Click the pencil icon at the top right of that README.md file.
- This opens an editor. Put the cursor after the heading and press Enter.
- Add some text that describes the project:
    - You can add a better description later.
- Use Markdown code to edit the text you add. The next section describes the basics of Markdown.

#### Markdown Basics

Markdown is a simple markup language for formatting plain text,
which can later be rendered as HTML or even as a PDF, DOCX, etc.
It's a very popular markup language in various technical spheres, and
it's easy to get started.

Here's a quick guide to the most commonly used Markdown syntax:

##### Headings

Headings are created using the `#` symbol before your text.
The number of `#` symbols indicates the level of the heading:

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

- **Unordered Lists**: Use asterisks, plus signs, or hyphens to create bullet points.
- Use indentation to create sub-items in a list.
  
  ```markdown
  * Item 1
  * Item 2
    * Subitem 2.1
    * Subitem 2.2
  ```

- **Ordered Lists**: Use numbers followed by periods for an ordered list.

  ```markdown
  1. First item
  2. Second item
     1. Subitem 2.1
     2. Subitem 2.2
  ```

##### Links and Images

- **Links**: To create a link, wrap the link text in brackets `[ ]`, and then wrap the URL in parentheses `( )`. 
    - For example, `[GitHub](https://github.com)`.
- **Images**: Similar to links, but start with an exclamation mark, followed by the alt text in brackets, and the URL in parentheses. 
    - For example, `![Alt text](image-url.jpg)`.
    - In this example, the file **image-url.jpg** must be in the same directory as the Markdown file.

##### Code

- **Inline Code**: Use a single backtick to wrap your code in text.
    - For example, this is an example of `` `inline code` ``.
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

To create a blockquote, use the `>` symbol before your text.
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

##### Additional Tips

- **Whitespace and Line Breaks**: In Markdown, line breaks and spacing can be crucial.
  Paragraphs are automatically created when text is separated by an empty line.
  To create a new line without starting a new paragraph, end a line with two or more spaces before hitting Enter.
- **Escaping Markdown**: To display a Markdown character, precede it with a backslash (`\`). For example, `\*not italic\*`.

### Preview and Save

As you edit your README.md file, you can click the **Preview** tab to see how it will be rendered.

Once you are finished editing, to save you:

- Click on the **Commit changes...** button.
- A pop-up will appear. Update the **Commit message** or leave as-is:
    - When you make more substantive edits, you will want to leave descriptive commit messages.
    - Descriptive commit messages help with version control.
- Press the **Commit changes** button.
- Then click on the repo link to return to your repo's homepage.

### *Gitting* Started

`git` is already installed on your Linux virtual machines.
To get started using it, we will need to connect to our virtual machines and
run some commands to configure `git` to work with GitHub.

#### Git Configuration

To get started, connect to your remote server and run the following commands.
Note the quotes around the name but not around the **github_username** or **email address**.
Replace your name and email address with the name and email address you used for your GitHub accounts.
Run these commands separately:

```
git config --global user.name "Your Name"
git config --global user.name github_username
git config --global user.email youremail@example.com
```

Next, we configure Git to use **main** as our default branch name.
The second command instructs Git to use `nano` as your default editor.
Run these two commands as-is, but if you are using a different text editor, then be sure to lookup the appropriate command for that editor:

```
git config --global init.defaultBranch main
git config --global core.editor "nano"
```

We can verify the above settings with the following command:

```
git config --list
```

For additional details, see the Git documentation on getting started:

- [Getting Started - First-Time Git Setup][gitstarted]

We'll soon begin to use Git and GitHub when we start coding our websites.
Next, we need to understand some basic concepts with Git and GitHub.

## Generate SSH Keys

We need to secure our `git` and GitHub connection and repositories.
We do that first by creating an SSH key.

On the server:

1. Generate a new ssh key with the following command:
    1. `ssh-keygen -t ed25519 -C "your_email@example.com"`
    2. Use the same email that you used when signing up with GitHub.
3. Copy your SSH public key to your clipboard:
  1. View it with this command: `cat ~/.ssh/id_ed25519.pub`.
  2. Then select it with your mouse and copy it.
  3. Open GitHub and click on profile photo and then Settings.
  4. In the Access section of sidebar, click **SSH and GPG keys**
  5. Click **New SSH key** or **Add SSH key**
  6. In the **Title** field, add a descriptive label for the new key:
      1. For example, the name of the machine you used to generate the key.
  7. Select the key type: authentication
  8. Paste your SSH public key in the **Key** field.
  9. Click **Add SSH key**
  10. See the official documentation here:
    1. [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account][github_ssh_add]
4. Setup the SSH public key as your signing key:
  1. Run the following commands:
      1. `git config --global gpg.format ssh`
      2. `git config --global user.signingkey $HOME/.ssh/id_ed25519.pub`
      3. See the documentation at:
          1. [https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key][github_signing_key]
5. Then run the following command to configure signing:
    1. `git config --global commit.gpgsign true`

## Clone Your Repo

Now that you have `git` configured to work with GitHub,
you will want to clone your repo to your virtual machine.

- Return to GitHub and your repo's homepage.
- Click the green **Code** drop down button.
- Make sure the SSH option is selected.
- Copy the command, which should have the following syntax:
    - `git@github.com:repo_user/repo_name.git`
    - **repo_user** should be your GitHub username.
    - **repo_name.git** should be your repo's name.
- Return to your Linux virtual machine, and run the following command to clone your repo:
    - `git clone git@github.com:repo_user/repo_name.git`

Now you should have the one-for-one copy on your virtual machine.

## Stage, Commit, and Push Your Repo

Now we will use `nano` to make changes to your repository.
Let's navigate to your repo's directory on your virtual machine:

```
cd repo_name
```

Now let's create a new file.
I'll use **entry_one.md** as the file name, but feel free to choose a different name:

```
touch entry_one.md
```

Let's edit the file with `nano`:

```
nano entry_one.md
```

Add whatever you'd like here to get started.
When completed, save the file and exit `nano`.

Now we need to **push** our changes to our GitHub repo.
We start by staging the changes:

```
git add entry_one.md
```

Then we commit the change and add a commit message:

```
git commit -m "commit message here"
```

Then we **push** the commit to our GitHub repo:

```
git push origin main
```

Visit your repo's homepage on GitHub to see the update.

Whenever we add, edit, or delete a file or directory in our local repo,
we will want to follow the stage (add), commit, and push steps above.

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
or start a project by creating a remote repo on GitHub and then copying it to our local system.

### Branches

The second Git concept to learn is:

- branches

When you configure a directory on your local system to become a Git project, you create a default branch for your project.
For small projects, we might only work in the default branch.
The default branch will be named **main**.

However, since Git is a version control system,
we can create additional branches to test or work on different components of our projects without messing with the main branch.
For large or complex projects, we would work and switch among different branches.
A large project might be a big website, an software application, or even an operating systems.
Working in non-main branches (e.g., a testing branch),
allows us to develop components of our project without interfering with the main branch, which might be at a stable version of our project. And then when we are ready, we can merge a testing branch with our main branch,
or we can delete the testing branch if we don't want to use it.

We will primarily work with the default, main branch with our projects,
but you should read the [Git documentation on branches][git_branches].

Important note: If we create a new repository on our local machines using Git, the default branch might be called **master**.
However, if we create a new repository on GitHub, the default branch will be called **main**.

There is a long history of using terms like master and slave in various technologies,
and the technology industry is beginning to come to terms with this and to use more inclusive terms.
You can read more about the reasons here:

- [GitHub to replace 'master' with 'main' starting next month][gitmain]
- [Tech Confronts Its Use of the Labels 'Master' and 'Slave'][gitlabels]

For future reference, here's a nice cheat sheet of [Git commands][git_commands].

[git_branches]:https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
[git_commands]:https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
[git]:https://git-scm.com/
[github]:https://github.com
[github_signing_key]:https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key
[github_ssh_add]:https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
[gitlabels]:https://www.wired.com/story/tech-confronts-use-labels-master-slave/
[gitmain]:https://www.zdnet.com/article/github-to-replace-master-with-main-starting-next-month/
[gitstarted]:https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup
