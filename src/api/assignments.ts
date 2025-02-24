const baseUrl = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("accessToken");

export const fetchAssignments = async (subject: string) => {
  try {
    if (!token) {
      console.error("No access token found!");
      return [];
    }

    const response = await fetch(`${baseUrl}/assignments/?subject=${subject}`, {
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

export const submitAssignment = async (
  title: string,
  content: string,
  subject: string,
  studentId: string,
) => {
  if (!token) {
    throw new Error("No access token found. Please log in.");
  }

  try {
    const response = await fetch(`${baseUrl}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, subject, studentId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw error;
  }
};