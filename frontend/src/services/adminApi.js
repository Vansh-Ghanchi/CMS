import API from "./api";

// STUDENTS
export const getStudents = () => API.get("/students/");

// ATTENDANCE
export const getAttendance = () => API.get("/attendance/");

// COURSES
export const getCourses = () => API.get("/courses/");

// FEES
export const getFees = () => API.get("/fees/");

// FACULTY
export const getFaculty = () => API.get("/faculty/");
export const createFaculty = (data) => API.post("/faculty/", data);
export const resetFacultyPassword = (data) => API.post("/faculty/reset-password", data);