import { Routes, Route } from 'react-router-dom'
import ParentLayout from './components/layout/ParentLayout'
import TestMatchServiceLayout from './components/TestMatchServiceLayout'
import Home from './pages/Home/Home'
import CorePlatforms from './pages/CorePlatforms/CorePlatforms'
import Overview from './pages/Overview/Overview'
import RunMatchReport from './pages/RunMatchReport/RunMatchReport'
import Connections from './pages/Connections/Connections'
import Intelligence from './pages/Intelligence/Intelligence'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ParentLayout />}>
        <Route index element={<Home />} />
        <Route path="core-platforms" element={<CorePlatforms />} />
        <Route path="test-match-service/*" element={<TestMatchServiceLayout />}>
          <Route index element={<Overview />} />
          <Route path="run" element={<RunMatchReport />} />
          <Route path="connections" element={<Connections />} />
          <Route path="intelligence" element={<Intelligence />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
