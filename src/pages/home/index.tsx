import { useState } from "react";
import { useAtom } from "jotai";

import Navbar from "../../components/navbar";
import Assignment from "../assignment";
import FormAssignment from "../../components/formAssignment";
import AssignmentDetail from "../assignment/assignmentDetail";
import { userAtom } from "../../store/authAtom";
import { Assignments } from "../../types";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignments | null>(null);
  const [user] = useAtom(userAtom);
 
  return (
    <div className="home">
      <Navbar />
      {showForm ? (
        user?.role === "STUDENT" ? (
          <FormAssignment onBack={() => setShowForm(false)} />
        ) : user?.role === "TEACHER" && selectedAssignment ? (
          <AssignmentDetail assignment={selectedAssignment} onClose={() => setShowForm(false)} />
        ) : (
          <Assignment onNewAssignment={() => setShowForm(true)} onOpenAssignment={setSelectedAssignment} />
        )
      ) : (
        <Assignment onNewAssignment={() => setShowForm(true)} onOpenAssignment={setSelectedAssignment} />
      )}
    </div>
  )
};

export default Home;