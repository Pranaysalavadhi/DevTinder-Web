import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate , Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [form, setForm] = useState({ emailId: "rahul@gmail.com", password: "Rahul@123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post( BASE_URL + "/login", form, { withCredentials: true });
      dispatch(addUser(data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
        .shake { animation: shake 0.5s ease; }
      `}</style>

      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className={`card bg-base-100 w-full max-w-sm shadow-xl rounded-2xl ${shake ? "shake" : ""}`}>
          <div className="card-body gap-4 p-8">

            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">Welcome back</h1>
              <p className="text-base-content/60 text-sm">Sign in to your account</p>
            </div>

            {error && (
              <div className="alert alert-error text-sm py-2">{error}</div>
            )}

            {[
              { label: "Email", name: "emailId", type: "email", placeholder: "you@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="form-control gap-1">
                <label className="label py-0">
                  <span className="label-text font-medium">{label}</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  placeholder={placeholder}
                  className="input input-bordered w-full focus:input-primary transition-all"
                  onChange={handleChange}
                />
              </div>
            ))}

            <button className="btn btn-primary w-full mt-2" onClick={handleLogin} disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign in"}
            </button>

            <p className="text-center text-sm text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">Create one</Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;