import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="flex">
 <div className="hidden lg:block  sm:w-[300px] space-y-10 border-r-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 top-0 sticky h-screen  ">
    <div className="space-y-8  ">
   <Link to="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
   <ChartNoAxesColumn size={22}/>
   <h3>Dashboard</h3>
   </Link>
   <Link to="/admin/course" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
   <SquareLibrary size={22}/>
   <h3>Courses</h3>
   </Link>
    </div>
   
      
    </div>
     <div className="flex-1 p-2 bg-white ">
      <Outlet/>
    </div>
    </div>
  );
}

export default Sidebar
