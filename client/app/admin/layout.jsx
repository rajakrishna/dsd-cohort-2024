'use client'
import Link from "next/link";
import { sideNavItems } from "@/constants";
import { usePathname } from 'next/navigation'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Layout({ children }) {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }

  if (!user) {
    router.push('/adminSignInAndSignUp')
  }

  return (
    <div className="drawer lg:drawer-open bg-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col m-4 p-4">
        <label className="btn btn-primary drawer-button lg:hidden">Menu</label>
        <div>{children}</div>
      </div>
      <div className="drawer-side border-2 border-black m-4 p-4 rounded-xl" style={{ height: '89dvh'}}>
        <label aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full text-base-content">
          {sideNavItems.map((item) => (
            <li key={item.label} className={`mb-4 border-2 border-black rounded-lg text-center ${pathname === item.href ? "bg-blue-500" : ""}` }>
              <Link href={item.href}>
                  <button className={`p-2 font-bold block ${pathname === item.href ? "text-white" : "text-black"}`}>{item.label}</button>
              </Link>
            </li>
          ))}
          <li className="absolute bottom-0 w-full text-center pb-4 pr-8">
             <button className='btn' onClick={()=>signOut(auth)}>Sign Out</button>
         </li>
        </ul>
      </div>
    </div>
  );
}