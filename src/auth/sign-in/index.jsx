import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex p-3 px-4 shadow-md items-center justify-center h-screen">
      {/* 👇 After login, redirect to dashboard */}
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}
