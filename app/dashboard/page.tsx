/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAssignmentStore } from "@/store/useAssignmentStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useModuleStore } from "@/store/useModuleStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { authUser, logout } = useAuthStore();
  const { modules, fetchModules } = useModuleStore();
  const { assignments, getAssignments, markAsDone, deleteAssignment } =
    useAssignmentStore();
  const [x, setX] = useState(false);
  const toggle = () => setX(!x);
  console.log(authUser);

  useEffect(() => {
    if (authUser && authUser.user_id)
      getAssignments(authUser?.user_id as string);
    //console.log("Assignments: ", assignments);
  }, [x, getAssignments, modules]);

  const handleMarkAsDone = (assignment_id: string) => {
    markAsDone(assignment_id).then(() => {
      toggle();
    });
  };

  const handleDeleteAssignment = (assignment_id: string) => {
    deleteAssignment(assignment_id).then(() => {
      toggle();
    });
  };

  useEffect(() => {
    fetchModules();
  }, []);

  console.log(modules);
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="w-full max-w-3xl space-y-6">
        <div className="p-6 rounded-xl bg-gray-900 shadow-xl ring-1 ring-blue-500/50">
          <h1 className="text-3xl font-bold text-blue-400">
            Welcome, {authUser?.username}!
          </h1>
          <p className="text-gray-400">Email: {authUser?.email}</p>
          <button
            className="mt-4 w-full rounded-lg bg-red-500 px-5 py-2 font-bold text-white transition hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="p-6 rounded-xl bg-gray-900 shadow-xl ring-1 ring-blue-500/50">
          <h2 className="text-xl font-semibold text-blue-400">
            Pending Assignments:{" "}
            {assignments.length > 0
              ? assignments.filter(
                  (assignment) => assignment.status == "pending"
                ).length
              : "None"}
          </h2>
        </div>

        <div className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map(
              (assignment) => (
                console.log(assignment.module_id),
                (
                  <div
                    key={assignment.assignment_id}
                    className="p-6 rounded-xl bg-gray-900 shadow-xl ring-1 ring-blue-500/50"
                  >
                    <h3 className="text-lg font-bold text-blue-400">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-300">{assignment.description}</p>
                    <p className="text-sm text-gray-400">
                      Due Date: {assignment.due_date as unknown as string}
                    </p>
                    <p className="text-sm text-gray-400">
                      Module:{" "}
                      {modules.find(
                        (module) => module.module_id === assignment.module_id
                      )?.name || "Unknown"}{" "}
                      | Semester:{" "}
                      {modules.find(
                        (module) => module.module_id === assignment.module_id
                      )?.semester || "N/A"}
                    </p>
                    <p>
                      Status:{" "}
                      <span
                        className={`${
                          assignment.status === "pending"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </p>

                    <a
                      href={assignment.file_url}
                      className="text-blue-400 hover:underline"
                      target="_blank"
                    >
                      View File
                    </a>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() =>
                          handleMarkAsDone(assignment.assignment_id)
                        }
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
                      >
                        Mark as Done
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteAssignment(assignment.assignment_id)
                        }
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )
            )
          ) : (
            <p className="text-gray-400">No assignments available.</p>
          )}
        </div>

        <a href="/application/add">
          <button className="w-full mt-6 px-5 py-3 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-600 transition">
            Add New Assignment
          </button>
        </a>
        <button
          onClick={() => router.push("/module")}
          className="w-full mt-6 px-5 py-3 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-600 transition"
        >
          Add New Module
        </button>
      </div>
    </div>
  );
}
