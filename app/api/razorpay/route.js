import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb();

    // Razorpay sends URL-encoded data, parse it properly
    const bodyText = await req.text();
    const body = Object.fromEntries(new URLSearchParams(bodyText));

    // Log body content for debugging
    console.log('Received Body:', body);

    // Check if order exists
    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!payment) {
        return NextResponse.json({ success: false, message: "Order Id not found" });
    }

    // Get user and secret
    const user = await User.findOne({ username: payment.to_user });
    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" });
    }
    const secret = user.razorpaysecret;

    // Validate signature
    const isValid = validatePaymentVerification(
        {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id,
        },
        body.razorpay_signature,
        secret
    );

    console.log('Is Signature Valid:', isValid);

    if (isValid) {
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    } else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
};
