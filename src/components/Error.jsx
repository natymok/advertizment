import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

    export default function ErrorMessage({ message }) {
        console.log(message)
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-start gap-3 rounded-xl bg-red-100 border border-red-400 p-4 shadow-sm">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <h2 className="text-red-700 font-semibold text-lg">Error</h2>
          <p className="text-sm text-red-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
