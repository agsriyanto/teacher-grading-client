export type User = {
  id?: string;
  name: string;
  email?: string;
  role?: string;
};

export type Assignments = {
  id: string;
  subject: string;
  title: string;
  content: string;
  student?: User;
  studentId?: string;
  createdAt?: string;
};

export type Grades = {
  id: string;
  assignmentId: string;
  teacherId: string;
  grade: number;
  feedback: string;
  assignment?: Assignments;
  teacher?: User;
  createdAt?: string;
};

export type AssignmentProps = {
  onNewAssignment: () => void;
  onOpenAssignment: (assignment: Assignments) => void;
};

export type FormAssignmentProps = {
  onBack: () => void;
};

export type AssignmentDetailProps = {
  assignment: Assignments;
  onClose: () => void;
};