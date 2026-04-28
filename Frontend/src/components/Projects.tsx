import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, MessageSquare, ShieldCheck, Video, GraduationCap, ArrowRight } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

const projects = [
  {
    title: "SkillSwap",
    description: "A comprehensive peer-to-peer skill exchange platform. Built with a focus on real-time communication and secure transactions.",
    longDescription: "Features include JWT-based authentication, real-time chat using WebSockets, integrated video calling for sessions using WebRTC, and a secure payment gateway integration through Khalti and Stripe.",
    image: "public/assets/skillswap.png",
    tech: ["Django", "React", "WebSockets", "PostgreSQL", "TailwindCSS"],
    links: { github: "#", live: "#" },
    features: [
        { icon: <MessageSquare size={16} />, text: "Real-time Chat" },
        { icon: <Video size={16} />, text: "Video Calls" },
        { icon: <ShieldCheck size={16} />, text: "Secure Payments" }
    ],
    accent: "indigo",
    badge: "Final Year Project"
  },
  {
    title: "Blog Haven",
    description: "A modern content management and blogging platform designed for creators. Features a sleek UI and robust backend.",
    longDescription: "Complete CRUD functionality for posts and comments, user profiles, image uploading, and search functionality with category filtering.",
    image: "public/assets/bloghaven.png",
    tech: ["React", "Django REST Framework", "SQLite", "Cloudinary"],
    links: { github: "#", live: "https://blogger-s-heaven.onrender.com/" },
    features: [
        { icon: <Layers size={16} />, text: "Dynamic Routing" },
        { icon: <ShieldCheck size={16} />, text: "RBAC Auth" }
    ],
    accent: "emerald"
  },
  {
    title: "Moodary",
    description: "A secure C# desktop application for personal journaling and mood tracking with a focus on data privacy.",
    longDescription: "Features AES-256 encryption for entries, biometric-like password protection, and automated cloud backup integration.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
    tech: ["C#", ".NET Core", "SQLite", "WinForms/WPF"],
    links: { github: "#", live: "#" },
    features: [
        { icon: <ShieldCheck size={16} />, text: "AES Encryption" },
        { icon: <Layers size={16} />, text: "Cloud Sync" }
    ],
    accent: "slate"
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Featured <span className="text-indigo-500">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 max-w-xl"
            >
              A selection of my recent full-stack projects, showcasing system architecture, UI design, and problem-solving skills.
            </motion.p>
          </div>
          <motion.a 
             href="https://github.com/AdityaXD007"
             target="_blank"
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-indigo-400 font-semibold flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            View all on GitHub <ArrowRight size={18} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card p-6 md:p-10 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-indigo-500/20 transition-all"
            >
                {/* Background Accent */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-${project.accent}-500/5 blur-[100px] -z-10 group-hover:bg-${project.accent}-500/10 transition-colors`} />

              {/* Project Image */}
              <div className="lg:col-span-7 relative">
                <div className="aspect-video rounded-3xl overflow-hidden relative shadow-2xl border border-white/5">
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Mobile view features - hidden on lg */}
                <div className="flex lg:hidden flex-wrap gap-4 mt-6">
                    {project.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            {feat.icon} {feat.text}
                        </div>
                    ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                {(project as any).badge && (
                  <div className="flex items-center gap-2 mb-4 bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-500/20 w-fit">
                    <GraduationCap size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{(project as any).badge}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                    <span className={`h-[2px] w-8 bg-${project.accent}-500`} />
                    <h3 className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {project.title}
                    </h3>
                </div>
                
                <p className="text-slate-300 text-lg mb-4 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-slate-400 text-sm mb-8 italic">
                   {project.longDescription}
                </p>

                <div className="hidden lg:flex flex-wrap gap-4 mb-8">
                    {project.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5 group-hover:border-indigo-500/30 transition-all">
                            {feat.icon} {feat.text}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-bold uppercase tracking-wider text-indigo-400/80">
                      {t} {i !== project.tech.length - 1 && "•"}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ y: -3 }}
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/5"
                  >
                    <Github size={18} /> GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3 }}
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default Projects;
