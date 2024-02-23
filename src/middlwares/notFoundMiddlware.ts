import NotFoundError from '../exception/NotFoundError';

const notFoundMiddlware = (req, res, next) => next(NotFoundError.NotFound());

export default notFoundMiddlware;