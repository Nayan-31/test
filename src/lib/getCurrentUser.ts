import { cookies } from "next/headers"
import { verifyJWT } from "./jwt"

export const currentUser = async() =>{
  let cookieStore = await cookies()

  let token = cookieStore.get('token')?.value

  if(!token) throw new Error("token not found")

  let decode = verifyJWT(token);

  if(!decode){
    throw new Error("unauthorized user")
  }

  return decode.userId
}