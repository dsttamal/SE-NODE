var { expressjwt: jwt } = require("express-jwt");
const secret = "chikon_ho";

function authorize() {
  return [
    // authenticate JWT token and attach user to request object (req.auth)
    jwt({ secret, algorithms: ["HS256"] }),

    // authorize based on user permission
    (req, res, next) => {
      // check if user is authenticated
      if (!req.auth) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // authentication and authorization successful so go next
      next();
    },
  ];
}

module.exports = authorize;
