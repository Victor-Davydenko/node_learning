export class UserDTO {
  private id: string;
  private email: string;
  private username: string;
  constructor ({ username, email, id }) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}