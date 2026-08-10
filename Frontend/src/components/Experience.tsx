import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Calendar, GraduationCap } from 'lucide-react';

const timelineData = [
  {
    type: 'education',
    title: 'SEE (Class 10)',
    organization: 'Vindhyaswori Adarsha Boarding School',
    date: 'Completed',
    description: 'Achieved a GPA of 3.75, building a strong academic foundation with a focus on discipline, consistency, and core subjects.',
    skills: ['ACADEMICS', 'FOUNDATION', 'DISCIPLINE']
  },
  {
    type: 'education',
    title: '+2 in Science',
    organization: 'Prativa Secondary School',
    date: 'Completed',
    description: 'Graduated with a GPA of 3.30, gaining fundamental knowledge in science and analytical thinking, which sparked interest in technology and computing.',
    skills: ['SCIENCE', 'ANALYTICAL THINKING', 'PROBLEM SOLVING']
  },
  {
    type: 'education',
    title: 'Bachelor in Information Technology (BIT)',
    organization: 'Informatics College Pokhara',
    date: 'Completed',
    description: 'Completed a Bachelor’s degree in Information Technology with a focus on software engineering, web and mobile development, databases, and system design. Developed practical skills through academic projects and real-world application development.',
    skills: ['SOFTWARE ENGINEERING', 'FULL STACK', 'PROJECT DEVELOPMENT']
  },
  {
    type: 'experience',
    title: 'Full Stack Django Developer (Intern)',
    organization: 'Xdezo Technologie',
    date: 'Completed',
    description: 'Worked on developing end-to-end web applications using Django and React. Gained hands-on experience in backend APIs, authentication systems, and real-world project workflows.',
    skills: ['DJANGO', 'REACT', 'REST API', 'FULL STACK']
  },
  {
    type: 'experience',
    title: 'Full Stack Developer',
    organization: 'Everest Technologies',
    date: 'Working',
    description: 'Worked on developing full-stack web and mobile applications using Django, React, Flutter, and React Native. Gained hands-on experience in REST APIs, authentication, database integration, UI development, and real-world application workflows.',
    skills: ['DJANGO', 'REACT', 'NextJS', 'FLUTTER', 'REACT NATIVE', 'REST API']
  }
];

const Experience: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 1.5,
          behavior: 'auto'
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return (
    <section id="experience" className="py-10 px-6">
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

        <div className="relative group">
          {/* Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto pb-[50px] pt-[50px] px-4 no-scrollbar"
          >
            <div className="relative flex gap-12 w-fit min-w-full items-center">
              {/* Central Horizontal Line - Spans full scroll width */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-indigo-500/40 hidden md:block -translate-y-1/2" />

              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center flex-shrink-0 w-[320px] md:w-[400px]"
                >
                  {/* Timeline Dot (Middle) */}
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] z-10 border-4 border-background" />

                  {/* Connector Line (Desktop) */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-indigo-500/20 hidden md:block ${index % 2 === 0 ? 'top-0 bottom-1/2' : 'top-1/2 bottom-0'
                    }`} />

                  {/* Content Card - Pushed up or down */}
                  <div className={`w-full ${index % 2 === 0
                    ? 'md:mb-[400px]' // Pushed UP
                    : 'md:mt-[400px]' // Pushed DOWN
                    }`}>
                    <div className="glass-card p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all relative group h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                          {item.type === 'experience' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                          {item.type}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-indigo-500/80 text-sm font-semibold mb-3">
                        {item.organization}
                      </p>

                      <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-4">
                        <Calendar size={12} />
                        {item.date}
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded-full bg-slate-900 text-[9px] font-bold text-slate-300 border border-white/5 uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Dot */}
                  <div className="md:hidden absolute -left-2 top-0 bottom-0 w-[2px] bg-indigo-500/10">
                    <div className="absolute top-8 -left-[5px] w-3 h-3 rounded-full bg-indigo-500" />
                  </div>
                </motion.div>
              ))}
            </div>
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
