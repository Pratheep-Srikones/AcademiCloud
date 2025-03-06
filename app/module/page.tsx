"use client";

import { useState } from "react";
import { useModuleStore } from "@/store/useModuleStore";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddModule() {
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const { addModule } = useModuleStore();
  const router = useRouter();

  const handleSubmit = () => {
    if (!name || !semester) return;
    addModule(name, Number(semester));
    setName("");
    setSemester("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <div className="relative w-full max-w-md space-y-6 overflow-hidden rounded-2xl bg-gray-900 p-8 shadow-2xl ring-1 ring-blue-500/50 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-center text-3xl font-extrabold text-blue-400">
          AcademiCloud
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-300">
          Add New Module
        </h2>
        <div>
          <label className="block text-sm text-gray-400">Module Name</label>
          <input
            type="text"
            placeholder="Enter module name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Semester</label>
          <input
            type="number"
            placeholder="Enter semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-gray-700 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Module
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
