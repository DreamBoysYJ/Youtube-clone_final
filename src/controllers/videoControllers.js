export const search = (req, res) => {
  return res.render("search");
};

export const watch = (req, res) => {
  const { id } = req.params;
  

  return res.render("watch", { id });
};

export const home = (req, res) => {
  return res.render("home");
};
