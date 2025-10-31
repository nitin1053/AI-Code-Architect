import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bug, AlertTriangle, Loader2, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'

const BugDetector = () => {
  const [code, setCode] = useState('')
  const [bugs, setBugs] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDetect = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze')
      return
    }

    setLoading(true)
    setBugs('')

    try {
      const result = await grokApi.detectBugs(code)
      setBugs(result)
      toast.success('Bug detection complete!')
    } catch (error) {
      toast.error(error.message || 'Failed to detect bugs')
    } finally {
      setLoading(false)
    }
  }

  const exampleBugs = `function UserComponent() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // BUG: Missing dependency array
    fetch('/api/users').then(res => res.json()).then(data => setUsers(data));
  });
  
  const handleClick = () => {
    // BUG: No null check before accessing properties
    console.log(users.first.name);
  };
  
  return (
    <div onClick={handleClick}>
      {users.map(user => <div>{user.name}</div>)}
    </div>
  );
}

// BUG: Potential memory leak
window.addEventListener('resize', () => {
  console.log('Resized');
});`

  const loadExample = () => {
    setCode(exampleBugs)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
            <Bug className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Bug Detector</h1>
            <p className="text-gray-400">Find and fix bugs before they reach production</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Code</h2>
              <button
                onClick={loadExample}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Load Example
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here to detect potential bugs..."
              className="w-full h-96 bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
            />
            <button
              onClick={handleDetect}
              disabled={loading}
              className="btn-primary mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Detecting...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  Detect Bugs
                </>
              )}
            </button>
          </div>

          <div className="glass-card bg-red-500/10 border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 text-red-400">Security Warning</h3>
                <p className="text-sm text-gray-400">
                  This tool analyzes code for potential vulnerabilities. Always review security implications carefully before deployment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              Bug Report
            </h2>
            {bugs ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold mb-4 text-red-400">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-bold mb-3 text-orange-400">{children}</h2>,
                    strong: ({children}) => <strong className="text-red-400">{children}</strong>,
                  }}
                >
                  {bugs}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Bug className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Bug report will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BugDetector
