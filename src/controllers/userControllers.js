import User from "../models/User.js";
import bcrypt from "bcrypt";

export const logout = (req, res) => {
  console.log("logout");
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
  return res.redirect("/");
};
