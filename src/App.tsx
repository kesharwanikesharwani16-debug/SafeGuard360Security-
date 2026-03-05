import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldCheck, Search, RefreshCw, Settings, Lock, Globe, Cpu, Bell,
  ChevronRight, Zap, CheckCircle2, AlertTriangle, Info, CreditCard, Star,
  Users, Download, ExternalLink, Menu, X, Activity, Wifi, Database, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Toast = ({ message, type, onClose }: { message: string, type: 'info' | 'success' | 'warning', onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
      type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
      type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
      'bg-blue-500/10 border-blue-500/20 text-blue-400'
    } backdrop-blur-xl`}
  >
    {type === 'success' ? <CheckCircle2 size={20} /> : type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
    <p className="font-medium">{message}</p>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
      <X size={16} />
    </button>
  </motion.div>
);

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'info' | 'success' | 'warning' }[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowInstallModal(true), 5000);
    });

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      showToast('SafeGuard 360 installed successfully!', 'success');
    });
  }, []);

  const showToast = (message: string, type: 'info' | 'success' | 'warning') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    showToast('Smart Scan initiated...', 'info');
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          showToast('Scan complete. Your system is secure.', 'success');
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const menuItems = [
    { id: 'dashboard', icon: Shield, label: 'Dashboard' },
    { id: 'security', icon: Lock, label: 'Device Security' },
    { id: 'identity', icon: Users, label: 'Identity Safety' },
    { id: 'privacy', icon: Globe, label: 'Online Privacy' },
    { id: 'performance', icon: Cpu, label: 'Performance' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-sg-dark text-white flex overflow-hidden sg-gradient">
      <motion.aside animate={{ width: isSidebarOpen ? 280 : 80 }} className="glass border-r border-white/5 flex flex-col z-50">
        <div className="p-6 flex items-center gap-4 border-bottom border-white/5">
          <div className="w-10 h-10 bg-sg-yellow rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,210,0,0.3)]">
            <Shield className="text-black" size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">SafeGuard <span className="text-sg-yellow">360</span></span>}
        </div>
        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-sg-yellow text-black font-bold shadow-lg' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={22} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => setShowInstallModal(true)} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sg-yellow">
            <Download size={22} />
            {isSidebarOpen && <span className="font-bold">Install App</span>}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Menu size={20} /></button>
            <h2 className="text-lg font-medium text-neutral-400">System Status: <span className="text-emerald-400 font-bold">Protected</span></h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium"><CheckCircle2 size={16} />Real-time Protection Active</div>
            <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-sg-yellow rounded-full shadow-[0_0_10px_rgba(255,210,0,0.5)]"></span></button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sg-yellow to-yellow-600 flex items-center justify-center font-bold text-black">JD</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            <section className="relative overflow-hidden rounded-3xl glass p-12 border border-white/10">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-sg-yellow/10 border border-sg-yellow/20 rounded-full text-sg-yellow text-xs font-bold uppercase tracking-wider"><Zap size={14} />Premium Protection</div>
                  <h1 className="text-5xl font-bold leading-tight">Your Digital Life, <br /><span className="text-sg-yellow">Completely Secured.</span></h1>
                  <p className="text-neutral-400 text-lg leading-relaxed">Advanced multi-layered security for your devices, identity, and online privacy. SafeGuard 360 keeps you safe from evolving cyber threats.</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={startScan} disabled={isScanning} className="px-8 py-4 bg-sg-yellow text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all flex items-center gap-3 shadow-xl shadow-sg-yellow/20 disabled:opacity-50">
                      {isScanning ? <RefreshCw className="animate-spin" size={20} /> : <Shield size={20} />}
                      {isScanning ? `Scanning... ${scanProgress}%` : 'Run Smart Scan'}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <motion.div animate={{ scale: isScanning ? [1, 1.05, 1] : 1, rotate: isScanning ? [0, 5, -5, 0] : 0 }} transition={{ repeat: Infinity, duration: 2 }} className="w-64 h-64 bg-sg-yellow/5 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border-2 border-dashed border-sg-yellow/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="w-48 h-48 bg-sg-yellow/10 rounded-full flex items-center justify-center"><ShieldCheck className="text-sg-yellow" size={100} /></div>
                  </motion.div>
                </div>
              </div>
              {isScanning && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${scanProgress}%` }} className="h-full bg-sg-yellow shadow-[0_0_15px_rgba(255,210,0,0.8)]" />
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showInstallModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-sg-dark border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-sg-yellow/10 rounded-xl flex items-center justify-center"><Download className="text-sg-yellow" size={24} /></div>
                <button onClick={() => setShowInstallModal(false)} className="text-neutral-500 hover:text-white transition-colors"><X size={20} /></button>
              </div>
              <h3 className="text-2xl font-bold mb-2">Download SafeGuard 360</h3>
              <p className="text-neutral-400 mb-6">To create a desktop icon and install the full application, please follow these steps:</p>
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-sg-yellow text-black flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <div className="space-y-3 flex-1">
                    <p className="text-sm text-neutral-300">Browser security requires you to open the app in a full tab first.</p>
                    <a href={window.location.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-sg-yellow text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition-all">Open in New Tab <ExternalLink size={14} /></a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-sg-yellow text-black flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <p className="text-sm text-neutral-300">In the new tab, click the <span className="text-white font-bold">Install</span> icon in your address bar or browser menu.</p>
                </div>
              </div>
              <button onClick={() => setShowInstallModal(false)} className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">Got it</button>
            </motion.div>
          </motion.div>
        )}
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default App;
