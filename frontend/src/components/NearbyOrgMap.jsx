import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NearbyOrgMap = ({ orgs = [], center = [0, 0] }) => {
  if (!orgs.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
        No organizations nearby yet. Allow location access or adjust filters.
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-96 w-full rounded-lg shadow-sm"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {orgs.map((org) => (
        <Marker
          key={org._id}
          position={[
            org.location.coordinates[1],
            org.location.coordinates[0],
          ]}
        >
          <Popup>
            <div className="space-y-2">
              <div className="font-semibold">{org.name}</div>
              <p className="text-sm text-slate-500">{org.description}</p>
              <Link
                to={`/orgs/${org._id}`}
                className="text-sm font-medium text-brand"
              >
                View queues →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NearbyOrgMap;

