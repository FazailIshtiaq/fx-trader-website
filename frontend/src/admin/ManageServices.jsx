import { useEffect, useState } from "react";
import api from "../api/axios.js";
import ServiceVideoManager from "./ServiceVideoManager.jsx";

export default function ManageServices() {
  const [courses, setCourses] = useState([]);

  const loadCourses = () => api.get("/courses").then((res) => setCourses(res.data));

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Videos</h1>

      <div className="bg-card p-4 rounded-xl border border-gray-800">
        <ServiceVideoManager videos={courses} onChanged={loadCourses} />
      </div>
    </div>
  );
}