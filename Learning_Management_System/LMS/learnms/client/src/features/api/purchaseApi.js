import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include", // Sends cookies with request
  }),
  endpoints: (builder) => ({
    // 🆕 Mock purchase endpoint
    mockBuyCourse: builder.mutation({
    query: ({ courseId, amount }) => ({
    url: "/mock-buy",
    method: "POST",
    body: { courseId, amount },
  }),
}),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),

     getPurchasedCourse: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useMockBuyCourseMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCourseQuery

} = purchaseApi;
