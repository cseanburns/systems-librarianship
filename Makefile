.PHONY: create copy publish

create:
				mdbook build .

copy:
				rsync -hrv --delete --progress book/ ~/workspace/personal_website/WWW/systems-librarianship

publish:
				rsync -hrv --delete --progress ~/workspace/personal_website/WWW/systems-librarianship/ danoc:~/public_html/WWW/systems-librarianship
