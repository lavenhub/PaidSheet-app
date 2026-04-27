import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Auth
import Welcome from './pages/auth/Welcome';
import StudentLogin from './pages/auth/StudentLogin';
import VerifyOtp from './pages/auth/VerifyOtp';
import AccountSetup from './pages/auth/AccountSetup';
import IdVerificationScan from './pages/auth/IdVerificationScan';
import IdVerificationReview from './pages/auth/IdVerificationReview';

// Onboarding
import CampusPrecision from './pages/onboarding/CampusPrecision';
import RoleSelection from './pages/onboarding/RoleSelection';

// Asker
import AskerDashboard from './pages/asker/AskerDashboard';
import PostTaskDetails from './pages/asker/PostTaskDetails';
import PostTaskBudgetTiming from './pages/asker/PostTaskBudgetTiming';
import PostTaskSuccess from './pages/asker/PostTaskSuccess';
import ApplicantReview from './pages/asker/ApplicantReview';
import TaskProgressAsker from './pages/asker/TaskProgressAsker';

// Doer
import DoerTaskFeed from './pages/doer/DoerTaskFeed';
import TaskDetails from './pages/doer/TaskDetails';
import TaskProgressDoer from './pages/doer/TaskProgressDoer';
import SubmitProof from './pages/doer/SubmitProof';
import MyTasks from './pages/doer/MyTasks';

// Shared
import EarningsDashboard from './pages/shared/EarningsDashboard';
import Messages from './pages/shared/Messages';
import Chat from './pages/shared/Chat';
import UserProfile from './pages/shared/UserProfile';
import AccountSettings from './pages/shared/AccountSettings';
import NotificationSettings from './pages/shared/NotificationSettings';
import RaiseDispute from './pages/shared/RaiseDispute';
import DisputeStatus from './pages/shared/DisputeStatus';
import DisputeResolved from './pages/shared/DisputeResolved';
import PaymentSuccess from './pages/shared/PaymentSuccess';
import PaymentFailed from './pages/shared/PaymentFailed';
import RateFeedback from './pages/shared/RateFeedback';

// Protected route
function RequireAuth({ children }) {
  const { state } = useApp();
  if (!state.auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Role gate — redirect based on current role
function RoleGate({ asker, doer }) {
  const { state } = useApp();
  if (state.role === 'asker') return asker;
  return doer;
}

function AppRoutes() {
  const { state } = useApp();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/setup" element={<AccountSetup />} />
      <Route path="/verify-id/scan" element={<IdVerificationScan />} />
      <Route path="/verify-id/review" element={<IdVerificationReview />} />
      <Route path="/campus-precision" element={<CampusPrecision />} />
      <Route path="/role" element={<RoleSelection />} />

      {/* Protected — Asker */}
      <Route path="/asker" element={<RequireAuth><AskerDashboard /></RequireAuth>} />
      <Route path="/post/details" element={<RequireAuth><PostTaskDetails /></RequireAuth>} />
      <Route path="/post/budget" element={<RequireAuth><PostTaskBudgetTiming /></RequireAuth>} />
      <Route path="/post/success" element={<RequireAuth><PostTaskSuccess /></RequireAuth>} />
      <Route path="/task/:id/applicants" element={<RequireAuth><ApplicantReview /></RequireAuth>} />
      <Route path="/task/:id/progress-asker" element={<RequireAuth><TaskProgressAsker /></RequireAuth>} />
      <Route path="/task/:id/review" element={<RequireAuth><TaskProgressAsker /></RequireAuth>} />

      {/* Protected — Doer */}
      <Route path="/feed" element={<RequireAuth><DoerTaskFeed /></RequireAuth>} />
      <Route path="/task/:id" element={<RequireAuth><TaskDetails /></RequireAuth>} />
      <Route path="/task/:id/progress-doer" element={<RequireAuth><TaskProgressDoer /></RequireAuth>} />
      <Route path="/task/:id/proof" element={<RequireAuth><SubmitProof /></RequireAuth>} />
      <Route path="/my-tasks" element={<RequireAuth><MyTasks /></RequireAuth>} />

      {/* Protected — Shared */}
      <Route path="/earnings" element={<RequireAuth><EarningsDashboard /></RequireAuth>} />
      <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />
      <Route path="/messages/:userId" element={<RequireAuth><Chat /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
      <Route path="/profile/:userId" element={<RequireAuth><UserProfile /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><AccountSettings /></RequireAuth>} />
      <Route path="/settings/notifications" element={<RequireAuth><NotificationSettings /></RequireAuth>} />
      <Route path="/task/:id/dispute" element={<RequireAuth><RaiseDispute /></RequireAuth>} />
      <Route path="/disputes/:id" element={<RequireAuth><DisputeStatus /></RequireAuth>} />
      <Route path="/disputes/:id/resolved" element={<RequireAuth><DisputeResolved /></RequireAuth>} />
      <Route path="/payment/success" element={<RequireAuth><PaymentSuccess /></RequireAuth>} />
      <Route path="/payment/failed" element={<RequireAuth><PaymentFailed /></RequireAuth>} />
      <Route path="/task/:id/rate" element={<RequireAuth><RateFeedback /></RequireAuth>} />

      {/* Catch-all */}
      <Route
        path="*"
        element={
          state.auth.isAuthenticated
            ? <Navigate to={state.role === 'asker' ? '/asker' : '/feed'} replace />
            : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
