class ApiError extends Error {
  constructor (public status: number, public message: string) {
    super(message);
  }

  static UserAlreadyExists() {
    return new ApiError(400, 'User with this username is already exists...');
  }

  static BadCredentials(message) {
    return new ApiError(400, message);
  }
}

export default ApiError;