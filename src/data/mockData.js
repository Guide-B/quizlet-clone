export const navLinks = [
  { id: "home", label: "Home", icon: "Home", route: "/" },
  { id: "library", label: "Your library", icon: "BookOpen", route: "/user/Guide_Bwalya/sets" },
  { id: "study-groups", label: "Study groups", icon: "Users", route: "/study-groups" },
  { id: "podcasts", label: "Podcasts", badge: "Beta", icon: "Radio", route: "/podcasts/generate" },
  { id: "study-guides", label: "Study Guides", icon: "FileText", route: "/study-guides/upload" },
  { id: "games", label: "Games", icon: "Gamepad2", route: "/games" },
  { id: "practice-tests", label: "Practice Tests", icon: "CheckSquare", route: "/ai-practice-test-generator" },
  { id: "explanations", label: "Expert Solutions", icon: "Sparkles", route: "/explanations" }
];

export const userFolders = [
  { id: "folder-1", name: "Chinese Phrasebook", count: 12 },
  { id: "folder-2", name: "Practice Tests", count: 8 },
  { id: "folder-3", name: "Textbooks", count: 15 },
  { id: "folder-4", name: "Microcomputer Systems & Interface", count: 24 },
  { id: "folder-5", name: "Operating Systems", count: 18 },
  { id: "folder-6", name: "Principles of Computer Composition", count: 32 },
  { id: "folder-7", name: "Socket Programming", count: 14 }
];

export const srsProgressSets = [
  {
    id: "set-1",
    title: "Car Brand Logos (All)",
    totalCards: 133,
    completedCards: 48,
    type: "srs_session",
    subtitle: "48/133 cards completed",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    cards: [
      { id: 1, term: "Porsche", definition: "German luxury sports car manufacturer based in Stuttgart featuring a rampant black horse on a golden shield crest." },
      { id: 2, term: "Ferrari", definition: "Iconic Italian luxury sports manufacturer founded by Enzo Ferrari, recognizable by the 'Cavallino Rampante' (Prancing Horse) on yellow." },
      { id: 3, term: "Alfa Romeo", definition: "Milanese automaker emblem showing a red cross on white and the 'Biscione' snake swallowing a man." },
      { id: 4, term: "Subaru", definition: "Japanese automaker named after the Pleiades star cluster (Seven Sisters), symbolized by six blue-and-silver stars." },
      { id: 5, term: "Maserati", definition: "Bologna-founded marque featuring the Neptune Fountain Trident symbol representing strength and vigor." }
    ]
  },
  {
    id: "set-2",
    title: "HSK Standard Course 4B Vocabulary",
    totalCards: 301,
    completedCards: 124,
    type: "srs_session",
    subtitle: "124/301 cards completed",
    heroImage: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=600&q=80",
    cards: [
      { id: 1, term: "坚持 (jiānchí)", definition: "To persist in; to persevere; to insist on." },
      { id: 2, term: "顺利 (shùnlì)", definition: "Smoothly; successfully; without a hitch." },
      { id: 3, term: "积累 (jīlěi)", definition: "To accumulate; cumulative collection (e.g. experience or knowledge)." },
      { id: 4, term: "同情 (tóngqíng)", definition: "To sympathize with; compassion." },
      { id: 5, term: "安排 (ānpái)", definition: "To arrange; to plan; schedule of activities." }
    ]
  }
];

export const recentsShelf = [
  {
    id: "rec-1",
    type: "flashcard_set",
    title: "Car Brand Logos (All)",
    metadata: "380 cards • by you",
    badgeColor: "bg-blue-600",
    icon: "Layers"
  },
  {
    id: "rec-2",
    type: "practice_test",
    title: "Data Mining Concepts Practice Test",
    metadata: "Practice test • by you",
    badgeColor: "bg-emerald-600",
    icon: "CheckSquare"
  },
  {
    id: "rec-3",
    type: "flashcard_set",
    title: "HSK Standard Course 4B Vocabulary",
    metadata: "301 cards • by you",
    badgeColor: "bg-blue-600",
    icon: "Layers"
  },
  {
    id: "rec-4",
    type: "flashcard_set",
    title: "Data Mining Chapter 1: KDD, Data Types, Methods",
    metadata: "45 cards • by you",
    badgeColor: "bg-blue-600",
    icon: "Layers"
  },
  {
    id: "rec-5",
    type: "study_guide",
    title: "Data Mining Chapter 1 AI Study Guide",
    metadata: "Study guide • by you",
    badgeColor: "bg-purple-600",
    icon: "FileText"
  }
];

export const practiceQuestions = [
  {
    id: 1,
    question: "In Knowledge Discovery in Databases (KDD), which stage immediately follows data preprocessing and transformation?",
    options: [
      "Data Mining (pattern extraction)",
      "Data Cleaning",
      "Result Interpretation / Evaluation",
      "Data Selection"
    ],
    correctAnswer: 0,
    explanation: "Data mining is the core algorithmic step in KDD where intelligent pattern extraction methods are applied to prepared data."
  },
  {
    id: 2,
    question: "Which of the following is an unsupervised learning task in machine learning and data mining?",
    options: [
      "Clustering analysis (e.g. K-Means)",
      "Linear Regression",
      "Support Vector Machine classification",
      "Supervised Decision Tree"
    ],
    correctAnswer: 0,
    explanation: "Clustering discovers natural subgroupings in unlabeled data without target ground-truth variables."
  },
  {
    id: 3,
    question: "What metric evaluates the proportion of true positives among all instances predicted as positive?",
    options: [
      "Precision",
      "Recall / Sensitivity",
      "F1-Score",
      "Specificity"
    ],
    correctAnswer: 0,
    explanation: "Precision = TP / (TP + FP). Recall measures TP / (TP + FN)."
  }
];
