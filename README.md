# Sudoku Central

Sudoku Central is an online platform for enjoying a daily randomized game of sudoku, and allows users to see the rankings for the current days' game of sudoku. This will be an easy game of Sudoku


<!-- > [!NOTE]
>  You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item. -->

## 🚀 Specification Deliverable

For this deliverable I designed the central idea of the product, and made an example template of what the final product should look like. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown - I edited the provided markdown document and made it look presentable, including commenting out the portions that are not applicable yet
- [x] A concise and compelling elevator pitch - done in one moderate-sized paragraph
- [x] Description of key features - summary of currently-planned features (mainly gameplay related) that would appeal to sudoku lovers
- [x] Description of how you will use each technology - summarized the purpose of each technology in the final webpage design of the sudoku project
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references. - Done - two images designed by me for two of the pages of the website

### Elevator pitch

Have you ever done a sudoku on any popular website and been annoyed by all of the computerized assistance you receive? My website will return you to the good old feeling of solving with a pencil on paper by not providing any automatic checks or logic assistance, letting you make mistakes and figure out connections without an unnecessary limitation on your puzzle-solving experience. Additionally, you can race against your friends and compete to be on the global leaderboard. This provides all of the challenge and competitiveness of this puzzle game in one easy-to-access place.

### Design

![Puzzle Design](PuzzlePageDesign.png)

This is the main screen that shows the game window with the current time spent on the puzzle.

![Leaderboard Design](LeaderboardDesign.png)

This picture shows the leaderboard concept design, with space for a user's ranking, username, and the time it took them to complete the day's puzzle.

Below is a sequence diagram showing how the users will interact with the backend to have an up-to-date leaderboard.

 ```mermaid
sequenceDiagram
    actor Alice
    actor Bob
    actor Website
    Alice->>Website: Submit puzzle
    Website-->>Bob: Update leaderboard
    Website-->>Alice: Update leaderboard
    Bob->>Website: Submit puzzle
    Website-->>Alice: Update leaderboard
    Website-->>Bob: Update leaderboard
``` 

### Key features

- Secure login over HTTPS
- Randomized game of Sudoku every day (same for all users)
- Competitive leaderboard display
- Submit tells you if you have solved the puzzle or not
- Different colors for puzzle's numbers and user's number input
- Leaderboard persistently stored, but updated every day
- Header displays accurate timer and puzzle number, to keep track of which puzzle is which

### Technologies

I am going to use the required technologies in the following ways:

- **HTML** - Provides the basic structure for the website, including hyperlinks between the three pages. Will have three HTML pages, one for login, one for gameplay, and one for the leaderboard, with hyperlinks between them.
- **CSS** - Styles the application so that it centers the game regardless of screen size, and displays textual information in appealing colors and fonts to the user.
- **React** - Forms the basis of the user login, game display, and leaderboard display so that the user can interact with the various elements and receive updates on the leaderboard in real time.
- **Service** - Establishes the backend service with endpoints for:
    -   Login
    -   Retrieving the daily puzzle
    -   Verifying if the sudoku puzzle is correct
    -   Retrieving leaderboard information
- **DB/Login** - Stores user information, along with leaderboard information and both the initial state and solved state of the day's puzzle in the database. Will register and login users, and store credentials securely. The user cannot save their high score unless logged in.
- **WebSocket** - As each user completes the sudoku, the updated leaderboard information is broadcast to all other users on the leaderboard page.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://sudokucentral.click/). - The root displays the desired image and all subdomains work.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created 3 pages that are all linked together, with space for every component of my application.
- [x] **Proper HTML element usage** - I used appropriate HTML elements, including those 5 in each HTML document. I also used aside.
- [x] **Links** - Each page links to the others, with the link to itself disabled.
- [x] **Text** - All textual content and input is represented.
- [x] **3rd party API placeholder** - I will be using a 3rd party service to help me generate new sudoku games, and I made a placeholder for the input and display of these games in index.html (the array of number inputs is a sudoku game). The service is https://sudoku-api.vercel.app/.
- [x] **Images** - I put a picture of a lock on the login page. I also made a favicon for the website.
- [x] **Login placeholder** - I made a login page for the user to include their username and password. Username display will be on the sidebar, beneath the links for the other pages.
- [x] **DB data placeholder** - I made an html page for the puzzle, which relies on the database's solved puzzle to check the player's score accurately and its unsolved puzzle to give the users when they first go to the page. Also, leaderboard information will be stored in the database, and that has its own page.
- [x] **WebSocket placeholder** - I made an html page for the leaderboard scores, which updates automatically when users press the submit button on their puzzle.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - The header, footer, and main content have been heavily styled including font changes, background changes, and individual element changes
- [x] **Navigation elements** - Most of my work was focused on the navigation elements. They are on the right hand side of every page and change color when hovered over.
- [x] **Responsive to window resizing** - When the window resizes, the whitespace of the puzzle aspect of the page shrinks and grows with the window. When it is too small, the navigation pane shifts to underneath the main content. When the screen is too short, the header and footer disappear.
- [x] **Application elements** - Every box in the puzzle was resized with css and borders and edges were added to make it look like a proper sudoku game.
- [x] **Application text content** - I changed the application fonts and changed their coloring based on their backgrounds. I also changed their positioning on the page.
- [x] **Application images** - I added a border to my image, rounded it, and used CSS to control the height and width of the image.

 ## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - This part of the projecgt is bundled using Vite, which also let me debug my changes quickly and easily.
- [x] **Components** - I converted all of the previous html, that was multiple pages, into react components to make a single page application.
- [x] **Router** - There is routing between all of the components that works to switch between the viewed components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - All of the functionality is implemented or mocked out, including requiring someone to enter in the password they created when they started the account, updating the scoreboard in real time to represent websockets, and even correctly solving the sudoku (I left it really easy so you could test it easily).
- [x] **Hooks** - I used many useState and useEffect hooks all over the project, so that it could be reactive. There should be hooks in every file I wrote.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - My service uses Node.js and Express, as per the instructions.
- [x] **Static middleware for frontend** - The frontend is served up using Express static middleware, as per the instructions.
- [x] **Calls to third party endpoints** - I called a third party endpoint to provide the sudoku and the sudoku's solution so the user could have a randomly generated but legal sudoku every time.
- [x] **Backend service endpoints** - I made backend service endpoints for each major aspect of communication between the frontend and backend, including saving data, submitting the sudoku, and registering for and creating users.
- [x] **Frontend calls service endpoints** - I called service endpoints every time the user needs to communicate with the server, which is fairly frequently with saving, submitting, and creating new games, along with displaying the scoreboard and logging in.
- [x] **User registration** - User can register a new user, but only if the username is not already taken by someone else.
- [x] **User login and logout** - User can log in and log out after registering, and the user's data persists.
- [x] **Restricts functionality based on authentication** - A user is not allowed to save a game if they are not logged in, and their scores are not posted to the scoreboard.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.


- [x] **Stores data in MongoDB** - Stores game and best time information in MongoDB.
- [x] **Stores credentials in MongoDB** - Stores authentication data in MongoDB.


<!-- ## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable. -->

## Notes:
[My Notes](notes.md)

