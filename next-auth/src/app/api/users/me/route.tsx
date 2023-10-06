import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {
        const response = await getDataFromToken(request);
        alert(response);

        const user= await User.findOne({
            _id: response.id
        }) 

     
        
   return new NextResponse(
        JSON.stringify({ message: "user found", status: "200" , data: user})
      );
    } catch (error: any) {
        return NextResponse.json({
            error:error.message
        },
        {status:400});
    }
}


