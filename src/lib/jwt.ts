//token generate karna padta hai and validate karna padta hai bass!!

import { JWTpayload } from '@/types/user.types'
import jwt from 'jsonwebtoken'

// interface TokenPayload extends JwtPayload{
//     id : string
// }
export const generateJWT = (payload:JWTpayload) => {
    return jwt.sign(payload , process.env.JWT_SECRET! , {
        expiresIn : '1h'
    })
}

export const verifyJWT = (token : string): JWTpayload  =>{
  return jwt.verify(token , process.env.JWT_SECRET!)as JWTpayload //Jo value jwt.verify() return karega, usko TokenPayload type treat karo.
}