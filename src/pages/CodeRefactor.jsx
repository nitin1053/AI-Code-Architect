import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Sparkles, Loader2, Download, Copy, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeRefactor = () => {
  const [code, setCode] = useState('')
  const [refactoredCode, setRefactoredCode] = useState('')
  const [improvements, setImprovements] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('javascript')
  const [copied, setCopied] = useState(false)

  const handleRefactor = async () => {
    if (!code.trim()) {
      toast.error('Please enter code to refactor')
      return
    }

    setLoading(true)
    setRefactoredCode('')
    setImprovements('')

    try {
      const result = await grokApi.refactorCode(code, language)
      
      // Parse the response to extract code and improvements
      const codeMatch = result.match(/```[\w]*\n([\s\S]*?)```/)
      if (codeMatch) {
        setRefactoredCode(codeMatch[1])
        setImprovements(result.replace(/```[\w]*\n[\s\S]*?```/g, '').trim())
      } else {
        setRefactoredCode('')
        setImprovements(result)
      }
      
      toast.success('Code refactored successfully!')
    } catch (error) {
      toast.error(error.message || 'Failed to refactor code')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (refactoredCode) {
      navigator.clipboard.writeText(refactoredCode)
      setCopied(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (refactoredCode) {
      const blob = new Blob([refactoredCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `refactored-code.${language === 'javascript' ? 'js' : language}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Code downloaded!')
    }
  }

  const exampleCode = `function processData(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].active && data[i].value > 10) {
      result.push(data[i].value * 2);
    }
  }
  return result;
}`

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
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">AI Code Refactor</h1>
            <p className="text-gray-400">Transform your code into production-ready, maintainable solutions</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Original Code</h2>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-sm"
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
              placeholder="Paste your code here to refactor..."
              className="w-full h-96 bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
            <button
              onClick={handleRefactor}
              disabled={loading}
              className="btn-primary mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Refactoring...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Refactor Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {refactoredCode && (
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Refactored Code</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    title="Copy code"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    title="Download code"
                  >
                    <Download className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                >
                  {refactoredCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {improvements && (
            <div className="glass-card">
              <h2 className="text-xl font-bold mb-4">Improvements Made</h2>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{improvements}</ReactMarkdown>
              </div>
            </div>
          )}

          {!refactoredCode && !loading && (
            <div className="glass-card">
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <RefreshCw className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Refactored code will appear here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeRefactor

