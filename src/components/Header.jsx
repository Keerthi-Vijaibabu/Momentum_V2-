import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
function Header() {
  return (
    <header
      style={{
        padding: "10px",
        paddingRight: "20px",
        background: "#15112D",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <img
        src={logo}
        alt="Momentum Logo"
        height={"50px"}
        style={{ marginRight: "10px" }}
      />

      <FaUserCircle size={32} style={{ color: "var(--accent-primary)" }} />
    </header>
  );
}

export default Header;
