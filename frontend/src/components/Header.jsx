import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import ThemeToggle from './ThemeToggle';

const navClasses = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
    isActive
      ? 'text-brand dark:text-brand-light bg-brand/10 dark:bg-brand/20'
      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-brand dark:text-brand-light transition-colors duration-200"
        >
          SmartQueue
        </NavLink>
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={navClasses}>
            Home
          </NavLink>
          {!user && (
            <>
              <NavLink to="/login" className={navClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClasses}>
                Register
              </NavLink>
            </>
          )}
          {user && (
            <>
              {user.role === 'orgOwner' && (
                <NavLink to="/dashboard/org" className={navClasses}>
                  Org Dashboard
                </NavLink>
              )}
              {(user.role === 'staff' || user.role === 'orgOwner') && (
                <NavLink to="/dashboard/staff" className={navClasses}>
                  Staff
                </NavLink>
              )}
              {user.role === 'user' && (
                <NavLink to="/dashboard/user" className={navClasses}>
                  My Queue
                </NavLink>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-slate-900 dark:bg-slate-700 px-3 py-2 text-sm font-medium text-white dark:text-slate-100 hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;

