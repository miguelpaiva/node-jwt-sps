require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const routes = require("./routes");

app.use(routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Back-End running on port ${port}`);
});
