import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import AgentDashboard from './pages/agent/AgentDashboardPage';
import AgentDocuments from './pages/agent/AgentDocumentsPage';
import AgentCommissionsPage from './pages/agent/AgentCommissionsPage';
import StudentPipeline from './pages/agent/StudentPipelinePage';
import StudentProfilePage from './pages/agent/StudentProfilePage';
import EduConnectApplication from './pages/agent/ApplicationFormPage';
import CourseDetailsPage from './pages/agent/CourseDetailsPage';
import QuoteBuilderPage from './pages/agent/QuoteBuilderPage';
import QuoteDrawerPage from './pages/agent/QuoteDrawerPage';
import QuickAddStudentPage from './pages/agent/QuickAddStudentPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CoursesPage from './pages/courses/CoursesPage';
import QuotesPage from './pages/quotes/QuotesPage';
import StudentsPage from './pages/students/StudentsPage';
import AdminPage from './pages/admin/AdminPage';
import PortalPage from './pages/portal/PortalPage';
import ProviderPromoRoute from './pages/provider-promo/ProviderPromoPage';
import SchoolAdminDashboard from './pages/school-admin/SchoolAdminDashboardPage';
import SchoolAdminDocuments from './pages/school-admin/SchoolAdminDocumentsPage';
import AppLayout from './components/layout/AppLayout';

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Authenticated routes — routed by role via AppLayout */}
      <Route element={<AppLayout />}>
        {/* General / Admin portal */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/portal" element={<PortalPage />} />

        {/* Agent portal */}
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/commissions" element={<AgentCommissionsPage />} />
        <Route path="/agent/documents" element={<AgentDocuments />} />
        <Route path="/agent/pipeline" element={<StudentPipeline />} />
        <Route path="/agent/schools" element={<PortalPage />} />
        <Route path="/agent/quotes" element={<QuotesPage />} />
        <Route path="/agent/student-profile" element={<StudentProfilePage />} />
        <Route path="/agent/application-form" element={<EduConnectApplication />} />
        <Route path="/agent/course-details" element={<CourseDetailsPage />} />
        <Route path="/agent/quote-builder" element={<QuoteBuilderPage />} />
        <Route path="/agent/quote-drawer" element={<QuoteDrawerPage />} />
        <Route path="/agent/quick-add-student" element={<QuickAddStudentPage />} />
        <Route path="/agent/*" element={<Outlet />} />

        {/* School admin portal */}
        <Route path="/school-admin/dashboard" element={<SchoolAdminDashboard />} />
        <Route path="/school-admin/schools" element={<PortalPage />} />
        <Route path="/school-admin/courses" element={<CoursesPage />} />
        <Route path="/school-admin/students" element={<StudentsPage />} />
        <Route path="/school-admin/documents" element={<SchoolAdminDocuments />} />
        <Route path="/school-admin/finances" element={<QuotesPage />} />
        <Route path="/school-admin/staff" element={<AdminPage />} />
        <Route path="/school-admin/*" element={<Outlet />} />

        {/* Provider admin & course catalog */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/provider-promo" element={<ProviderPromoRoute />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
