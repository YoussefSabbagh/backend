const router = require("express").Router();
const controllerAuth = require("../controllers/auth.controller");
const authorization = require("../middleware/authorization");
const validInfo = require("../middleware/validInfo");

// router.get("/", (req, res) => {
//   res.send("Welcome to Emall Saint Web you will be redirect to the home page");
// });

// register
router.post("/register", validInfo, controllerAuth.register);

// login
router.post("/login", validInfo, controllerAuth.login);

// verify if user is verified
router.get("/is-verify", authorization, controllerAuth.verify);

module.exports = router;
