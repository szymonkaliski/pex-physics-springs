module.exports = {
  Spring:  require("./lib/spring"),
  Spring2: require("./lib/spring-wrapper")([ "x", "y" ]),
  Spring3: require("./lib/spring-wrapper")([ "x", "y", "z" ])
};

