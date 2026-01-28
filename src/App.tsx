import { Routes, Route, Navigate } from 'react-router-dom'
import ParentLayout from './components/layout/ParentLayout'
import TestMatchServiceLayout from './components/TestMatchServiceLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login/Login'
import Callback from './pages/Callback/Callback'
import SelectOrganization from './pages/SelectOrganization/SelectOrganization'
import Home from './pages/Home/Home'
import CorePlatforms from './pages/CorePlatforms/CorePlatforms'
import Overview from './pages/Overview/Overview'
import RunMatchReport from './pages/RunMatchReport/RunMatchReport'
import Connections from './pages/Connections/Connections'
import Intelligence from './pages/Intelligence/Intelligence'
import PreparingMatchReport from './pages/PreparingMatchReport/PreparingMatchReport'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/auth/select-organization" element={<SelectOrganization />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<ParentLayout />}>
          <Route index element={<Home />} />
          <Route path="core-platforms" element={<CorePlatforms />} />
          <Route path="test-match-service/*" element={<TestMatchServiceLayout />}>
            <Route index element={<Overview />} />
            <Route path="run" element={<RunMatchReport />} />
            <Route path="connections" element={<Connections />} />
            <Route path="preparing-report" element={<PreparingMatchReport />} />
            <Route path="intelligence" element={<Intelligence />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
