import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    subscription.workflowId = workflowRunId;
    await subscription.save();

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  {
    try {
      const details = await Subscription.findById(req.params.id)
        .populate("user", "name email")
        .lean();

      if (!details) {
        const error = new Error("Subscription does not exists");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ success: true, data: details });
    } catch (error) {
      next(error);
    }
  }
};
export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
export const deleteSubscription = async (req, res, next) => {
  const subscription = await Subscription.findByIdAndDelete(req.params.id);
  if (!subscription) {
    const error = new Error("Subscription does not exists");
    error.statusCode = 404;
    throw error;
  }

  try {
    const upstashRessponse = await workflowClient.cancel({
      ids: subscription.workflowId,
    });
    if (upstashRessponse.error) {
      const error = new Error("Error cancelling subscription workflow");
      error.statusCode = 500;
      throw error;
    }

    console.log("Subscription workflow cancelled", upstashRessponse);
    res.status(300).json({
      success: true,
      message: "Subscription has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
