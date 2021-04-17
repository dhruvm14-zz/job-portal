const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const savedUser = await User.findOne({ email: req.body.email });

    if (savedUser)
      return res.status(400).json({ email: "Email already exists" });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      qualification: req.body.qualification,
      cv: req.body.cv,
    });

    const salt = await bcrypt.genSalt(10);
    const hashP = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashP;
    savedUser = await newUser.save();

    const token = jwt.sign(
      {
        id: savedUser._id,
        name: savedUser.name,
        role: savedUser.role,
      },
      keys.secretOrKey
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
  }
});

router.post("/company/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const savedUser = await User.findOne({ email: req.body.email });

    if (savedUser)
      return res.status(400).json({ email: "Email already exists" });
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      website: req.body.website,
      role: "company",
    });

    const salt = await bcrypt.genSalt(10);
    const hashP = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashP;
    savedUser = await newUser.save();

    const token = jwt.sign(
      {
        id: savedUser._id,
        name: savedUser.name,
        role: savedUser.role,
      },
      keys.secretOrKey
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  try {
    await User.findOne({ email }).then(async (user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).send({ emailnotfound: "Email not found" });
      }
      // Check password
      await bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user._id,
            name: user.name,
            role: user.role,
          };
          // Sign token
          jwt.sign(payload, keys.secretOrKey, (err, token) => {
            res
              .cookie("token", token, {
                httpOnly: true,
              })
              .send();
          });
        } else {
          return res
            .status(400)
            .send({ passwordincorrect: "Email/Password Invalid" });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/searchId/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await User.findById(id).then((result) => {
      res.status(200).json({ user: result });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/searchAll", async (req, res) => {
  console.log(req.body);
  console.log(req);

  res.send(req.body);
  // try {
  //   await User.findById(id).then((result) => {
  //     res.status(200).json({ user: result });
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
});

router.get("/loggedin", auth, (req, res) => {
  try {
    const token = req.cookies.token;
    if (token === null) return res.json(false);
    const decoded = jwt.verify(token, keys.secretOrKey);
    res.send(decoded);
  } catch (err) {
    res.json(null);
  }
});

module.exports = router;
