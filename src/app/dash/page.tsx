"use client";

import FileSend from "@/components/FileSend";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";

export default function Dash() {
  let [step, setStep] = useState(0);
  let [file, setFile] = useState<File>();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fbf9fc]">
      <div className="bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg shadow-xl drop-shadow-xl shadow-purple-500 flex flex-col justify-center items-end">
        {step == 0 && (
          <FileUpload
            nextStep={(_file: File) => {
              setStep(1);
              setFile(_file);
            }}
          />
        )}
        {step == 1 && file && <FileSend file={file} />}
      </div>
    </div>
  );
}
