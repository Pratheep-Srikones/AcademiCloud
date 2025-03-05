"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

export default function Dashboard() {
  const { authUser, logout } = useAuthStore();
  console.log(authUser);
  const [assignments, setAssignments] = useState([
    {
      assignment_id: 1,
      title: "Math Assignment 1",
      description: "Solve 10 algebra problems.",
      due_date: "2025-03-10",
      file_url: "#",
      module: "Mathematics",
      semester: "Spring 2025",
      status: "pending",
    },
    {
      assignment_id: 2,
      title: "Physics Lab Report",
      description: "Write a report on Newton’s Laws.",
      due_date: "2025-03-12",
      file_url: "#",
      module: "Physics",
      semester: "Spring 2025",
      status: "pending",
    },
  ]);

  const markAsDone = (id: number) => {
    setAssignments(
      assignments.map((a) =>
        a.assignment_id === id ? { ...a, status: "done" } : a
      )
    );
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter((a) => a.assignment_id !== id));
  };

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
            {assignments.filter((a) => a.status === "pending").length}
          </h2>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.assignment_id}
              className="p-6 rounded-xl bg-gray-900 shadow-xl ring-1 ring-blue-500/50"
            >
              <h3 className="text-lg font-bold text-blue-400">
                {assignment.title}
              </h3>
              <p className="text-gray-300">{assignment.description}</p>
              <p className="text-sm text-gray-400">
                Due Date: {assignment.due_date}
              </p>
              <p className="text-sm text-gray-400">
                Module: {assignment.module} | Semester: {assignment.semester}
              </p>
              <a
                href={assignment.file_url}
                className="text-blue-400 hover:underline"
              >
                View File
              </a>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => markAsDone(assignment.assignment_id)}
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
                >
                  Mark as Done
                </button>
                <button
                  onClick={() => deleteAssignment(assignment.assignment_id)}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 px-5 py-3 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-600 transition">
          Add New Assignment
        </button>
      </div>
    </div>
  );
}
