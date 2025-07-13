
import './App.css'
import { Button } from './components/ui/button'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import SuccessStories from './pages/student/SucessStories'
import Footer from './pages/student/Footer'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import { AddCourse } from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import Billing from './pages/student/Billing'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:(
        <>
        <HeroSection/>
        <Courses/>
        <SuccessStories />
         <Footer/>
        </>
        ),
      },
      {
        path:"login",
        element:<AuthenticatedUser><Login/></AuthenticatedUser>
      },
     {
        path:"my-learning",
        element:<ProtectedRoute><MyLearning/></ProtectedRoute>
      },
      {
        path:"profile",
        element:<ProtectedRoute><Profile/></ProtectedRoute>
      },
      {
        path:"course/search",
        element:<ProtectedRoute><SearchPage/></ProtectedRoute>
      },

       {
        path:"/course-detail/:courseId",
        element:<ProtectedRoute><CourseDetail/></ProtectedRoute>
      },
      {
        path: "/billing/:courseId",  // ✅ Billing page route added
        element: <Billing />
      },
      {
        path:"/course-progress/:courseId",
        element:<ProtectedRoute><PurchaseCourseProtectedRoute><CourseProgress/></PurchaseCourseProtectedRoute></ProtectedRoute>
      },

      //admin routes start from here

      {
        path:"admin",
        element:<AdminRoute><Sidebar/></AdminRoute>,
        children:[
          {
           path:"dashboard",
           element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },

           {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture />
          },

        ]
      }

    ],
  },
]);



function App() {

  return (
    <main>
     <RouterProvider router={appRouter} />
    </main>
   
  )
}

export default App
