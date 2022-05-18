require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: `http://localhost:3001` }));

app.use(async (err, req, res, next) => {
  // if (process.env.NODE_ENV === 'development') {
  // const errors = await new Youch(err, req).toJSON();

  let status = null;

  let message = null;

  if (err.data) {
    err.response = err.data.response;
  }

  if (err.response) {
    status = err.response.status;
    if (err.response.data) {
      if (err.response.data.error) {
        if (err.response.data.error.message)
          message = err.response.data.error.message.value;
        else message = err.response.data.error;
      } else if (err.response.data.detail) {
        message = err.response.data.detail;
      } else if (err.response.data.message) {
        message = err.response.data.message;
      }
    }
  }

  return res.status(status || err.status || 500).json({
    error: message || err.message || "Internal server error",
    // detail: errors,
  });
});

const routes = require("./routes");

app.use(routes);

app.listen(port, () => {
  console.log(`Back-End running on port ${port}`);
});
