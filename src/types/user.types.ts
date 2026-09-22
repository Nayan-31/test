export interface IUser{
  _id : string;
  name : string;
  email : string;
  password : string;
  mobile : string;
  createdAt ?: string;
  updatedAt ?: string
}

export interface RequestBody{
  name : string;
  email : string;
  password : string;
  mobile : string;
}

export interface LoginBody{
  email : string;
  password : string;
}


export interface JWTpayload{
  userId : string;
  email ?: string;
}