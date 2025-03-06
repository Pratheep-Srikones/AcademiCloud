"use client";

import { useAssignmentStore } from "@/store/useAssignmentStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useModuleStore } from "@/store/useModuleStore";
import { useState } from "react";

export default function AddApplication() {
  const { authUser } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [module, setModule] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { modules } = useModuleStore();
  const { addAssignment } = useAssignmentStore();

  const user_id = authUser?.user_id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleModuleSelect = (mod: string) => {
    setModule(mod);
    setModuleName(modules.find((m) => m.module_id === mod)?.name as string);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    console.log({ title, description, dueDate, file, module });
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", dueDate);
    formData.append("file", file as Blob);
    formData.append("module_id", module);
    formData.append("user_id", user_id as string);
    addAssignment(formData);
  };

  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <div className="relative w-full max-w-md space-y-6 overflow-hidden rounded-2xl bg-gray-900 p-8 shadow-2xl ring-1 ring-blue-500/50 transform transition-all duration-300 hover:scale-105">
        <div className="absolute inset-0 -z-10 opacity-20 blur-3xl">
          <div className="h-full w-full bg-blue-500/30"></div>
        </div>
        <h1 className="text-center text-3xl font-extrabold text-blue-400">
          AcademiCloud
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-300">
          Add New Assignment
        </h2>
        <div>
          <label className="block text-sm text-gray-400">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">File Upload</label>
          <p className="text-xs text-gray-400/20">
            Drag and drop or select file
          </p>
          <p className="text-xs text-gray-400/20">Accepted file type: .pdf</p>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white file:mr-3 file:rounded-lg file:border-none file:bg-blue-500 file:px-3 file:py-2 file:text-white hover:file:bg-blue-600"
          />
        </div>
        <div className="relative">
          <label className="block text-sm text-gray-400">Module</label>
          <input
            type="text"
            placeholder="Select module"
            value={moduleName}
            onClick={() => setShowDropdown(!showDropdown)}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {showDropdown && (
            <div className="relative">
              <ul
                className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg bg-gray-800 shadow-lg"
                style={{
                  maxHeight: "100px",
                  overflowY: "auto",
                  top: "100%",
                  left: 0,
                  right: 0,
                }}
              >
                {modules
                  .filter((m) =>
                    m.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((mod) => (
                    <li
                      key={mod.module_id}
                      className="cursor-pointer px-4 py-2 text-white hover:bg-blue-500"
                      onClick={() => handleModuleSelect(mod.module_id)}
                    >
                      {mod.name} | Semester: {mod.semester}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
