export class User {
  constructor(
    private email: string,
    private token: string,
    private tokenExpiresAt: number,
  ) {}
}
