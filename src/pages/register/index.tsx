import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../api/auth";
import eduKitaLogo from "../../assets/edukita-logo.png";
import "../login/login.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const result = await registerUser(name, email, password, role);

    if (result) {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
      alert("Registration successful! Please login.");
    } else {
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="register">
      <img src={eduKitaLogo} alt="logo" className="logo" />

      <div className="form">
        <h2 className="title">Create Account</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>

        <button className="form-button" onClick={handleRegister}>
          Register
        </button>

        <button className="btn-cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  )
};

export default Register;