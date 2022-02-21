export const logout = (req, res) => {
  console.log("logout");
  return res.redirect(`/`);
};

export const edit = (req, res) => {
  return res.send("edit-profile");
};

export const login = (req, res) => res.render("login");

export const join = (req, res) => res.render("join");
