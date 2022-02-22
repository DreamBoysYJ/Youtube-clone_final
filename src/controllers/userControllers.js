import User from "../models/User.js";

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
  await User.create({ id, password, email, username });
  return res.redirect("/login");
};

export const getLogin = (req, res) => res.render("login");

export const postLogin = (req, res) => res.render("login");
