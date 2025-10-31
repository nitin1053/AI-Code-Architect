import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'

const CodeAnalyzer = () => {
  const [code, setCode] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('javascript')

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze')
      return
    }

    setLoading(true)
    setAnalysis('')

    try {
      const result = await grokApi.analyzeCode(code)
      setAnalysis(result)
      toast.success('Analysis complete!')
    } catch (error) {
      toast.error(error.message || 'Failed to analyze code')
    } finally {
      setLoading(false)
    }
  }

  const exampleCodes = {
    javascript: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    java: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
    
    public int multiply(int a, int b) {
        return a * b;
    }
}`
  }

  const loadExample = (lang) => {
    setLanguage(lang)
    setCode(exampleCodes[lang])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">AI Code Analysis</h1>
            <p className="text-gray-400">Deep insights into your code quality and performance</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Code</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => loadExample('javascript')}
                  className={`px-3 py-1 rounded text-sm ${
                    language === 'javascript' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300'
                  }`}
                >
                  JS
                </button>
                <button
                  onClick={() => loadExample('python')}
                  className={`px-3 py-1 rounded text-sm ${
                    language === 'python' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => loadExample('java')}
                  className={`px-3 py-1 rounded text-sm ${
                    language === 'java' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300'
                  }`}
                >
                  Java
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here or select an example..."
              className="w-full h-96 bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn-primary mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
            {analysis ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline ? (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      ) : (
                        <code {...props}>{children}</code>
                      )
                    }
                  }}
                >
                  {analysis}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Analysis results will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeAnalyzer
