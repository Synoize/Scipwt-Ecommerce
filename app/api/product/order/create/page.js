import { inngest } from "@/config/inngest";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        const {userId} = getAuth(request);

        const {address, items} = await request.json();

        if (!address || !items.length === 0) {
            return NextResponse.json({success: false, message: "Invalid Data"})
        }

        // calculate amount items
        const amount = await items.reduce(async (acc, item) => {
           const product = await ProductModel.findById(item.product);
           return acc + product.offerPrice * item.quantity;
        }, 0);

        await inngest.send({
            name: "order/created",
            data: {
                userId,
                address,
                items,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now(),
            }
        });
        
        const user = await UserModel.findById(userId);
        user.cartItems = {}
        await user.save();
        
        return NextResponse.json({success: true, message: "Order Placed"})
    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}