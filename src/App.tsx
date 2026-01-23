import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Overview from './pages/Overview/Overview'
import RunMatchReport from './pages/RunMatchReport/RunMatchReport'
import Connections from './pages/Connections/Connections'
import Intelligence from './pages/Intelligence/Intelligence'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/run" element={<RunMatchReport />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/intelligence" element={<Intelligence />} />
      </Routes>
    </Layout>
  )
}

export default App
