const { set } = require("mongoose");
const User = require("../models/userModel.js");
var ObjectID = require('mongodb').ObjectID;

//Post request create a user
//Needs to be fixed
exports.createUser = async (req, res) => {
  const user = req.body;
  console.log(req.query);
  if (!user) {
    return res.status(400).send({
      error: "User not found",
    });
  }
  await new User(user)
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//Returns user if given correct credentials
exports.login = async (req, res) => {
  let user = req.query.username;
  let password = req.query.password;
  //Check for username
  await User.find({ userName: user })
    .then((user) => {
      if (!user[0]) {
        return res.status(400).send({
          error: "Username and/or password incorrect",
        });
      }
      //Check for password
      if (user[0].password === password) {
        res.json(user);
      } else {
        return res.status(400).send({
          error: "Username and/or password incorrect",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message || "An unknown error has occurred.",
      });
    });
};

/* Retrieve all the directory, Users*/
exports.getAllUsers = async (req, res) => {
  await User.find({}, (err, data) => {
    if (err)
      return res.status(400).send({
        message: err.message || "An unknown error occurred",
      });
    res.json(data);
  });
};

//Returns user given username
exports.getUser = async (req, res) => {
  let user = req.query.username;
  await User.find({ userName: user })
    .then((user) => {
      if (!user[0]) {
        return res.status(400).send({
          error: "User not found",
        });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message || "An unknown error has occurred.",
      });
    });
};

//Gets all of the applications given the username
exports.getAllApplications = async (req, res) => {
  let user = req.query.username;
  await User.find({ userName: user }, (err, data) => {
    if (err)
      return res.status(400).send({
        message: err.message || "An unknown error occurred",
      });
    //Print out to see the retun
    // console.log(data[0].applications);
    res.json(data[0].applications);
  });
};

//Return application given username and company name
exports.getApplicationByCompany = async (req, res) => {
  const settings = req.query;
  let user = req.query.username;
  let company = req.query.company;
  await User.find({ userName: user })
    .then((user) => {
    if (!user[0])
      return res.status(400).send({
        message: "User not found",
      });

    //Loop through applications array and check for match
    for (i = 0; i < user[0].applications.length; i++) {
      if (user[0].applications[i].companyName == company) {
        return res.json(user[0].applications[i]);
      }
    }
    return res.status(400).send({
      message: "Company not found",
    });
  });
};


exports.updateApplicationStatus = async (req, res) => {
  let userID = req.query.userID;
  const newApplicationStatus = req.query.applicationStatus;
  const company = req.query.applicationName;
  var userData = {}
  userData = await User.findById(userID)
    .then((user) => {
      if (!user) {
        console.log("no user");
        return res.status(400).send({
          message: "User not found",
        });
      }
      console.log("user ", user);
      return user;
    })
    .catch(() => {
      return res.status(400).send({
        error: "Incorrect User ID catch",
      });
    });

  let foundCompany = false;
  if (userData.statusCode === 400) {
    return;
  }

  for (var i = 0; i < userData.applications.length; i++) {
    if(userData.applications[i].companyName === company) {
      if (!newApplicationStatus) {
        return res.status(400).send({
          error: "No status input",
        });
      }
      userData.applications[i].status = newApplicationStatus;
      foundCompany = true;
    }
  }

  if (foundCompany) {
    await new User(userData).save();
    return res.json(userData);
  } else {
    return res.status(400).send({
      message: "Not updated",
    });
  }
};
