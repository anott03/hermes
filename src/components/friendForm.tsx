import { ArrowRight } from "./Icons";

export default function Form({ addFriend }: { addFriend: (formData: FormData) => void }) {
    return (
        <form
            className="flex flex-row border border-purple-600 my-2"
            action={addFriend}
        >
            <input
                name="inpt"
                type="email"
                className="w-full p-2 text-sm focus:outline-none"
                placeholder="Enter an email address"
            />
            <button type="submit" className="p-2 text-purple-600">
                <ArrowRight />
            </button>
        </form>
    );
}
