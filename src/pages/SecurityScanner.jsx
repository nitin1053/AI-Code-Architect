import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Loader2, CheckCircle, XCircle, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'

const SecurityScanner = () => {
  const [code, setCode] = useState('')
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('javascript')

  const handleScan = async () => {
    if (!code.trim()) {
      toast.error('Please enter code to scan')
      return
    }

    setLoading(true)
    setReport('')

    try {
      const result = await grokApi.scanSecurity(code, language)
      setReport(result)
      toast.success('Security scan complete!')
    } catch (error) {
      toast.error(error.message || 'Failed to scan code')
    } finally {
      setLoading(false)
    }
  }

  const exampleCode = `// User login endpoint
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const query = \`SELECT * FROM users WHERE username='\${username}' AND password='\${password}'\`;
  db.query(query, (err, results) => {
    if (results.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  });
});`

  const loadExample = () => {
    setCode(exampleCode)
    setLanguage('javascript')
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
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Security Scanner</h1>
            <p className="text-gray-400">Identify and fix security vulnerabilities before deployment</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Code to Scan</h2>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 text-sm"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="typescript">TypeScript</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
                <button
                  onClick={loadExample}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Load Example
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here for security analysis..."
              className="w-full h-96 bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
            />
            <button
              onClick={handleScan}
              disabled={loading}
              className="btn-primary mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Scan for Vulnerabilities
                </>
              )}
            </button>
          </div>

          <div className="glass-card bg-red-500/10 border-red-500/30">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 text-red-400">Security Best Practices</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Always validate and sanitize user input</li>
                  <li>• Use parameterized queries to prevent SQL injection</li>
                  <li>• Implement proper authentication and authorization</li>
                  <li>• Keep dependencies updated</li>
                  <li>• Encrypt sensitive data in transit and at rest</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              Security Report
            </h2>
            {report ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold mb-4 text-red-400">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-bold mb-3 text-orange-400">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-bold mb-2 text-yellow-400">{children}</h3>,
                    strong: ({children}) => {
                      const text = String(children)
                      if (text.includes('CRITICAL')) {
                        return <strong className="text-red-500">{children}</strong>
                      }
                      if (text.includes('HIGH')) {
                        return <strong className="text-orange-500">{children}</strong>
                      }
                      if (text.includes('MEDIUM')) {
                        return <strong className="text-yellow-500">{children}</strong>
                      }
                      if (text.includes('LOW')) {
                        return <strong className="text-blue-500">{children}</strong>
                      }
                      return <strong className="text-gray-300">{children}</strong>
                    },
                  }}
                >
                  {report}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Security report will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityScanner

