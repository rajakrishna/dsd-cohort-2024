import Link from "next/link";
import { sideNavItems } from "@/constants";
export default function Layout({ children }) {
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
            <li key={item.label} className="mb-4 border-2 border-black rounded-lg hover:bg-gray-200 text-center">
              <Link href={item.href}>
                  <button className="text-black p-2 font-bold block">{item.label}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}