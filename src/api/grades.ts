const baseUrl = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("accessToken");

export const fetchGrades = async (studentId: string) => {
  try {
    if (!token) {
      console.error("No access token found!");
      return [];
    }

    const response = await fetch(`${baseUrl}/grades/?studentId=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
};

export const submitGrade = async (
  assignmentId: string,
  grade: number,
  feedback: string,
  teacherId: string
) => {
  try {
    const response = await fetch(
      `${baseUrl}/grades`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ grade, feedback, teacherId, assignmentId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error grading assignment: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting grade:", error);
    return null;
  }
};