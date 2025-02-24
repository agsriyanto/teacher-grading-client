import { useState } from "react";
import { useAtom } from "jotai";

import { userAtom } from "../../store/authAtom";
import { FormAssignmentProps } from "../../types";
import { submitAssignment } from "../../api/assignments";
import "./formAssignment.scss";

const FormAssignment = ({ onBack }: FormAssignmentProps) => {
  const [user] = useAtom(userAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "STUDENT") {
    return <p className="error">Only students can submit assignments.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitAssignment(title, content, subject, (user?.id || ""));
      alert("Assignment submitted successfully!");
      setTitle("");
      setContent("");
      setSubject("");
      onBack();
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Failed to submit assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-assignment">

      <div className="form">
        <h2 className="title">Create Assignment</h2>
        <label>
          Title:
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment Title"
          />
        </label>
        
        <label>
          Subject:
          <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
            <option value="">Select Subject</option>
            <option value="MATH_HOMEWORK">Math</option>
            <option value="ENGLISH_WRITING">English</option>
          </select>
        </label>

        <label>
          Content:
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Assignment Content"
          />
        </label>

        <div className="card-button">
          <button className="cancel-button" onClick={onBack}>Cancel</button>
          <button className="submit-button" onClick={handleSubmit} disabled={!subject || !title || !content || loading}>
            {loading ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </div>
    </div>
  )
};

export default FormAssignment;