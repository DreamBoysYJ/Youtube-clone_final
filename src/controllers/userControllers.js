export const logout = (req, res) => {
  console.log("logout");
  return res.redirect(`/`);
};

export const edit = (req, res) => {
  return res.send("edit-profile");
};

export const login = (req, res) => res.render("login");

export const getJoin = (req, res) => res.render("join");

export const postJoin = (req, res) => {
  console.log("join");
  res.redirect("/login");
};

export const getLogin = (req, res) => res.render("login");

export const postLogin = (req, res) => res.render("login");
