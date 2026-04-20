import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

// ─── Styles ───────────────────────────────────────────────────────────────────

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ep { font-family: 'DM Sans', sans-serif; }
  .ep-serif { font-family: 'DM Serif Display', serif; }
  .ep-mono  { font-family: 'DM Mono', monospace; }

  .ep-page {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 55% 45% at 85% 0%,  rgba(245,158,11,.1)  0%, transparent 60%),
      radial-gradient(ellipse 40% 55% at 5%  95%, rgba(6,182,212,.07)  0%, transparent 60%),
      #0a0c12;
  }

  .ep-card {
    background: rgba(15,17,23,.97);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 20px;
    box-shadow: 0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.03);
  }

  .ep-input, .ep-select {
    width: 100%; box-sizing: border-box;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 10px; color: #e2e8f0;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px;
    padding: 10px 14px; outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .ep-input::placeholder { color: #334155; }
  .ep-input:focus, .ep-select:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245,158,11,.14);
  }
  .ep-select option { background: #0f1117; color: #e2e8f0; }
  .ep-textarea { resize: vertical; min-height: 88px; }

  .ep-label { font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #475569; display: block; margin-bottom: 6px; }

  .ep-btn-save {
    width: 100%; background: #f59e0b; color: #1a1200; border: none;
    border-radius: 10px; font-family: 'DM Mono', monospace;
    font-size: 12px; font-weight: 600; letter-spacing: .08em;
    padding: 13px; cursor: pointer; transition: all .2s;
  }
  .ep-btn-save:hover    { background: #fbbf24; box-shadow: 0 0 0 4px rgba(245,158,11,.2); }
  .ep-btn-save:active   { transform: scale(.98); }
  .ep-btn-save:disabled { opacity: .5; cursor: not-allowed; }

  .ep-btn-cancel {
    width: 100%; background: transparent; color: #64748b;
    border: 1px solid rgba(255,255,255,.08); border-radius: 10px;
    font-family: 'DM Mono', monospace; font-size: 12px;
    letter-spacing: .08em; padding: 13px; cursor: pointer; transition: all .2s;
  }
  .ep-btn-cancel:hover { border-color: rgba(255,255,255,.2); color: #94a3b8; }

  .ep-divider { height:1px; margin: 0 24px; background: linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent); }

  .ep-section { display:flex; align-items:center; gap:10px; margin-bottom:18px; }
  .ep-section-tag   { font-family:'DM Mono',monospace; font-size:10px; color:#f59e0b; letter-spacing:.2em; text-transform:uppercase; }
  .ep-section-title { font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:#475569; }
  .ep-section-line  { flex:1; height:1px; background:linear-gradient(90deg,rgba(255,255,255,.07),transparent); }

  .ep-avatar-ring {
    background: conic-gradient(from 180deg,#f59e0b,#ef4444,#8b5cf6,#06b6d4,#f59e0b);
    animation: ep-spin 6s linear infinite; border-radius:50%; padding:2.5px;
  }
  @keyframes ep-spin { to { transform: rotate(360deg); } }

  .ep-error { font-family:'DM Mono',monospace; font-size:11px; color:#fca5a5; background:rgba(220,38,38,.1); border:1px solid rgba(220,38,38,.2); border-radius:8px; padding:10px 14px; }

  .ep-toast {
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:#064e3b; border:1px solid #065f46; color:#6ee7b7;
    font-family:'DM Mono',monospace; font-size:12px; letter-spacing:.06em;
    padding:12px 28px; border-radius:12px; z-index:999;
    animation:ep-toast-in .3s ease;
  }
  @keyframes ep-toast-in {
    from { opacity:0; transform:translateX(-50%) translateY(10px); }
    to   { opacity:1; transform:translateX(-50%) translateY(0); }
  }

  .ep-fade { animation: ep-up .45s ease both; }
  .ep-fade:nth-child(2) { animation-delay:.08s; }
  .ep-fade:nth-child(3) { animation-delay:.16s; }
  .ep-fade:nth-child(4) { animation-delay:.24s; }
  @keyframes ep-up { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);} }
`;

// ─── Small Helpers ────────────────────────────────────────────────────────────

const SectionHeader = ({ tag, title }) => (
  <div className="ep-section">
    <span className="ep-section-tag">{tag}</span>
    <span className="ep-section-title">{title}</span>
    <div className="ep-section-line" />
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="ep-label">{label}</label>
    {children}
  </div>
);

const AvatarPreview = ({ photoUrl, firstName, lastName }) => {
  const name = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, padding:14, background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)", borderRadius:12, marginBottom:20 }}>
      <div className="ep-avatar-ring" style={{ width:56, height:56, flexShrink:0 }}>
        <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#0f1117" }}>
          <img
            src={photoUrl || "https://i.pravatar.cc/150?img=11"}
            alt="preview"
            onError={e => { e.target.src = "https://i.pravatar.cc/150?img=11"; }}
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
          />
        </div>
      </div>
      <div>
        <p className="ep-serif" style={{ color:"#f1f5f9", fontSize:18, margin:"0 0 3px" }}>{name}</p>
        <p className="ep-mono" style={{ color:"#475569", fontSize:10 }}>Avatar preview</p>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const EditProfile = ({ user }) => {
  const [firstName,  setFirstName]  = useState(user.firstName);
  const [lastName,   setLastName]   = useState(user.lastName);
  const [age,        setAge]        = useState(user.age);
  const [gender,     setGender]     = useState(user.gender);
  const [about,      setAbout]      = useState(user.about);
  const [photoUrl,   setPhotoUrl]   = useState(user.photoUrl);
  const [error,      setError]      = useState("");
  const [saving,     setSaving]     = useState(false);
  const [showToast,  setShowToast]  = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => { setShowToast(false); navigate("/app"); }, 2000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      {showToast && <div className="ep-toast">✓ &nbsp;Profile updated successfully</div>}

      <div className="ep ep-page" style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", padding:"40px 20px 80px" }}>
        <div style={{ width:"100%", maxWidth:960, display:"flex", gap:32, alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* ── Left: Form ── */}
          <div style={{ flex:"1 1 400px", minWidth:300 }}>

            <div className="ep-fade" style={{ marginBottom:24 }}>
              <p className="ep-mono" style={{ color:"#f59e0b", letterSpacing:".22em", textTransform:"uppercase", fontSize:10, marginBottom:8 }}>DevTinder</p>
              <h1 className="ep-serif" style={{ color:"#f1f5f9", fontSize:30, margin:0, lineHeight:1.1 }}>Edit Profile</h1>
            </div>

            <div className="ep-card ep-fade">

              {/* 01 — Identity */}
              <div style={{ padding:"24px 24px 20px" }}>
                <SectionHeader tag="01" title="Identity" />
                <AvatarPreview photoUrl={photoUrl} firstName={firstName} lastName={lastName} />

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                  <Field label="First Name">
                    <input className="ep-input" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Alex" />
                  </Field>
                  <Field label="Last Name">
                    <input className="ep-input" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Rivera" />
                  </Field>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <Field label="Age">
                    <input className="ep-input" type="number" min="16" max="99" value={age} onChange={e => setAge(e.target.value)} placeholder="24" />
                  </Field>
                  <Field label="Gender">
                    <select className="ep-select" value={gender} onChange={e => setGender(e.target.value)}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div className="ep-divider" />

              {/* 02 — Photo */}
              <div style={{ padding:"20px 24px" }}>
                <SectionHeader tag="02" title="Photo" />
                <Field label="Photo URL">
                  <input className="ep-input" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://…" />
                </Field>
              </div>

              <div className="ep-divider" />

              {/* 03 — About */}
              <div style={{ padding:"20px 24px" }}>
                <SectionHeader tag="03" title="About" />
                <Field label="Bio">
                  <textarea className="ep-input ep-textarea" value={about} onChange={e => setAbout(e.target.value)} placeholder="Tell other developers who you are…" />
                </Field>
              </div>

              <div className="ep-divider" />

              {/* Actions */}
              <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:10 }}>
                {error && <div className="ep-error">{error}</div>}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:10 }}>
                  <button className="ep-btn-cancel" onClick={() => navigate(-1)}>← Cancel</button>
                  <button className="ep-btn-save" onClick={saveProfile} disabled={saving}>
                    {saving ? "Saving…" : "Save Profile"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── Right: Live UserCard Preview ── */}
          <div style={{ flex:"0 0 auto", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:72 }}>
            <p className="ep-mono" style={{ color:"#f59e0b", fontSize:10, letterSpacing:".2em", textTransform:"uppercase", marginBottom:14 }}>
              Live Preview
            </p>
            <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
          </div>

        </div>
      </div>
    </>
  );
};

export default EditProfile;