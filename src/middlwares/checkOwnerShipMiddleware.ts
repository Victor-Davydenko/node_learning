import NoPermissionError from '../exception/NoPermissionError';


const checkOwnerShipMiddleware = async (req, res, next) => {
  const post = req.body;
  if (post.owner !== req.user.id) {
    next(NoPermissionError.UserWithOutAccess());
  }
  next();
};

export default checkOwnerShipMiddleware;