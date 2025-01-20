# CS 260 Notes

It was difficult to start because github was temporarily down, but I was finally able to clone my project.

<!-- [My startup - Sudoku]() -->

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)

## Initial Plans

One of the ideas listed was to make a simple game, so I chose sudoku because I do not like the way that most sudoku apps implement their sudoku games. Also, it should easily meet all qualifications that the website needs to have.

> To do list for the website:
>- Determine how sudokus are generated
>- Look into color schemes that work for the website


## Project Checklist:
- Specification deliverable readme - Done!
- Website design mockups - Done!

## Web technology stack
Here is what our stack looks like: React for the web framework, talking to Caddy as the web server hosted on AWS, running web services with Node.js, and MongoDB as the database hosted on MongoDB Atlas.

## AWS
Elastic IP address: 3.221.48.99
SSH command: ssh -i cs260pair.pem ubuntu@3.221.48.99
My aws instance: https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Addresses:PublicIp=3.221.48.99


## Domain Names
dig command - info maps domain name to the ip address
Subdomain.secondary.topleveldomain
whois domainname - info about the domain name

## DNS server
My domain name: http://sudokucentral.click
Any subdomain works with it, for example http://help.sudokucentral.click
