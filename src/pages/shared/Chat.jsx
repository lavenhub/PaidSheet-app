import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp, formatTime } from '../../context/AppContext';

export default function Chat() {
  const { userId } = useParams();
  const { state } = useApp(); // Static view — no dispatch for messages per spec
  const navigate = useNavigate();
  const bottomRef = useRef();

  const thread = state.threads.find(t => t.participantId === userId) || state.threads[0];
  const [input, setInput] = useState('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread?.messages]);

  if (!thread) return (
    <div className="pt-24 px-4 text-center">
      <p className="text-on-surface-variant">Conversation not found.</p>
      <button onClick={() => navigate('/messages')} className="mt-4 text-primary font-semibold">Back</button>
    </div>
  );

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center px-4 dry-shadow">
        <button onClick={() => navigate('/messages')} className="p-2 hover:bg-zinc-100 rounded-full mr-3 active:scale-95">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <img
          src={thread.participantAvatar}
          alt={thread.participantName}
          className="w-10 h-10 rounded-full object-cover border border-outline-variant mr-3"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(thread.participantName)}&background=ebf0e2&color=236d00`; }}
        />
        <div>
          <p className="font-bold text-on-surface text-sm">{thread.participantName}</p>
          <p className="text-xs text-primary font-semibold">{thread.taskTitle}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 pt-20 pb-24 px-4 max-w-2xl mx-auto w-full overflow-y-auto space-y-3">
        {thread.messages.map(msg => {
          const isMe = msg.senderId === state.user.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <img
                  src={thread.participantAvatar}
                  alt={thread.participantName}
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 self-end border border-outline-variant"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(thread.participantName)}&background=ebf0e2&color=236d00`; }}
                />
              )}
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${isMe ? 'bg-primary text-white rounded-br-md' : 'bg-white border border-[#F1F1F1] text-on-surface rounded-bl-md dry-shadow'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 font-semibold ${isMe ? 'text-white/70 text-right' : 'text-on-surface-variant'}`}>
                  {formatTime(msg.time)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input (static display only as per spec) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#F1F1F1] px-4 py-3 flex items-center gap-3 dry-shadow">
        <div className="flex-1 bg-surface-container-low rounded-full px-4 py-2.5 flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant"
            readOnly
          />
          <button className="text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
          </button>
        </div>
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-surface-tint transition-colors active:scale-95">
          <span className="material-symbols-outlined text-[20px] ms-fill">send</span>
        </button>
      </div>
    </div>
  );
}
