import { ArrowRight } from "@/components/Icons";
import { auth } from "@clerk/nextjs/app-beta";
import Link from "next/link";

export default function Home() {
    const a = auth();
    console.log(a);

    return (
        <div className="text-stone-800 w-full h-full flex flex-col justify-center">
            <div className="mx-auto max-w-7xl p-6 w-full flex flex-col items-start">
                <div>
                    <p className="text-3xl font-bold text-stone-800">
                        Filesharing like never before
                    </p>
                    <div className="flex flex-row justify-start w-full mt-2">
                        <Link
                            className="px-3.5 py-2.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
                            href="/dash"
                        >
                            Get Started
                        </Link>
                        <button className="ml-2 px-3.5 py-2.5 text-sm rounded-md flex flex-row items-center gap-1">
                            Learn More <ArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
