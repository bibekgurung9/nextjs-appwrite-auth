"use client";
import useAuth from "@/context/useAuth";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import appwriteService from "@/appwrite/config";

const LogoutPage = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();

  useEffect(() => {
    appwriteService.logout()
    .then(() => {
      setAuthStatus(false);
      router.replace("/")
    })
  }, []);

  return (
    <></>
  )
}

export default LogoutPage;