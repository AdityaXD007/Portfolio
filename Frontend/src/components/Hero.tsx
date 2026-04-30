import React, { useState, useEffect, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';
import { Link } from 'react-scroll';

const TERMINAL_LINES = [
  { text: 'const buildApp = async () => {', color: 'text-slate-300' },
  { text: '  const stack = ["Django", "React", "TypeScript"];', color: 'text-amber-300' },
  { text: '', color: 'text-slate-300' },
  { text: '  const backend = "Django";', color: 'text-emerald-400' },
  { text: '  const frontend = "React + Typescript";', color: 'text-emerald-400' },
  { text: '', color: 'text-slate-300' },
  { text: '  return "Scalable apps, shipped fast ";', color: 'text-indigo-400' },
  { text: '};', color: 'text-slate-300' },
];

const skillPills = [
  { name: "Django", highlighted: true },
  { name: "React", highlighted: true },
  { name: "TypeScript", highlighted: true },
  { name: "PostgreSQL", highlighted: false },
  { name: "AWS", highlighted: false },
  { name: "REST APIs", highlighted: false },
  { name: "Docker", highlighted: false },
];

const HeadlineTyping: React.FC = () => {
  const phrases = ["production-ready apps", "full-stack products", "things that ship", "scalable web apps"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 800);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing effect
  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1600);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 45 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-[#34d399]">
      {`${phrases[index].substring(0, subIndex)}`}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1`}>|</span>
    </span>
  );
};

const TerminalTyping: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const resetAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (currentLineIndex >= TERMINAL_LINES.length) {
      // Pause at the end, then restart
      const timeout = setTimeout(resetAnimation, 4000);
      return () => clearTimeout(timeout);
    }

    const currentLine = TERMINAL_LINES[currentLineIndex];

    if (currentCharIndex <= currentLine.text.length) {
      const typingSpeed = currentCharIndex === 0 ? 120 : 30 + Math.random() * 40;
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = {
            text: currentLine.text.slice(0, currentCharIndex),
            color: currentLine.color,
          };
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const lineDelay = 80 + Math.random() * 100;
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, isTyping, resetAnimation]);

  const isFinished = currentLineIndex >= TERMINAL_LINES.length;

  return (
    <div className="terminal-container">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot terminal-dot--red" />
          <span className="terminal-dot terminal-dot--yellow" />
          <span className="terminal-dot terminal-dot--green" />
        </div>
        <span className="terminal-filename">aditya.js</span>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body">
        <code className="terminal-code">
          {displayedLines.map((line, i) => (
            <div key={i} className={`terminal-line ${line.color}`}>
              {line.text}
            </div>
          ))}
          {!isFinished && <span className="terminal-cursor">▌</span>}
          {isFinished && <span className="terminal-cursor">▌</span>}
        </code>
      </div>

      {/* Tech Badges */}
      <div className="terminal-badges">
        {skillPills.map((skill, i) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className={`text-[10px] px-3 py-1 rounded-full border ${
              skill.highlighted 
                ? "border-[#7c3aed] text-[#a78bfa] bg-[#1a1040]" 
                : "border-[#30363d] text-[#8b949e] bg-transparent"
            }`}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };



  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#312e8115,transparent)]" />
      
      {/* Animated Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[560px]"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]"></span>
              </span>
              <span className="text-[12px] text-[#8b949e]">Available for new opportunities</span>
            </div>
          </motion.div>
          
          {/* Headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-[16px] font-medium mb-2">
              <span className="text-[#8b949e]">Hi, I'm </span>
              <span className="text-[#e6edf3]">Aditya Karki</span>
            </p>
            <h1 className="text-[42px] font-bold leading-tight text-[#e6edf3]">
              I turn ideas into <br />
              <HeadlineTyping />
            </h1>
          </motion.div>
          
          {/* Paragraph */}
          <motion.p variants={itemVariants} className="text-[15px] text-[#8b949e] leading-[1.75] mb-8">
            Full-stack developer specialized in <span className="text-[#c9d1d9] font-medium">Django & React</span>. 
            I take products from <span className="text-[#c9d1d9] font-medium">zero to shipped</span> and handle everything from database schema to pixel-perfect UI. 
            Currently open to <span className="text-[#c9d1d9] font-medium">remote roles & freelance projects</span>.
          </motion.p>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="flex items-center gap-8 mb-10">
            <div className="flex flex-col">
              <span className="text-[24px] font-bold text-[#e6edf3]">1+</span>
              <span className="text-[10px] text-[#6e7681] tracking-[0.08em] uppercase">Years Building</span>
            </div>
            <div className="w-[1px] h-10 bg-[#21262d]" />
            <div className="flex flex-col">
              <span className="text-[24px] font-bold text-[#e6edf3]">5+</span>
              <span className="text-[10px] text-[#6e7681] tracking-[0.08em] uppercase">Projects Completed</span>
            </div>
            <div className="w-[1px] h-10 bg-[#21262d]" />
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link to="projects" smooth={true}>
              <button className="bg-[#7c3aed] text-white px-6 py-3 rounded-[8px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                View Projects <ArrowRight size={16} />
              </button>
            </Link>
            <a 
              href="/Aditya_Karki_CV.pdf" 
              download="Aditya_Karki_CV.pdf"
              className="bg-transparent border border-[#30363d] text-[#c9d1d9] px-6 py-3 rounded-[8px] font-medium flex items-center gap-2 hover:bg-[#161b22] transition-colors"
            >
              Download CV <Download size={16} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10">
            <TerminalTyping />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
