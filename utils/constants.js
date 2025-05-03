export const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for occasional users',
    items: ['5 PDF summaries', 'Standard processing speed', 'Email support'],
    paymentLink: '/upload',
    priceId: 'basic_free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 200,
    description: 'Perfect for occasional users',
    items: [
      '10 PDF summaries',
      'Standard processing speed',
      'Email support',
      'Markdown Export',
    ],
    priceId: 'pro_monthly',
  },
];

export const demoText = `# SOMMAIRE: AI-Powered Document Summarizer 🧠📄
🎯 SOMMAIRE is an intelligent, web - based tool that simplifies complex documents into clear, concise summaries—powered by state - of - the - art AI.

# Website Details
• 🌐 Platform: SOMMAIRE (https://sommaire-kv.vercel.app)
• 👥 For: Students, Professionals, Researchers, and Content Creators

# Key Highlights
• ⚡ Instant PDF / Text Summarization
• 🔍 AI - driven Insights & Keyword Extraction
• 💡 Clean, Responsive UI with Next.js + Tailwind CSS

# Why It Matters
• 🧠 SOMMAIRE helps users save time and effort by auto - generating meaningful summaries of lengthy PDFs and text files.It empowers better comprehension and faster decision - making.

# Main Features
• 📄 Upload or paste content to receive instant AI - generated summaries.
• 🗂️ Supports multiple document formats like PDF, DOCX, and TXT.
• 🔐 Secure file handling and fast performance using Node.js and OpenAI integration.
• 📊 Insight view with extracted key terms, sentence importance, and word clouds.

# Pro Tips
• 📌 Use SOMMAIRE to quickly scan academic papers or lengthy reports.
• 🚀 Highlight key takeaways and save summaries for later review.
• 🧩 Ideal for integrating into knowledge workflows or research pipelines.

# Key Terms to Know
• 🧠 NLP: Natural Language Processing—used to interpret and summarize text.
• ⚙️ OpenAI API: The engine behind SOMMAIRE’s smart summarization capabilities.

# Bottom Line
• 💫 SOMMAIRE is your go - to AI assistant for document summarization—fast, efficient, and built for clarity in the age of information overload.`;

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      straggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    tranition: {
      type: 'spring',
      damping: 15,
      striffness: 50,
      duration: 0.8,
    },
  },
};

export const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      damping: 20,
      stiffness: 100,
    },
  },
};
