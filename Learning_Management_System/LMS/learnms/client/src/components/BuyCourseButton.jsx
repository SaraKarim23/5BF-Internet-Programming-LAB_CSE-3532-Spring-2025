import React from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'



const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate(`/billing/${courseId}`)
  }

  return (
       <Button onClick={handleClick} className="w-full text-white">
      Purchase Course
    </Button>
  )
}




export default BuyCourseButton
