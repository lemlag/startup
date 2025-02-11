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
- 

## Web technology stack
Here is what our stack looks like: React for the web framework, talking to Caddy as the web server hosted on AWS, running web services with Node.js, and MongoDB as the database hosted on MongoDB Atlas.

## AWS
Elastic IP address: 3.221.48.99
SSH command: ssh -i cs260pair.pem ubuntu@3.221.48.99
My aws instance: https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Addresses:PublicIp=3.221.48.99


### Domain Names
dig command - info maps domain name to the ip address
Subdomain.secondary.topleveldomain
whois domainname - info about the domain name

### DNS server
My domain name: http://sudokucentral.click
Any subdomain works with it, for example http://help.sudokucentral.click

### Caddy
Caddy automatically communicates with Let's Encrypt so, when it is configured right, gets a certificate from it to verify authenticity
Also works for https://simon.sudokucentral.click and https://startup.sudokucentral.click

### How to add encryption on Caddy:
edit the caddyfile and restart the caddy server

## HTML
### Tags
Tags are the elements that are used for structure in HTML to delineate elements. There are many different ways to use them, and many different levels.
### Attributes
Elements can have different attributes. For example, the img element has width and height attributes, along with src and alt.
### Simon
deployFiles.sh provides a method to delete previous instances and deploy the current instance of the code onto the web server
The links help the page navigate well.
### Own product design
There need to be probably 3 files - signup, home with sudoku, and leaderboard.
Home - index.html
Leaderboard - scores.html
Signup - signup.html
The sudoku puzzle itself is created by having 81 number input boxes - will I have to change this or can I style the input boxes?
How do I add vertical lines? I can add horizontal lines with <hr /> and linebreaks with <br />

## CSS
Cascading Stylesheets uses selectors and declarations. It is formatted as 
> selector {
>   declaration: value;    
>}
where selector corresponds to a group of elements and declarations corresponds to a property that can be changed about them. For example, text color, padding, or text-alignment.

CSS can also be used to animate portions of the website using keyframes.

### Simon CSS 
- Most CSS files are relatively short, but they add a significant margin to the html code
- Add links to the css file with     <link rel="stylesheet" href="main.css" />
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
- use the previous with a link to include bootstrap

### CSS for sudoku
- It is really hard to do a right-side navbar. I made it so it should go to the bottom in case of small mobile screens. Not sure it will work though.
- Tables have to be centered individually
- CSS is very useful - but flex sometimes makes it so you cannot get your content centered. You should figure out a way around that
- Color schemes are complicated - you can use online tools like the one at canva to help you pick good color schemes
- To expand the reach of a link, expand the padding of the associated element and it will still link when you press on it.


## Javascript
### Node.js
- to run node on a file, type node filename.js
- interpretive mode - node
- one line - node -e
npm to do node package manager
- to initialize with defaults, do 
npm init -y

  run index.js inside of html with this tag
  <script src="index.js"></script>

  to get your files to auto-reload
  node --watch main.js

  to exit vscode debugging: shift F5
  start debugging: F5
  Step: F10
  Step into function: F11
  Continue: F5
