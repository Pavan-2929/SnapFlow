import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import registerImage from "@/assets/register.png";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-full max-h-[40rem] w-full max-w-[60rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <Image
          src={registerImage}
          alt="Register Image"
          className="hidden object-cover md:block w-1/2"
        />
        <div className="w-full space-y-6 overflow-y-auto md:px-8 px-6 py-6 md:w-1/2">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Start with SnapFlow</h1>
          </div>
          <div className="space-y-5">
            <RegisterForm />
            <p className="text-center hover:underline text-medium text-muted-foreground">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
