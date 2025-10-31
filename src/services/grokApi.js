import axios from 'axios'

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions'

class GrokApiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROK_API_KEY
    if (!this.apiKey) {
      console.warn('Grok API key not found. Using demo mode.')
    }
  }

  async makeRequest(prompt, systemMessage = '') {
    // Using demo mode for now - Grok API model name needs verification
    if (!this.apiKey) {
      return this.getDemoResponse(prompt, systemMessage)
    }

    // Uncomment below when Grok API model is confirmed
    return this.getDemoResponse(prompt, systemMessage)

    /* Grok API Integration (disabled for demo mode)
    try {
      const response = await axios.post(
        GROK_API_URL,
        {
          model: 'grok-beta', // Update with correct model name from Grok docs
          messages: [
            ...(systemMessage ? [{ role: 'system', content: systemMessage }] : []),
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data.choices[0].message.content
    } catch (error) {
      console.error('Grok API Error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error?.message || 'Failed to get AI response')
    }
    */
  }

  getDemoResponse(prompt, systemMessage) {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = this.generateDemoResponse(prompt, systemMessage)
        resolve(response)
      }, 1500)
    })
  }

  generateDemoResponse(prompt, systemMessage) {
    const lowerPrompt = prompt.toLowerCase()
    
    if (systemMessage.includes('analyze') || lowerPrompt.includes('analyze')) {
      return `**Code Analysis Results:**

**1. Code Quality: Excellent (9.5/10)**
- Clean, readable code structure
- Follows best practices and conventions
- Well-documented with meaningful comments

**2. Performance: Good**
- Time complexity: O(n log n) - optimal for sorting
- Space complexity: O(1) - in-place operation
- Consider memoization for repeated calculations

**3. Security: Secure**
- No SQL injection vulnerabilities detected
- Proper input validation
- Safe error handling

**4. Maintainability: High**
- Modular design with clear separation of concerns
- Functions are single-purpose and well-named
- Easy to extend and modify

**5. Recommendations:**
- Add JSDoc comments for better IDE support
- Consider extracting magic numbers to constants
- Implement caching for expensive operations
- Add unit tests for edge cases`
    }

    if (systemMessage.includes('generate') || lowerPrompt.includes('generate')) {
      return `\`\`\`javascript
// AI Generated Code
function optimizedSearch(arr, target) {
  // Binary search for O(log n) time complexity
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13];
const result = optimizedSearch(sortedArray, 7);
console.log(result); // Output: 3

// Additional utility functions
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
\`\`\`

**Features:**
- Binary search algorithm with O(log n) complexity
- Quick sort implementation
- Clean, readable code
- Proper error handling
- Optimized for performance`
    }

    if (systemMessage.includes('bug') || lowerPrompt.includes('bug')) {
      return `**Bug Detection Report:**

**Critical Issues Found: 3**

**1. Memory Leak (Line 45)** ⚠️ CRITICAL
- **Issue:** Event listeners not removed on component unmount
- **Impact:** Memory usage increases over time
- **Fix:**
\`\`\`javascript
useEffect(() => {
  const handler = () => handleEvent();
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler); // Add cleanup
}, []);
\`\`\`

**2. Race Condition (Line 78)** ⚠️ HIGH
- **Issue:** Async operations not properly awaited
- **Impact:** Unexpected behavior under load
- **Fix:**
\`\`\`javascript
async function fetchData() {
  const result = await Promise.all([apiCall1(), apiCall2()]);
  return result; // Properly await all promises
}
\`\`\`

**3. Null Reference (Line 123)** ⚠️ MEDIUM
- **Issue:** No null check before accessing properties
- **Impact:** Potential runtime crashes
- **Fix:**
\`\`\`javascript
if (user && user.profile) {
  console.log(user.profile.name); // Add null check
}
\`\`\`

**Minor Issues: 5**
- Unused variables (3)
- Console.log statements in production (2)

**Overall Code Health: Good (7.5/10)**`
    }

    if (systemMessage.includes('test') || lowerPrompt.includes('test')) {
      return `\`\`\`javascript
// Generated Unit Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(calculator.add(-1, 2)).toBe(1);
    });

    it('should handle zero', () => {
      expect(calculator.add(0, 5)).toBe(5);
    });
  });

  describe('Subtraction', () => {
    it('should subtract two numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('should handle negative results', () => {
      expect(calculator.subtract(2, 5)).toBe(-3);
    });
  });

  describe('Multiplication', () => {
    it('should multiply two numbers correctly', () => {
      expect(calculator.multiply(3, 4)).toBe(12);
    });

    it('should handle zero multiplication', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });
  });

  describe('Division', () => {
    it('should divide two numbers correctly', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero');
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });
  });
});
\`\`\`

**Coverage:** 95%
- Lines: 48/50 (96%)
- Branches: 12/13 (92%)
- Functions: 8/8 (100%)`
    }

    return `**AI Analysis:**

Based on your request, I recommend the following approach:

1. **Optimize performance** by implementing caching strategies
2. **Improve security** with input validation and sanitization
3. **Enhance reliability** through comprehensive error handling
4. **Increase maintainability** with better code organization

Would you like me to generate specific code examples for any of these recommendations?`
  }

  async analyzeCode(code) {
    const systemMessage = `You are an expert code reviewer. Analyze the provided code for quality, performance, security, and maintainability. Provide detailed insights and actionable recommendations.`
    const prompt = `Analyze this code and provide a comprehensive review:\n\n\`\`\`${code}\`\`\``
    return this.makeRequest(prompt, systemMessage)
  }

  async generateCode(description, language = 'javascript') {
    const systemMessage = `You are an expert software developer. Generate clean, efficient, and well-documented code based on user requirements.`
    const prompt = `Generate ${language} code for: ${description}`
    return this.makeRequest(prompt, systemMessage)
  }

  async detectBugs(code) {
    const systemMessage = `You are a bug detection expert. Identify potential bugs, vulnerabilities, and issues in the code. Provide severity ratings and fixes.`
    const prompt = `Analyze this code for bugs and vulnerabilities:\n\n\`\`\`${code}\`\`\``
    return this.makeRequest(prompt, systemMessage)
  }

  async generateTests(code, framework = 'jest') {
    const systemMessage = `You are a test automation expert. Generate comprehensive unit tests with high coverage for the given code.`
    const prompt = `Generate ${framework} tests for this code:\n\n\`\`\`${code}\`\`\``
    return this.makeRequest(prompt, systemMessage)
  }
}

export default new GrokApiService()
