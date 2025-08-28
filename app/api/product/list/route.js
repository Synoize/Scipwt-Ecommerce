import connectDB from "@/config/db";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        const products = await ProductModel.find({});

        return NextResponse.json({success: true, products});
    } catch (error) {
        return NextResponse.json({success: false, message: error.message});
    }
    
}
    