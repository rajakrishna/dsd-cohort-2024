import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className=" bg-blue-900"
      data-theme="aqua">
      <body className="">
        <header className="flex justify-between w-full p-3">
          <Link href={"/"}>logo here</Link>
          <nav className="flex gap-3">
            <Link href={"/appointment"}>Book Now</Link>
            <Link href={"/companyservices"}>Services</Link>
            <Link href={"/signup"}>Sign Up</Link>
            <Link href={"/login"}>Login</Link>
          </nav>
        </header>
        <main className=" bg-blue-600">{children}</main>
      </body>
    </html>
  );
}
