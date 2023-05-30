"use client";

import { ArrowRight } from "@/components/Icons";
import { FormEventHandler, useEffect, useState } from "react";

export default function FileSend() {
    let [showWarning, setShowWarning] = useState(false);
    let [friends, setFriends] = useState<string[]>([]);

    useEffect(() => {
        // fetch("/api/user", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     name: "John Doe",
        //     email: "john@example.com",
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((json) => console.log(json));
    });

    const addFriend: FormEventHandler<HTMLFormElement> = (e: any) => {
        e.preventDefault();
        setShowWarning(false);
        setFriends([...friends, e.target["inpt"].value]);
        e.target.reset();
    };

    const removeFriend = (f: string) => {
        setFriends(friends.filter((friend) => friend !== f));
    };

    const save = () => {
        fetch("/api/friends", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                friends,
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
                        onInvalid={(e: any) => {
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
                    {friends.map((friend, i) => (
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
