export interface IChangePassword {
    password: string;
    hash: string;
}

export interface IUsers {
  name: string;
  email: string;
  phone: string;
  password?: IChangePassword;
}
