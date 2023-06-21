import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Conversation from "../models/conversation.model.js";
import Order from "../models/order.model.js";
import Message from "../models/message.model.js";
import Review from "../models/review.model.js";

export const getLawyer = async (req, res) => {
  try {
    const data = await User.find({ isLawyer: true, isVerify: false });
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

export const verifyLawyer = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await User.findByIdAndUpdate(id, {
      $set: { isVerify: true },
    });
    if (result) {
      res.status(201).send("Verified");
    } else {
      res.status(401).send("Not Complete");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await User.find({ isLawyer: true });
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.body.id;
    const resU = await User.findById(id);
    const resG = await Gig.find({ userId: id });
    const resM = await Message.find({ userId: id });
    const resR = await Review.find({ userId: id });
    const resO = await Order.find({
      $or: [{ clientId: id }, { lawyerId: id }],
    });
    const resC = await Conversation.find({
      $or: [{ clientId: id }, { lawyerId: id }],
    });
    if (resM) {
      await Message.deleteMany({ userId: id });
    }
    if (resC) {
      await Conversation.deleteMany({
        $or: [{ clientId: id }, { lawyerId: id }],
      });
    }
    if (resO) {
      await Order.deleteMany({ $or: [{ clientId: id }, { lawyerId: id }] });
    }
    if (resG) {
      await Gig.deleteMany({ userId: id });
    }
    if (resU) {
      await User.deleteMany({ _id: id });
    }
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

export const getGigs = async (req, res) => {
  try {
    const data = await Gig.find();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Error");
  }
};

export const getFeedback = async (req, res) => {
  try {
    const data = await Review.find();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await User.find({ isLawyer: false });
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server");
  }
};
