// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="p1-systems-librarianship.html"><strong aria-hidden="true">1.</strong> Systems Librarianship</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="1a-history-linux-unix.html"><strong aria-hidden="true">1.1.</strong> History of Unix and Linux</a></li><li class="chapter-item expanded "><a href="1b-what-is-linux.html"><strong aria-hidden="true">1.2.</strong> What is Linux?</a></li><li class="chapter-item expanded "><a href="1c-what-is-sysadmin.html"><strong aria-hidden="true">1.3.</strong> What is Systems Administration?</a></li><li class="chapter-item expanded "><a href="1d-what-is-syslib.html"><strong aria-hidden="true">1.4.</strong> What is Systems Librarianship?</a></li></ol></li><li class="chapter-item expanded "><a href="p2-project-management-and-CLI.html"><strong aria-hidden="true">2.</strong> Project Management and CLI (Command Line Interface) Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="2a-using-gcloud-virtual-machines.html"><strong aria-hidden="true">2.1.</strong> Using Google Cloud for Virtual Machines</a></li><li class="chapter-item expanded "><a href="2b-learn-the-cli.html"><strong aria-hidden="true">2.2.</strong> Learn the CLI</a></li><li class="chapter-item expanded "><a href="2c-learn-nano.html"><strong aria-hidden="true">2.3.</strong> Using the Nano Text Editor</a></li><li class="chapter-item expanded "><a href="2d-documenting-git-github-markdown.html"><strong aria-hidden="true">2.4.</strong> Documenting with Git, GitHub, and Markdown</a></li></ol></li><li class="chapter-item expanded "><a href="p3-working-on-the-CLI.html"><strong aria-hidden="true">3.</strong> Working on the CLI</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="3a-searching-with-grep.html"><strong aria-hidden="true">3.1.</strong> Searching with grep</a></li><li class="chapter-item expanded "><a href="3b-managing-software.html"><strong aria-hidden="true">3.2.</strong> Managing Software</a></li><li class="chapter-item expanded "><a href="3c-library-search.html"><strong aria-hidden="true">3.3.</strong> Library Search</a></li></ol></li><li class="chapter-item expanded "><a href="p4-creating-a-lamp-server.html"><strong aria-hidden="true">4.</strong> Creating a LAMP Server</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="4a-installing-the-apache-web-server.html"><strong aria-hidden="true">4.1.</strong> Installing the Apache Web Server</a></li><li class="chapter-item expanded "><a href="4b-installing-configuring-php.html"><strong aria-hidden="true">4.2.</strong> Installing and Configuring PHP</a></li><li class="chapter-item expanded "><a href="4c-installing-configuring-mysql.html"><strong aria-hidden="true">4.3.</strong> Installing and Configuring MySQL</a></li></ol></li><li class="chapter-item expanded "><a href="p5-integrated-library-systems.html"><strong aria-hidden="true">5.</strong> DIY Integrated Library Systems</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="5a-introduction-to-relational-databases.html"><strong aria-hidden="true">5.1.</strong> Introduction to Relational Databases</a></li><li class="chapter-item expanded "><a href="5b-basic-opac.html"><strong aria-hidden="true">5.2.</strong> Creating a Bare Bones OPAC</a></li><li class="chapter-item expanded "><a href="5c-basic-opac-admin.html"><strong aria-hidden="true">5.3.</strong> Creating a Bare Bones Cataloging Module</a></li></ol></li><li class="chapter-item expanded "><a href="p6-library-website-project.html"><strong aria-hidden="true">6.</strong> Library Website Project</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="6a-install-wordpress.html"><strong aria-hidden="true">6.1.</strong> Install WordPress</a></li><li class="chapter-item expanded "><a href="6b-install-omeka.html"><strong aria-hidden="true">6.2.</strong> Install Omeka Classic</a></li><li class="chapter-item expanded "><a href="6c-install-koha.html"><strong aria-hidden="true">6.3.</strong> Install the Koha Integrated Library System</a></li></ol></li><li class="chapter-item expanded "><a href="p7-conclusion.html"><strong aria-hidden="true">7.</strong> Conclusion</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
