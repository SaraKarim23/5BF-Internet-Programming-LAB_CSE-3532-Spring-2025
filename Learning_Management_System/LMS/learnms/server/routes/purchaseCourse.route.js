import express from "express";
import { createMockPurchase , getAllPurchasedCourse, getMockCourseDetailWithStatus } from "../controllers/coursePurchase.controller.js";
import  isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/mock-buy").post(isAuthenticated, createMockPurchase);
router.route("/course/:courseId/detail-with-status").get( isAuthenticated, getMockCourseDetailWithStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
