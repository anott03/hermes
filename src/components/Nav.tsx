"use client"

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Bell, UserPlus } from "./Icons";
import Link from "next/link";
import { LegacyRef, forwardRef, useRef } from "react";

const Notifications = forwardRef(function Notifications({ closeModal }: { closeModal: () => void }, ref: LegacyRef<HTMLDialogElement>) {
    return (
        <dialog ref={ref}
            className="hidden bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg open:flex flex-col justify-center items-start backdrop:bg-black backdrop:opacity-50"
        >
            <div className="w-full flex flex-row justify-between">
                Notifications
                <button onClick={closeModal}>X</button>
            </div>
            <div className="w-full h-full flex-1">
            </div>
        </dialog>
    );
});

export default function Nav() {
    const modalRef: LegacyRef<HTMLDialogElement> = useRef(null);

    return (<>
        <nav className="max-w-7xl mx-auto p-6 flex flex-row justify-between items-center w-full">
            <p className="text-2xl">Hermes</p>
            <SignedIn>
                <div className="flex flex-row items-center justify-center gap-3">
                    <Link href="/add-friends" className="p-2 rounded rounded-[50%] hover:bg-purple-100 hover:text-purple-700">
                        <UserPlus />
                    </Link>
                    <button className="p-2 rounded rounded-[50%] hover:bg-purple-100 hover:text-purple-700" onClick={() => {
                        modalRef.current?.showModal();
                    }}>
                        <Bell />
                    </button>
                    <UserButton />
                </div>
            </SignedIn>
            <SignedOut>
                <button>Sign In</button>
            </SignedOut>
        </nav>
        <Notifications ref={modalRef} closeModal={() => modalRef.current?.close()} />
    </>);
}
