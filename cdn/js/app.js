// ToolFinder App - Main Application Logic
class ToolFinderApp {
  constructor() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setupTheme();
    this.renderApp();
    this.setupEventListeners();
    this.hideLoadingScreen();
  }

  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 300);
      }
    }, 1000);
  }

  renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.renderHeader()}
      <main class="main-content">
        ${this.renderHero()}
        ${this.renderStats()}
        ${this.renderCategories()}
        ${this.renderToolsGrid()}
      </main>
    `;
  }

  renderHeader() {
    return `
      <header class="header">
        <div class="header-content">
          <a href="#" class="logo">
            <i class="fas fa-tools"></i>
            ToolFinder
          </a>
          <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input
              type="text"
              class="search-input"
              placeholder="Search for tools..."
              value="${this.searchQuery}"
            />
          </div>
          <div class="header-actions">
            <button class="theme-toggle" title="Toggle theme">
              <i class="fas ${this.currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  renderHero() {
    return `
      <section class="hero">
        <h1>Discover Amazing Tools</h1>
        <p>Find the perfect tools for your projects. Curated collection of the best software, apps, and services to boost your productivity.</p>
      </section>
    `;
  }

  renderStats() {
    const totalTools = window.ToolsData.tools.length;
    const totalCategories = window.ToolsData.categories.length - 1; // Exclude 'all'
    const totalUsage = window.ToolsData.tools.reduce((sum, tool) => sum + tool.usageCount, 0);
    const popularTools = window.ToolsData.getPopularTools(1);
    const mostPopular = popularTools[0];

    return `
      <section class="stats">
        <div class="stat-card">
          <span class="stat-number">${totalTools}</span>
          <span class="stat-label">Tools Available</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">${totalCategories}</span>
          <span class="stat-label">Categories</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">${this.formatNumber(totalUsage)}</span>
          <span class="stat-label">Total Uses</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">${mostPopular ? mostPopular.name : 'N/A'}</span>
          <span class="stat-label">Most Popular</span>
        </div>
      </section>
    `;
  }

  renderCategories() {
    return `
      <section class="categories">
        <h2 class="section-title">Browse by Category</h2>
        <div class="category-filters">
          ${window.ToolsData.categories.map(category => `
            <button
              class="category-btn ${category.id === this.currentCategory ? 'active' : ''}"
              data-category="${category.id}"
            >
              <i class="${category.icon}"></i>
              ${category.name}
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderToolsGrid() {
    let tools = this.getFilteredTools();
    
    if (tools.length === 0) {
      return `
        <section class="tools-grid">
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
            <h3>No tools found</h3>
            <p style="color: var(--text-secondary);">Try adjusting your search or filter criteria.</p>
          </div>
        </section>
      `;
    }

    return `
      <section class="tools-grid">
        ${tools.map((tool, index) => this.renderToolCard(tool, index)).join('')}
      </section>
    `;
  }

  renderToolCard(tool, index) {
    const isPopular = tool.usageCount > 15000;
    
    return `
      <div class="tool-card" style="animation-delay: ${index * 0.1}s">
        ${isPopular ? '<div class="popular-badge"><i class="fas fa-fire"></i> Popular</div>' : ''}
        <div class="tool-header">
          <div class="tool-icon">
            ${tool.iconUrl ? 
              `<img src="${tool.iconUrl}" alt="${tool.name}" onerror="this.style.display='none'; this.nextSibling.style.display='flex';">
               <i class="${tool.icon}" style="display: none;"></i>` :
              `<i class="${tool.icon}"></i>`
            }
          </div>
          <div class="tool-info">
            <h3 class="tool-name">${tool.name}</h3>
            <span class="tool-category">${this.getCategoryName(tool.category)}</span>
          </div>
        </div>
        <p class="tool-description">${tool.description}</p>
        <div class="tool-footer">
          <a
            href="${tool.link}"
            class="tool-link"
            target="_blank"
            rel="noopener noreferrer"
            data-tool-id="${tool.id}"
          >
            Try it now
            <i class="fas fa-external-link-alt"></i>
          </a>
          <div class="usage-count">
            <i class="fas fa-users"></i>
            <span>${this.formatNumber(tool.usageCount)} uses</span>
          </div>
        </div>
      </div>
    `;
  }

  getFilteredTools() {
    let tools;
    
    if (this.searchQuery) {
      tools = window.ToolsData.searchTools(this.searchQuery);
    } else {
      tools = window.ToolsData.getToolsByCategory(this.currentCategory);
    }

    // Sort by usage count (most used first)
    return tools.sort((a, b) => b.usageCount - a.usageCount);
  }

  getCategoryName(categoryId) {
    const category = window.ToolsData.categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  setupEventListeners() {
    // Search functionality
    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('search-input')) {
        this.searchQuery = e.target.value;
        this.updateToolsGrid();
      }
    });

    // Category filtering
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('category-btn') || e.target.parentElement.classList.contains('category-btn')) {
        const button = e.target.classList.contains('category-btn') ? e.target : e.target.parentElement;
        const category = button.dataset.category;
        
        if (category && category !== this.currentCategory) {
          this.currentCategory = category;
          this.searchQuery = '';
          this.updateSearchInput();
          this.updateCategories();
          this.updateToolsGrid();
        }
      }
    });

    // Tool link clicks (track usage)
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('tool-link') || e.target.parentElement.classList.contains('tool-link')) {
        const link = e.target.classList.contains('tool-link') ? e.target : e.target.parentElement;
        const toolId = link.dataset.toolId;
        
        if (toolId) {
          window.ToolsData.incrementUsage(toolId);
          // Update stats in real-time
          setTimeout(() => {
            this.updateStats();
          }, 100);
        }
      }
    });

    // Theme toggle
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('theme-toggle') || e.target.parentElement.classList.contains('theme-toggle')) {
        this.toggleTheme();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Focus search with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Clear search with Escape
      if (e.key === 'Escape') {
        const searchInput = document.querySelector('.search-input');
        if (searchInput && document.activeElement === searchInput) {
          searchInput.value = '';
          this.searchQuery = '';
          this.updateToolsGrid();
          searchInput.blur();
        }
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
      themeToggle.className = `fas ${this.currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`;
    }
  }

  updateSearchInput() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = this.searchQuery;
    }
  }

  updateCategories() {
    const categoryContainer = document.querySelector('.category-filters');
    if (categoryContainer) {
      categoryContainer.innerHTML = window.ToolsData.categories.map(category => `
        <button
          class="category-btn ${category.id === this.currentCategory ? 'active' : ''}"
          data-category="${category.id}"
        >
          <i class="${category.icon}"></i>
          ${category.name}
        </button>
      `).join('');
    }
  }

  updateToolsGrid() {
    const toolsGrid = document.querySelector('.tools-grid');
    if (toolsGrid) {
      toolsGrid.innerHTML = this.renderToolsGrid().replace('<section class="tools-grid">', '').replace('</section>', '');
    }
  }

  updateStats() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsSection.innerHTML = this.renderStats().replace('<section class="stats">', '').replace('</section>', '');
    }
  }

  // Method to add new tools dynamically (for future use)
  addTool(toolData) {
    window.ToolsData.tools.push({
      id: toolData.id || this.generateId(),
      name: toolData.name,
      category: toolData.category,
      description: toolData.description,
      icon: toolData.icon || 'fas fa-tools',
      iconUrl: toolData.iconUrl || '',
      link: toolData.link,
      usageCount: toolData.usageCount || 0,
      tags: toolData.tags || []
    });
    
    this.updateToolsGrid();
    this.updateStats();
  }

  generateId() {
    return 'tool-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ToolFinderApp();
});

// Handle page visibility changes (for PWA)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Refresh data when user returns to the app
    window.ToolsData.loadUsageData();
    if (window.app) {
      window.app.updateStats();
      window.app.updateToolsGrid();
    }
  }
});

// Handle offline/online status
window.addEventListener('online', () => {
  console.log('App is back online');
});

window.addEventListener('offline', () => {
  console.log('App is offline');
});

// Export for external use
window.ToolFinderApp = ToolFinderApp;