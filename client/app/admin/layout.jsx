import Link from "next/link";
import { sideNavItems } from "@/constants";
export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-1 md:overflow-hidden bg-white">
      <aside className="w-full flex-none md:w-64 border-2 border-black m-4 p-4 rounded-xl">
        <ul className="list-reset pt-4">
            {sideNavItems.map((item) => (
            <li key={item.label} className="mb-4 border-2 border-black rounded-lg hover:bg-gray-200 text-center">
                <Link href={item.href}>
                    <button className="text-black p-2 font-bold block">{item.label}</button>
                </Link>
            </li>
            ))}
        </ul>
      </aside>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}