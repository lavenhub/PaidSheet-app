import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function TopBar({ title, showBack = false, showLogo = true, showRole = true, showAvatar = true, onBack }) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    navigate(-1);
  };

  const handleSwitchRole = () => {
    dispatch({ type: 'SWITCH_ROLE' });
    if (state.role === 'asker') navigate('/feed');
    else navigate('/asker');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4 dry-shadow">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 hover:bg-[#F1F1F1] rounded-full transition-colors active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </button>
        )}
        {showLogo && !showBack && (
          <span className="text-xl font-extrabold text-[#68B946] tracking-tighter">PaidSheet</span>
        )}
        {title && (
          <h1 className="text-lg font-bold text-on-surface tracking-tight">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {showRole && state.auth.isAuthenticated && (
          <button
            onClick={handleSwitchRole}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant bg-white text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[18px] text-primary-container ms-fill">swap_horiz</span>
            <span className="font-label-sm text-label-sm">
              {state.role === 'asker' ? 'Asker' : 'Doer'}
            </span>
          </button>
        )}
        {showAvatar && state.auth.isAuthenticated && (
          <button onClick={() => navigate('/profile')} className="active:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
              <img
                src={state.user.avatar}
                alt={state.user.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=68b946&color=fff`; }}
              />
            </div>
          </button>
        )}
      </div>
    </header>
  );
}
