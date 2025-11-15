import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NearbyOrgMap from '../components/NearbyOrgMap';
import useGeoLocation from '../hooks/useGeoLocation';
import { getNearbyOrgs } from '../store/slices/orgSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { coords, loading: geoLoading, error, requestLocation } =
    useGeoLocation();
  const { nearby, status } = useSelector((state) => state.org);

  useEffect(() => {
    if (coords) {
      dispatch(getNearbyOrgs(coords));
    }
  }, [coords, dispatch]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <p className="text-sm font-semibold uppercase text-brand dark:text-brand-light">
          Geospatial discovery
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
          Skip the line. Join smart, real-time queues around you.
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          SmartQueue surfaces nearby organizations, lets you join with one tap,
          and keeps everyone in sync with live now-serving updates.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/register"
            className="rounded-md bg-brand-dark dark:bg-brand px-5 py-2 text-white hover:bg-brand dark:hover:bg-brand-light transition-colors duration-200"
          >
            Get started
          </Link>
          <button
            type="button"
            onClick={requestLocation}
            className="rounded-md border border-slate-300 dark:border-slate-700 px-5 py-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            {geoLoading ? 'Locating...' : 'Refresh nearby orgs'}
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-red-500 dark:text-red-400">{error}</p>}
        <div className="mt-6 flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Realtime</p>
            <p>Socket-driven updates for staff and users.</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Analytics</p>
            <p>Measure wait times, satisfaction, and throughput.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Nearby organizations
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {status === 'loading' ? 'Searching...' : `${nearby.length} found`}
          </span>
        </div>
        <NearbyOrgMap
          orgs={nearby}
          center={
            coords ? [coords.lat, coords.lng] : [37.7749, -122.4194]
          }
        />
      </section>
    </div>
  );
};

export default Home;

