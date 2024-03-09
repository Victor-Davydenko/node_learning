class NoPermissionError extends Error {
  constructor (public status: 403, public message: string) {
    super(message);
  }

  static UserWithOutAccess() {
    return new NoPermissionError(403, 'You do not have a permission to modify this post');
  }
}

export default NoPermissionError;