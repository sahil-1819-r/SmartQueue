import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import QueueList from '../components/QueueList';
import { getOrganization, getOrgQueues } from '../store/slices/orgSlice';

const OrgPage = () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { selectedOrg, orgQueues } = useSelector((state) => state.org);

  useEffect(() => {
    if (orgId) {
      dispatch(getOrganization(orgId));
      dispatch(getOrgQueues(orgId));
    }
  }, [dispatch, orgId]);

  if (!selectedOrg) {
    return <p>Loading organization...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm uppercase text-slate-500">Organization</p>
        <h1 className="text-3xl font-bold">{selectedOrg.name}</h1>
        <p className="mt-2 text-slate-600">{selectedOrg.description}</p>
        <p className="mt-2 text-sm text-slate-500">{selectedOrg.address}</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Queues</h2>
        <QueueList queues={orgQueues} />
      </section>
    </div>
  );
};

export default OrgPage;

