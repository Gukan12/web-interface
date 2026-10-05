/**
 * College Course Registration System - Mock Course Catalog
 * Represents active courses available for registration in Semester 5 (Fall 2025)
 */

export const MOCK_COURSES = [
  {
    id: "CS501",
    code: "CS501",
    title: "Design & Analysis of Algorithms",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    credits: 4,
    ltp: "3-1-0",
    type: "Program Core",
    instructor: {
      name: "Dr. Arvind Raman",
      title: "Professor & HOD",
      email: "arvind.raman@university.edu",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      office: "Turing Block 401",
      rating: 4.8
    },
    schedule: {
      days: ["Mon", "Wed"],
      startTime: "09:00",
      endTime: "10:30",
      timeLabel: "Mon, Wed • 09:00 AM - 10:30 AM",
      slot: "A1"
    },
    venue: "Lecture Hall 102, Turing Block",
    capacity: 60,
    enrolledSeats: 54,
    prerequisites: ["CS201 Data Structures", "MA201 Discrete Mathematics"],
    description: "In-depth study of algorithmic paradigms including divide and conquer, dynamic programming, greedy algorithms, graph traversals, network flows, and NP-completeness.",
    syllabus: [
      "Asymptotic notations and recurrence solving methods",
      "Divide & Conquer: Strassen's matrix multiplication, Fast Fourier Transform",
      "Greedy techniques & Dynamic programming: Bellman-Ford, Knapsack",
      "Graph algorithms: Tarjan's SCC, Max Flow Min Cut",
      "Computational Complexity: P, NP, NP-Hard and Approximation algorithms"
    ],
    tags: ["Algorithms", "Complexity", "Data Structures", "Core"]
  },
  {
    id: "CS502",
    code: "CS502",
    title: "Operating Systems Internals",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    credits: 4,
    ltp: "3-0-2",
    type: "Program Core",
    instructor: {
      name: "Dr. Priya Sundaram",
      title: "Associate Professor",
      email: "priya.sundaram@university.edu",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      office: "Turing Block 308",
      rating: 4.6
    },
    schedule: {
      days: ["Tue", "Thu"],
      startTime: "10:30",
      endTime: "12:00",
      timeLabel: "Tue, Thu • 10:30 AM - 12:00 PM",
      slot: "B1"
    },
    venue: "Lecture Hall 204, Ramanujan Hall",
    capacity: 60,
    enrolledSeats: 58,
    prerequisites: ["CS301 Computer Organization"],
    description: "Fundamental abstractions and architecture of modern operating systems: processes, thread concurrency, virtual memory management, file systems, and kernel security.",
    syllabus: [
      "Process management, dual-mode execution, system calls",
      "Threads, synchronization primitives, semaphores, deadlock detection",
      "Memory management: paging, segmentation, TLB, page replacement",
      "File systems: inode structures, journaling, crash recovery",
      "Protection mechanisms, hypervisors and OS containerization"
    ],
    tags: ["OS", "Concurrency", "Linux Kernel", "Systems"]
  },
  {
    id: "AI503",
    code: "AI503",
    title: "Machine Learning Foundations",
    department: "Artificial Intelligence & Data Science",
    deptCode: "AI&DS",
    credits: 4,
    ltp: "3-0-2",
    type: "Professional Elective",
    instructor: {
      name: "Prof. Rajesh Sengupta",
      title: "Associate Professor",
      email: "rajesh.sg@university.edu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      office: "Ada Lovelace Hall 205",
      rating: 4.9
    },
    schedule: {
      days: ["Mon", "Wed"],
      startTime: "11:00",
      endTime: "12:30",
      timeLabel: "Mon, Wed • 11:00 AM - 12:30 PM",
      slot: "C1"
    },
    venue: "Seminar Hall B, AI Wing",
    capacity: 55,
    enrolledSeats: 55, // full, suitable for waitlist test
    prerequisites: ["MA301 Linear Algebra & Probability", "CS102 Python for Engineers"],
    description: "Rigorous mathematical formulation and hands-on implementation of supervised and unsupervised machine learning algorithms, model evaluation, and regularizations.",
    syllabus: [
      "Linear & Logistic regression, gradient descent variations",
      "Support Vector Machines and Kernel tricks",
      "Decision trees, Random Forests, XGBoost ensemble learning",
      "Clustering: K-Means, DBSCAN, Gaussian Mixture Models",
      "Dimensionality reduction: PCA, t-SNE, and regularization methods"
    ],
    tags: ["Machine Learning", "Python", "Data Science", "Statistics"]
  },
  {
    id: "CS504",
    code: "CS504",
    title: "Database Management Systems",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    credits: 3,
    ltp: "3-0-0",
    type: "Program Core",
    instructor: {
      name: "Dr. K. Vigneshwaran",
      title: "Assistant Professor (Senior)",
      email: "vignesh.k@university.edu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      office: "Turing Block 212",
      rating: 4.5
    },
    schedule: {
      days: ["Tue", "Thu"],
      startTime: "14:00",
      endTime: "15:30",
      timeLabel: "Tue, Thu • 02:00 PM - 03:30 PM",
      slot: "D1"
    },
    venue: "Smart Classroom 301, Turing Block",
    capacity: 65,
    enrolledSeats: 48,
    prerequisites: ["CS201 Data Structures"],
    description: "Relational database concepts, ER modeling, relational algebra, SQL optimization, normalization (1NF-BCNF), ACID transactions, indexing, and NoSQL architecture.",
    syllabus: [
      "Relational model, Relational Algebra, SQL queries and constraints",
      "ER modeling, Functional dependencies, 1NF to BCNF decomposition",
      "Storage structures, B+ Trees, Hashing and Query optimization",
      "Transaction processing, ACID properties, Two-Phase Locking",
      "Distributed databases, NoSQL engines (Document, Key-Value)"
    ],
    tags: ["Database", "SQL", "Storage", "Indexing"]
  },
  {
    id: "IT505",
    code: "IT505",
    title: "Full-Stack Cloud Web Engineering",
    department: "Information Technology",
    deptCode: "IT",
    credits: 3,
    ltp: "2-0-2",
    type: "Professional Elective",
    instructor: {
      name: "Ms. Shalini Murthy",
      title: "Assistant Professor",
      email: "shalini.m@university.edu",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      office: "Shannon Block 104",
      rating: 4.7
    },
    schedule: {
      days: ["Mon", "Wed"],
      startTime: "14:00",
      endTime: "15:30",
      timeLabel: "Mon, Wed • 02:00 PM - 03:30 PM",
      slot: "E1"
    },
    venue: "Web Innovation Lab, Shannon Block",
    capacity: 50,
    enrolledSeats: 42,
    prerequisites: ["CS101 Programming Fundamentals"],
    description: "Modern enterprise web architecture using React, Node.js, RESTful and GraphQL APIs, authentication (OAuth/JWT), Docker containers, and CI/CD deployment pipelines.",
    syllabus: [
      "Modern ECMAScript, React architecture, Hooks and State Management",
      "Node.js, Express, RESTful APIs, and GraphQL schema design",
      "Authentication, authorization, JWT tokens and session security",
      "Docker containerization, microservices architecture",
      "CI/CD pipelines, AWS deployment, serverless functions"
    ],
    tags: ["React", "Web", "Cloud", "Full Stack"]
  },
  {
    id: "CS506L",
    code: "CS506L",
    title: "Operating Systems & Networking Lab",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    credits: 2,
    ltp: "0-0-4",
    type: "Laboratory",
    instructor: {
      name: "Dr. Priya Sundaram",
      title: "Associate Professor",
      email: "priya.sundaram@university.edu",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      office: "Turing Block 308",
      rating: 4.6
    },
    schedule: {
      days: ["Fri"],
      startTime: "09:00",
      endTime: "12:30",
      timeLabel: "Fri • 09:00 AM - 12:30 PM",
      slot: "L1"
    },
    venue: "Systems Lab 2, Turing Ground Floor",
    capacity: 40,
    enrolledSeats: 36,
    prerequisites: ["CS502 Operating Systems Internals"],
    description: "Hands-on implementation of UNIX process management (fork, exec, wait), IPC mechanisms (pipes, message queues), socket programming, and CPU scheduling algorithms.",
    syllabus: [
      "UNIX system calls: process creation, synchronization and signals",
      "IPC: Named pipes, shared memory, POSIX semaphores",
      "Simulation of CPU scheduling (FCFS, SJF, Round Robin)",
      "Memory management simulation: Page replacement algorithms",
      "Client-Server socket programming using TCP and UDP"
    ],
    tags: ["Lab", "C", "Linux", "Hands-on"]
  },
  {
    id: "MA401",
    code: "MA401",
    title: "Applied Probability & Stochastic Processes",
    department: "Mathematics",
    deptCode: "MATH",
    credits: 4,
    ltp: "3-1-0",
    type: "Program Core",
    instructor: {
      name: "Dr. Hemant Kulkarni",
      title: "Professor",
      email: "hemant.k@university.edu",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      office: "Euler Building 202",
      rating: 4.4
    },
    schedule: {
      days: ["Mon", "Wed"],
      startTime: "16:00",
      endTime: "17:30",
      timeLabel: "Mon, Wed • 04:00 PM - 05:30 PM",
      slot: "F1"
    },
    venue: "Aryabhata Hall 101",
    capacity: 70,
    enrolledSeats: 52,
    prerequisites: ["MA101 Calculus", "MA201 Discrete Mathematics"],
    description: "Random variables, joint distributions, conditional expectation, Markov chains, Poisson processes, queuing theory (M/M/1, M/M/k), and applications in computer networks.",
    syllabus: [
      "Axiomatic probability, Bayes rule, random variables, CDF/PDF",
      "Joint distributions, covariance, correlation, Law of Large Numbers",
      "Discrete and continuous parameter Markov chains, transition matrices",
      "Poisson processes, renewal theory and birth-death processes",
      "Queuing models: Little's formula, M/M/1 and M/M/c queues"
    ],
    tags: ["Math", "Probability", "Queuing", "Modeling"]
  },
  {
    id: "EC301",
    code: "EC301",
    title: "IoT & Embedded Systems Design",
    department: "Electronics & Communication",
    deptCode: "ECE",
    credits: 3,
    ltp: "3-0-0",
    type: "Open Elective",
    instructor: {
      name: "Dr. N. Chandrasekar",
      title: "Associate Professor",
      email: "chandrasekar.n@university.edu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      office: "Tesla Wing 304",
      rating: 4.5
    },
    schedule: {
      days: ["Tue", "Thu"],
      startTime: "09:00",
      endTime: "10:30",
      timeLabel: "Tue, Thu • 09:00 AM - 10:30 AM",
      slot: "G1"
    },
    venue: "Embedded Systems Lab, Tesla Wing",
    capacity: 45,
    enrolledSeats: 41,
    prerequisites: ["CS301 Computer Organization"],
    description: "Architecture of microcontrollers (ARM Cortex-M, ESP32), sensor interfacing, embedded C, wireless protocols (MQTT, BLE, Zigbee), and cloud IoT integration.",
    syllabus: [
      "ARM Cortex architecture, GPIOs, interrupts, timers and PWM",
      "Serial protocols: I2C, SPI, UART, and sensor communication",
      "Real-time operating systems (FreeRTOS): tasks, queues, semaphores",
      "Wireless protocols: BLE, Zigbee, LoRaWAN, and Wi-Fi",
      "IoT edge computing, MQTT broker setup, and AWS IoT Core"
    ],
    tags: ["IoT", "Embedded", "Hardware", "Sensors"]
  },
  {
    id: "AI507",
    code: "AI507",
    title: "Natural Language Processing",
    department: "Artificial Intelligence & Data Science",
    deptCode: "AI&DS",
    credits: 3,
    ltp: "3-0-0",
    type: "Professional Elective",
    instructor: {
      name: "Dr. Ananya Roy",
      title: "Assistant Professor (Senior)",
      email: "ananya.roy@university.edu",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      office: "Ada Lovelace Hall 310",
      rating: 4.9
    },
    schedule: {
      days: ["Tue", "Thu"],
      startTime: "16:00",
      endTime: "17:30",
      timeLabel: "Tue, Thu • 04:00 PM - 05:30 PM",
      slot: "H1"
    },
    venue: "AI Auditorium 2",
    capacity: 50,
    enrolledSeats: 47,
    prerequisites: ["AI503 Machine Learning Foundations"],
    description: "Computational linguistics, text preprocessing, word embeddings (Word2Vec, GloVe), RNNs, Attention mechanisms, Transformer architectures (BERT, GPT), and LLM fine-tuning.",
    syllabus: [
      "N-gram language models, tokenization, stemming, TF-IDF",
      "Distributed representations: Word2Vec, GloVe, FastText",
      "Sequential modeling with RNNs, LSTMs, and GRUs",
      "Self-Attention mechanism and the Transformer model",
      "Pretrained models (BERT, T5, LLaMA), prompt engineering & RAG"
    ],
    tags: ["NLP", "Transformers", "LLMs", "Deep Learning"]
  },
  {
    id: "CS508",
    code: "CS508",
    title: "Computer Networks & Protocols",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    credits: 3,
    ltp: "3-0-0",
    type: "Program Core",
    instructor: {
      name: "Dr. T. Balakrishnan",
      title: "Professor",
      email: "bala.krishnan@university.edu",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      office: "Turing Block 405",
      rating: 4.7
    },
    schedule: {
      days: ["Mon", "Wed"],
      startTime: "09:00",
      endTime: "10:30", // Clashes intentionally with CS501 for conflict detection showcase
      timeLabel: "Mon, Wed • 09:00 AM - 10:30 AM",
      slot: "A1"
    },
    venue: "Lecture Hall 104, Turing Block",
    capacity: 60,
    enrolledSeats: 39,
    prerequisites: ["CS201 Data Structures"],
    description: "OSI and TCP/IP layered architectures, link layer protocols, routing algorithms (Dijkstra, Bellman-Ford, BGP), congestion control, TCP flow control, and DNS/HTTP protocols.",
    syllabus: [
      "Layering principles, packet switching vs circuit switching",
      "Data link layer: framing, error detection/correction, Ethernet",
      "Network layer: IP addressing, subnetting, CIDR, OSPF, BGP routing",
      "Transport layer: UDP, TCP connection management, Reno/Cubic congestion",
      "Application layer: DNS resolution, HTTP/2, HTTP/3, TLS handshake"
    ],
    tags: ["Networking", "Protocols", "TCP/IP", "Security"]
  },
  {
    id: "HS201",
    code: "HS201",
    title: "Technology Ethics, IPR & Cyber Laws",
    department: "Humanities & Management",
    deptCode: "H&M",
    credits: 2,
    ltp: "2-0-0",
    type: "Open Elective",
    instructor: {
      name: "Dr. Meenakshi Sunder",
      title: "Associate Professor",
      email: "meenakshi.s@university.edu",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
      office: "Heritage Block 102",
      rating: 4.3
    },
    schedule: {
      days: ["Fri"],
      startTime: "14:00",
      endTime: "16:00",
      timeLabel: "Fri • 02:00 PM - 04:00 PM",
      slot: "I1"
    },
    venue: "Heritage Lecture Theatre",
    capacity: 80,
    enrolledSeats: 62,
    prerequisites: [],
    description: "Ethical dilemmas in artificial intelligence, digital privacy, algorithmic bias, software patents, copyright in code, GDPR compliance, and cyber crime legislation.",
    syllabus: [
      "Philosophical foundations of technology ethics and AI fairness",
      "Intellectual Property Rights: Patents, Copyrights, Trademarks, Trade Secrets",
      "Open Source licenses (GPL, MIT, Apache) and compliance liabilities",
      "Data protection frameworks: GDPR, Digital Personal Data Protection Act",
      "Cyber terrorism, computer forensic evidence, and Information Technology Act"
    ],
    tags: ["Ethics", "Law", "IPR", "Cybersecurity"]
  },
  {
    id: "CS510L",
    code: "CS510L",
    title: "Database Systems & SQL Lab",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    credits: 2,
    ltp: "0-0-4",
    type: "Laboratory",
    instructor: {
      name: "Dr. K. Vigneshwaran",
      title: "Assistant Professor (Senior)",
      email: "vignesh.k@university.edu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      office: "Turing Block 212",
      rating: 4.5
    },
    schedule: {
      days: ["Thu"],
      startTime: "14:00",
      endTime: "17:30",
      timeLabel: "Thu • 02:00 PM - 05:30 PM",
      slot: "L2"
    },
    venue: "Database Lab 1, Turing 2nd Floor",
    capacity: 40,
    enrolledSeats: 38,
    prerequisites: ["CS504 Database Management Systems"],
    description: "Hands-on database modeling, complex SQL joins, triggers, stored procedures, index tuning, transaction isolation tests, and connecting web backends to PostgreSQL and MongoDB.",
    syllabus: [
      "DDL, DML, complex nested queries, aggregation, and window functions",
      "PL/pgSQL: triggers, stored procedures, cursor operations",
      "Query execution plans (EXPLAIN ANALYZE) and B-tree indexing optimization",
      "Concurrency anomalies: dirty reads, non-repeatable reads, phantom rows",
      "NoSQL CRUD operations using MongoDB and aggregation pipelines"
    ],
    tags: ["Lab", "PostgreSQL", "SQL", "MongoDB"]
  }
];

export const DEPARTMENTS = [
  "All Departments",
  "Computer Science & Engineering",
  "Artificial Intelligence & Data Science",
  "Information Technology",
  "Electronics & Communication",
  "Mathematics",
  "Humanities & Management"
];

export const COURSE_TYPES = [
  "All Types",
  "Program Core",
  "Professional Elective",
  "Open Elective",
  "Laboratory"
];

export const CREDIT_OPTIONS = ["All Credits", "2 Credits", "3 Credits", "4 Credits"];

export const TIME_SLOTS = [
  "All Slots",
  "Morning (09:00 - 12:30)",
  "Afternoon (14:00 - 17:30)",
  "Friday Special / Labs"
];
