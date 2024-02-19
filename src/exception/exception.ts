class ApiError extends Error {
  constructor (public status: number, public message: string) {
    super(message);
  }

  static BadCredentials() {
    return new ApiError(400, 'username or password was not provided');
  }

  static NotValidPostBody(status, message) {
    return new ApiError(status, message);
  }

  static UnexpectedError() {
    return new ApiError(500, 'Something wrong has happened, try one more time');
  }
}

export default ApiError;