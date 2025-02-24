import { useAtom } from "jotai";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import "./navbar.scss";
import { authAtom, userAtom } from "../../store/authAtom";
import eduKitaLogo from "../../assets/edukita-logo.png";

const Navbar = () => {
  const [, setAuth] = useAtom(authAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuth(null);
    setUser(null);
  };

  return (
    <div className="navbar">
      <img src={eduKitaLogo} alt="logo" className="logo" />
      <div className="profile">
        <div className="profile-user">
          <p>{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <Tooltip title="Logout">
          <IconButton>
            <LogoutIcon onClick={handleLogout} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
};

export default Navbar;