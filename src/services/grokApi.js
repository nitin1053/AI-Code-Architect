import axios from 'axios'

// Groq API endpoint (OpenAI-compatible)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

class GroqApiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!this.apiKey) {
      console.warn('Groq API key not found. Using demo mode.')
    }
  }

  async makeRequest(prompt, systemMessage = '') {
    // If no API key, use demo mode as fallback
    if (!this.apiKey) {
      console.warn('No API key found. Using demo mode.')
      return this.getDemoResponse(prompt, systemMessage)
    }

    // Validate inputs
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty')
    }

    // Build messages array - ensure all messages have content
    const messages = []
    if (systemMessage && typeof systemMessage === 'string' && systemMessage.trim().length > 0) {
      messages.push({ role: 'system', content: systemMessage.trim() })
    }
    messages.push({ role: 'user', content: prompt.trim() })

    // Try common Groq model names in order (updated to current available models)
    // Groq offers fast inference with models like Llama, Mixtral, Gemma
    // See https://console.groq.com/docs/models for full list
    // Note: llama-3.1-70b-versatile has been decommissioned
    const modelNames = [
      'llama-3.1-8b-instant',        // Fast and efficient (most commonly available)
      'llama-3-70b-8192',            // Alternative Llama variant
      'mixtral-8x7b-32768',          // High context window
      'gemma-7b-it',                 // Google's Gemma model
      'llama-3-8b-8192',             // Smaller Llama variant
      'mixtral-8x7b-instruct-v0.1'   // Mixtral instruction-tuned
    ]
    
    let lastError = null
    
    for (const model of modelNames) {
      // Adjust max_tokens based on model (some models have limits)
      // For llama-3.1-70b, max_tokens should be <= 8192
      // Using a safe default that works with all models
      const maxTokens = model.includes('70b') ? 2048 : 4096
      
      const requestPayload = {
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: maxTokens,
        stream: false, // Explicitly set to false for non-streaming
      }

      console.log(`Attempting Groq API call with model: ${model}, max_tokens: ${maxTokens}`)
      
      try {
        
        const response = await axios.post(
          GROQ_API_URL,
          requestPayload,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: 30000, // 30 second timeout
          }
        )

        if (response.data && response.data.choices && response.data.choices[0]) {
          const content = response.data.choices[0].message?.content
          if (content) {
            console.log(`Successfully received response from model: ${model}`)
            return content
          }
        }
        
        throw new Error('Invalid response format from API')
      } catch (error) {
        lastError = error
        
        // Enhanced error logging
        console.error(`Groq API Error for model ${model}:`, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        })
        
        // If it's not a 404, the model exists but there's another issue
        if (error.response?.status !== 404) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            const authError = error.response?.data?.error?.message || 
                            error.response?.data?.message ||
                            error.response?.data?.error?.code ||
                            'Invalid API key or insufficient permissions'
            const fullError = error.response?.data ? JSON.stringify(error.response.data, null, 2) : authError
            console.error('Full API error response:', fullError)
            throw new Error(`Authentication failed (${error.response?.status}): ${authError}. Your Groq API key may not have access to model "${model}". Please check https://console.groq.com/docs/models for available models.`)
          }
          // For 400 errors, check if model is decommissioned or invalid
          if (error.response?.status === 400) {
            const errorData = error.response?.data
            const apiError = errorData?.error?.message || 
                           errorData?.message || 
                           (errorData?.error ? JSON.stringify(errorData.error, null, 2) : JSON.stringify(errorData, null, 2))
            
            // Check if model is decommissioned - try next model instead of failing
            if (apiError.toLowerCase().includes('decommissioned') || 
                apiError.toLowerCase().includes('no longer supported')) {
              console.warn(`Model ${model} is decommissioned, trying next model...`)
              lastError = error
              continue // Try next model
            }
            
            console.error('Groq API 400 Error Details:', apiError)
            console.error('Request payload that failed:', JSON.stringify(requestPayload, null, 2))
            // If it's a different 400 error (not decommissioned), don't try other models
            throw new Error(`API request error (model: ${model}): ${apiError}`)
          }
          // If we get a different error and it's not a model-not-found (404), don't try other models
          throw new Error(error.response?.data?.error?.message || error.message || 'Failed to get AI response')
        }
        // If 404, try next model name
        continue
      }
    }

    // If all models failed, throw an error with details
    if (lastError) {
      // Check if all errors were 403 (permission issues)
      if (lastError.response?.status === 403) {
        throw new Error(`API access denied (403): Your Groq API key doesn't have access to any of the models we tried. Please check:
1. Your Groq console (https://console.groq.com) to see which models your API key has access to
2. Your API key permissions in the Groq dashboard
3. Whether the models need to be enabled in your account settings
4. Check https://console.groq.com/docs/models for the correct model names

Last attempted model: ${modelNames[modelNames.length - 1]}`)
      }
      throw new Error(`No valid Groq model found. Last error: ${lastError.message}`)
    }
    throw new Error('No valid Groq model found. Please verify your API access and model availability.')
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

export default new GroqApiService()
