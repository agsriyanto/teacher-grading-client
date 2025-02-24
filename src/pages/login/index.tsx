import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import "./login.scss";
import { loginUser } from "../../api/auth";
import { authAtom, userAtom } from "../../store/authAtom";
import eduKitaLogo from "../../assets/edukita-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [auth] = useAtom(authAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuth] = useAtom(authAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (auth) {
      window.location.reload();
    }
  }, [navigate, auth]);

  const handleLogin = async () => {
    const response = await loginUser(email, password);
    if (response) {
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.userData));
      setAuth(response.token);
      setUser(response.userData);
      navigate("/");
    } else {
      alert("Login failed! Please try again.");
    }
  };

  return (
    <div className="login">
      <img src={eduKitaLogo} alt="logo" className="logo" />
      <div className="form">
        <h2 className="title">Login</h2>
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
        <button
          className="form-button"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Login
        </button>
        <p className="register-title" onClick={() => navigate("/register")}>Don't have an account? <span>Register</span></p>
      </div>
    </div>
  )
};

export default Login;
