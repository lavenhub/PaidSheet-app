import { useNavigate } from 'react-router-dom';
import { useApp, formatTime } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';

export default function Messages() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar title="Messages" showLogo={false} showBack={false} showRole={false} />

      <main className="pt-20 px-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-[32px] text-on-surface">Inbox</h1>
          <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {state.threads.reduce((s, t) => s + t.unread, 0)}
          </span>
        </div>

        {state.threads.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30">forum</span>
            <p className="font-semibold text-on-surface-variant">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {state.threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => navigate(`/messages/${thread.participantId}`)}
                className="w-full bg-white border border-[#F1F1F1] rounded-xl p-4 flex items-center gap-4 hover:dry-shadow transition-shadow text-left active:scale-[0.99]"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={thread.participantAvatar}
                    alt={thread.participantName}
                    className="w-14 h-14 rounded-full object-cover border border-outline-variant"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(thread.participantName)}&background=ebf0e2&color=236d00`; }}
                  />
                  {thread.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-[9px] text-white font-bold">{thread.unread}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="font-bold text-on-surface">{thread.participantName}</span>
                    <span className="text-xs text-on-surface-variant flex-shrink-0">{formatTime(thread.lastMessageTime)}</span>
                  </div>
                  <p className="font-semibold text-xs text-primary mb-1 uppercase tracking-wide">{thread.taskTitle}</p>
                  <p className={`text-sm truncate ${thread.unread > 0 ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}`}>
                    {thread.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
