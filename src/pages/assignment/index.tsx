import { useState, useEffect } from "react";
import { useAtom } from "jotai";

import { Assignments, AssignmentProps, Grades } from "../../types";
import { fetchAssignments } from "../../api/assignments";
import { fetchGrades } from "../../api/grades";
import { userAtom } from "../../store/authAtom";
import "./assignment.scss";

enum Subject {
  MATH_HOMEWORK = "Math Homework",
  ENGLISH_WRITING = "English Writing",
}

const Assignment = ({ onNewAssignment, onOpenAssignment }: AssignmentProps) => {
  const [subject, setSubject] = useState<string>("");
  const [assignments, setAssignments] = useState<(Assignments & { grade: string; feedback: string; teacher: string | null })[]>([]);

  const [user] = useAtom(userAtom);

  useEffect(() => {
    const loadData = async () => {
      const assignmentData = await fetchAssignments(subject);
      const gradeData = await fetchGrades(user?.id || "");

      const gradeMap: Record<string, Grades> = gradeData.reduce((acc: Record<string, Grades>, grade: Grades) => {
        acc[grade.assignmentId] = grade;
        return acc;
      }, {} as Record<string, Grades>);

      const enrichedAssignments = assignmentData?.assignments.map((assignment: Assignments) => ({
        ...assignment,
        grade: gradeMap[assignment.id]?.grade || "Not Graded",
        feedback: gradeMap[assignment.id]?.feedback || "No feedback yet",
        teacher: gradeMap[assignment.id]?.teacher || null,
      }));

      setAssignments(enrichedAssignments);
    };

    loadData();
  }, [subject, user?.id]);

  return (
    <div className="assignment">
      <h3>List Assignment</h3>

      <div className="subject-filter">
        <select
          className="subject-select"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">All</option>
          <option value="MATH_HOMEWORK">English</option>
          <option value="ENGLISH_WRITING">Math</option>
        </select>
        {user?.role === "STUDENT" && (
          <button className="new-assignment-button" onClick={onNewAssignment}>New Assignment</button>
        )}
      </div>

      <div className="table-container">
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Title</th>
              <th>Content</th>
              <th>Student</th>
              <th>Grade</th>
              <th>Feedback</th>
              {user?.role === "TEACHER" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{Subject[assignment.subject as keyof typeof Subject] || assignment.subject}</td>
                  <td>{assignment.title}</td>
                  <td>{assignment.content}</td>
                  <td>{assignment.student?.name}</td>
                  <td>{assignment.grade}</td>
                  <td>{assignment.feedback}</td>
                  {user?.role === "TEACHER" && (
                    <td 
                      className={`${assignment.grade === "Not Graded" ? "actions" : 'done'}`}
                      onClick={() => {
                        if (assignment.grade !== "Not Graded") return;
                        onNewAssignment();
                        onOpenAssignment(assignment);
                      }}
                    >
                      {assignment.grade === "Not Graded" ? "Give Feedback & Grade" : "Done"}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="no-data">
                  No assignments found for {subject}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;