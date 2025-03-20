// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');


const authCookieName = 'token';

app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'User already exists'});
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};


// GetTimes
apiRouter.get('/times', verifyAuth, (_req, res) => {
  const times = await DB.getBestTimes();
  res.send(times);
});

// GetGame
apiRouter.get('/sudoku/saves', verifyAuth, async (_req, res) => {
  const user = await findUser('token', _req.cookies[authCookieName]);
  sudoku = await getGame(user.email);
  if (sudoku) {
    res.send(sudoku);
  } else {
    res.status(404).end();
  }
});

// SaveSudoku
apiRouter.post('/sudoku/saves', verifyAuth, async (req, res) => {
    await saveGame(req.body.email, req.body.userData);
    res.status(204).end();
});

// SubmitSudoku
apiRouter.post('/sudoku/submit', verifyAuth, (req, res) => {
    const times = updateScores(req.body);
    res.send(times);
});

// NewSudoku
apiRouter.post('/sudoku/newGame', verifyAuth, (req, res) => {
    sudoku = newGame(req.body.email, req.body.sudoku, req.body.solution);
    res.status(204).end();
});


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


// updateScores considers a new time for inclusion in the high times.
// function updateScores(newTime) {
//   let found = false;
//   for (const [i, prevTime] of times.entries()) {
//     if (newTime.time < prevTime.time) {
//       times.splice(i, 0, newTime);
//       found = true;
//       break;
//     }
//   }

//   if (!found) {
//     times.push(newTime);
//   }

//   if (times.length > 10) {
//     times.length = 10;
//   }

//   return times;
// }
async function updateScores(newTime) {
  await DB.addTime(newTime);
  return DB.getBestTimes();
}

async function getGame(email){
  const game = await findGame('email', email);
  if (game) {
    return game;
  } else {
    return null;
  }
}

async function saveGame(email, userData){
  const game = await findGame('email', email);
  if (game) {
    game.userData = userData;
    return game;
  } else {
    return null;
  }
}



async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function newGame(email, sudoku, solution) {
  const game = {
    email: email,
    sudoku: sudoku,
    userData: sudoku,
    solution: solution,
    startTime: Date.now(),
    endTime: null,
  };
  games.push(game);


  return game.startTime;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

async function findGame(field, value) {
  if (!value) return null;

  return games.find((g) => g[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
