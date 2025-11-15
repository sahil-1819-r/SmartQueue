import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerOrgAccount,
  registerUserAccount,
} from '../store/slices/authSlice';

const Register = () => {
  const [tab, setTab] = useState('user');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [orgForm, setOrgForm] = useState({
    orgName: '',
    description: '',
    address: '',
    lat: '',
    lng: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrgChange = (event) => {
    const { name, value } = event.target;
    setOrgForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (tab === 'user') {
      await dispatch(registerUserAccount(userForm));
    } else {
      await dispatch(
        registerOrgAccount({
          ...orgForm,
          location: {
            type: 'Point',
            coordinates: [Number(orgForm.lng), Number(orgForm.lat)],
          },
        })
      );
    }
  };

  const renderUserForm = () => (
    <div className="space-y-4">
      {['firstName', 'lastName', 'email', 'password'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 capitalize">
            {field}
          </label>
          <input
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={userForm[field]}
            onChange={handleUserChange}
            required
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
          />
        </div>
      ))}
    </div>
  );

  const renderOrgForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
          Organization name
        </label>
        <input
          name="orgName"
          value={orgForm.orgName}
          onChange={handleOrgChange}
          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          value={orgForm.description}
          onChange={handleOrgChange}
          rows={3}
          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            Latitude
          </label>
          <input
            name="lat"
            value={orgForm.lat}
            onChange={handleOrgChange}
            type="number"
            step="0.0001"
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            Longitude
          </label>
          <input
            name="lng"
            value={orgForm.lng}
            onChange={handleOrgChange}
            type="number"
            step="0.0001"
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
          Address
        </label>
        <input
          name="address"
          value={orgForm.address}
          onChange={handleOrgChange}
          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {['firstName', 'lastName', 'email', 'password'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 capitalize">
              Owner {field}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={orgForm[field]}
              onChange={handleOrgChange}
              required
              className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
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
            {type === 'user' ? 'User' : 'Organization'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === 'user' ? renderUserForm() : renderOrgForm()}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-md bg-brand-dark dark:bg-brand px-5 py-2 text-white hover:bg-brand dark:hover:bg-brand-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Submitting...' : 'Create account'}
        </button>
        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default Register;

