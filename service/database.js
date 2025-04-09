const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const timeCollection = db.collection('time');
const gameCollection = db.collection('game');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addTime(time) {
  return timeCollection.insertOne(time);
}

async function getBestTimes() {
  const query = { time: { $gt: 0} };
  const options = {
    sort: { time: 1 },
    limit: 10,
  };
  const cursor = await timeCollection.find(query, options);
  const array = await cursor.toArray();
  console.log(array);
  return array;
}

function getGame(email) {
  return gameCollection.findOne({ email: email });
}

async function addGame(game) {
  await gameCollection.insertOne(game);
}

async function updateGame(game) {
  await gameCollection.updateOne({ email: game.email }, { $set: game });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addTime,
  getBestTimes,
  getGame,
  addGame,
  updateGame,
};
