import { useState } from 'react'
import { motion } from 'framer-motion'
import { TestTube, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const TestGenerator = () => {
  const [code, setCode] = useState('')
  const [tests, setTests] = useState('')
  const [loading, setLoading] = useState(false)
  const [framework, setFramework] = useState('jest')

  const handleGenerate = async () => {
    if (!code.trim()) {
      toast.error('Please enter code to generate tests for')
      return
    }

    setLoading(true)
    setTests('')

    try {
      const result = await grokApi.generateTests(code, framework)
      setTests(result)
      toast.success('Tests generated successfully!')
    } catch (error) {
      toast.error(error.message || 'Failed to generate tests')
    } finally {
      setLoading(false)
    }
  }

  const exampleCode = `function Calculator() {
  this.add = function(a, b) {
    return a + b;
  };
  
  this.subtract = function(a, b) {
    return a - b;
  };
  
  this.multiply = function(a, b) {
    return a * b;
  };
  
  this.divide = function(a, b) {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  };
}`

  const loadExample = () => {
    setCode(exampleCode)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
            <TestTube className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Test Generator</h1>
            <p className="text-gray-400">Generate comprehensive unit tests automatically</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Source Code</h2>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              >
                <option value="jest">Jest</option>
                <option value="mocha">Mocha</option>
                <option value="vitest">Vitest</option>
                <option value="pytest">Pytest</option>
              </select>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste the code you want to test..."
              className="w-full h-96 bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none"
            />
            <button
              onClick={loadExample}
              className="btn-secondary w-full"
            >
              Load Example
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary mt-2 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Generate Tests
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4">Generated Tests</h2>
            {tests ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {tests}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <TestTube className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Generated tests will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestGenerator
