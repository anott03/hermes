"use client";

import { ArrowRight } from "@/components/Icons";
import { FormEventHandler, useState } from "react";

export default function FileSend() {
    const [showWarning, setShowWarning] = useState(false);
    const [newFriends, setNewFriends] = useState<string[]>([]);

    const addFriend: FormEventHandler<HTMLFormElement> = (e: any) => {
        e.preventDefault();
        setShowWarning(false);
        setNewFriends([...newFriends, e.target["inpt"].value]);
        e.target.reset();
    };

    const removeFriend = (f: string) => {
        setNewFriends(newFriends.filter((friend) => friend !== f));
    };

    const save = () => {
        fetch("/api/friends", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                friends: newFriends,
            }),
        });
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#fbf9fc]">
            <div className="bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg shadow-xl drop-shadow-xl shadow-purple-500 flex flex-col p-3">
                <p className="text-2xl">Let's add some friends</p>
                <small>
                    Once they accept your friend request, you will be able to
                    send them files.
                </small>
                {showWarning && (
                    <p className="p-2 bg-red-200 text-xs text-red-800 mt-3 border">
                        Please enter a valid email address
                    </p>
                )}
                <form
                    className="flex flex-row border border-purple-600 mt-3"
                    onSubmit={addFriend}
                >
                    <input
                        id="inpt"
                        type="email"
                        onInvalid={e => {
                            e.preventDefault();
                            setShowWarning(true);
                        }}
                        className="w-full p-2 text-sm focus:outline-none"
                        placeholder="Enter an email address"
                    />
                    <button type="submit" className="p-2 text-purple-600">
                        <ArrowRight />
                    </button>
                </form>
                <ul className="w-full h-full flex flex-col p-5 overflow-scroll">
                    {newFriends.map((friend, i) => (
                        <li
                            key={i}
                            className="my-1 hover:cursor-pointer hover:line-through"
                            onClick={() => removeFriend(friend)}
                        >
                            {friend}
                        </li>
                    ))}
                </ul>
                <div className="w-full flex flex-row justify-end">
                    <button onClick={save}>Done</button>
                </div>
            </div>
        </div>
    );
}
