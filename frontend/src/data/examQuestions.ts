export interface MCQQuestion {
  id: string;
  question: string;
  options: string[]; // Exactly 5 options
  correctAnswer: number; // Index 0-4
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
  marks: number;
  explanation: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  templates: {
    [key: string]: string; // python, javascript, java, cpp, go
  };
}

export interface AptitudeQuestion {
  id: string;
  question: string;
  options: string[]; // 4 options
  correctAnswer: number; // 0-3
  marks: number;
  explanation: string;
}

export const MCQ_QUESTIONS: MCQQuestion[] = [
  // PYTHON
  {
    id: "m1",
    question: "What will be the output of the following Python code: `print([x for x in range(5) if x % 2 == 0])`?",
    options: ["[0, 1, 2, 3, 4]", "[0, 2, 4]", "[2, 4]", "[1, 3]", "[0, 2, 4, 6]"],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'Python',
    marks: 1,
    explanation: "The list comprehension iterates over numbers 0 to 4. The condition `x % 2 == 0` filters out odd numbers, keeping 0, 2, and 4."
  },
  {
    id: "m2",
    question: "In Python, which of the following is true regarding decorators?",
    options: [
      "They can only decorate classes, not functions.",
      "They modify a function dynamically without changing its source code.",
      "They are executed only when the function is called, not when defined.",
      "They cannot accept parameters.",
      "They are declared using the '&' symbol."
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    skill: 'Python',
    marks: 2,
    explanation: "Decorators are a tool for wrapping another function or class to extend its behavior dynamically using the '@' symbol."
  },
  {
    id: "m3",
    question: "How does Python's Global Interpreter Lock (GIL) affect multi-threaded programs?",
    options: [
      "It makes Python multithreading completely impossible.",
      "It speeds up CPU-bound operations in multi-threaded programs.",
      "It prevents multiple native threads from executing Python bytecodes at once.",
      "It allows true concurrent execution on multiple CPU cores.",
      "It only applies to I/O-bound operations."
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    skill: 'Python',
    marks: 3,
    explanation: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at the same time on multiple cores."
  },
  // REACT
  {
    id: "m4",
    question: "In React, what is the primary purpose of the 'key' prop in a list of elements?",
    options: [
      "To bind a unique CSS style to each element.",
      "To store database record IDs on the DOM.",
      "To help React identify which items have changed, been added, or been removed.",
      "To encrypt elements for security purposes.",
      "To trigger a re-render of child components automatically."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    skill: 'React',
    marks: 1,
    explanation: "React uses keys to track which list items have changed, been added, or been removed, ensuring efficient rendering."
  },
  {
    id: "m5",
    question: "Which of the following describes the correct behavior of the dependency array in React's `useEffect` hook?",
    options: [
      "If omitted, the hook runs once on mount and never again.",
      "If empty `[]`, the hook runs on every single render.",
      "If it contains values, the hook only runs if those values change between renders.",
      "It must contain all states used inside the component.",
      "It only accepts functions, not primitive values."
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    skill: 'React',
    marks: 2,
    explanation: "Providing values in the dependency array instructs React to re-run the effect only when those specific variables have changed."
  },
  {
    id: "m6",
    question: "What is a major advantage of Next.js App Router (using React Server Components) compared to Pages Router?",
    options: [
      "It completely eliminates the need for any CSS styling.",
      "It renders components on the client-side by default, speeding up state updates.",
      "It reduces bundle size by keeping component dependencies on the server, sending zero client-side JavaScript for static parts.",
      "It allows writing raw SQL directly inside frontend React JSX files without API routes.",
      "It removes the need for TypeScript."
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    skill: 'React',
    marks: 3,
    explanation: "React Server Components (RSC) keep dependencies on the server side, resulting in lighter page bundles and faster initial loads."
  },
  // SQL
  {
    id: "m7",
    question: "Which SQL clause is used to filter records after aggregate functions have been applied?",
    options: ["WHERE", "FILTER", "HAVING", "GROUP BY", "ORDER BY"],
    correctAnswer: 2,
    difficulty: 'easy',
    skill: 'SQL',
    marks: 1,
    explanation: "`HAVING` is used to filter grouped records (aggregates), whereas `WHERE` filters individual rows before grouping."
  },
  {
    id: "m8",
    question: "What is the difference between `UNION` and `UNION ALL` operators in SQL?",
    options: [
      "UNION allows duplicate values; UNION ALL does not.",
      "UNION combines rows horizontally; UNION ALL combines rows vertically.",
      "UNION removes duplicate rows; UNION ALL includes all duplicate rows.",
      "UNION is faster because it does not require a sorting/deduplication step.",
      "UNION only works with relational databases; UNION ALL works with MongoDB."
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    skill: 'SQL',
    marks: 2,
    explanation: "`UNION` removes duplicate rows from the result sets, which makes it slower. `UNION ALL` retains all duplicates and runs faster."
  },
  {
    id: "m9",
    question: "What does the 'Isolation' property in ACID database transactions guarantee?",
    options: [
      "It ensures that a transaction is written to disk permanently.",
      "It guarantees that concurrent execution of transactions leaves the database in the same state as if they were executed sequentially.",
      "It ensures that if any part of the transaction fails, the entire transaction is rolled back.",
      "It protects the database connection from cross-origin network requests.",
      "It encrypts the database columns during transit."
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    skill: 'SQL',
    marks: 3,
    explanation: "Isolation ensures that transactions run concurrently do not interfere with each other, producing identical states to sequential runs."
  },
  // DSA
  {
    id: "m10",
    question: "What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'DSA',
    marks: 1,
    explanation: "In a balanced BST, each step divides the search space in half, resulting in a logarithmic time complexity O(log n)."
  },
  {
    id: "m11",
    question: "Which data structure operates on a First-In, First-Out (FIFO) basis?",
    options: ["Stack", "Queue", "Max-Heap", "Trie", "Hash Table"],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'DSA',
    marks: 1,
    explanation: "A Queue operates on FIFO where elements are added at the rear and removed from the front."
  },
  {
    id: "m12",
    question: "Which of the following sorting algorithms is stable and has a guaranteed worst-case time complexity of O(n log n)?",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Heap Sort", "Selection Sort"],
    correctAnswer: 1,
    difficulty: 'medium',
    skill: 'DSA',
    marks: 2,
    explanation: "Merge Sort has a time complexity of O(n log n) in all cases (best, average, worst) and is a stable sort (keeps relative order of equal keys)."
  },
  {
    id: "m13",
    question: "What is the main advantage of a Trie (Prefix Tree) data structure over a Hash Map for word lookups?",
    options: [
      "It uses much less memory overall.",
      "It has a better average lookup time of O(1).",
      "It supports prefix-based queries (like auto-complete) efficiently.",
      "It works with floating-point keys.",
      "It is a built-in data structure in all compilers."
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    skill: 'DSA',
    marks: 2,
    explanation: "Tries are optimized for prefix matching, auto-suggestions, and vocabulary checks by traversing down path nodes."
  },
  {
    id: "m14",
    question: "In graph algorithms, when is Dijkstra's algorithm NOT suitable for finding the shortest path?",
    options: [
      "When the graph is directed.",
      "When the graph has cycles.",
      "When the graph has edges with negative weights.",
      "When the graph has multiple connected components.",
      "When the graph is too large to fit in memory."
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    skill: 'DSA',
    marks: 3,
    explanation: "Dijkstra's algorithm assumes non-negative edge weights. Negative weights can cause infinite loops or incorrect path scores."
  },
  // ML / AI
  {
    id: "m15",
    question: "What is the primary function of an activation function in a Deep Neural Network?",
    options: [
      "To normalize the inputs to a standard range.",
      "To introduce non-linearity into the model.",
      "To prevent overfitting by randomly dropping nodes.",
      "To calculate the error gradient during backpropagation.",
      "To connect the network to a GPU."
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'ML & AI',
    marks: 1,
    explanation: "Without non-linear activation functions, a neural network is just a giant linear combination, incapable of learning complex patterns."
  },
  {
    id: "m16",
    question: "Which of the following techniques is specifically designed to prevent overfitting in machine learning models?",
    options: ["L1/L2 Regularization", "Increasing model parameters", "Removing data validation splits", "Using raw unfiltered labels", "Decreasing learning rate"],
    correctAnswer: 0,
    difficulty: 'medium',
    skill: 'ML & AI',
    marks: 2,
    explanation: "L1 (Lasso) and L2 (Ridge) regularization add penalty terms to the loss function to constrain model weights, preventing overfitting."
  },
  {
    id: "m17",
    question: "In Generative AI, what is the core purpose of a Vector Database in a Retrieval-Augmented Generation (RAG) system?",
    options: [
      "To generate final text responses.",
      "To store image files for user profiles.",
      "To store and retrieve dense vector embeddings of documents to provide contextual facts to the LLM.",
      "To compile Python code for web servers.",
      "To speed up CSS rendering."
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    skill: 'ML & AI',
    marks: 3,
    explanation: "RAG uses a vector database to search semantic-dense document embeddings, supplying context data directly into the model's prompt."
  },
  // DevOps
  {
    id: "m18",
    question: "What is the primary benefit of using multi-stage builds in a Dockerfile?",
    options: [
      "It allows running multiple containers on the same port.",
      "It reduces the final Docker image size by leaving build-time tools behind.",
      "It automates pushing images to Docker Hub.",
      "It encrypts the container files.",
      "It allows writing Dockerfiles in JavaScript."
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'DevOps',
    marks: 1,
    explanation: "Multi-stage builds allow developers to use large SDKs for building, then copy ONLY the compiled production binaries into a light base image."
  },
  {
    id: "m19",
    question: "In CI/CD pipelines, what is 'Continuous Deployment'?",
    options: [
      "Manually deploying software updates once a month.",
      "Automatically compiling code but requiring manual approval to push to production.",
      "Automatically building, testing, and deploying every code change that passes testing directly to production without manual steps.",
      "Running code on developer laptops.",
      "Using Git branches for saving local changes."
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    skill: 'DevOps',
    marks: 2,
    explanation: "Continuous Deployment automates the entire release cycle all the way into production once tests pass, requiring zero human intervention."
  },
  {
    id: "m20",
    question: "Which Kubernetes resource is used to expose an application running on a set of Pods as a network service?",
    options: ["Deployment", "ConfigMap", "Service", "Secret", "Namespace"],
    correctAnswer: 2,
    difficulty: 'medium',
    skill: 'DevOps',
    marks: 2,
    explanation: "A Kubernetes Service defines a logical set of Pods and a policy by which to access them over the network."
  },
  // TYPESCRIPT
  {
    id: "m21",
    question: "In TypeScript, what is the key difference between `type` and `interface`?",
    options: [
      "They are completely identical in all aspects.",
      "`interface` supports declaration merging; `type` aliases do not.",
      "`type` can extend other types but `interface` cannot.",
      "`interface` is only for object types; `type` is only for primitives.",
      "`type` supports class implementation; `interface` does not."
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    skill: 'TypeScript',
    marks: 2,
    explanation: "A key difference is that `interface` supports declaration merging (multiple declarations with the same name are merged), while `type` aliases do not support this."
  },
  {
    id: "m22",
    question: "What does the TypeScript utility type `Partial<T>` do?",
    options: [
      "Makes all properties of T required.",
      "Makes all properties of T readonly.",
      "Makes all properties of T optional.",
      "Picks a subset of properties from T.",
      "Excludes null from all properties of T."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    skill: 'TypeScript',
    marks: 1,
    explanation: "`Partial<T>` constructs a type with all properties of T set to optional, useful for update/patch operations where not all fields are required."
  },
  {
    id: "m23",
    question: "What is a TypeScript 'discriminated union' (tagged union)?",
    options: [
      "A union type that can only contain primitive values.",
      "A pattern where union members share a common literal type property enabling type narrowing.",
      "A type that excludes null and undefined from its members.",
      "A union that can only have two possible types.",
      "A runtime feature to check types automatically."
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    skill: 'TypeScript',
    marks: 3,
    explanation: "Discriminated unions use a common 'discriminant' literal property (e.g., `kind: 'circle' | 'square'`) so TypeScript can narrow the type within conditional branches."
  },
  // JAVA
  {
    id: "m24",
    question: "In Java, what is the difference between `==` and `.equals()` when comparing String objects?",
    options: [
      "There is no difference; both compare by value.",
      "`==` compares object reference (memory address); `.equals()` compares content (value).",
      "`==` compares content; `.equals()` compares memory address.",
      "`.equals()` only works with primitive types.",
      "`==` is deprecated in modern Java."
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'Java',
    marks: 1,
    explanation: "`==` checks if two references point to the same object in memory. `.equals()` checks logical equality by comparing the actual string content character-by-character."
  },
  {
    id: "m25",
    question: "What is the purpose of the `synchronized` keyword in Java?",
    options: [
      "To make a method run asynchronously in a background thread.",
      "To ensure only one thread executes a block of code at a time, preventing race conditions.",
      "To connect to a synchronized database connection pool.",
      "To import external libraries at compile time.",
      "To merge multiple threads into a single execution path."
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    skill: 'Java',
    marks: 2,
    explanation: "`synchronized` provides mutual exclusion. A synchronized method/block can only be executed by one thread at a time, preventing concurrent modification and data corruption."
  },
  {
    id: "m26",
    question: "Which Java collection interface does NOT allow duplicate elements?",
    options: ["List", "Queue", "Deque", "Set", "LinkedList"],
    correctAnswer: 3,
    difficulty: 'easy',
    skill: 'Java',
    marks: 1,
    explanation: "The `Set` interface in Java does not allow duplicate elements. Implementations like `HashSet` and `TreeSet` enforce uniqueness automatically."
  },
  // SYSTEM DESIGN
  {
    id: "m27",
    question: "What is the primary purpose of a Content Delivery Network (CDN)?",
    options: [
      "To serve as the main application database.",
      "To run backend logic closer to the user.",
      "To cache and deliver static assets from geographically distributed edge servers near users, reducing latency.",
      "To manage user authentication tokens.",
      "To compress and encrypt API requests."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    skill: 'System Design',
    marks: 1,
    explanation: "A CDN caches static content (images, CSS, JS, videos) on edge servers distributed globally. Users download assets from the nearest edge node, dramatically reducing load times and origin server load."
  },
  {
    id: "m28",
    question: "What is the 'CAP Theorem' in distributed systems?",
    options: [
      "A rule: Consistency, Availability, and Partition tolerance cannot all be simultaneously guaranteed.",
      "A formula for calculating server CPU, memory, and processing capacity.",
      "A microservices pattern enforcing cache, API, and persistence layers.",
      "A security protocol combining Cryptography, Authentication, and Permissions.",
      "The maximum nodes a distributed cluster can support."
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    skill: 'System Design',
    marks: 2,
    explanation: "CAP theorem states a distributed system can only guarantee two of three: Consistency (same data across nodes), Availability (always responds), and Partition Tolerance (works through network failures)."
  },
  {
    id: "m29",
    question: "What is 'horizontal scaling' vs 'vertical scaling'?",
    options: [
      "Horizontal scaling increases CPU/RAM of a single server; vertical adds more servers.",
      "Horizontal scaling adds more servers to distribute load; vertical scaling upgrades the existing server hardware.",
      "They are the same concept with different names.",
      "Horizontal applies to databases only; vertical applies to web servers only.",
      "Horizontal reduces server count; vertical increases them."
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    skill: 'System Design',
    marks: 1,
    explanation: "Horizontal scaling (scale-out) adds more machine instances. Vertical scaling (scale-up) adds more resources (CPU, RAM, disk) to a single existing machine."
  },
  {
    id: "m30",
    question: "In a microservices architecture, what is an 'API Gateway' responsible for?",
    options: [
      "Directly storing all API responses in a shared relational database.",
      "Serving as the single entry point routing client requests to services, handling auth, rate limiting, and load balancing.",
      "Compiling and deploying microservice code automatically.",
      "Replacing all internal service-to-service communication.",
      "Providing a shared SQL database for all microservices."
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    skill: 'System Design',
    marks: 2,
    explanation: "An API Gateway acts as the unified entry point for all client requests. It handles cross-cutting concerns: authentication, rate limiting, logging, request routing, and load balancing across backend services."
  }
];

export const CODING_QUESTIONS: CodingQuestion[] = [
  {
    id: "c1",
    title: "Reverse a String",
    description: "Write a function that reverses a given input string. In languages with mutable strings, try to modify it in-place.",
    difficulty: "easy",
    marks: 2,
    inputFormat: "A single string containing alphabets and numbers.",
    outputFormat: "The reversed string.",
    constraints: "Length of string <= 10^5.",
    examples: [
      { input: "\"hello\"", output: "\"olleh\"" },
      { input: "\"12345\"", output: "\"54321\"" }
    ],
    templates: {
      python: "def reverse_string(s: str) -> str:\n    # Write your code here\n    pass",
      javascript: "function reverseString(s) {\n    // Write your code here\n    return s;\n}",
      java: "public class Solution {\n    public String reverseString(String s) {\n        // Write your code here\n        return s;\n    }\n}",
      cpp: "class Solution {\npublic:\n    string reverseString(string s) {\n        // Write your code here\n        return s;\n    }\n};",
      go: "package main\n\nfunc reverseString(s string) string {\n    // Write your code here\n    return s\n}"
    }
  },
  {
    id: "c2",
    title: "Find Missing Number",
    description: "You are given an array containing `n` distinct numbers in the range `[0, n]`. Return the only number in the range that is missing from the array.",
    difficulty: "easy",
    marks: 2,
    inputFormat: "An array of integers of size n.",
    outputFormat: "An integer representing the missing number.",
    constraints: "n == nums.length, 1 <= n <= 10^4, 0 <= nums[i] <= n.",
    examples: [
      { input: "[3, 0, 1]", output: "2", explanation: "n=3 since there are 3 numbers. The range is [0,3]. 2 is missing." },
      { input: "[0, 1]", output: "2", explanation: "n=2. The range is [0,2]. 2 is missing." }
    ],
    templates: {
      python: "def missing_number(nums: list[int]) -> int:\n    # Write your code here\n    pass",
      javascript: "function missingNumber(nums) {\n    // Write your code here\n    return 0;\n}",
      java: "public class Solution {\n    public int missingNumber(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};",
      go: "package main\n\nfunc missingNumber(nums []int) int {\n    // Write your code here\n    return 0\n}"
    }
  },
  {
    id: "c3",
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "medium",
    marks: 3,
    inputFormat: "An array of integers nums and an integer target.",
    outputFormat: "An array of two indices.",
    constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }
    ],
    templates: {
      python: "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your code here\n    pass",
      javascript: "function twoSum(nums, target) {\n    // Write your code here\n    return [];\n}",
      java: "public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};",
      go: "package main\n\nfunc twoSum(nums []int, target int) []int {\n    // Write your code here\n    return []int{}\n}"
    }
  },
  {
    id: "c4",
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    marks: 3,
    inputFormat: "A string s.",
    outputFormat: "An integer representing the length.",
    constraints: "0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces.",
    examples: [
      { input: "\"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." }
    ],
    templates: {
      python: "def length_of_longest_substring(s: str) -> int:\n    # Write your code here\n    pass",
      javascript: "function lengthOfLongestSubstring(s) {\n    // Write your code here\n    return 0;\n}",
      java: "public class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        return 0;\n    }\n};",
      go: "package main\n\nfunc lengthOfLongestSubstring(s string) int {\n    // Write your code here\n    return 0\n}"
    }
  },
  {
    id: "c5",
    title: "Merge Interval Groups",
    description: "Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the input intervals.",
    difficulty: "hard",
    marks: 5,
    inputFormat: "A 2D array of intervals.",
    outputFormat: "A 2D array of merged intervals.",
    constraints: "1 <= intervals.length <= 10^4, intervals[i].length == 2, 0 <= start_i <= end_i <= 10^4.",
    examples: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]." }
    ],
    templates: {
      python: "def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    # Write your code here\n    pass",
      javascript: "function mergeIntervals(intervals) {\n    // Write your code here\n    return [];\n}",
      java: "public class Solution {\n    public int[][] merge(int[][] intervals) {\n        // Write your code here\n        return new int[][]{};\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Write your code here\n        return {};\n    }\n};",
      go: "package main\n\nfunc merge(intervals [][]int) [][]int {\n    // Write your code here\n    return [][]int{}\n}"
    }
  }
];

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: "a1",
    question: "A training batch has 60 students. 30% of them specialize in AI, 50% specialize in Web Development, and the rest specialize in DevOps. How many students specialize in DevOps?",
    options: ["18 students", "12 students", "15 students", "20 students"],
    correctAnswer: 1,
    marks: 1,
    explanation: "AI + Web = 30% + 50% = 80%. DevOps represents the remaining 20%. 20% of 60 students is (0.2 * 60) = 12 students."
  },
  {
    id: "a2",
    question: "If 5 servers can process 5 million requests in 5 minutes, how many servers are needed to process 100 million requests in 100 minutes?",
    options: ["100 servers", "20 servers", "5 servers", "50 servers"],
    correctAnswer: 2,
    marks: 1,
    explanation: "If 5 servers do 5M requests in 5 min, then 1 server does 1M requests in 5 min. Thus, 1 server does 20M requests in 100 min. To do 100M requests in 100 min, we need 100 / 20 = 5 servers."
  },
  {
    id: "a3",
    question: "Find the odd one out in the following list of terms: Router, Switch, Hub, Compiler, Bridge.",
    options: ["Router", "Bridge", "Compiler", "Switch"],
    correctAnswer: 2,
    marks: 1,
    explanation: "Router, Switch, Hub, and Bridge are networking hardware components. A Compiler is a software development tool."
  },
  {
    id: "a4",
    question: "A project manager estimates that 3 developers can build a web page in 6 days. If the client wants it in 2 days, how many extra developers must be hired (assuming equal efficiency)?",
    options: ["6 extra developers", "3 extra developers", "9 extra developers", "4 extra developers"],
    correctAnswer: 0,
    marks: 1,
    explanation: "Total developer-days required is 3 * 6 = 18. To finish in 2 days, we need 18 / 2 = 9 developers. Since we already have 3, we must hire 9 - 3 = 6 extra developers."
  },
  {
    id: "a5",
    question: "Complete the series: 3, 7, 15, 31, 63, ...",
    options: ["127", "95", "125", "118"],
    correctAnswer: 0,
    marks: 1,
    explanation: "The pattern is (Previous Number * 2) + 1. So (63 * 2) + 1 = 126 + 1 = 127."
  },
  {
    id: "a6",
    question: "An API response time decreases by 10% after caching is enabled, and then decreases by another 20% after database indexing. What is the total percentage decrease in response time?",
    options: ["30%", "28%", "32%", "25%"],
    correctAnswer: 1,
    marks: 1,
    explanation: "Let original time be 100. After caching, time is 100 * 0.9 = 90. After indexing, time is 90 * 0.8 = 72. The total decrease is 100 - 72 = 28%."
  },
  {
    id: "a7",
    question: "If code A runs faster than code B, code B runs slower than code C, and code C runs faster than code A, which code is the fastest?",
    options: ["Code A", "Code B", "Code C", "Cannot be determined"],
    correctAnswer: 2,
    marks: 1,
    explanation: "We are given: A > B, C > B, and C > A. Since C is faster than A, and A is faster than B, then C must be the fastest."
  },
  {
    id: "a8",
    question: "A database has 10,000 index files. Every night, 5% of index files get corrupted. If the server recovers 80% of those corrupted files automatically, how many files remain corrupted by morning?",
    options: ["500 files", "100 files", "400 files", "250 files"],
    correctAnswer: 1,
    marks: 1,
    explanation: "Daily corrupted = 5% of 10,000 = 500 files. Automatic recovery fixes 80% of 500 = 400 files. Remaining corrupted = 500 - 400 = 100 files."
  },
  {
    id: "a9",
    question: "If P is the brother of Q, Q is the sister of R, and R is the father of S, how is P related to S?",
    options: ["Father", "Uncle", "Grandfather", "Brother"],
    correctAnswer: 1,
    marks: 1,
    explanation: "R is S's father. Since P and Q are siblings of R, P (being male, 'brother') is the paternal uncle of S."
  },
  {
    id: "a10",
    question: "A git repository size is 200MB. If cloning over a 20 Mbps (Megabits per second) internet connection, approximately how long will it take to finish downloading?",
    options: ["10 seconds", "80 seconds", "40 seconds", "100 seconds"],
    correctAnswer: 1,
    marks: 1,
    explanation: "200MB = 200 * 8 = 1600 Megabits. Time taken = 1600 Mb / 20 Mbps = 80 seconds."
  }
];
