import Link from "next/link";

export default function NavBar() {
  const signOutButton = false; // TODO: add signout functionality etc
  const handleSignout = () => {
    console.log("handleSignout");
  };
  return (
    <nav className="bg-gray-500 max-w-xl mx-auto p-2 md:max-w-1/2">
      <div className="flex flex-col justify-start">
        <div className="flex justify-between mx-8 mt-2">
          <div className="flex flex-col">
            <Link href="/" className="font-bold text-gray-800 text-2xl">
              @bcn
            </Link>
          </div>
          <div className="flex flex-col">
            <Link
              href="/add-event"
              className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded-lg text-lg flex-grow"
            >
              add event
            </Link>
            {signOutButton && (
              <button
                onClick={handleSignout}
                className="bg-black text-white text-xs p-2 px-2 mt-2 rounded-lg flex-grow"
              >
                SIGN OUT
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
