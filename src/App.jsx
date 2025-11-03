import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CodeAnalyzer from './pages/CodeAnalyzer'
import CodeGenerator from './pages/CodeGenerator'
import BugDetector from './pages/BugDetector'
import TestGenerator from './pages/TestGenerator'
import CodeRefactor from './pages/CodeRefactor'
import SecurityScanner from './pages/SecurityScanner'
import CodeExplain from './pages/CodeExplain'
import Metrics from './pages/Metrics'

// Layout component to wrap routes with Navbar
function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
        }}
      />
    </div>
  )
}

// Create router with future flags to suppress warnings
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'analyze', element: <CodeAnalyzer /> },
      { path: 'generate', element: <CodeGenerator /> },
      { path: 'bug-detector', element: <BugDetector /> },
      { path: 'test-generator', element: <TestGenerator /> },
      { path: 'refactor', element: <CodeRefactor /> },
      { path: 'security', element: <SecurityScanner /> },
      { path: 'explain', element: <CodeExplain /> },
      { path: 'metrics', element: <Metrics /> },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
})

function App() {
  return <RouterProvider router={router} />
}

export default App
