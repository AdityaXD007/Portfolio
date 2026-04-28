import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Calendar, GraduationCap } from 'lucide-react';

const timelineData = [
  {
    type: 'experience',
    title: 'Full Stack Development (Self-Directed)',
    organization: 'Personal Projects',
    date: '2023 - Present',
    description: 'Building end-to-end web applications using Django and React. Focused on implementing secure authentication, real-time features, and RESTful API design.',
    skills: ['Django', 'React', 'System Design']
  },
  {
    type: 'education',
    title: 'Bachelor of Science in Computing',
    organization: 'London Metropolitan University (Via ISMT)',
    date: 'Expected 2026',
    description: 'Coursework focusing on Software Engineering, Data Structures, Algorithms, and Database Management Systems. Maintaining strong academic standing.',
    skills: ['Algorithms', 'Software Engineering', 'Databases']
  },
  {
    type: 'experience',
    title: 'Academic Projects & Collaboration',
    organization: 'University Labs',
    date: '2024 - 2025',
    description: 'Lead developer in various group projects, including a peer-to-peer skill exchange platform (SkillSwap) and a secure journaling desktop application (Moodary).',
    skills: ['Team Leadership', 'Git Workflow', 'C#']
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Journey & <span className="text-emerald-500">Milestones</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            My academic foundation and hands-on experience in software development.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-indigo-500/20" />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-6px] md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all relative group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                        {item.type === 'experience' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-indigo-500/80 font-semibold mb-3">
                      {item.organization}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                      <Calendar size={14} />
                      {item.date}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-bold text-slate-300 border border-white/5 uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Highlight Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-24 p-8 md:p-12 glass-card rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
            <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center p-8">
                    <BookOpen size={64} className="text-indigo-500" />
                </div>
            </div>
            <div className="md:w-2/3">
                <h3 className="text-3xl font-bold mb-4">Academic Excellence</h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                    Committed to continuous learning and theoretical mastery. I apply academic principles of software engineering to real-world development challenges.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Software Architecture
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Database Optimization
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Unit Testing
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Agile Methodologies
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
