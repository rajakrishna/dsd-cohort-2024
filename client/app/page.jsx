import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full bg-inherit ">
      {/* expert plumbing and book appointment */}
      <section
        className="hero min-h-screen "
        style={{
          backgroundImage:
            "url(https://images-ext-1.discordapp.net/external/S8e1ub3wcnHxwWn4IRR8TzmwPTDyfHnLPRwYYP0IWqY/https/t4.ftcdn.net/jpg/06/32/70/29/360_F_632702962_sUHqrD8E1BSy3IQKqSGsIHi6C7xJiQSt.jpg?format=webp&width=938&height=525)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Expert Plumbing Services for Your Home
            </h1>
            <p className="mb-5">
              Book appointments with ease and get your plumbing issues resolved
              quickly
            </p>
            <div className="flex gap-3 justify-center">
              <Link href={"/companyservices"}>
                <button className="btn text-black btn-primary bg-transparent border-black">
                  Learn More
                </button>
              </Link>

              {/* book now button with arrow */}
              <Link href={"/appointment"}>
                <button className="btn btn-accent text-black ">
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* admin button */}
        <Link
          href={"/admin"}
          className="  absolute bottom-0 right-0 inline-block">
          <button className="btn btn-neutral">Admin</button>
        </Link>
      </section>
    </section>
  );
}
