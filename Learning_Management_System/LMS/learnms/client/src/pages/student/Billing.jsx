import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useMockBuyCourseMutation } from '@/features/api/purchaseApi'
import { useGetCourseByIdQuery } from '@/features/api/courseApi'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Billing = () => {
  
    const rawId = useParams().courseId;
    const courseId = rawId?.replace("course._", "");
    
  
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [mockBuyCourse, { isLoading }] = useMockBuyCourseMutation()

const { data, isLoading: loadingCourse } = useGetCourseByIdQuery(courseId)

const coursePrice = data?.course.coursePrice || 0
const courseTitle = data?.course.courseTitle || "Course"
console.log(courseId, data)


  const handlePurchase = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name")
      return
    }

    if (Number(amount) !== coursePrice) {
      toast.error(`Amount must be exactly $${coursePrice}`)
      return
    }

    try {
      await mockBuyCourse({ courseId, amount: Number(amount) }).unwrap()
      toast.success("✅ Course purchased successfully!")
      navigate(`/course-progress/${courseId}`)
    } catch (error) {
      toast.error(error?.data?.message || "❌ Purchase failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] space-y-4">
        <h2 className="text-xl font-bold">Billing</h2>
        {loadingCourse ? (
          <p>Loading course info...</p>
        ) : (
          <>
            <p className="text-gray-700">Course: <strong>{data.course.courseTitle}</strong></p>
            <p className="text-gray-700">Price: <strong>${data.course.coursePrice}</strong></p>

            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Enter ${coursePrice}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button
              onClick={handlePurchase}
              disabled={isLoading}
              className="w-full text-white"
            >
              {isLoading ? "Processing..." : "Confirm Purchase"}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Billing
