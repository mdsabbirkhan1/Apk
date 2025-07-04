// Tools Data - All tool content managed in JavaScript for CDN delivery
window.ToolsData = {
  // Tool categories
  categories: [
    { id: 'all', name: 'All Tools', icon: 'fas fa-th' },
    { id: 'design', name: 'Design', icon: 'fas fa-palette' },
    { id: 'development', name: 'Development', icon: 'fas fa-code' },
    { id: 'productivity', name: 'Productivity', icon: 'fas fa-tasks' },
    { id: 'marketing', name: 'Marketing', icon: 'fas fa-bullhorn' },
    { id: 'analytics', name: 'Analytics', icon: 'fas fa-chart-line' },
    { id: 'collaboration', name: 'Collaboration', icon: 'fas fa-users' },
    { id: 'ai', name: 'AI Tools', icon: 'fas fa-robot' },
    { id: 'writing', name: 'Writing', icon: 'fas fa-pen' },
    { id: 'finance', name: 'Finance', icon: 'fas fa-dollar-sign' },
    { id: 'seo', name: 'SEO', icon: 'fas fa-search' },
    { id: 'social', name: 'Social Media', icon: 'fas fa-share-alt' }
  ],

  // Tools database
  tools: [
    // Design Tools
    {
      id: 'figma',
      name: 'Figma',
      category: 'design',
      description: 'Collaborative interface design tool with real-time collaboration features. Perfect for UI/UX design, prototyping, and design systems.',
      icon: 'fas fa-figma',
      iconUrl: './cdn/images/figma-icon.png',
      link: 'https://figma.com',
      usageCount: 15420,
      tags: ['design', 'ui', 'ux', 'prototyping', 'collaboration']
    },
    {
      id: 'canva',
      name: 'Canva',
      category: 'design',
      description: 'Easy-to-use graphic design platform for creating social media graphics, presentations, posters, and other visual content.',
      icon: 'fas fa-paint-brush',
      iconUrl: './cdn/images/canva-icon.png',
      link: 'https://canva.com',
      usageCount: 12890,
      tags: ['design', 'graphics', 'templates', 'social media']
    },
    {
      id: 'adobe-xd',
      name: 'Adobe XD',
      category: 'design',
      description: 'Vector-based user experience design tool for web and mobile apps. Create wireframes, prototypes, and design systems.',
      icon: 'fab fa-adobe',
      iconUrl: './cdn/images/adobe-xd-icon.png',
      link: 'https://adobe.com/products/xd',
      usageCount: 8750,
      tags: ['design', 'adobe', 'prototyping', 'mobile', 'web']
    },
    {
      id: 'sketch',
      name: 'Sketch',
      category: 'design',
      description: 'Digital design toolkit for Mac. Create beautiful designs with vectors, symbols, and reusable components.',
      icon: 'fas fa-vector-square',
      iconUrl: './cdn/images/sketch-icon.png',
      link: 'https://sketch.com',
      usageCount: 7340,
      tags: ['design', 'mac', 'vectors', 'symbols']
    },

    // Development Tools
    {
      id: 'vscode',
      name: 'Visual Studio Code',
      category: 'development',
      description: 'Free, open-source code editor with built-in Git integration, debugging, and extension support. Perfect for web development.',
      icon: 'fas fa-code',
      iconUrl: './cdn/images/vscode-icon.png',
      link: 'https://code.visualstudio.com',
      usageCount: 18560,
      tags: ['development', 'editor', 'coding', 'git', 'debugging']
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'development',
      description: 'Version control and collaboration platform for developers. Host code, manage projects, and collaborate with teams.',
      icon: 'fab fa-github',
      iconUrl: './cdn/images/github-icon.png',
      link: 'https://github.com',
      usageCount: 16780,
      tags: ['development', 'git', 'collaboration', 'version control']
    },
    {
      id: 'vercel',
      name: 'Vercel',
      category: 'development',
      description: 'Deploy and host modern web applications with automatic scaling, CDN, and serverless functions support.',
      icon: 'fas fa-rocket',
      iconUrl: './cdn/images/vercel-icon.png',
      link: 'https://vercel.com',
      usageCount: 9430,
      tags: ['development', 'hosting', 'deployment', 'serverless']
    },
    {
      id: 'netlify',
      name: 'Netlify',
      category: 'development',
      description: 'Build, deploy, and manage modern web projects with continuous deployment and serverless functionality.',
      icon: 'fas fa-cloud',
      iconUrl: './cdn/images/netlify-icon.png',
      link: 'https://netlify.com',
      usageCount: 8920,
      tags: ['development', 'hosting', 'jamstack', 'serverless']
    },

    // Productivity Tools
    {
      id: 'notion',
      name: 'Notion',
      category: 'productivity',
      description: 'All-in-one workspace for notes, tasks, wikis, and databases. Organize your work and life in one place.',
      icon: 'fas fa-sticky-note',
      iconUrl: './cdn/images/notion-icon.png',
      link: 'https://notion.so',
      usageCount: 14230,
      tags: ['productivity', 'notes', 'workspace', 'organization']
    },
    {
      id: 'todoist',
      name: 'Todoist',
      category: 'productivity',
      description: 'Task management app to organize your work and life. Set priorities, track progress, and collaborate on projects.',
      icon: 'fas fa-check-circle',
      iconUrl: './cdn/images/todoist-icon.png',
      link: 'https://todoist.com',
      usageCount: 11670,
      tags: ['productivity', 'tasks', 'management', 'collaboration']
    },
    {
      id: 'trello',
      name: 'Trello',
      category: 'productivity',
      description: 'Visual project management tool using boards, lists, and cards. Perfect for team collaboration and workflow management.',
      icon: 'fab fa-trello',
      iconUrl: './cdn/images/trello-icon.png',
      link: 'https://trello.com',
      usageCount: 13450,
      tags: ['productivity', 'project management', 'kanban', 'teams']
    },

    // AI Tools
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      category: 'ai',
      description: 'AI-powered conversational assistant for writing, coding, analysis, and creative tasks. Get instant help with complex problems.',
      icon: 'fas fa-robot',
      iconUrl: './cdn/images/chatgpt-icon.png',
      link: 'https://chat.openai.com',
      usageCount: 25680,
      tags: ['ai', 'chat', 'writing', 'coding', 'assistant']
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      category: 'ai',
      description: 'AI image generator that creates stunning artwork from text descriptions. Perfect for creative projects and inspiration.',
      icon: 'fas fa-magic',
      iconUrl: './cdn/images/midjourney-icon.png',
      link: 'https://midjourney.com',
      usageCount: 19870,
      tags: ['ai', 'image generation', 'art', 'creativity']
    },
    {
      id: 'claude',
      name: 'Claude',
      category: 'ai',
      description: 'Advanced AI assistant for analysis, writing, coding, and research. Helpful, harmless, and honest AI companion.',
      icon: 'fas fa-brain',
      iconUrl: './cdn/images/claude-icon.png',
      link: 'https://claude.ai',
      usageCount: 12340,
      tags: ['ai', 'assistant', 'analysis', 'writing', 'research']
    },

    // Marketing Tools
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      category: 'marketing',
      description: 'Email marketing platform with automation, analytics, and audience management. Build and grow your email list.',
      icon: 'fas fa-envelope',
      iconUrl: './cdn/images/mailchimp-icon.png',
      link: 'https://mailchimp.com',
      usageCount: 10890,
      tags: ['marketing', 'email', 'automation', 'analytics']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      category: 'marketing',
      description: 'Comprehensive CRM and marketing platform. Manage leads, automate marketing, and track customer interactions.',
      icon: 'fas fa-chart-pie',
      iconUrl: './cdn/images/hubspot-icon.png',
      link: 'https://hubspot.com',
      usageCount: 9560,
      tags: ['marketing', 'crm', 'automation', 'sales']
    },

    // Analytics Tools
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'analytics',
      description: 'Web analytics service to track and report website traffic. Understand your audience and optimize performance.',
      icon: 'fas fa-chart-bar',
      iconUrl: './cdn/images/google-analytics-icon.png',
      link: 'https://analytics.google.com',
      usageCount: 16540,
      tags: ['analytics', 'web', 'tracking', 'google', 'data']
    },
    {
      id: 'hotjar',
      name: 'Hotjar',
      category: 'analytics',
      description: 'Behavior analytics and user feedback service. See how users interact with your website through heatmaps and recordings.',
      icon: 'fas fa-fire',
      iconUrl: './cdn/images/hotjar-icon.png',
      link: 'https://hotjar.com',
      usageCount: 7890,
      tags: ['analytics', 'heatmaps', 'user behavior', 'feedback']
    },

    // Collaboration Tools
    {
      id: 'slack',
      name: 'Slack',
      category: 'collaboration',
      description: 'Team communication platform with channels, direct messages, and integrations. Keep your team connected and productive.',
      icon: 'fab fa-slack',
      iconUrl: './cdn/images/slack-icon.png',
      link: 'https://slack.com',
      usageCount: 15670,
      tags: ['collaboration', 'communication', 'teams', 'chat']
    },
    {
      id: 'zoom',
      name: 'Zoom',
      category: 'collaboration',
      description: 'Video conferencing platform for meetings, webinars, and virtual events. Connect with teams and clients worldwide.',
      icon: 'fas fa-video',
      iconUrl: './cdn/images/zoom-icon.png',
      link: 'https://zoom.us',
      usageCount: 18920,
      tags: ['collaboration', 'video', 'meetings', 'webinars']
    },

    // Writing Tools
    {
      id: 'grammarly',
      name: 'Grammarly',
      category: 'writing',
      description: 'AI-powered writing assistant that helps with grammar, spelling, and style. Improve your writing across all platforms.',
      icon: 'fas fa-spell-check',
      iconUrl: './cdn/images/grammarly-icon.png',
      link: 'https://grammarly.com',
      usageCount: 13780,
      tags: ['writing', 'grammar', 'ai', 'editing', 'spell check']
    },
    {
      id: 'hemingway',
      name: 'Hemingway Editor',
      category: 'writing',
      description: 'Writing app that makes your writing bold and clear. Highlights complex sentences and common errors.',
      icon: 'fas fa-edit',
      iconUrl: './cdn/images/hemingway-icon.png',
      link: 'https://hemingwayapp.com',
      usageCount: 6780,
      tags: ['writing', 'editing', 'clarity', 'readability']
    },

    // Finance Tools
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'finance',
      description: 'Online payment processing platform for businesses. Accept payments, manage subscriptions, and handle finances.',
      icon: 'far fa-credit-card',
      iconUrl: './cdn/images/stripe-icon.png',
      link: 'https://stripe.com',
      usageCount: 11230,
      tags: ['finance', 'payments', 'subscriptions', 'business']
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      category: 'finance',
      description: 'Accounting software for small businesses. Track expenses, manage invoices, and handle payroll.',
      icon: 'fas fa-calculator',
      iconUrl: './cdn/images/quickbooks-icon.png',
      link: 'https://quickbooks.intuit.com',
      usageCount: 8450,
      tags: ['finance', 'accounting', 'business', 'invoices']
    },

    // SEO Tools
    {
      id: 'semrush',
      name: 'SEMrush',
      category: 'seo',
      description: 'All-in-one digital marketing toolkit for SEO, PPC, content marketing, and competitive research.',
      icon: 'fas fa-search-plus',
      iconUrl: './cdn/images/semrush-icon.png',
      link: 'https://semrush.com',
      usageCount: 9670,
      tags: ['seo', 'marketing', 'research', 'keywords', 'competition']
    },
    {
      id: 'ahrefs',
      name: 'Ahrefs',
      category: 'seo',
      description: 'SEO toolset for backlink research, keyword research, competitor analysis, and rank tracking.',
      icon: 'fas fa-link',
      iconUrl: './cdn/images/ahrefs-icon.png',
      link: 'https://ahrefs.com',
      usageCount: 8340,
      tags: ['seo', 'backlinks', 'keywords', 'research', 'ranking']
    },

    // Social Media Tools
    {
      id: 'buffer',
      name: 'Buffer',
      category: 'social',
      description: 'Social media management platform to schedule posts, analyze performance, and manage multiple accounts.',
      icon: 'fas fa-share-square',
      iconUrl: './cdn/images/buffer-icon.png',
      link: 'https://buffer.com',
      usageCount: 7890,
      tags: ['social media', 'scheduling', 'analytics', 'management']
    },
    {
      id: 'hootsuite',
      name: 'Hootsuite',
      category: 'social',
      description: 'Social media management dashboard to schedule content, monitor conversations, and measure results.',
      icon: 'fas fa-bullhorn',
      iconUrl: './cdn/images/hootsuite-icon.png',
      link: 'https://hootsuite.com',
      usageCount: 6540,
      tags: ['social media', 'dashboard', 'monitoring', 'scheduling']
    }
  ],

  // Get tools by category
  getToolsByCategory: function(categoryId) {
    if (categoryId === 'all') {
      return this.tools;
    }
    return this.tools.filter(tool => tool.category === categoryId);
  },

  // Search tools
  searchTools: function(query) {
    const searchTerm = query.toLowerCase();
    return this.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  // Get popular tools (sorted by usage count)
  getPopularTools: function(limit = 6) {
    return this.tools
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  },

  // Increment tool usage
  incrementUsage: function(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      tool.usageCount += 1;
      // Save to localStorage
      this.saveUsageData();
    }
  },

  // Save usage data to localStorage
  saveUsageData: function() {
    const usageData = {};
    this.tools.forEach(tool => {
      usageData[tool.id] = tool.usageCount;
    });
    localStorage.setItem('toolUsageData', JSON.stringify(usageData));
  },

  // Load usage data from localStorage
  loadUsageData: function() {
    const savedData = localStorage.getItem('toolUsageData');
    if (savedData) {
      const usageData = JSON.parse(savedData);
      this.tools.forEach(tool => {
        if (usageData[tool.id]) {
          tool.usageCount = usageData[tool.id];
        }
      });
    }
  },

  // Get category stats
  getCategoryStats: function() {
    const stats = {};
    this.categories.forEach(cat => {
      if (cat.id !== 'all') {
        stats[cat.id] = this.getToolsByCategory(cat.id).length;
      }
    });
    return stats;
  },

  // Initialize data
  init: function() {
    this.loadUsageData();
  }
};

// Initialize data when script loads
window.ToolsData.init();