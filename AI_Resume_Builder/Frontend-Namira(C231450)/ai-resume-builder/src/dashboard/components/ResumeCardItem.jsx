// import { Notebook } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";

// function ResumeCardItem({ resume }) {
//   return (
//     <Link to={"/dashboard/resume/" + resume.resumeId + "/edit"}>
//       <div className="p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary">
//         <Notebook />
//       </div>
//       <h2 className="text-center my-1">{resume.title}</h2>
//     </Link>
//   );
// }

// export default ResumeCardItem;

import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // const onMenuClick=(url)=>{
  //   navigation(url)
  // }

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    // <div className="">
    //   <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
    //     <div
    //       className="p-14  bg-gradient-to-b
    //       from-pink-100 via-purple-200 to-blue-200
    //     h-[280px]
    //       rounded-t-lg border-t-4
    //     "
    //       style={{
    //         borderColor: resume?.themeColor,
    //       }}
    //     >
    //       <div
    //         className="flex
    //     items-center justify-center h-[180px] "
    //       >
    //         {/* <Notebook/> */}
    //         <img src="/cv.jpg" width={80} height={80} />
    //       </div>
    //     </div>
    //   </Link>
    //   <div
    //     className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
    //     style={{
    //       background: resume?.themeColor,
    //     }}
    //   >
    //     <h2 className="text-sm">{resume.title}</h2>

    //     <DropdownMenu>
    //       <DropdownMenuTrigger>
    //         <MoreVertical className="h-4 w-4 cursor-pointer" />
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent>
    //         <DropdownMenuItem
    //           onClick={() =>
    //             navigation("/dashboard/resume/" + resume.documentId + "/edit")
    //           }
    //         >
    //           Edit
    //         </DropdownMenuItem>
    //         <DropdownMenuItem
    //           onClick={() =>
    //             navigation("/my-resume/" + resume.documentId + "/view")
    //           }
    //         >
    //           View
    //         </DropdownMenuItem>
    //         <DropdownMenuItem
    //           onClick={() =>
    //             navigation("/my-resume/" + resume.documentId + "/view")
    //           }
    //         >
    //           Download
    //         </DropdownMenuItem>
    //         <DropdownMenuItem onClick={() => setOpenAlert(true)}>
    //           Delete
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>

    //     <AlertDialog open={openAlert}>
    //       <AlertDialogContent>
    //         <AlertDialogHeader>
    //           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //           <AlertDialogDescription>
    //             This action cannot be undone. This will permanently delete your
    //             account and remove your data from our servers.
    //           </AlertDialogDescription>
    //         </AlertDialogHeader>
    //         <AlertDialogFooter>
    //           <AlertDialogCancel onClick={() => setOpenAlert(false)}>
    //             Cancel
    //           </AlertDialogCancel>
    //           <AlertDialogAction onClick={onDelete} disabled={loading}>
    //             {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
    //           </AlertDialogAction>
    //         </AlertDialogFooter>
    //       </AlertDialogContent>
    //     </AlertDialog>
    //   </div>
    // </div>

    <div className="">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="bg-gradient-to-b overflow-hidden from-gray-100 via-blue-200 to-purple-100
                 h-[220px] rounded-t-lg border-t-4 transition-transform hover:scale-[1.02] duration-200"
          style={{
            borderColor: resume?.themeColor || "#6366f1", // fallback
          }}
        >
          <div className="h-full">
            <img
              src="/cv.jpg"
              alt="CV"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        </div>
      </Link>

      <div
        className=" p-4 flex justify-between items-center rounded-b-lg shadow-md text-blue-800"
        style={{
          backgroundColor: resume?.themeColor || "#f0f8ff",
        }}
      >
        <h2 className="text-sm font-semibold">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove it from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
