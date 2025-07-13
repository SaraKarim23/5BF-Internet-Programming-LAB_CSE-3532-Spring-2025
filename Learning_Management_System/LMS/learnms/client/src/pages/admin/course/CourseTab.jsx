import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {

    const[input, setInput] =useState({
        courseTitle:"",
        subTitle:"",
        description:"",
        category:"",
        courseLevel:"",
        coursePrice:"",
        courseThumbnail:"",


    });
    const params = useParams();
    const rawId = useParams().courseId;
   const courseId = rawId?.replace("course._", "");


  const {
  data: courseByIdData,
  isLoading: courseByIdLoading,
  refetch
} = useGetCourseByIdQuery(courseId, {
  refetchOnMountOrArgChange: true
});


     const [publishCourse, {}] = usePublishCourseMutation();
    

   useEffect(()=>{
    if(courseByIdData?.course){
      const course = courseByIdData?.course;
      setInput({
         courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "", 
      })
    }
   },[courseByIdData])

    const [previewThumbnail, setPreviewThumbnail] = useState("");

    const navigate = useNavigate();

 

    const [ editCourse, {data, isLoading, isSuccess, error}] = useEditCourseMutation();

    const changeEventHandler =(e)=>{
        const{name, value} = e.target;
        setInput({ ...input, [name]:value});
    };


    const selectCategory =(value)=>{
      setInput({...input, category:value});
    }

    const selectCourseLevel =(value)=>{
      setInput({...input, courseLevel:value});
    }


    const selectThumbnail = (e) =>{
       const file = e.target.files?.[0];
       if(file){
        setInput({...input, courseThumbnail:file});
        const fileReader = new FileReader();
        fileReader.onloadend = ()=> setPreviewThumbnail(fileReader.result);
        fileReader.readAsDataURL(file);
       }
    };


    const updateCourseHandler = async() =>{
      const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
     console.log("courseId being sent:", courseId);

      await editCourse({formData, courseId});
    }
    
    

      const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Publish Error:", error); 
      toast.error("Failed to publish or unpublish course");
    }
  }



      useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course update.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

    const isPublished =false;
    
  return (
   <Card>
        <CardHeader className="flex flex-row justify-between ">
            <div>
                <CardTitle>
                    Basic Course
                </CardTitle>
                <CardDescription>
                    Make changes to your courses here. Click save when you're done
                </CardDescription>
            </div>
            <div className='space-x-2'>
                <Button className="text-white" disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={()=> publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
                <Button  className="hover:text-white text-white">Remove Course</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div>
            <div className="space-y-2 mt-5 ">
                <Label>Course Title</Label>
                <Input

                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange ={changeEventHandler}
                placeholder="Ex. Fullstack development course"
                />
            </div>
              <div className="space-y-2 mt-5 ">
                <Label className="">Subtitle</Label>
                <Input

                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange ={changeEventHandler}
                placeholder="Ex. Become a Fullstack developer in two months"
                />
            </div>
             <div className="space-y-2 mt-3 ">
                <Label>Description</Label>
                <RichTextEditor input={input} setInput={setInput}/>
            </div>
            <div className="flex items-center mt-8 gap-5">
             <div>
             <Label className="text-zinc-950">Category</Label>
               <Select onValueChange={selectCategory}>
      <SelectTrigger className="w-[200px] bg-white">
        <SelectValue className="  text-white" placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
           <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
        </SelectGroup>
      </SelectContent>
         </Select>
             </div>
             <div>
               <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
      <SelectTrigger className="w-[200px]">
        <SelectValue className=" text-white" placeholder="Select a course level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Course Level</SelectLabel>
           <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Advance">Advance </SelectItem>   
        </SelectGroup>
      </SelectContent>
         </Select> 
             </div>
             <div>
                <Label >Price in (USD)</Label>
                <Input 
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="bg-black text-white w-fit"
                />
             </div>
            </div>
             <div className='mt-4'>
                <Label>Course Thumbnail</Label>
                <Input
                 type="file"
                 onChange={selectThumbnail}
                 accept="image/*"
                 className="w-fit"
                />
                {
                  previewThumbnail && (
                    <img src={previewThumbnail} className="h-74 w-90 my-2" alt="Course Thumbnail"/>
                  )
                }
             </div>
             <div className="mt-3">
              <Button  onClick={()=>navigate("/admin/course")} variant="outline" className="text-white hover:text-white" >Cancel</Button>
              <Button disabled={isLoading} onClick={updateCourseHandler}className="text-white hover:text-white ml-2">
                {
                 isLoading ? (
                  <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                  Please wait
                  </>
                 ) : "Save"
                }
              </Button>
             </div>
            </div>
        </CardContent>
   </Card>
  )
}

export default CourseTab
