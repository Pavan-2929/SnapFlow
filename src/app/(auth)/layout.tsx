import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();
  console.log(user);

  if (user) redirect("/");

  return (
    <>
      {children}
    </>
  );
};

export default Layout;
