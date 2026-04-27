import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  CURRENT_USER, MOCK_TASKS, MY_POSTED_TASKS,
  MOCK_EARNINGS, MOCK_THREADS, MOCK_DISPUTES, ASKER_HISTORY, MOCK_USERS
} from './mockData';

const AppContext = createContext(null);

const initialState = {
  auth: {
    isAuthenticated: false,
    email: '',
    otpVerified: false,
    idVerified: false,
    campusVerified: false,
    setupComplete: false,
  },
  user: CURRENT_USER,
  role: 'doer', // 'asker' | 'doer'
  tasks: MOCK_TASKS,
  myPostedTasks: MY_POSTED_TASKS,
  earnings: MOCK_EARNINGS,
  threads: MOCK_THREADS,
  disputes: MOCK_DISPUTES,
  askerHistory: ASKER_HISTORY,
  allUsers: MOCK_USERS,
  notifications: {
    taskUpdates: true,
    newApplicants: true,
    messages: true,
    payments: true,
    promotions: false,
    emailDigest: true,
  },
};

function reducer(state, action) {
  switch (action.type) {
    // Auth
    case 'SET_EMAIL':
      return { ...state, auth: { ...state.auth, email: action.payload } };
    case 'SET_OTP_VERIFIED':
      return { ...state, auth: { ...state.auth, otpVerified: true } };
    case 'SET_ID_VERIFIED':
      return { ...state, auth: { ...state.auth, idVerified: true } };
    case 'SET_CAMPUS_VERIFIED':
      return { ...state, auth: { ...state.auth, campusVerified: true } };
    case 'COMPLETE_SETUP':
      return {
        ...state,
        auth: { ...state.auth, setupComplete: true, isAuthenticated: true },
        user: { ...state.user, ...action.payload },
      };
    case 'LOGIN':
      return { ...state, auth: { ...state.auth, isAuthenticated: true } };
    case 'LOGOUT':
      return {
        ...state,
        auth: { ...initialState.auth },
      };

    // Role
    case 'SWITCH_ROLE':
      return {
        ...state,
        role: state.role === 'asker' ? 'doer' : 'asker',
        user: { ...state.user, role: state.role === 'asker' ? 'doer' : 'asker' },
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload, user: { ...state.user, role: action.payload } };

    // Tasks
    case 'ADD_TASK': {
      const newTask = {
        id: `t${Date.now()}`,
        ...action.payload,
        status: 'open',
        postedAt: new Date().toISOString(),
        askerId: state.user.id,
        askerName: state.user.name,
        askerAvatar: state.user.avatar,
        applicants: [],
        assignedDoerId: null,
        proof: null,
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
        myPostedTasks: [{ ...newTask, applicantsCount: 0 }, ...state.myPostedTasks],
      };
    }
    case 'APPLY_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.taskId
            ? { ...t, applicants: [...t.applicants, action.payload.userId] }
            : t
        ),
      };
    }
    case 'HIRE_DOER': {
      const { taskId, doerId, doerName } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, status: 'assigned', assignedDoerId: doerId } : t
        ),
        myPostedTasks: state.myPostedTasks.map(t =>
          t.id === taskId ? { ...t, status: 'assigned', assignedDoerName: doerName } : t
        ),
      };
    }
    case 'SUBMIT_PROOF': {
      const { taskId, proof } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, status: 'pending_review', proof } : t
        ),
      };
    }
    case 'APPROVE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, status: 'complete' } : t
        ),
        myPostedTasks: state.myPostedTasks.map(t =>
          t.id === action.payload ? { ...t, status: 'complete' } : t
        ),
        earnings: {
          ...state.earnings,
          total: state.earnings.total + (state.tasks.find(t => t.id === action.payload)?.payout || 0),
          completedCount: state.earnings.completedCount + 1,
        },
      };
    }
    case 'RAISE_DISPUTE': {
      const { taskId, ...rest } = action.payload;
      const newDispute = {
        id: `d${Date.now()}`,
        taskId,
        status: 'under_review',
        raisedAt: new Date().toISOString(),
        respondedAt: null,
        resolution: null,
        ...rest,
      };
      return {
        ...state,
        disputes: [newDispute, ...state.disputes],
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, status: 'disputed' } : t
        ),
      };
    }

    // Profile
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };

    // Notifications
    case 'TOGGLE_NOTIFICATION': {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.payload]: !state.notifications[action.payload],
        },
      };
    }

    // Messages
    case 'SEND_MESSAGE': {
      const { threadId, text } = action.payload;
      const newMsg = {
        id: `m${Date.now()}`,
        senderId: state.user.id,
        text,
        time: new Date().toISOString(),
      };
      return {
        ...state,
        threads: state.threads.map(t =>
          t.id === threadId
            ? { ...t, messages: [...t.messages, newMsg], lastMessage: text, lastMessageTime: newMsg.time, unread: 0 }
            : t
        ),
      };
    }

    default:
      return state;
  }
}

const STORAGE_KEY = 'paidsheet_state';

export function AppProvider({ children }) {
  const stored = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  })();

  const [state, dispatch] = useReducer(reducer, stored || initialState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { /* quota exceeded */ }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

// Helpers
export function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
