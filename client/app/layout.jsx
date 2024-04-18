'use client'

import "./globals.css";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import useDrift from "./_hooks/liveChat-api/useDrift.js";

export default function RootLayout({ children }) {

  useDrift();

  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
    <html
      lang="en"
      className=" bg-blue-600"
      data-theme="aqua">
       <body className="">
       <header>
       </header>
       <div className="flex items-center justify-center min-h-screen bg-blue-600">
        <span className="loading loading-bars loading-lg"></span>
       </div>
      <main className=" bg-blue-600">{children}</main>
      </body>
    </html>
  )
}

  return (
    <html
      lang="en"
      className=" bg-blue-900"
      data-theme="aqua">
      <body className="">
        <header className="flex justify-between w-full p-3 bg-neutral">
          <Link href={"/"}>
            <div className="btn bg-transparent border-0">logo here</div>
          </Link>
          <nav className="flex gap-3 items-center">
            <Link href={"/appointment"}>
              <div className="btn btn-sm bg-transparent border-0">Book Now</div>
            </Link>

            <Link href={"/companyservices"}>
              <div className="btn btn-sm bg-transparent border-0">Services</div>
            </Link>
            { !user && (
              <>
            <Link href={"/signup"}>
              <div className="btn btn-sm bg-transparent  border-2">Sign Up</div>
            </Link>

            <Link
              className="btn btn-sm bg-green-800"
              href={"/login"}>
              <div>Login</div>
            </Link>
            </>
          )}
           { user &&  <Link
              className="btn btn-sm btn-warning"
              href={"/signout"}>
              <div>Sign out</div>
            </Link>
          }
          </nav>
        </header>
        <main className=" bg-blue-600">{children}</main>
      </body>
    </html>
  );
}
