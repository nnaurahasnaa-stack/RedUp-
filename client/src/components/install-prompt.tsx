import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is running in PWA mode
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true;

    // Check if iOS
    const iosCheck = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iosCheck);

    // Check if already dismissed or installed
    const isDismissed = localStorage.getItem('redup-install-dismissed');
    const isInstalledFlag = localStorage.getItem('redup-installed');

    if (!isPWA && !isDismissed && !isInstalledFlag) {
      setShowPrompt(true);
    }

    setIsInstalled(!!isInstalledFlag);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('beforeinstallprompt event fired', e);
      if (!isPWA && !isDismissed && !isInstalledFlag) {
        setShowPrompt(true);
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('App installed');
      setShowPrompt(false);
      localStorage.setItem('redup-installed', 'true');
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Fallback: Show prompt even without beforeinstallprompt event in some browsers
    const timer = setTimeout(() => {
      if (!isPWA && !isDismissed && !isInstalledFlag && !showPrompt) {
        console.log('Fallback: showing install prompt');
        setShowPrompt(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    console.log('Install clicked, deferredPrompt:', deferredPrompt);
    
    if (deferredPrompt) {
      try {
        (deferredPrompt as any).prompt();
        const { outcome } = await (deferredPrompt as any).userChoice;
        
        console.log('Install outcome:', outcome);
        if (outcome === 'accepted') {
          localStorage.setItem('redup-installed', 'true');
          setIsInstalled(true);
        }
        
        setDeferredPrompt(null);
        setShowPrompt(false);
      } catch (error) {
        console.error('Install error:', error);
      }
    } else if (isIOS) {
      // Show iOS instruction
      alert('Untuk iOS:\n1. Tap Share\n2. Tap "Add to Home Screen"\n3. Tap "Add"');
    } else {
      alert('Install tidak tersedia di browser Anda. Coba gunakan Chrome atau Edge.');
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('redup-install-dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Download className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm md:text-base">
                {isIOS ? 'Tambahkan RedUp ke Home Screen' : 'Instal RedUp sebagai aplikasi'}
              </p>
              <p className="text-xs md:text-sm opacity-90 truncate">Akses lebih cepat dan bekerja offline</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleInstall}
              size="sm"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
              {isIOS ? 'Instruksi' : 'Instal'}
            </Button>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
