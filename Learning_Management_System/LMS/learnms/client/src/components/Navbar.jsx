import { School } from 'lucide-react';
import React from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DarkMode from '@/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authapi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
    
    const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();

    const navigate = useNavigate();

    const logoutHandler = async () =>{
      await logoutUser();
    };

    // console.log(user);

    useEffect(()=>{
      if(isSuccess){
        toast.success(data.message || "User log out.");
        navigate("/login");
      }
     
    }, [isSuccess])

    return (
        <div className='h-16 relative dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200  top-0 left-0 right-0 duration-300 z-50  '>
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <Link to="/"><h2 className="hidden md:block font-weight:300 font-bold text-xl ">E-Learning</h2></Link> 
                </div>
                 <div className='flex items-center gap-8'>
                   {
                    user? ( <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Avatar>
      <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png" }alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
    <DropdownMenuItem><Link to="my-learning">My learning</Link></DropdownMenuItem>
    <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler}>
            Log out
          </DropdownMenuItem>
         
        </DropdownMenuGroup>

        {
          user.role === "instructor" && (
            <>
        <DropdownMenuSeparator />

       
         <DropdownMenuItem>
          <Link to="/admin/dashboard">Dashboard</Link>
         
        </DropdownMenuItem>
            </>
          )
        }

      </DropdownMenuContent>
    </DropdownMenu>) : (
        <div className='flex items-center gap-2'>
        <Button variant="outline" onClick={()=>navigate ("/login")}>Login</Button>
        <Button onClick={()=>navigate ("/login")}>Signup</Button>
        </div>

    )}
    <DarkMode/>
                       
                </div>
            </div>
        </div>
    );
};

export default Navbar;