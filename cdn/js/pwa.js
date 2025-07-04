// PWA Functionality - Service Worker Registration and Installation
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.installButton = null;
    this.dismissButton = null;
    this.banner = null;
    this.init();
  }

  init() {
    this.setupElements();
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.setupEventListeners();
    this.checkInstallability();
  }

  setupElements() {
    this.banner = document.getElementById('pwa-install-banner');
    this.installButton = document.getElementById('pwa-install-btn');
    this.dismissButton = document.getElementById('pwa-dismiss-btn');
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./cdn/sw.js');
        console.log('Service Worker registered successfully:', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              this.showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('✅ beforeinstallprompt event triggered');
      
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Store the event for later use
      this.deferredPrompt = e;
      
      // Show custom install banner
      this.showInstallBanner();
    });

    // Handle successful installation
    window.addEventListener('appinstalled', (e) => {
      console.log('🎉 App installed successfully');
      this.hideInstallBanner();
      this.deferredPrompt = null;
      
      // Track installation
      this.trackInstallation();
    });

    // Add additional debugging
    console.log('🔧 PWA Install Prompt Setup Complete');
    console.log('📱 User Agent:', navigator.userAgent);
    console.log('🌐 Protocol:', location.protocol);
    console.log('💻 Platform:', this.getPlatform());
    
    // Check installation criteria manually
    setTimeout(() => {
      console.log('📋 PWA Installation Check:');
      console.log('  • HTTPS/Localhost:', location.protocol === 'https:' || location.hostname === 'localhost');
      console.log('  • Service Worker:', 'serviceWorker' in navigator);
      console.log('  • Manifest:', !!document.querySelector('link[rel="manifest"]'));
      console.log('  • Install Prompt Available:', !!this.deferredPrompt);
      console.log('  • Already Standalone:', this.isStandalone());
      
      if (!this.deferredPrompt && !this.isStandalone()) {
        console.log('⚠️  Install prompt not available. Try:');
        console.log('    • Chrome: ⋮ Menu → Install ToolFinder');
        console.log('    • Edge: ⋯ Menu → Apps → Install this site as an app');
        console.log('    • Safari: Share → Add to Home Screen');
      }
    }, 2000);
  }

  setupEventListeners() {
    // Install button click
    if (this.installButton) {
      this.installButton.addEventListener('click', () => {
        this.installApp();
      });
    }

    // Dismiss button click
    if (this.dismissButton) {
      this.dismissButton.addEventListener('click', () => {
        this.dismissInstallBanner();
      });
    }

    // Handle PWA launch
    window.addEventListener('load', () => {
      if (this.isStandalone()) {
        console.log('App launched in standalone mode');
        this.handleStandaloneMode();
      }
    });
  }

  checkInstallability() {
    // Check if app is already installed
    if (this.isStandalone()) {
      console.log('✅ App is already installed and running in standalone mode');
      return;
    }

    // Check if user has dismissed the banner recently
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const currentTime = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    // Show banner if not dismissed or dismissed more than 3 days ago
    if (!dismissed || (currentTime - dismissedTime) > (dayInMs * 3)) {
      // Show banner after a delay
      setTimeout(() => {
        if (!this.isStandalone()) {
          console.log('🔔 Showing install banner');
          this.showInstallBanner();
        }
      }, 5000); // Show after 5 seconds (reduced from 10)
      
      // If still no prompt after longer delay, show manual instructions
      setTimeout(() => {
        if (!this.deferredPrompt && !this.isStandalone()) {
          console.log('📖 Showing manual installation instructions');
          this.showManualInstallPrompt();
        }
      }, 15000); // Show manual instructions after 15 seconds
    }
  }

  showManualInstallPrompt() {
    // Only show if banner is not already visible
    if (!this.banner || this.banner.classList.contains('hidden')) {
      this.showInstallBanner();
      
      // Update banner content for manual installation
      if (this.banner) {
        const bannerText = this.banner.querySelector('.pwa-banner-text');
        if (bannerText) {
          bannerText.innerHTML = `
            <h3>Install ToolFinder App</h3>
            <p><strong>Manual Installation:</strong> Use your browser's menu to install this app.</p>
          `;
        }
      }
    }
  }

  showInstallBanner() {
    if (this.banner && !this.isStandalone()) {
      this.banner.classList.remove('hidden');
      
      // Animate in
      setTimeout(() => {
        this.banner.style.transform = 'translateY(0)';
        this.banner.style.opacity = '1';
      }, 100);
    }
  }

  hideInstallBanner() {
    if (this.banner) {
      this.banner.classList.add('hidden');
    }
  }

  dismissInstallBanner() {
    this.hideInstallBanner();
    
    // Remember dismissal
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  }

  async installApp() {
    if (!this.deferredPrompt) {
      console.log('No install prompt available');
      // Show a helpful message to the user
      this.showInstallInstructions();
      return;
    }

    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`User response to install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        // Show success message
        this.showInstallSuccess();
      } else {
        console.log('User dismissed the install prompt');
        this.dismissInstallBanner();
      }
      
      // Clear the prompt
      this.deferredPrompt = null;
    } catch (error) {
      console.error('Error during app installation:', error);
      this.showInstallError(error.message);
    }
  }

  showInstallInstructions() {
    const notification = document.createElement('div');
    notification.className = 'install-instructions';
    notification.innerHTML = `
      <div class="install-content">
        <i class="fas fa-info-circle"></i>
        <div>
          <h3>Install ToolFinder</h3>
          <p>To install this app:</p>
          <ul>
            <li><strong>Chrome/Edge:</strong> Click the install icon in the address bar</li>
            <li><strong>Safari:</strong> Tap Share → Add to Home Screen</li>
            <li><strong>Firefox:</strong> Use "Install" from the menu</li>
          </ul>
        </div>
        <button class="close-instructions">Got it</button>
      </div>
    `;

    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      right: 20px;
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-large);
      z-index: 9999;
      padding: 1.5rem;
      max-width: 500px;
      margin: 0 auto;
    `;

    document.body.appendChild(notification);

    // Handle close button
    notification.querySelector('.close-instructions').addEventListener('click', () => {
      notification.remove();
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
  }

  showInstallSuccess() {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 1.5rem;"></i>
        <span>App installed successfully!</span>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-large);
      z-index: 9999;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  showInstallError(errorMessage) {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <i class="fas fa-exclamation-triangle" style="color: white; font-size: 1.5rem;"></i>
        <div>
          <strong>Installation failed</strong>
          <br><small>${errorMessage}</small>
        </div>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--danger-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-large);
      z-index: 9999;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
    );
  }

  handleStandaloneMode() {
    // Add standalone-specific styles or behavior
    document.body.classList.add('standalone-mode');
    
    // Hide install banner
    this.hideInstallBanner();
    
    // Add app-specific behaviors for standalone mode
    this.setupStandaloneFeatures();
  }

  setupStandaloneFeatures() {
    // Add status bar padding for iOS
    if (this.isIOS()) {
      document.body.style.paddingTop = 'env(safe-area-inset-top)';
    }

    // Handle back button for Android
    if (this.isAndroid()) {
      window.addEventListener('beforeunload', (e) => {
        // Custom back button handling if needed
      });
    }
  }

  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  isAndroid() {
    return /Android/.test(navigator.userAgent);
  }

  showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-content">
        <i class="fas fa-download"></i>
        <span>New version available!</span>
        <button class="update-btn">Update</button>
        <button class="dismiss-update">Later</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 1rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-large);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Handle update button
    notification.querySelector('.update-btn').addEventListener('click', () => {
      window.location.reload();
    });

    // Handle dismiss button
    notification.querySelector('.dismiss-update').addEventListener('click', () => {
      notification.remove();
    });

    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
  }

  trackInstallation() {
    // Track app installation analytics
    try {
      // You can add analytics tracking here
      console.log('App installation tracked');
      
      // Save installation date
      localStorage.setItem('app-installed-date', Date.now().toString());
      
      // You could send this data to your analytics service
      // analytics.track('app_installed', { timestamp: Date.now() });
    } catch (error) {
      console.error('Error tracking installation:', error);
    }
  }

  // Method to check if app updates are available
  async checkForUpdates() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      }
    }
  }

  // Method to get app info
  getAppInfo() {
    return {
      isInstalled: this.isStandalone(),
      isInstallable: !!this.deferredPrompt,
      platform: this.getPlatform(),
      userAgent: navigator.userAgent,
      installDate: localStorage.getItem('app-installed-date')
    };
  }

  // Debug PWA installability
  async debugInstallability() {
    const checks = {
      serviceWorker: 'serviceWorker' in navigator,
      https: location.protocol === 'https:' || location.hostname === 'localhost',
      manifest: document.querySelector('link[rel="manifest"]') !== null,
      beforeInstallPrompt: !!this.deferredPrompt,
      standalone: this.isStandalone()
    };

    // Check if manifest is valid
    if (checks.manifest) {
      try {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        const response = await fetch(manifestLink.href);
        const manifest = await response.json();
        checks.manifestValid = !!(manifest.name && manifest.start_url && manifest.icons);
        checks.manifestIcons = manifest.icons ? manifest.icons.length : 0;
      } catch (error) {
        checks.manifestValid = false;
        checks.manifestError = error.message;
      }
    }

    // Check service worker registration
    if (checks.serviceWorker) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        checks.serviceWorkerRegistered = !!registration;
        checks.serviceWorkerActive = !!(registration && registration.active);
      } catch (error) {
        checks.serviceWorkerRegistered = false;
        checks.serviceWorkerError = error.message;
      }
    }

    console.log('PWA Installability Check:', checks);
    return checks;
  }

  getPlatform() {
    if (this.isIOS()) return 'iOS';
    if (this.isAndroid()) return 'Android';
    if (navigator.userAgent.includes('Windows')) return 'Windows';
    if (navigator.userAgent.includes('Mac')) return 'macOS';
    if (navigator.userAgent.includes('Linux')) return 'Linux';
    return 'Unknown';
  }
}

// Initialize PWA Manager
document.addEventListener('DOMContentLoaded', () => {
  window.pwaManager = new PWAManager();
  
  // Debug installability after a short delay
  setTimeout(async () => {
    const debugInfo = await window.pwaManager.debugInstallability();
    
    // Provide helpful console messages
    if (!debugInfo.beforeInstallPrompt && !debugInfo.standalone) {
      console.log('💡 PWA Install Tip: The app may already be installed, or the browser doesn\'t support installation yet.');
      console.log('📱 Try these options:');
      console.log('  • Chrome/Edge: Look for install icon in address bar');
      console.log('  • Safari: Share → Add to Home Screen');
      console.log('  • Firefox: ☰ Menu → Install');
    }
  }, 3000);
});

// Add CSS animation for update notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .update-notification .update-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .update-notification button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .update-notification .update-btn {
    background: white;
    color: var(--primary-color);
  }

  .update-notification .update-btn:hover {
    background: #f1f5f9;
  }

  .update-notification .dismiss-update {
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .update-notification .dismiss-update:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Standalone mode styles */
  .standalone-mode {
    user-select: none;
    -webkit-user-select: none;
  }

  .standalone-mode .header {
    padding-top: env(safe-area-inset-top);
  }
`;

document.head.appendChild(style);

// Export for external use
window.PWAManager = PWAManager;