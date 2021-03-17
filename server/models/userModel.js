const mongoose = require("mongoose");

//Might need to check for commas
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    stats: [
      {
        totalApplications: { type: Number, required: false },
        interviewCount: { type: Number, required: false },
        offers: { type: Number, required: false },
        rejections: { type: Number, required: false },
      },
    ],
    applications: [
      {
        companyName: { type: String, required: true },
        jobTitle: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: Number, required: true },
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
        status: { type: String, required: true },
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
            eventTitle: { type: String, required: true },
            eventDate: { type: Date, required: true },
            notes: { type: String, required: false },
            phase: { type: String, required: true },
          },
        ],
        notifications: [
          {
            feedbackEmails: { type: Boolean, required: true },
            notificationEmails: { type: Boolean, required: true },
            upcomingEvents: { type: Boolean, required: true },
            weeklyReport: { type: Boolean, required: true },
            agenda: { type: Boolean, required: true },
          },
        ],
        applicationStats: [
          {
            interviewCount: { type: Number, required: true },
            offer: { type: Boolean, required: true },
            rejection: { type: Boolean, required: true },
          },
        ],
      },
    ],
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", userSchema);
