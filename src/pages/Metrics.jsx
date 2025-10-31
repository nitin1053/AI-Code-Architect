import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Code, Clock, Users } from 'lucide-react'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Metrics = () => {
  const codeQualityData = {
    labels: ['Security', 'Performance', 'Maintainability', 'Reliability', 'Documentation'],
    datasets: [
      {
        label: 'Score',
        data: [95, 88, 92, 90, 85],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Code Quality Score',
        data: [72, 76, 80, 85, 88, 90, 92],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const languageDistribution = {
    labels: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'],
    datasets: [
      {
        data: [35, 28, 20, 12, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: 'rgb(30, 41, 59)',
        borderWidth: 2,
      },
    ],
  }

  const metricCards = [
    {
      title: 'Total Projects',
      value: '147',
      change: '+12%',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Avg. Code Quality',
      value: '92',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Bugs Fixed',
      value: '234',
      change: '+18%',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Time Saved',
      value: '1,456h',
      change: '+23%',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#e2e8f0' },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
      },
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
    },
  }

  const doughnutOptions = {
    ...chartOptions,
    scales: {},
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Code Metrics</h1>
            <p className="text-gray-400">Track your code quality and performance</p>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold mb-2">{card.value}</p>
                  <p className="text-green-400 text-sm font-medium">{card.change}</p>
                </div>
                <div className={`p-4 bg-gradient-to-br ${card.color} rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Quality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card"
        >
          <h2 className="text-xl font-bold mb-6">Code Quality Breakdown</h2>
          <div className="h-80">
            <Bar data={codeQualityData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card"
        >
          <h2 className="text-xl font-bold mb-6">Quality Trend (7 Weeks)</h2>
          <div className="h-80">
            <Line data={trendData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card lg:col-span-2"
        >
          <h2 className="text-xl font-bold mb-6">Language Distribution</h2>
          <div className="flex items-center justify-center h-80">
            <div className="w-64 h-64">
              <Doughnut data={languageDistribution} options={doughnutOptions} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card mt-6"
      >
        <h2 className="text-xl font-bold mb-6">Performance Insights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Security Score</h3>
            <div className="text-4xl font-bold mb-2">95%</div>
            <p className="text-gray-400 text-sm">Excellent security practices</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-400">Test Coverage</h3>
            <div className="text-4xl font-bold mb-2">89%</div>
            <p className="text-gray-400 text-sm">Well-tested codebase</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Bug Rate</h3>
            <div className="text-4xl font-bold mb-2">2.3%</div>
            <p className="text-gray-400 text-sm">Below industry average</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Metrics
