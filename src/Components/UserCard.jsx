import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const FALLBACK_PHOTO = "https://i.pravatar.cc/400?img=11";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

  .uc-root { font-family: 'DM Sans', sans-serif; }
  .uc-name { font-family: 'DM Serif Display', serif; }
  .uc-mono { font-family: 'DM Mono', monospace; }

  .uc-card {
    position: relative; width: 340px; border-radius: 24px; overflow: hidden;
    background: rgba(15,17,23,0.97);
    border: 1px solid rgba(255,255,255,.08);
    box-shadow: 0 24px 60px rgba(0,0,0,.5);
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .uc-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 36px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(245,158,11,.15);
  }

  /* image overlay gradient */
  .uc-img-wrap { position: relative; height: 280px; overflow: hidden; }
  .uc-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
  .uc-card:hover .uc-img-wrap img { transform: scale(1.04); }
  .uc-img-wrap::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(10,12,18,.95) 100%);
    pointer-events: none;
  }

  /* name block sits over image bottom */
  .uc-name-block {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 20px 22px 16px; z-index: 2;
  }

  .uc-body { padding: 14px 22px 20px; }

  .uc-about {
    color: #64748b; font-size: 13px; line-height: 1.65;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }

  .uc-divider {
    height: 1px; margin: 14px 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
  }

  /* Pass button */
  .uc-btn-pass {
    flex: 1; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
    color: #94a3b8; border-radius: 12px; padding: 11px 0;
    font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: .08em;
    cursor: pointer; transition: all .2s;
  }
  .uc-btn-pass:hover { background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.3); color: #fca5a5; }

  /* Collab button */
  .uc-btn-collab {
    flex: 1; background: #f59e0b; border: none; color: #1a1200;
    border-radius: 12px; padding: 11px 0;
    font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: .08em;
    cursor: pointer; transition: all .2s;
  }
  .uc-btn-collab:hover { background: #fbbf24; box-shadow: 0 0 0 3px rgba(245,158,11,.25); }
  .uc-btn-collab:active { transform: scale(.97); }

  .uc-badge {
    display: inline-block; font-family: 'DM Mono', monospace; font-size: 10px;
    padding: 3px 9px; border-radius: 20px; letter-spacing: .06em;
  }
`;

// ─── Main Component ───────────────────────────────────────────────────────────

const UserCard = ({ user, showActions = false, onAction }) => {
  const dispatch = useDispatch();

  if (!user) return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#475569", fontSize:13, padding:20 }}>
      User not found.
    </div>
  );

  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Anonymous";

  const handleClick = (status) => {
    onAction ? onAction(status, _id) : dispatch(removeUserFromFeed(_id));
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="uc-root uc-card">

        {/* ── Photo + name overlay ── */}
        <div className="uc-img-wrap">
          <img
            src={photoUrl || FALLBACK_PHOTO}
            alt={fullName}
            onError={e => { e.target.src = FALLBACK_PHOTO; }}
          />

          {/* Name block over image */}
          <div className="uc-name-block">
            <p className="uc-mono" style={{ color:"#f59e0b", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", marginBottom:5 }}>
              Developer
            </p>
            <h2 className="uc-name" style={{ color:"#f1f5f9", fontSize:24, lineHeight:1.1, margin:"0 0 8px" }}>
              {fullName}
            </h2>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {age && (
                <span className="uc-badge" style={{ background:"rgba(255,255,255,.08)", color:"#94a3b8", border:"1px solid rgba(255,255,255,.1)" }}>
                  {age} yrs
                </span>
              )}
              {gender && (
                <span className="uc-badge" style={{ background:"rgba(245,158,11,.1)", color:"#fcd34d", border:"1px solid rgba(245,158,11,.2)" }}>
                  {gender}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="uc-body">
          {about && <p className="uc-about">{about}</p>}

          {showActions && (
            <>
              <div className="uc-divider" />
              <div style={{ display:"flex", gap:10 }}>
                <button className="uc-btn-pass"   onClick={() => handleClick("ignored")}>
                  ✕ &nbsp;Pass
                </button>
                <button className="uc-btn-collab" onClick={() => handleClick("interested")}>
                  ✦ &nbsp;Collab
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default UserCard;