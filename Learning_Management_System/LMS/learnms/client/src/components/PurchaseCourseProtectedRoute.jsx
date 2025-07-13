
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams, Navigate } from "react-router-dom";




const PurchaseCourseProtectedRoute =({children})=>{
     const rawId = useParams().courseId;
       const courseId = rawId?.replace("course._", "");
   

       const {data, isLoading} = useGetCourseDetailWithStatusQuery(courseId);


       if(isLoading) return <p>Loading...</p>

       return data?.purchased ? children : <Navigate to={`/course-detail/${courseId}`}/>

}

export default PurchaseCourseProtectedRoute;