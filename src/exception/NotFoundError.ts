class NotFoundError extends Error {
  constructor (public status: number = 404, public message: string = 'Page not found') {
    super(message);
  }

  static NotFound() {
    return new NotFoundError();
  }
}

export default NotFoundError;