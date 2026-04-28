import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Let's <span className="text-indigo-500">Connect</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
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
            className="space-y-10"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-8 text-lg">
                I'm currently looking for internships and junior developer roles. If you think I'd be a good fit for your team, I'd love to hear from you!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email</p>
                    <p className="text-white font-medium text-lg">karkikaaditya12345@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
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
                 <a href="#" className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all">
                   <Github size={24} />
                 </a>
                 <a href="#" className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all">
                   <Linkedin size={24} />
                 </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] -z-10" />
             
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">Name</label>
                        <input 
                            type="text" 
                            placeholder="Your Name"
                            className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">Email</label>
                        <input 
                            type="email" 
                            placeholder="your-email@example.com"
                            className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">Message</label>
                    <textarea 
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                    />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 transition-all"
                >
                  Send Message <Send size={20} />
                </motion.button>
             </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
