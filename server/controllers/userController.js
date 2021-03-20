const { set } = require("mongoose");
const User = require("../models/userModel.js");

//Post request create a user
//Needs to be fixed
exports.createUser = async (req, res) => {
  const user = req.body;
  console.log(req.query);
  if (!user) {
    return res.status(200).send({
      error: "User not found",
    });
  }
  await new User(user)
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

//Returns user if given correct credentials
exports.login = async (req, res) => {
  let user = req.query.username;
  let password = req.query.password;
  //Check for username
  await User.find({ userName: user })
    .then((user) => {
      if (!user) {
        return res.status(200).send({
          error: "User not found with an username: " + user,
        });
      }
      //Check for password
      if (user[0].password === password) {
        res.json(user);
      } else {
        return res.status(200).send({
          error: "Username and/or password incorrect",
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        error: err.message || "An unknown error has occurred.",
      });
    });
};

/* Retrieve all the directory, Users*/
exports.getAllUsers = async (req, res) => {
  await User.find({}, (err, data) => {
    if (err)
      return res.status(200).send({
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
      if (!user) {
        return res.status(200).send({
          error: "User not found with an username: " + user,
        });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(200).send({
        error: err.message || "An unknown error has occurred.",
      });
    });
};

//Gets all of the applications given the username
exports.getAllApplications = async (req, res) => {
  let user = req.query.username;
  await User.find({ userName: user }, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    //Print out to see the retun
    // console.log(data[0].applications);
    res.json(data[0].applications);
  });
};

//FIX ERROR HANDLING
//Return application given username and company name
exports.getApplicationByCompany = async (req, res) => {
  const settings = req.query;
  console.log("settings", settings);
  console.log(req.query.test);

  let user = req.query.username;
  let company = req.query.company;
  await User.find({ userName: user }, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });

    //Loop through applications array and check for match
    for (i = 0; i < data[0].applications.length; i++) {
      if (data[0].applications[i].companyName == company) {
        return res.json(data[0].applications[i]);
      }
    }
    return res.status(200).send({
      message: "Company not found",
    });
  });
};

exports.updateApplicationStatus = async (req, res) => {
  console.log("res", res);
  let updatedData = req.query;
  const userID = req.query.userID;
  const newApplicationStatus = req.query.applicationStatus;
  const applicationName = req.query.applicationName;
  console.log("new ", updatedData)
  console.log()
  await User.findOneAndUpdate({ _id: userID }, newApplicationStatus, (err, data) => {
    console.log("data, ", data)
    console.log(data.applications)
    console.log(applicationName);
    //Got company object by name, was testing twitter:
    console.log("twitter", data.applications.filter(element => element.companyName === applicationName));

  });

  // await User.findOneAndUpdate({ _id: })
};
