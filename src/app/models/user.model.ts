export class User {
  constructor(
    private email: string,
    private token: string,
    private tokenExpiresAt: number,
  ) {}
}

export class Register {
  constructor(
    private email: string,
    private name: string,
    private role: string,
  ) {}
}
