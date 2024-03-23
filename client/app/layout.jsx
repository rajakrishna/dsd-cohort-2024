import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
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
            <Link href={"/signup"}>
              <div className="btn btn-sm bg-transparent  border-2">Sign Up</div>
            </Link>

            <Link
              className="btn btn-sm bg-green-800"
              href={"/login"}>
              <div>Login</div>
            </Link>
            <Link
              className="btn btn-sm btn-warning"
              href={"/signout"}>
              <div>Sign out</div>
            </Link>
          </nav>
        </header>
        <main className=" bg-blue-600">{children}</main>
      </body>
    </html>
  );
}
