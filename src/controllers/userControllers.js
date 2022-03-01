import fetch from "node-fetch";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Video from "../models/Video.js";
import "dotenv/config";

// LOG IN
export const getLogin = (req, res) => res.render("login");

export const postLogin = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  const user = await User.findOne({ id });
  if (!user) {
    return res.render("login", { errorMessage: "ID doesn't exists." });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.render("login", { errorMessage: "PASSWORD doesn't match." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).redirect("/");
};

// SNS LOG IN  (GIT HUB)

export const startGithubLogin = async (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.CLIENT_ID,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.render("/login", {
        errorMessage: "Your Account Has no Authorization.",
      });
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        password: "",
        username: userData.name,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/");
  }
};

// LOG OUT
export const logout = (req, res) => {
  req.session.user = null;
  req.session.loggedIn = false;
  res.locals.loggedInUser = req.session.user;

  return res.status(200).redirect(`/`);
};

// CREATE
export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
  const {
    body: { id, username, password, password2, email },
    file: { path: avatarUrl },
  } = req;
  if (password !== password2) {
    return res.render("join", { errorMessage: "PASSWORD DOES NOT MATCH!" });
  }

  const userExists = await User.exists({ $or: [{ id }, { email }] });
  if (userExists) {
    return res.render("join", { errorMessage: "ID or E-MAIL already exists!" });
  }
  const cryptPassword = await bcrypt.hash(password, 5);

  await User.create({
    id,
    password: cryptPassword,
    avatarUrl,
    email,
    username,
  });

  return res.redirect("/login");
};

// READ

export const seeProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  const videos = await Video.find({ owner: user._id });
  return res.render("profile", { user, videos });
};

// UPDATE PROFILE
export const getEdit = (req, res) => {
  return res.render("edit-profile");
};

export const postEdit = async (req, res) => {
  const { username, email } = req.body;
  const { path: avatarUrl } = req.file;
  const user = res.locals.loggedInUser;
  const id = user.id;
  await User.findOneAndUpdate(
    { id },
    {
      avatarUrl,
      username,
      email,
    }
  );
  const updatedUser = await User.findOne({ id });
  req.session.user = updatedUser;
  return res.redirect(`/users/${id}/profile`);
};

// UPDATE PASSWORD
export const getChangePassword = (req, res) => {
  return res.render("edit-password");
};

export const postChangePassword = async (req, res) => {
  const { oldPassword, password, password2 } = req.body;
  const user = res.locals.loggedInUser;
  const recheckPassword = await bcrypt.compare(oldPassword, user.password);
  if (!recheckPassword) {
    return res.render("edit-password", {
      errorMessage: "OLD Password doesn't match.",
    });
  }
  if (password !== password2) {
    return res.render("edit-password", {
      errorMessage: "NEW Password doesn't match.",
    });
  }
  if (oldPassword === password) {
    return res.render("edit-password", { errorMessage: "SAME PASSWORD!" });
  }
  const newPassword = await bcrypt.hash(password, 5);
  await User.findOneAndUpdate(user.id, { password: newPassword });
  const userId = res.locals.loggedInUser.id;
  const updatedUser = await User.findOne({ userId });
  req.session.user = updatedUser;
  return res.redirect("/login");
};
