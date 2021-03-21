const userController = require("../controllers/userController.js"),
  express = require("express"),
  userRouter = express.Router();

//Returns all Users
userRouter.get("/", userController.getAllUsers);

//Returns user given matching credentials
userRouter.get("/login", userController.login);

//Returns user given username
userRouter.get("/getuser", userController.getUser);

//Creates user (not yet implemented)
userRouter.post("/post", userController.createUser);

//Returns all applications
userRouter.get("/getApplication", userController.getAllApplications);

//Returns application given username and company name
userRouter.get(
  "/getApplication/company",
  userController.getApplicationByCompany
);

//Returns all stats
userRouter.get("/getStats", userController.getAllStats);

module.exports = userRouter;
