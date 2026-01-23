import { Outlet } from 'react-router-dom'
import Layout from './layout/Layout'

const TestMatchServiceLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default TestMatchServiceLayout
