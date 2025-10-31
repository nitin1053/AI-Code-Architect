import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code, Sparkles, Bug, TestTube, BarChart3, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'AI Code Analysis',
      description: 'Deep understanding of your codebase with intelligent insights and recommendations',
      path: '/analyze',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Smart Code Generation',
      description: 'Generate production-ready code from natural language descriptions',
      path: '/generate',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Bug,
      title: 'Bug Detection',
      description: 'Proactively identify and fix potential bugs before they cause issues',
      path: '/bug-detector',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: TestTube,
      title: 'Test Generation',
      description: 'Automatically generate comprehensive unit tests with high coverage',
      path: '/test-generator',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Code Metrics',
      description: 'Track code quality, complexity, and performance metrics',
      path: '/metrics',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Real-time Suggestions',
      description: 'Get instant code improvements as you write',
      path: '/analyze',
      color: 'from-yellow-500 to-amber-500'
    }
  ]

  const benefits = [
    'Reduce code review time by 70%',
    'Catch bugs before deployment',
    'Improve code quality automatically',
    'Generate comprehensive tests',
    'Learn best practices from AI'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI Code Architect
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Empower your development with advanced AI-powered code intelligence.
              Write better code, faster.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/analyze">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/metrics">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  View Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to write world-class code
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link key={index} to={feature.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <div className="flex items-center text-blue-400 mt-4 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Transform Your Development Workflow
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                AI Code Architect uses advanced machine learning to help you write better code faster. Whether you're a solo developer or part of a team, our tools will elevate your code quality.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 blur-3xl"></div>
              <div className="relative glass-card p-8">
                <Code className="w-24 h-24 text-blue-400 mx-auto mb-6" />
                <div className="space-y-4 text-center">
                  <div>
                    <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                      99.9%
                    </div>
                    <div className="text-gray-400">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                      10x
                    </div>
                    <div className="text-gray-400">Faster Development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Better Code?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using AI Code Architect to write production-ready code.
          </p>
          <Link to="/analyze">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Analyzing Code Now
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
