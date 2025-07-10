import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast("You are successfully signed out");
      })
      .catch();
  };

  return (
    <div className="navbar bg-base-100 shadow-xl mb-4 rounded-xl">
      <div className="navbar-start">
        <Link to="/">
          <p className="md:text-3xl px-7 text-xl font-semibold md:font-bold text-cyan-800">
            DonateBlood
          </p>
        </Link>
        <NavLink
          to="/"
          className="text-cyan-500 font-bold pe-3"
          activeClassName="active underline text-cyan-800 font-bold pe-3"
        >
          Home
        </NavLink>
        <NavLink
          to="/admin"
          className="text-cyan-500 font-bold pe-3"
          activeClassName="active underline text-cyan-800 font-bold pe-3"
        >
          Admin
        </NavLink>
        <NavLink
          to="/more"
          className="text-cyan-500 font-bold pe-3"
          activeClassName="active underline text-cyan-800 font-bold pe-3"
        >
          More
        </NavLink>
      </div>

      <div className="navbar-end">
        {user && (
          <div className="flex items-center">
            <p className="pe-3">{user.displayName}</p>
            <p className="pe-3">
              <img
                className="rounded-full w-10 h-10"
                src={user.photoURL}
                alt=""
              />
            </p>
          </div>
        )}

        {user ? (
          <button
            onClick={handleSignOut}
            className="btn text-cyan-800 font-bold pe-3"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "active underline text-cyan-800 font-bold pe-3"
                : "text-cyan-500 font-bold pe-3"
            }
          >
            Login
          </NavLink>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
