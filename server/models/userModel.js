const mongoose = require("mongoose");

//Might need to check for commas
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    stats:
      {
        totalApplications: { type: Number, required: false },
        interviewCount: { type: Number, required: false },
        offers: { type: Number, required: false },
        rejections: { type: Number, required: false },
      },
    applications: [
      {
        companyName: { type: String, required: false },
        jobTitle: { type: String, required: false },
        location: { type: String, required: false },
        description: { type: String, required: false },
        salary: { type: Number, required: false },
        benefits: [
          {
            type: String,
            required: false,
          },
        ],
        qualifications: [
          {
            type: String,
            required: false,
          },
        ],
        toDo: [
          {
            type: String,
            required: false,
          },
        ],
        status: { type: String, required: false },
        contacts: [
          {
            name: { type: String, required: false },
            email: { type: String, required: false },
            phoneNumber: { type: String, required: false },
            notes: { type: String, required: false },
            lastContactDate: { type: Date, required: false },
            lastContactNotes: { type: String, required: false },
          },
        ],
        notes: [
          {
            type: String,
            required: false,
          },
        ],
        events: [
          {
            eventTitle: { type: String, required: false },
            eventDate: { type: Date, required: false },
            notes: { type: String, required: false },
            phase: { type: String, required: false },
          },
        ],
        notifications: {
            feedbackEmails: { type: Boolean, required: false },
            notificationEmails: { type: Boolean, required: false },
            upcomingEvents: { type: Boolean, required: false },
            weeklyReport: { type: Boolean, required: false },
            agenda: { type: Boolean, required: false },
        },
        applicationStats: {
            interviewCount: { type: Number, required: false },
            offer: { type: Boolean, required: false },
            rejection: { type: Boolean, required: false },
        },
      },
    ],
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", userSchema);
