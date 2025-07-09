// import React from "react";

// function SkillsPreview({ resumeInfo }) {
//   // console.log("Skill Ratings:", resumeInfo.skills);

//   return (
//     <div className="my-6">
//       <h2
//         className="text-center font-bold text-sm mb-2"
//         style={{
//           color: resumeInfo?.themeColor,
//         }}
//       >
//         Skills
//       </h2>
//       <hr
//         style={{
//           borderColor: resumeInfo?.themeColor,
//         }}
//       />

//       <div className="grid grid-cols-2 gap-3 my-4">
//         {resumeInfo?.skills.map((skill, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <h2 className="text-xs">{skill.name}</h2>
//             <div className="h-2 bg-gray-200 w-[120px]">
//               <div
//                 className="h-2"
//                 style={{
//                   backgroundColor: resumeInfo?.themeColor || "black",
//                   width: skill?.rating * 20 + "%",
//                   // width: (skill?.rating / 5) * 100 + "%",
//                   // width: `${((skill?.rating || 0) / 5) * 100}%`,
//                 }}
//               ></div>
//               {/* <div
//                 className="h-2"
//                 style={{
//                   backgroundColor: resumeInfo?.themeColor || "black",
//                   width: `${((skill?.rating || 0) / 5) * 100}%`,
//                 }}
//               ></div> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SkillsPreview;

import React from "react";

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between print:justify-start gap-2"
          >
            <h2 className="text-xs w-[50%]">{skill.name}</h2>

            <div
              className="relative h-2 w-[120px] border border-gray-400 rounded print:border-black"
              style={{
                backgroundColor: "#e5e7eb", // Tailwind's gray-200
              }}
            >
              <div
                className="h-full"
                style={{
                  backgroundColor: resumeInfo?.themeColor || "black",
                  width: `${skill?.rating * 20}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
