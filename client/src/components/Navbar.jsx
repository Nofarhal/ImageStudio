import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-3xl font-bold">
          ImageStudio 🚀
        </h1>

        <p className="text-purple-400">
          AI Creative Studio
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl"
        >
          Dashboard
        </Link>

        <button
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;