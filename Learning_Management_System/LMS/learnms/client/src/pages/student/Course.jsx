import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
  if (!course) return null;

  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course?.courseThumbnail || "https://dummyimage.com/400x200/cccccc/000000&text=No+Thumbnail"}
            alt={course?.courseTitle || "Course Thumbnail"}
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-4">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course?.courseTitle || "Untitled Course"}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course?.creator?.photoUrl || "https://github.com/shadcn.png"}
                  alt={course?.creator?.name || "Instructor Avatar"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-sm">
                {course?.creator?.name || "Unknown Instructor"}
              </h3>
            </div>
            {course?.courseLevel && (
              <Badge className="bg-gradient-to-r from-teal-600 to-green-400 text-white px-2 py-1 text-xs rounded-full">
                {course.courseLevel}
              </Badge>
            )}
          </div>
          <div className="text-lg font-bold">
            <span>${course?.coursePrice != null ? course.coursePrice : "0.00"}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};


export default Course;



