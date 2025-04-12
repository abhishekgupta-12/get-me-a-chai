// actions/useractions.js (Server-Side Actions)
"use server";

import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Email from "next-auth/providers/email";

export const fetchuser = async (username) => {
    try {
        await connectDb();
        const user = await User.findOne({ username });
        return user ? {
            username: user.username,
            profilepic: user.profilepic,
            coverpic: user.coverpic,
            razorpayid: user.razorpayid,
            razorpaysecret: user.razorpaysecret,
        } : null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const fetchpayments = async (username) => {
    try {
        await connectDb();
        const payments = await Payment.find({ to_user: username,done:true }).sort({ createdAt: -1 });
        return payments.map((p) => ({
            name: p.name,
            amount: p.amount,
            message: p.message,
        }));
    } catch (error) {
        console.error("Error fetching payments:", error);
        return [];
    }
};

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDb();
         // fetch the secret of the user who is getting the payment when we ug mongodb key and id then it used 
        let Duser = await User.findOne({username:to_username})
        const secret = Duser.razorpaysecret

        const user = await User.findOne({ username: to_username});
        if (!user) return { error: "User not found" };

        const Razorpay = (await import("razorpay")).default;
        const instance = new Razorpay({
            key_id:Duser.razorpayid,
            key_secret:secret,
        });
       // console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_KEY_ID);
        // console.log("Razorpay Secret:", process.env.RAZORPAY_SECRET);
        const order = await instance.orders.create({
            amount: Math.round(amount),
            currency: "INR",
        });

        await Payment.create({
            oid: order.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message,
        });

        return order;
    } catch (error) {
        console.error("Error in initiate function:", error);
        return { error: "Payment initiation failed" };
    }
};


export const updateProfile = async (formData, oldUsername) => {
    try {
        await connectDb();

        let ndata = { ...formData };

        // Check if username is being updated
        if (oldUsername !== ndata.username) {
            let existingUser = await User.findOne({ username: ndata.username });
            if (existingUser) {
                return { error: "Username already exists" };
            }

            // Update user
            let updatedUser = await User.findOneAndUpdate({ username: oldUsername }, ndata, { new: true });

            if (!updatedUser) {
                return { error: "User not found" };
            }

            // Update username in Payment records
            await Payment.updateMany({ to_user: oldUsername }, { to_user: ndata.username });

        } else {
            let updatedUser = await User.findOneAndUpdate({ username: oldUsername }, ndata, { new: true });

            if (!updatedUser) {
                return { error: "User not found" };
            }
        }

        return { success: true, message: "Profile updated successfully" };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile" };
    }
};