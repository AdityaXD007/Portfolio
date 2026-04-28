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
                I am a Full Stack Developer with a deep-seated passion for technology and problem-solving. My journey in development started with curiosity and has evolved into a career focused on building real-world applications that solve complex problems.
              </p>
              <p>
                Currently, I specialize in the <span className="text-white font-medium">Django + React</span> ecosystem. I enjoy bridging the gap between sophisticated backend logic and elegant frontend presentation. Whether it's architecting a database schema or polishing a CSS animation, I bring the same level of dedication to every layer of the stack.
              </p>
              <p>
                My goal is to build software that is not only functional but also intuitive and secure. I thrive in collaborative environments and am always looking to learn and grow with the latest industry standards.
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
