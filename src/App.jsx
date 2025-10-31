import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CodeAnalyzer from './pages/CodeAnalyzer'
import CodeGenerator from './pages/CodeGenerator'
import BugDetector from './pages/BugDetector'
import TestGenerator from './pages/TestGenerator'
import Metrics from './pages/Metrics'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<CodeAnalyzer />} />
            <Route path="/generate" element={<CodeGenerator />} />
            <Route path="/bug-detector" element={<BugDetector />} />
            <Route path="/test-generator" element={<TestGenerator />} />
            <Route path="/metrics" element={<Metrics />} />
          </Routes>
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
    </Router>
  )
}

export default App
