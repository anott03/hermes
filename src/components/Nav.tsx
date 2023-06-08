import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Bell, UserPlus } from "./Icons";
import Link from "next/link";

export default function Nav() {
    return (<>
        <nav className="max-w-7xl mx-auto p-6 flex flex-row justify-between items-center w-full">
            <p className="text-2xl">Hermes</p>
            <SignedIn>
                <div className="flex flex-row items-center justify-center gap-3">
                    <Link href="/add-friends" className="p-2 rounded rounded-[50%] hover:bg-purple-100 hover:text-purple-700">
                        <UserPlus />
                    </Link>
                    <Link href="/notifications" className="p-2 rounded rounded-[50%] hover:bg-purple-100 hover:text-purple-700">
                        <Bell />
                    </Link>
                    <UserButton />
                </div>
            </SignedIn>
            <SignedOut>
                <button>Sign In</button>
            </SignedOut>
        </nav>
    </>);
}
