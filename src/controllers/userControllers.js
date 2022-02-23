import User from "../models/User.js";
import bcrypt from "bcrypt";
import req from "express/lib/request";

export const logout = (req, res) => {
  req.session.user = null;
  req.session.loggedIn = false;
  res.locals.loggedInUser = req.session.user;

  return res.redirect(`/`);
};

export const edit = (req, res) => {
  return res.send("edit-profile");
};

export const login = (req, res) => res.render("login");

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
  const {
    body: { id, username, password, password2, email },
  } = req;
  if (password !== password2) {
    return res.render("join", { errorMessage: "PASSWORD DOES NOT MATCH!" });
  }
  const userExists = await User.exists({ $or: [{ id }, { email }] });
  if (userExists) {
    return res.render("join", { errorMessage: "ID or E-MAIL already exists!" });
  }
  const cryptPassword = await bcrypt.hash(password, 5);

  await User.create({ id, password: cryptPassword, email, username });

  return res.redirect("/login");
};

export const getLogin = (req, res) => res.render("login");

export const postLogin = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  const user = await User.findOne({ id });
  if (!user) {
    return res.render("login", { errorMessage: "ID doesn't exists." });
  }
  console.log(user.password);
  console.log(await bcrypt.hash(password, 5));
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.render("login", { errorMessage: "PASSWORD doesn't match." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const myProfile = (req, res) => {
  return res.render("profile");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile");
};

export const postEdit = async (req, res) => {
  const { username, email } = req.body;
  const user = res.locals.loggedInUser;
  const id = user.id;
  await User.findOneAndUpdate(id, { username, email });
  const updatedUser = await User.findOne({ id });
  req.session.user = updatedUser;
  return res.redirect("/users/my-profile");
};
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
