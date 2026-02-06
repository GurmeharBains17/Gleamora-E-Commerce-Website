export const getHaircarePage = (req, res) => {
  res.render("haircare", { title: "Haircare Products", products: ["Shampoo", "Oil", "Serum"] });
};
