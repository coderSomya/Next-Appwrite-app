import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
      
        const reqBody = await request.json();
        
        const {email, password} = reqBody;

        //check if user exists
        const user= await User.findOne({email});
      
        
        if(!user){
            return NextResponse.json(
                {error: "User doesn't exist",
                status: 400}
            )
        }

        //validate password

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({
                error: "Invalid password"
            }, {status: 400})
        }
        
        //create token data
        const tokenData= {
            id: user._id,
            username: user.username
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})


        const response = new NextResponse(
         JSON.stringify({message: "Login successfully", status: "200"})
        )
       
        response.cookies.set(
            "token",
            token,
            {
                httpOnly: true
            }
        )

        return response
           
    } catch (error: any) {
       
        return NextResponse.json({
            error: error.message,
        }, {status: 500})
    }
}

