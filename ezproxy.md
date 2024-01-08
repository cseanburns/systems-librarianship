EZproxy logs:

- Audit logs
    - user login and logout events
- Starting point URL (SPU) logs
    - the initial click that starts users' EZproxy journey
- EZproxy logs
    - The activity of a user while in proxy

What is ezPAARSE?

- an open source tool designed to process and analyze EZproxy log files
- transforms raw EZproxy log data into readable/usable eResoure Usage Data using parsers

Parsers -- The corse of ezPAARSE

- sort of reverse of an exproxy stanza
    - looking to isolate identifiers from ezproxy logs
    - github: https://github.com/ezpaarse-project/ezpaarse-platforms

Method for utilizing ezPAARSE

- download and maintain ezPAARSE
- build and run the jobs
- responsible for log maintenance, ensuring matching logs format statements, updating ezpaarse/parsers
- responsible for repository for enriched data
