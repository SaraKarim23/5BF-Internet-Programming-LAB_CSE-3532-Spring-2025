import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    // sing-in layout (using clerk)
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 bg-gradient-to-r from-gray-100 via-blue-200 to-purple-100 bg-[length:200%_200%] animate-gradient-x">
      {/* <SignIn /> */}
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            card: "shadow-lg rounded-xl",
          },
        }}
      />
    </div>
  );
}

export default SignInPage;
