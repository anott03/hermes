import { useState } from "react";
import { ArrowRight } from "./Icons";

export default function FileUpload({
    nextStep,
}: {
    nextStep: (_file: File) => void;
}) {
    let [file, setFile] = useState<File>();

    return (
        <div className="w-full h-full flex flex-col justify-center items-end">
            <label className="label w-full h-full p-5">
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files) setFile(e.target.files[0]);
                    }}
                    required
                    className="flex flex-row justify-center items-center"
                />
                <span>drag and drop or click to select file</span>
            </label>
            <button
                className="text-sm text-purple-500 rounded-md hover:text-purple-600 flex flex-row gap-1 p-5 pt-0 disabled:hidden"
                onClick={() => {
                    if (file) nextStep(file);
                }}
                disabled={!file}
            >
                Next <ArrowRight />
            </button>
        </div>
    );
}
