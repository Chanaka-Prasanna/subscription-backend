import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Subscription price must be a greater than 0"],
    max: [1000, "Subscription price must be a less than 1000"],
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP"],
    default: "USD",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
  },
  category: {
    type: String,
    enum: [
      "sports",
      "entertainment",
      "education",
      "health",
      "fitness",
      "food",
      "travel",
      "lifestyle",
      "technology",
      "gaming",
    ],
    required: true,
  },
  paymentMethod: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "canceled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: "Start date must be in the past or present",
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "Renewal date must be after start date",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

subscriptionSchema.pre("save", function (next) {
  // Automatically set the renewal date if missing
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Autoupdate the renewaldata if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  //   proceed to thr creation of the database
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
