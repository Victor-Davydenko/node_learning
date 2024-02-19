export const postMiddlware = (req, res, next) => {
  console.log('The post was changed:', new Date().toLocaleDateString());
  next();
};