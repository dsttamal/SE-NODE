var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.JWT_SECRET;

function authorize(needPermission) {
  return [
    // authenticate JWT token and attach user to request object (req.auth)
    jwt({ secret, algorithms: ["HS256"] }),

    // authorize based on user permission
    (req, res, next) => {
      // check if user is authenticated
      if (!req.auth) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // check the needPermission has the user
      if (needPermission && !req.auth.permissions.includes(needPermission)) {
        return res
          .status(401)
          .json({ message: "You don't have permission to do this" });
      }
      // authentication and authorization successful so go next
      next();
    },
  ];
}

module.exports = authorize;
