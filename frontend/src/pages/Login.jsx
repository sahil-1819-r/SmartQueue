import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [tab, setTab] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(form));
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
        {['user', 'org'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTab(type)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              tab === type
                ? 'bg-brand dark:bg-brand-light text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {type === 'user' ? 'User Login' : 'Org / Staff Login'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-brand-dark dark:bg-brand px-5 py-2 text-white hover:bg-brand dark:hover:bg-brand-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
      </form>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Logging in as <strong className="text-slate-700 dark:text-slate-300">{tab === 'user' ? 'queue visitor' : 'org staff'}</strong>
      </p>
    </div>
  );
};

export default Login;

