import { generateJWT } from "@/lib/jwt";
import { connectDb } from "@/lib/mongodb";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
   try {
     await connectDb();

     let body:LoginBody = await req.json();

     let {email , password} = body

     if( !email || !password ) {
        return NextResponse.json<ApiResponse>(
            {
               success : false,
               message : "All fields are required"
            },{
                status : 400
            }
    )
     }

     const isExisted = await UserModel.findOne({
        email
     })

     if(!isExisted){
        return NextResponse.json<ApiResponse>(
            {
               success : false,
               message : "user not found" 
            },{
                status : 404
            }
    )
     }

     const comparePass = isExisted.comparePass(password) // yaha pe ek error aata hai comparePass ka ye bol raha hai ki jo tumne IUser pass ki hai na model ke andar usme koi bhi property match nii ho rahi jo comparePass ko match kar paye  is chiz ko solve karne ke liye ek Omit type hota hai typescript me wo actual poore interface ko extract kar ke compare pass wali property exclude karke ek naye interface me daal deta hai jisme comparePass bhi add hota hai

     const token = generateJWT({userId : isExisted._id});

     const response =  NextResponse.json<ApiResponse>({
        success : true,
        message : "user login sucessfully",
        data : {
          name : isExisted.name,
          email : isExisted.email
        }
     },{
        status : 200
     }
    )

    response.cookies.set('token' , token , {
        httpOnly : true,
        sameSite : "lax",
        maxAge : 60 * 60 * 1000
    })

    return response 


   } catch (error) {

    return NextResponse.json<ApiResponse>(
      {
        success : false,
        message : "Internal Server error",
        error : {
         message : 
         error instanceof Error ? error.message : "Unknown error"
        }
    },{
        status : 500
    })
   }
}

