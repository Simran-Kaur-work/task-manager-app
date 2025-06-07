import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default Logout;
