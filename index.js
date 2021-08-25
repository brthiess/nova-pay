const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const routes = require('./routes/index');
app.use(cookieParser());

app.use(express.json());

app.use('/', routes);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
