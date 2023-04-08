const app = require("./app");

const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

// run server
app.listen(PORT, () => {
  console.log(`Server is running in development on port ${PORT}`);
});
