import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: "User doesn't exist",
        status: 400,
      });
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        error: "Invalid password",
        status: 400,
      });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    // Set the cookie using the Set-Cookie header
    const cookie = `token=${token}; HttpOnly;`; 

    const response = new NextResponse(
      JSON.stringify({ message: "Login successfully", status: "200" }),
      {
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );


    return response;
  } catch (error) {
    console.error("Error creating JWT token:", error);
    return NextResponse.json({
      error: "Internal server error",
    }, { status: 500 });
  }
}
