// utils/tabLock.ts
export const setupTabLock = () => {
    // Prevent right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  
    // Prevent keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === 'Tab' || e.key === 't' || e.key === 'T')) {
        e.preventDefault();
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault(); // Block DevTools
      }
    });
  
    // Fullscreen API to discourage switching
    const requestFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.error);
      }
    };
  
    // Re-enter fullscreen if exited
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) requestFullscreen();
    });
  
    requestFullscreen();
  };
  
  // To use: Call `setupTabLock()` when quiz starts