import { currentUser } from "@/lib/getCurrentUser";
import { connectDb } from "@/lib/mongodb";
import ResumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
       await connectDb() 

       let userId = await currentUser()

       if(!userId){
        return NextResponse.json<ApiResponse>(
            {
                success : false,
                message : "Something went Wrong"
            },{
                status : 404
            }
        )
       }

       let body = await req.json()

       let newResume = await ResumeModel.create({
        userId,
        ...body
       })

       return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume created successfully",
        data: newResume,
      },
      {
        status: 201,
      },
    );

    } catch (error) {
        return NextResponse.json<ApiResponse>(
            {
                success : false,
                message : "Internal server error"
            },
            {
                status : 500
            }
        )
    }
}