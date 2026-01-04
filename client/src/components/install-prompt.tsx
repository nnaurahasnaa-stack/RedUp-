import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is running in PWA mode
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true;

    // Check if already dismissed or installed
    const isDismissed = localStorage.getItem('redup-install-dismissed');
    const isInstalledFlag = localStorage.getItem('redup-installed');

    if (!isPWA && !isDismissed && !isInstalledFlag) {
      setShowPrompt(true);
    }

    setIsInstalled(!!isInstalledFlag);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setShowPrompt(false);
      localStorage.setItem('redup-installed', 'true');
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        localStorage.setItem('redup-installed', 'true');
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
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
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-2xl overflow-hidden border border-red-400/30">
        <div className="p-6 text-white">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 flex-shrink-0" />
              <h3 className="font-bold text-lg">Instal RedUp</h3>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm opacity-95 mb-4">
            Akses RedUp lebih cepat seperti aplikasi native. Bekerja offline dan kirim notifikasi penting!
          </p>

          {/* Features */}
          <div className="space-y-2 mb-4 text-xs opacity-90">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span>Akses instan dari home screen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔗</span>
              <span>Bekerja tanpa internet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <span>Pengalaman seperti aplikasi native</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
              Instal Sekarang
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="flex-1 text-white hover:bg-white/20 border border-white/30"
            >
              Nanti
            </Button>
          </div>
        </div>

        {/* Progress bar animation */}
        <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
      </div>
    </div>
  );
}
