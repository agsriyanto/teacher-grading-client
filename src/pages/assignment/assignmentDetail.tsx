import { useState } from "react";
import { useAtom } from "jotai";

import { AssignmentDetailProps } from "../../types";
import { submitGrade } from "../../api/grades";
import { userAtom } from "../../store/authAtom";
import "./assignment.scss";

const AssignmentDetail = ({assignment, onClose}: AssignmentDetailProps) => {
  const [grade, setGrade] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [user] = useAtom(userAtom);

  const handleSubmitGrade = async () => {
    if (!assignment) return;
    if (!user?.id) {
      console.error("Teacher ID is missing");
      return;
    }

    setLoading(true);

    try {
      const response = await submitGrade(
        assignment.id,
        Number(grade),
        feedback,
        user.id
      );

      if (response) {
        alert("Grade submitted successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error submitting grade:", error);
      alert("Failed to submit grade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assignment-detail">
      <div className="assignment-detail-card">
        <div className="assignment-detail-card-info">
          <div className="content">
            <p className="title">Subject</p>
            <p>: {assignment.subject}</p>
          </div>
          <div className="content">
            <p className="title">Title</p>
            <p>: {assignment.title}</p>
          </div>
          <div className="content">
            <p className="title">Content</p>
            <p>: {assignment.content}</p>
          </div>
        </div>
        <div className="form">
          <div className="form-input">
            <label>
              Grade :
            </label>
            <input
              required
              type="text"
              value={grade}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setGrade(value);
                }
              }}
              placeholder="Grade"
            />
          </div>
          <div className="form-input">
            <label>
              Feedback :
            </label>
            <textarea
              required
              value={feedback}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
              placeholder="Feedback"
            />
          </div>
          <div className="btn">
            <button className="btn-cancel" onClick={onClose}>Close</button>
            <button className="btn-submit" onClick={handleSubmitGrade} disabled={loading}>
              {loading ? "Submitting..." : "Submit Grade"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AssignmentDetail;