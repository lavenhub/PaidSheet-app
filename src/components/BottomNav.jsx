import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ASKER_NAV = [
  { to: '/asker', icon: 'dashboard', label: 'Dashboard' },
  { to: '/post/details', icon: 'add_box', label: 'Post' },
  { to: '/messages', icon: 'mail', label: 'Inbox' },
  { to: '/profile', icon: 'person', label: 'Profile' },
];

const DOER_NAV = [
  { to: '/feed', icon: 'home', label: 'Home' },
  { to: '/my-tasks', icon: 'assignment', label: 'Tasks' },
  { to: '/messages', icon: 'chat_bubble', label: 'Chat' },
  { to: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const { state } = useApp();
  const navigate = useNavigate();
  const nav = state.role === 'asker' ? ASKER_NAV : DOER_NAV;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-[#F1F1F1] flex justify-around items-center h-16 px-2 dry-shadow">
      {nav.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-all duration-150 ${
              isActive
                ? 'text-[#68B946] bg-[#D9EAD3]'
                : 'text-zinc-400 hover:text-zinc-700'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-[22px] ${isActive ? 'ms-fill' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
