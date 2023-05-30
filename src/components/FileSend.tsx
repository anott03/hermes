import { ArrowRight } from "@/components/Icons";

export default function FileSend({ file }: { file: File }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-end">
            <div className="w-full h-full p-5">{file.name}</div>
            <button className="text-sm text-purple-500 rounded-md hover:text-purple-600 flex flex-row gap-1 p-5 pt-0">
                Send <ArrowRight />
            </button>
        </div>
    );
}
