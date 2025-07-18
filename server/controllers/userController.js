import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import Razorpay from "razorpay";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, user: { name: user.name }, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, user: { name: user.name }, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Get user credit balance
export const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Razorpay Payment API
export const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
const { planId } = req.body;


    if (!userId || !planId) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let credits, plan, amount;

    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10;
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;
      case 'Business':
        plan = 'Business';
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Invalid Plan" });
    }

    const date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // in paise
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

export const verifyRazorpay=async(req,res)=>{
  try{

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status==='paid'){
      const transactionData=await transactionModel.findById(orderInfo.receipt);
      if(transactionData.payment){
        return res.json({success:false,message:"Payment failed"})
      }
      const userData=await userModel.findById(transactionData.userId);

      const creditBalance=userData.creditBalance+transactionData.credits;

      await userModel.findByIdAndUpdate(userData._id,{creditBalance});

      await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true});
      res.json({success:true,message:"Credit Added"})
    }
    else{
      res.json({success:false,message:"Payment failed"})
    }
  }
  catch(error){
  console.log(error);
  res.json({success:false,message:error.message})
}
}