require('dotenv').config();
const express = require('express');
const userModel = require('./models/user');
const userSessionModel = require('./models/userSession');
const blockedUserModel = require('./models/blockedUser');

const cors = require('cors');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

/*
Calculate difference in milliseconds for 2 dates
*/
const getNumberOfMinutesBetweenDates = (firstDate, secondDate) => {
  const difference = firstDate.getTime() - secondDate.getTime();
  return Math.round(difference / 60000);
};

/*
Fetch user details
*/
app.get('/user', async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
Perform login and block user for 5 minutes in case more then five login 
attempts with invalid credentials in 5 minutes
*/
app.post('/user', async (req, res) => {
  try {
    const { username, password, visitorId } = req.body;
    // Save session login everytime user logs in with visitorId
    await userSessionModel.create(username, visitorId, new Date());

    const users = await userModel.findOne(username, password);
    const blockedUser = await blockedUserModel.findOne(username);

    if (blockedUser.length === 0 && users.length > 0) {
      // User was never blocked before
      res.status(200).json({ loginDisabled: false, users });
    } else if (blockedUser.length > 0) {
      const { id, timestamp, noOfTries } = blockedUser[0];
      const resultInMinute = getNumberOfMinutesBetweenDates(
        new Date(),
        new Date(timestamp)
      );
      if (users.length === 0 && noOfTries < 5 && resultInMinute < 5) {
        // Save new login try
        blockedUserModel.update(id, noOfTries + 1);
        res.status(200).json({ loginDisabled: false, users });
      } else if (noOfTries === 5 && resultInMinute < 5) {
        // Disable login for 5 minutes
        res.status(200).json({ loginDisabled: true, users });
      } else if (resultInMinute > 5) {
        // Reset no of trials to 0 after 5 minutes and enable login
        blockedUserModel.update(id, 0);
        res.status(200).json({ loginDisabled: false, users });
      } else {
        res.status(200).json({ loginDisabled: false, users });
      }
    } else {
      // Create initial try for the blocked user
      blockedUserModel.create(username, 0, new Date());
      res.status(200).json({ loginDisabled: false, users });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`application running on port ${process.env.NODE_DOCKER_PORT}`);
});
