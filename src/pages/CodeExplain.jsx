import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Loader2, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import grokApi from '../services/grokApi'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeExplain = () => {
  const [code, setCode] = useState('')
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('javascript')
  const [complexity, setComplexity] = useState('detailed')

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error('Please enter code to explain')
      return
    }

    setLoading(true)
    setExplanation('')

    try {
      const result = await grokApi.explainCode(code, language, complexity)
      setExplanation(result)
      toast.success('Code explanation generated!')
    } catch (error) {
      toast.error(error.message || 'Failed to explain code')
    } finally {
      setLoading(false)
    }
  }

  const exampleCode = `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
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
          <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Code Explainer</h1>
            <p className="text-gray-400">Understand complex code in simple, clear explanations</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Code to Explain</h2>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 text-sm"
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
                  Example
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste code you want explained..."
              className="w-full h-96 bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
            />
            <div className="flex items-center gap-4 mt-4">
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 text-sm"
              >
                <option value="simple">Simple Explanation</option>
                <option value="detailed">Detailed Explanation</option>
                <option value="advanced">Advanced Technical</option>
              </select>
              <button
                onClick={handleExplain}
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Explaining...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Explain Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4">Explanation</h2>
            {explanation ? (
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
                  {explanation}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Explanation will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeExplain

