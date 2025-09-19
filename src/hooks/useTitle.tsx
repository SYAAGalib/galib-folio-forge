import { useEffect } from 'react';

const SITE_TITLE = "Sheikh Yeasin Ahsanullah Al-Galib | AI Engineer & Startup Founder";

export const useTitle = (pageTitle?: string) => {
  useEffect(() => {
    const title = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
    document.title = title;

    // Monitor for any title changes and revert them
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target.nodeName === 'TITLE') {
          if (document.title !== title) {
            document.title = title;
          }
        }
      });
    });

    // Watch for changes to the document title
    const titleElement = document.querySelector('title');
    if (titleElement) {
      observer.observe(titleElement, { childList: true, subtree: true });
    }

    // Also set up a fallback interval to ensure title stays correct
    const titleInterval = setInterval(() => {
      if (document.title !== title) {
        document.title = title;
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(titleInterval);
    };
  }, [pageTitle]);
};

export default useTitle;
