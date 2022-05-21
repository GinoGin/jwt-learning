const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authControllers");
const tok = require('../controllers/getToken')
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signUp
  );
  app.post("/api/auth/signin", controller.signIn);
  app.post("/api/auth/refreshtoken", controller.refreshToken);


};

