import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const INITIAL_FORM = { firstName: "", lastName: "", emailId: "", password: "" };

const InputField = ({ label, id, name, type = "text", placeholder, value, onChange, icon: Icon, children }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-[10px] font-semibold tracking-widest uppercase text-zinc-500">
      {label}
    </label>
    <div className="relative group">
      <Icon aria-hidden className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-400 transition-colors" />
      <input
        id={id} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} autoComplete={name}
        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 hover:border-white/20 transition-all"
      />
      {children}
    </div>
  </div>
);

export default function Login() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let res;
      if (isLogin) {
        res = await axios.post(BASE_URL + "/login", { emailId: form.emailId, password: form.password }, { withCredentials: true });
        dispatch(addUser(res.data.data));
      } else {
        res = await axios.post(BASE_URL + "/signup", form, { withCredentials: true });
        dispatch(addUser(res.data.data));
      }
      navigate("/app/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080810] px-4 text-white font-sans">
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        .shake { animation: shake 0.4s ease; }
        .glass { background:rgba(255,255,255,0.03); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.08); }
      `}</style>

      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className={`w-full max-w-md ${shake ? "shake" : ""}`}>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">{isLogin ? "Welcome back" : "Create account"}</h1>
          <p className="text-zinc-500 text-sm mt-1">{isLogin ? "Sign in to your workspace" : "Join our community today"}</p>
        </div>

        {/* Toggle */}
        <div className="relative flex bg-white/5 border border-white/5 rounded-2xl p-1 mb-5">
          <div className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white rounded-xl shadow transition-transform duration-300 ${isLogin ? "translate-x-0" : "translate-x-[calc(100%+8px)]"}`} />
          {["Log In", "Sign Up"].map((label, i) => (
            <button key={label} type="button" onClick={() => { setIsLogin(i === 0); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold z-10 transition-colors cursor-pointer ${isLogin === (i === 0) ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-black/30">
          {error && (
            <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <InputField label="First Name" id="firstName" name="firstName" placeholder="Jane" value={form.firstName} onChange={handleChange} icon={User} />
                <InputField label="Last Name" id="lastName" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} icon={User} />
              </div>
            )}

            <InputField label="Email" id="emailId" name="emailId" type="email" placeholder="name@company.com" value={form.emailId} onChange={handleChange} icon={Mail} />

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock aria-hidden className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-400 transition-colors" />
                <input
                  id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                  value={form.password} onChange={handleChange} autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 hover:border-white/20 transition-all"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-zinc-900 font-semibold text-sm py-3.5 rounded-xl hover:bg-zinc-100 active:scale-[0.98] disabled:opacity-50 transition-all group mt-2 cursor-pointer">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>{isLogin ? "Sign In" : "Create Account"}</span><ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="" />, label: "Google" },
              { icon: <User className="w-4 h-4" />, label: "Guest" },
            ].map(({ icon, label }) => (
              <button key={label} type="button"
                className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition-all cursor-pointer">
                {icon}{label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center mt-5 text-zinc-600 text-xs">
          By continuing, you agree to our <span className="text-zinc-400 font-semibold cursor-pointer hover:text-white transition-colors">Terms of Service</span>
        </p>
      </div>
    </div>
  );
}