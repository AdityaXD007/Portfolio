import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "ReactNative", "TypeScript",]
  },
  {
    title: "Backend",
    skills: ["Django", "Django REST Framework", "Flutter"]
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "SQLite", "MongoDB"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "Postman","Linux", "AWS (Basic)", "Firebase"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Technical <span className="text-emerald-500">Arsenal</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            A comprehensive set of tools and technologies I use to bring complex ideas to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-white/5 text-sm text-slate-300 font-medium hover:border-indigo-500/40 hover:text-indigo-400 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Status / Focus */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 p-8 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
            <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold text-white">Current Focus & Learning</h4>
                <p className="text-slate-400">Deepening my knowledge in Microservices architecture and Kubernetes.</p>
            </div>
            <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center animate-bounce">
                    🚀
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center animate-bounce delay-100">
                    ☁️
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center animate-bounce delay-200">
                    🛠️
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
