"use client";
import useAuth from "@/context/useAuth";
import React from "react";
import SignUp from "@/components/SignUp";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const { authStatus } = useAuth();

  if(authStatus){
    router.replace("/profile");
    return <></>;
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <SignUp />
    </section>
  )
}

export default SignUpPage;