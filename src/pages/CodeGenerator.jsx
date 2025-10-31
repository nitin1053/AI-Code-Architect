import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Wand2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeGenerator = () => {
  const [description, setDescription] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('javascript')

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('Please enter a description')
      return
    }

    setLoading(true)
    setGeneratedCode('')

    try {
      const result = await grokApi.generateCode(description, language)
      setGeneratedCode(result)
      toast.success('Code generated successfully!')
    } catch (error) {
      toast.error(error.message || 'Failed to generate code')
    } finally {
      setLoading(false)
    }
  }

  const examples = [
    'Create a function that finds the longest common subsequence between two strings',
    'Generate a REST API endpoint for user authentication with JWT',
    'Build a React component that displays a data table with sorting and pagination',
    'Write a Python function to calculate the fibonacci sequence using memoization',
    'Create a function that validates an email address using regex'
  ]

  const loadExample = (example) => {
    setDescription(example)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">AI Code Generator</h1>
            <p className="text-gray-400">Generate production-ready code from natural language</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Requirements</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the code you want to generate... (e.g., 'Create a function to calculate factorial')"
              className="w-full h-64 bg-slate-900/50 border border-slate-600 rounded-lg p-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Code
                </>
              )}
            </button>
          </div>

          <div className="glass-card">
            <h3 className="text-lg font-bold mb-3">Example Prompts</h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => loadExample(example)}
                  className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm border border-transparent hover:border-purple-500/50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4">Generated Code</h2>
            {generatedCode ? (
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
                  {generatedCode}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Generated code will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeGenerator
