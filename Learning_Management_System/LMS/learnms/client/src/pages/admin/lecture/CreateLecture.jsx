import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useCreateLectureMutation, useGetCourseByIdQuery, useGetCourseLectureQuery } from '@/features/api/courseApi'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const params = useParams();
    const rawId = useParams().courseId;
   const courseId = rawId?.replace("course._", "");


     const [lectureTitle, setLectureTitle] = useState("");

    // const { refetch } = useGetCourseByIdQuery(courseId); 
  
  const navigate= useNavigate();

  const [createLecture, {data, isLoading, isSuccess,error}] = useCreateLectureMutation();

   const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
   
  } = useGetCourseLectureQuery(courseId);



  const createLectureHandler = async()=>{
   await createLecture({lectureTitle, courseId})
  };



   useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);


  console.log(lectureData);
  return (
    <div  className="flex-1 mx-10">
           <div className="mb-4">
            <h1 className="font-bold ">
              Lets add lecture, add some basic  details for your new lecture
            </h1>
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              laborum!
            </p>
        </div>
        <div className="space-y-4  max-w-lg">
          <div className="grid w-full items-center gap-1.5">
        <Label>Title</Label>
        <Input type="text" name="courseTitle"  value={lectureTitle}
            onChange={(e)=>setLectureTitle(e.target.value)} placeholder="Your Title name"/>
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" className=" text-white hover:text-white" onClick={()=>navigate(`/admin/course/${courseId}`)}>
                Back to course
              </Button>
            <Button disabled={isLoading} onClick={createLectureHandler} >{
                  isLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                    </>
                  ):" Create lecture"
                  
                  }</Button>
          </div>
          <div className="mt-10">
                {
                  lectureLoading? (<p>Loading lecture...</p>) : lectureError? (<p>Failed to load lectures</p>): lectureData.lectures.length === 0 ? <p>No lectures available</p> : (
                    lectureData.lectures.map((lecture,index)=>
                      (<Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>))
                    
                  )
                }
          </div>
        </div>
        </div>
  )
}

export default CreateLecture;
