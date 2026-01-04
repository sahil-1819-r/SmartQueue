import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router";
import { Users } from "lucide-react";
import api from  "../../api.js";
import { Mycontext } from "../Mycontext.jsx";

const Hub = () => {
  const {theme} = useContext(Mycontext);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/hub");
      setServices(res.data);
    };
    load();
  }, []);

  return (
    <div className={` h-screen    w-100vw pt-24 p-20 ${theme==='dark'?'bg-[#0b0f14]':'bg-white border-slate-200'}`}>
      <h1 className={ ` ${theme==='dark'?'text-amber-50':'text-black'}  text-4xl font-bold mb-12` }>Available Queues</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
        {services.map(service => (
          <div
            key={service._id}
            onClick={() => navigate(`/queue/${service._id}`)}
            className={`cursor-pointer rounded-3xl border p-8 transition-all hover:-translate-y-1 shadow-4xl  ${theme==='dark'?'border-[#1f2937] bg-[#08101a] shadow-blue-500 ':'bg-white shadow-black border-slate-400'}`}
          >
            <h2 className={` ${theme==='dark'?'text-amber-50':'text-black'}  text-xl font-bold mb-3`}>
              {service.name}
            </h2>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </span>
              <span className="flex items-center gap-2">
                <Users size={14} /> Live Queue
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hub;
