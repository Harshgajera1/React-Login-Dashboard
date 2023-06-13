const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(cors());

{/*Conexão Com o banco de dados */}
mongoose.connect("mongodb://127.0.0.1:27017/logindemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usuarioSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Usuario = mongoose.model("signin", usuarioSchema);

app.post("/register", async (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await Usuario.findOne({ email: email });
    if (!user) {
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = new Usuario({
        email: email,
        password: hash,
      });
      await newUser.save();
      res.status(200).json({ msg: "Sign in successful." })
    } else {
      res.status(409).json({ msg: "Email already exist." })
    }
  } catch (err) {
    res.status(500).send(err)
  }
});

{/*Verificação de login*/}
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await Usuario.findOne({ email: email });
    if (user) {
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        res.status(200).send({msg: "Login Sucessful."})
      } else {
        res.status(401).json({ msg: "Email or password is wrong."})
      }
    } else {
      res.status(404).json({ msg: "User not exist."})
    }
  } catch (err) {
    res.status(500).send(err)
  }

});

app.listen(3001, () => {
  console.log("Server start on port 3001");
});
