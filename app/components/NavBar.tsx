import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-500 p-7 flex justify-center items-center">
      <div className="mr-20 md:mr-40">
        <Link href="/" className="font-bold text-gray-800 text-2xl">
          @bcn
        </Link>
      </div>
      <div className="ml-10 md:ml-40">
        <button className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded">
          add event
        </button>
      </div>
    </nav>
  );
}
