import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-200 px-6 sticky top-0 z-50">

      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-content font-bold text-sm">DT</span>
          </div>
            <span className="text-xl font-bold text-primary">DevTinder</span>
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-4">

          {/* Greeting */}
          <span className="hidden md:block text-sm text-base-content/60">
            Hey, <span className="font-medium text-base-content">{user.firstName}</span>
          </span>

          {/* Avatar dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100"
            >
              <div className="w-10 rounded-full">
                <img alt={user.firstName} src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-56 p-2 shadow-lg border border-base-200"
            >
              {/* User info header */}
              <li className="px-3 py-2 border-b border-base-200 mb-1">
                <div className="flex flex-col gap-0 hover:bg-transparent cursor-default">
                  <span className="font-semibold text-sm">{user.firstName} {user.lastName}</span>
                  <span className="text-xs text-base-content/50">{user.emailId}</span>
                </div>
              </li>

              <li>
                <Link to="/profile" className="gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/connections" className="gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Connections
                </Link>
              </li>

              <li>
                <Link to="/requests" className="gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  My requests
                </Link>
              </li>

              <li className="mt-1 border-t border-base-200 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-error hover:bg-error/10 w-full text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </li>

            </ul>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate("/login")}>Login</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("/signup")}>Sign up</button>
        </div>
      )}

    </div>
  );
};

export default NavBar;