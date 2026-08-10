import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code2 className="text-indigo-500" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code is my priority."
    },
    {
      icon: <Cpu className="text-emerald-500" />,
      title: "Backend Power",
      description: "Designing robust APIs and secure database architectures with Django."
    },
    {
      icon: <Globe className="text-indigo-500" />,
      title: "Frontend Magic",
      description: "Creating responsive and interactive UIs using React and TypeScript."
    },
    {
      icon: <Rocket className="text-emerald-500" />,
      title: "Fast Delivery",
      description: "Focusing on performance and efficient development workflows."
    }
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-8">
              Transforming Ideas into <br />
              <span className="text-indigo-500">Digital Reality</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I am a <span className="text-white font-medium">Full Stack Developer</span> a strong passion for technology, problem-solving, and building real-world applications. My journey in development started with curiosity and has grown into hands-on experience developing modern web and mobile applications.
              </p>
              <p>
                I work across the <span className="text-white font-medium">Django, React, and Next.js</span> for web development, along with <span className="text-white font-medium">Flutter and React Native for mobile applications.</span>. I enjoy bridging the gap between reliable backend systems and clean, intuitive user interfaces. Whether it's designing database structures, building REST APIs, developing responsive interfaces, or creating mobile experiences, I bring the same attention to detail to every part of the application.
              </p>
              <p>
                My goal is to build software that is <span className="text-white font-medium">functional, scalable, secure, and enjoyable</span> to use. I enjoy turning ideas into practical solutions, working in collaborative environments, and continuously learning new technologies and development practices to improve the products I build.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group"
              >
                <div className="p-3 bg-slate-900 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
