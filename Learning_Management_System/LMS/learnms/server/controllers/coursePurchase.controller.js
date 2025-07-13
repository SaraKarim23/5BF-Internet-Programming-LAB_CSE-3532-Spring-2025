import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

// @desc    Create a mock purchase (no Stripe)
// @route   POST /api/v1/purchase/mock-buy
// @access  Private
export const createMockPurchase = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId, amount } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Check if course is already purchased
    const existingPurchase = await CoursePurchase.findOne({ userId, courseId });
    if (existingPurchase && existingPurchase.status === "completed") {
      return res.status(400).json({ message: "Course already purchased." });
    }

    // Check if entered amount is correct
    if (Number(amount) !== course.coursePrice) {
      return res.status(400).json({ message: `Amount must be exactly $${course.coursePrice}` });
    }

    const mockPaymentId = uuidv4();

    const purchase = await CoursePurchase.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "completed",
      paymentId: mockPaymentId,
    });

    // Unlock all lectures
    if (course.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: course.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // Update user and course enrollment
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: course._id },
    });

    await Course.findByIdAndUpdate(course._id, {
      $addToSet: { enrolledStudents: userId },
    });

    res.status(200).json({
      success: true,
      message: "✅ Course purchased successfully!",
      purchase,
    });
  } catch (error) {
    console.error("Mock Purchase Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// @desc    Get all purchased courses (for admin)
// @route   GET /api/v1/purchase
// @access  Private/Admin


export const getMockCourseDetailWithStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({path:"creator"})
      .populate({path:"lectures"});

    if (!course) return res.status(404).json({ message: "Course not found!" });

    const purchased = await CoursePurchase.findOne({ courseId, userId, status: "completed" });

    res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};