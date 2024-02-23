export class UserDTO {
  private email: string;
  private username: string;
  constructor ({ username, email }) {
    this.username = username;
    this.email = email;
  }
}