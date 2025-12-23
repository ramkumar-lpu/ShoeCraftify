import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, RefreshCw, Box, Send } from 'lucide-react';

const Suggestion = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- New Download Logic ---
  const handleDownload = async () => {
    if (!image) return;
    
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      // Set the filename for the download
      link.download = `ShoeCreatify-${Date.now()}.png`; 
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download image. Please try again.");
    }
  };
  // ---------------------------

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/shoe/generate-shoe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.success) setImage(data.imageUrl);
    } catch (err) {
      console.error("Failed to generate shoe", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <header className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            ShoeCreatify
          </h1>
          <p className="mt-4 text-neutral-400 max-w-md text-lg">
            Turn your imagination into premium 3D concepts with the power of generative AI.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="p-8 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl shadow-2xl">
              <label className="block text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">
                Design Prompt
              </label>
              <textarea
                rows="4"
                className="w-full bg-neutral-800 border border-white/5 rounded-2xl p-4 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                placeholder="e.g. Cyberpunk high-top sneakers..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full mt-6 bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Generate Design</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Box className="w-5 h-5 mx-auto mb-2 text-indigo-400" />
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-tighter">3D Ready</span>
               </div>
               <div 
                 onClick={handleDownload} 
                 className={`p-4 rounded-2xl bg-white/5 border border-white/5 text-center cursor-pointer transition-all ${!image ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-white/10'}`}
               >
                  <Download className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-tighter">HD Export</span>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 aspect-square lg:aspect-video rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm overflow-hidden relative flex items-center justify-center shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" className="flex flex-col items-center gap-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
                  </div>
                  <p className="text-neutral-400 animate-pulse font-medium tracking-wide">Synthesizing...</p>
                </motion.div>
              ) : image ? (
                <motion.div key="result" className="relative group w-full h-full p-8">
                  <img src={image} alt="Design" className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(79,70,229,0.3)]" />
                  <div className="absolute bottom-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Actionable Download Button */}
                    <button 
                      onClick={handleDownload}
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button onClick={handleGenerate} className="p-3 bg-indigo-600 rounded-full border border-indigo-400 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/40">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" className="text-center p-12">
                  <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Box className="w-10 h-10 text-neutral-600" />
                  </div>
                  <p className="text-neutral-500 text-lg max-w-xs mx-auto">Waiting for input...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Suggestion;