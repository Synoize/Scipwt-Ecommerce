import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import ProductModel from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId} = getAuth(request);
        
        const isSeller = await authSeller(userId);

        if(!isSeller){
            return NextResponse.json({success: false, message: "not authorized"});
        }

        await connectDB();

        const products = await ProductModel.find({userId}).sort({createdAt: -1});

        return NextResponse.json({success: true, products});
    } catch (error) {
        return NextResponse.json({success: false, message: error.message});
    }
    
}
    