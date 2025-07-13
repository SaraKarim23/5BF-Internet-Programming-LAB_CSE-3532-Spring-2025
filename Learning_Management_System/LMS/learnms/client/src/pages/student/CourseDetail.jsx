
import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

const CourseDetail = () => {
   const rawId = useParams().courseId;
   const courseId = rawId?.replace("course._", "");

   const navigate = useNavigate();
   
   const {data, isLoading, isSucess, isError, error} = useGetCourseDetailWithStatusQuery(courseId);

   if(isLoading) return <h1>Loading...</h1>
   if(isError) return <h1>Failed to load course details</h1>

   const {course, purchased} = data;
   console.log(data);
   
   const handleContinueCourse = () =>{
    if(purchased){
     navigate(`/course-progress/${courseId}`) 
    }
   }
  return (
    <div className='mt-1 space-y-5 '>
      <div className="bg-[#2D2F31] text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
            <h1 className='font-bold'>{course?.courseTitle}</h1>
            <p>Course Sub-title</p>
            <p>created By{" "}<span className='text-[#C0C4FC] underline italic'>{course?.creator.name}</span></p>
            <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16}/>
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
            </div>
            <p>Students enrolled: {course?.enrolledStudents.length}</p>
          </div>
      </div>
     <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
  {/* LEFT SIDE: Course Content */}
  <div className='w-full lg:w-2/3 space-y-5'>
    <h1 className="font-bold text-xl md:text-2xl">Description</h1>
    <p text-sm dangerouslySetInnerHTML={{__html:course.description}} ></p>
    <Card>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
        <CardDescription>4 lectures</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {course.lectures.map((lecture, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <span>
              {true ? <PlayCircle size={24} /> : <Lock size={24} />}
            </span>
            <p>{lecture.lectureTitle}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>

  {/* RIGHT SIDE: Video Section */}
  <div className="w-full lg:w-1/3 mt-3">
    <Card>
      <CardContent className="p-4 flex flex-col">
        <div className='w-full aspect-video mb-4 border'>
            <video
       width="100%"
      height="100%"
        controls={true}
         className="rounded-md"
       >
     <source
     src={course.lectures[0]?.videoUrl?.replace("http://", "https://")}
      type="video/mp4"
       />
     Your browser does not support the video tag.
    </video>

        </div>
        <h2 className="text-lg md:text-xl font-semibold">Lecture title</h2>
        <Separator  className="my-2"/>
         <h2 className="text-lg md:text-xl font-semibold">Course Price</h2>
      </CardContent>
      <CardFooter>
        {
          purchased ? (
             <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
          ) : (
            <BuyCourseButton courseId={courseId}/>
        )}
       
      </CardFooter>
    </Card>
  </div>
</div>
    </div>
  )
}

export default CourseDetail

