import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import LoginImage from "@/assets/login.png";
import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-full max-h-[40rem] w-full max-w-[60rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <Image
          src={LoginImage}
          alt="Register Image"
          className="hidden w-1/2 object-cover md:block"
        />
        <div className="w-full space-y-6 overflow-y-auto px-6 py-6 md:w-1/2 md:px-8">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold">Start with SnapFlow</h1>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <p className="text-center text-medium text-muted-foreground hover:underline">
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
