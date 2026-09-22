import { generateJWT } from "@/lib/jwt";
import { connectDb } from "@/lib/mongodb";
import UserModel from "@/models/user.model";
import { RequestBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
   try {
     await connectDb();

     let body:RequestBody = await req.json();

     let {name , email , password , mobile} = body

     if(!name || !email || !password ) {
        return NextResponse.json(
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

     if(isExisted){
        return NextResponse.json(
            {
               success : false,
               message : "user already exists"
            },{
                status : 409
            }
    )
     }

     const newUser = await UserModel.create({
        name ,
        email ,
        password,
        mobile
     })

     const token = generateJWT({userId : newUser._id});

    const response =  NextResponse.json({
        success : true,
        message : "user registered sucessfully",
        data : newUser
     },{
        status : 201
     }
    )

    response.cookies.set('token' , token , {
        httpOnly : true,
        sameSite : "lax",
        maxAge : 60 * 60 * 1000
    })

    return response 


   } catch (error) {

    return NextResponse.json({
        success : false,
        message : "Internal Server error"
    },{
        status : 500
    })
   }
}