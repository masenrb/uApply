const { set } = require("mongoose");
const User = require("../models/userModel.js");
var ObjectID = require("mongodb").ObjectID;

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
  await User.find({ userName: user }).then((user) => {
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
  var userData = {};
  userData = await User.findById(userID)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "User not found",
        });
      }
      return user;
    })
    .catch(() => {
      return res.status(400).send({
        error: "Incorrect User ID catch",
      });
    });

  let foundCompany = false;
  let updateStatus = true;
  if (userData.statusCode === 400) {
    return;
  }

  //Add switch statement for adding to statistics
  for (var i = 0; i < userData.applications.length; i++) {
    if (userData.applications[i].companyName === company) {
      if (!newApplicationStatus) {
        return res.status(400).send({
          error: "No status input",
        });
      }

      if (newApplicationStatus === 'Filling Application' || newApplicationStatus === "Awaiting Response") {
        userData.stats.interviewCount -= userData.applications[i].applicationStats.interviewCount;
        userData.applications[i].applicationStats.interviewCount = 0;

        if (userData.applications[i].applicationStats.offer) {
          userData.stats.offers -= 1;
          userData.applications[i].applicationStats.offer = false;
        }
        if (userData.applications[i].applicationStats.rejection) {
          userData.stats.rejections -= 1;
          userData.applications[i].applicationStats.rejection = false;
        }
      } else if (newApplicationStatus === "Interview 1" || newApplicationStatus === "Interview 2" || newApplicationStatus === "Interview 3") {
        userData.stats.interviewCount -= userData.applications[i].applicationStats.interviewCount;
        switch(newApplicationStatus) {
          case "Interview 1":
            userData.applications[i].applicationStats.interviewCount = 1;
            userData.stats.interviewCount += 1;
            break;
          case "Interview 2":
            userData.applications[i].applicationStats.interviewCount = 2;
            userData.stats.interviewCount += 2;
            break;
          case "Interview 3":
            userData.applications[i].applicationStats.interviewCount = 3;
            userData.stats.interviewCount += 3;
            break;
        }

        if (userData.applications[i].applicationStats.offer) {
          userData.stats.offers -= 1;
          userData.applications[i].applicationStats.offer = false;
        }
        if (userData.applications[i].applicationStats.rejection) {
          userData.stats.rejections -= 1;
          userData.applications[i].applicationStats.rejection = false;
        }
      } else if (newApplicationStatus === "Offer Received") {
        if (!userData.applications[i].applicationStats.offer) {
          userData.stats.offers += 1;
          userData.applications[i].applicationStats.offer = true;
        }
        if (userData.applications[i].applicationStats.rejection) {
          userData.stats.rejections -= 1;
          userData.applications[i].applicationStats.rejection = false;
        }
      } else if (newApplicationStatus === "Rejection Received") {
        if (!userData.applications[i].applicationStats.rejection) {
          userData.stats.rejections += 1;
          userData.applications[i].applicationStats.rejection = true;
        }
        if (userData.applications[i].applicationStats.offer) {
          userData.stats.offers -= 1;
          userData.applications[i].applicationStats.offer = false;
        }
      } else {
        updateStatus = false;
      }

      userData.applications[i].status = newApplicationStatus;
      foundCompany = true;
    }
  }

  if (!updateStatus) {
    return res.status(400).send({
      message: "Invalid status update",
    });
  } else if (foundCompany) {
    await new User(userData).save();
    return res.json(userData);
  } else {
    return res.status(400).send({
      message: "Not updated",
    });
  }
};

exports.createApplication = async (req, res) => {
  let applicationInputs = req.query;
  let userFound = false;
  userData = await User.findById(applicationInputs.userID)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "User not found",
        });
      }
      userFound = true;
      return user;
    })
    .catch(() => {
      return res.status(400).send({
        error: "Incorrect User ID catch",
      });
    });
  let newApplication = {
    companyName: "",
    jobTitle: "",
    location: "",
    description: "",
    salary: 0,
    benefits: [],
    qualifications: [],
    toDo: [],
    status: "",
    contacts: [],
    notes: [],
    events: [],
    notifications: {
      feedbackEmails: "bool",
      notificationEmails: "bool",
      upcomingEvents: "bool",
      weeklyReport: "bool",
      agenda: "bool",
    },
    applicationStats: {
      interviewCount: 0,
      offer: "bool",
      rejection: "bool",
    },
  };

  if (applicationInputs.companyName) {
    newApplication.companyName = applicationInputs.companyName;
  }
  if (applicationInputs.jobTitle) {
    newApplication.jobTitle = applicationInputs.jobTitle;
  }
  if (applicationInputs.location) {
    newApplication.location = applicationInputs.location;
  }
  if (applicationInputs.description) {
    newApplication.description = applicationInputs.description;
  }
  if (applicationInputs.salary) {
    newApplication.salary = applicationInputs.salary;
  }
  if (applicationInputs.benefits) {
    for (var i = 0; i < applicationInputs.benefits.length; i++) {
      newApplication.benefits.push(applicationInputs.benefits[i]);
    }
  }
  if (applicationInputs.qualifications) {
    for (var i = 0; i < applicationInputs.qualifications.length; i++) {
      newApplication.qualifications.push(applicationInputs.qualifications[i]);
    }
  }
  if (applicationInputs.toDo) {
    for (var i = 0; i < applicationInputs.toDo.length; i++) {
      newApplication.toDo.push(applicationInputs.toDo[i]);
    }
  }
  if (applicationInputs.status) {
    newApplication.status = applicationInputs.status;
  }
  if (applicationInputs.contacts) {
    for (var i = 0; i < applicationInputs.contacts.length; i++) {
      var newContact = {};
      if (applicationInputs.contacts[i].name) {
        newContact.name = applicationInputs.contacts[i].name;
      }
      if (applicationInputs.contacts[i].email) {
        newContact.email = applicationInputs.contacts[i].email;
      }
      if (applicationInputs.contacts[i].phoneNumber) {
        newContact.phoneNumber = applicationInputs.contacts[i].phoneNumber;
      }
      if (applicationInputs.contacts[i].notes) {
        newContact.notes = applicationInputs.contacts[i].notes;
      }
      if (applicationInputs.contacts[i].lastContactDate) {
        newContact.lastContactDate = new Date(
          applicationInputs.contacts[i].lastContactDate
        );
      } else {
        newContact.lastContactDate = new Date();
      }
      if (applicationInputs.contacts[i].lastContactNotes) {
        newContact.lastContactNotes =
          applicationInputs.contacts[i].lastContactNotes;
      }
      newApplication.contacts.push(newContact);
    }
    if (applicationInputs.notes) {
      for (var i = 0; i < applicationInputs.notes.length; i++) {
        newApplication.notes.push(applicationInputs.notes[i]);
      }
    }
    if (applicationInputs.events) {
      for (var i = 0; i < applicationInputs.events.length; i++) {
        var newEvent = {};
        if (applicationInputs.events[i].eventTitle) {
          newEvent.eventTitle = applicationInputs.events[i].eventTitle;
        }
        if (applicationInputs.events[i].eventDate) {
          newEvent.eventDate = new Date(applicationInputs.events[i].eventDate);
        } else {
          newEvent.eventDate = new Date();
        }
        if (applicationInputs.events[i].notes) {
          newEvent.notes = applicationInputs.events[i].notes;
        }
        if (applicationInputs.events[i].phase) {
          newEvent.phase = applicationInputs.events[i].phase;
        }
        newApplication.events.push(newEvent);
      }
    }
    if (applicationInputs.notifications) {
      if (applicationInputs.notifications.feedbackEmails) {
        newApplication.notifications.feedbackEmails =
          applicationInputs.notifications.feedbackEmails;
      }
      if (applicationInputs.notifications.notificationEmails) {
        newApplication.notifications.notificationEmails =
          applicationInputs.notifications.notificationEmails;
      }
      if (applicationInputs.notifications.upcomingEvents) {
        newApplication.notifications.upcomingEvents =
          applicationInputs.notifications.upcomingEvents;
      }
      if (applicationInputs.notifications.weeklyReport) {
        newApplication.notifications.weeklyReport =
          applicationInputs.notifications.weeklyReport;
      }
      if (applicationInputs.notifications.agenda) {
        newApplication.notifications.agenda =
          applicationInputs.notifications.agenda;
      }
    }
    if (applicationInputs.applicationStats) {
      if (applicationInputs.applicationStats.interviewCount) {
        newApplication.applicationStats.interviewCount =
          applicationInputs.applicationStats.interviewCount;
      }
      if (applicationInputs.applicationStats.offer) {
        newApplication.applicationStats.offer =
          applicationInputs.applicationStats.offer;
      }
      if (applicationInputs.applicationStats.rejection) {
        newApplication.applicationStats.rejection =
          applicationInputs.applicationStats.rejection;
      }
    }
  }
  if (userFound) {
    userData.applications.push(newApplication);
    userData.stats.totalApplications += 1;
    await new User(userData).save();
    return res.json(userData);
  }
  return;
};

exports.deleteApplication = async (req, res) => {
  let userID = req.query.userID;
  userFound = true;
  userData = await User.findByIdAndUpdate(
    userID,
    { 
      $inc: { "stats.totalApplications": -1 },
      $pull: { applications: { companyName: req.query.companyName }} 
    },
    { safe: true, upsert: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "User not found",
        });
      }
      return user;
    })
    .catch(() => {
      userFound = false;
      return res.status(400).send({
        error: "Incorrect User ID",
      });
    });
  if (userData._id != null) {
    return res.json({ message: "Deleted application" });
  } else if (userFound) {
    res.status(400).send({
      error: "error",
    });
  } else {
    return;
  }
};

//Return all stats given username
exports.getAllStats = async (req, res) => {
  let user = req.query.username;
  await User.find({ userName: user }, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });

    return res.json(data[0].stats);
  });
};
