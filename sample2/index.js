const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const serverSecret = "my-secret!";

const a

// parse request body json to JavaScript Object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
function authentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, serverSecret);
    req.jwt = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "authentication failed",
    });
  }
}

// login
app.post("/api/login", (req, res) => {
  const { email } = req.body;

  const payload = { email };
  const options = { algorithm: "HS256", expiresIn: "10m" };
  const token = jwt.sign(payload, serverSecret, options);

  const result = { email, token };
  return res.status(200).json(result);
});

// get users
app.get("/api/users", authentication, (req, res) => {
  res.status(200).json({
    data: [
      { id: 1, name: "user1" },
      { id: 2, name: "user2" },
      { id: 3, name: "user3" },
    ],
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
