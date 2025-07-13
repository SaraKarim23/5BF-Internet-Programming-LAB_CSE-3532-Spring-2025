import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

  const [searchQuery,setSearchQuery] = useState("");

  const navigate = useNavigate();

  
  const searchHandler =(e)=>{
    e.preventDefault();
    if(searchQuery.trim() !== ""){
       navigate(`/course/search?query=${searchQuery}`)
    }
   setSearchQuery("");
  }


  return (
    <div className=" w-screen pt-20 bg-[linear-gradient(to_right,#184E68,#57CA85)] dark:bg-[linear-gradient(to_right,#0f2c3a,#3e9c6c)] py-28 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>
        <form onSubmit={searchHandler} className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6'>
          <Input
          type ="text"
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          placeholder="Search Courses"
          className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500"
          />
         <Button type="submit" className="bg-gradient-to-r from-[#184E68] to-[#57CA85] dark:from-[#0f2c3a] dark:to-[#3e9c6c] text-white px-6 py-3 rounded-r-full hover:opacity-90 transition-colors duration-300">
        Search
        </Button>
       
        </form>

         <Button onClick={()=> navigate(`/course/search?query`)} className="bg-gradient-to-r from-[#184E68] to-[#57CA85] dark:from-[#0f2c3a] dark:to-[#3e9c6c] text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors duration-300">
  Explore Courses
</Button>

      </div>
    </div>
  )
}

export default HeroSection

