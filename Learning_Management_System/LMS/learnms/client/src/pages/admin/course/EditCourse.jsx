import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'; 
import React from 'react';
import CourseTab from './CourseTab';

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5 ">
        <h2 className="font-bold text-xl">Add detail information regarding course</h2>
        <Link to="lecture"> 
          <Button className="hover:text-white">Go to lectures page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;
