import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Copy } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('karkikaaditya12345@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `New Message from ${formData.name} - Portfolio`,
          from_name: "Aditya Portfolio",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Let's <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Connect</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Have a project in mind or just want to say hi? Feel free to reach out through any of these platforms.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                I'm currently looking for internships and junior developer roles. If you think I'd be a good fit for your team, I'd love to hear from you!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-lg">karkikaaditya12345@gmail.com</p>
                      <button 
                        onClick={handleCopyEmail}
                        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-white"
                        title="Copy email"
                      >
                        {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Location</p>
                    <p className="text-white font-medium text-lg">Pokhara, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Social Profiles</h4>
              <div className="flex gap-4">
                 {[
                   { icon: <Github size={24} />, href: "https://github.com/AdityaXD007", label: "GitHub" },
                   { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/aditya-karki-5b3b3a1a5", label: "LinkedIn" }
                 ].map((social, i) => (
                   <motion.a 
                     key={i}
                     href={social.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     whileHover={{ y: -5 }}
                     className="p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all shadow-lg"
                   >
                     {social.icon}
                   </motion.a>
                 ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative bg-slate-900/30 backdrop-blur-md overflow-hidden group"
          >
             {/* Animated border effect on hover */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             
             <form onSubmit={handleSubmit} className="space-y-8 relative">
                {/* Honeypot for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group/input">
                        <input 
                            required
                            type="text" 
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full bg-slate-900/50 border-b-2 border-white/10 rounded-t-xl px-4 pt-8 pb-3 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all text-white placeholder-transparent"
                        />
                        <label 
                          htmlFor="name"
                          className="absolute left-4 top-2 text-xs font-bold text-indigo-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-500 pointer-events-none"
                        >
                          Full Name
                        </label>
                    </div>
                    
                    <div className="relative group/input">
                        <input 
                            required
                            type="email" 
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full bg-slate-900/50 border-b-2 border-white/10 rounded-t-xl px-4 pt-8 pb-3 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all text-white placeholder-transparent"
                        />
                        <label 
                          htmlFor="email"
                          className="absolute left-4 top-2 text-xs font-bold text-indigo-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-500 pointer-events-none"
                        >
                          Email Address
                        </label>
                    </div>
                </div>
                
                <div className="relative group/input">
                    <textarea 
                        required
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder=" "
                        className="peer w-full bg-slate-900/50 border-b-2 border-white/10 rounded-t-xl px-4 pt-8 pb-3 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all text-white placeholder-transparent resize-none"
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-4 top-2 text-xs font-bold text-indigo-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-500 pointer-events-none"
                    >
                      Your Message
                    </label>
                </div>

                <motion.button
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'idle' ? 1.01 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.99 : 1 }}
                  className={`w-full font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-emerald-500 text-white' 
                      : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                  } disabled:opacity-70 disabled:cursor-not-allowed group/btn`}
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        Send Message 
                        <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </motion.div>
                    )}
                    {status === 'loading' && (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center gap-3"
                      >
                        <Loader2 size={20} className="animate-spin" /> Sending...
                      </motion.div>
                    )}
                    {status === 'success' && (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 size={20} /> Sent Successfully!
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div 
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="flex items-center gap-3"
                      >
                        <AlertCircle size={20} /> Error Sending
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
             </form>

             <AnimatePresence>
               {status === 'success' && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="text-center mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                 >
                   <p className="text-emerald-500 font-medium">
                     Thanks for reaching out! I'll get back to you within 24 hours.
                   </p>
                 </motion.div>
               )}
             </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

