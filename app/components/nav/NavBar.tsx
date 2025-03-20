import Link from "next/link";
import Image from "next/image";
import UserAvatar from "@/assets/random-user.jpg";

export default function NavBar() {
  return (
    <nav className="bg-amber-500 w-full">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">Event Planner</Link>
        <div className="flex items-center">
          <div className="flex items-center">
            <Image
              width={40}
              height={40}
              src={UserAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <Link className="font-bold mr-4" href="/events">
              User Name
            </Link>
          </div>
          <button className="bg-white text-amber-600 px-4 py-1 rounded-md hover:bg-amber-50 transition-colors">
            <Link href="/events/create">Create Event</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
