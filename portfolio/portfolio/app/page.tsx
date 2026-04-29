'use client';

import { useState } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { motion } from 'framer-motion';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'] });

// --- Color Palette ---
// Dark: #1a1410, Brown: #6b5344, Accent Brown: #8B6F47, White: #f5f1ed, Black: #0d0a08
// Bright accents: #ff6b6b (red), #ffd93d (yellow), #6bcf7f (green), #4ecdc4 (teal)

// --- Reusable UI Components ---

const MinimalNavbar = ({ darkMode, toggleDarkMode }: any) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-5 py-4 ${
        darkMode ? 'bg-[#1a1410]' : 'bg-[#f5f1ed]'
      } border-b ${darkMode ? 'border-[#6b5344]' : 'border-[#8B6F47]'}`}
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className={`text-2xl font-bold tracking-tight ${
            darkMode ? 'text-[#f5f1ed]' : 'text-[#1a1410]'
          }`}
        >
          HA
        </motion.a>

        <button
          onClick={toggleDarkMode}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
            darkMode
              ? 'border-[#6b5344] bg-[#2a2218] text-[#ffd93d]'
              : 'border-[#8B6F47] bg-white text-[#6b5344]'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </motion.nav>
  );
};

const AccentButton = ({ href, children, color, target = '_self', variant = 'solid' }: any) => {
  const isExternal = target === '_blank';
  return (
    <motion.a
      href={href}
      target={target}
      rel={isExternal ? 'noopener noreferrer' : ''}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-block px-6 py-3 text-sm font-bold transition-all cursor-pointer mb-3 mr-3 rounded-sm ${
        variant === 'solid'
          ? `text-white border-2 border-${color}`
          : 'text-[#ff6b6b] border-2 border-[#ff6b6b]'
      }`}
      style={
        variant === 'solid'
          ? { backgroundColor: color, borderColor: color }
          : { backgroundColor: 'transparent' }
      }
    >
      {children}
    </motion.a>
  );
};

const ProjectCard = ({ title, description, index, darkMode }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg border-2 transition-all ${
        darkMode
          ? 'bg-[#2a2218] border-[#6b5344] text-[#f5f1ed]'
          : 'bg-white border-[#8B6F47] text-[#1a1410]'
      }`}
    >
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const SectionTitle = ({ children, darkMode }: any) => {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.5 }}
      className={`text-4xl font-bold mb-12 pb-3 border-b-2 inline-block ${
        darkMode ? 'border-[#8B6F47] text-[#f5f1ed]' : 'border-[#6b5344] text-[#1a1410]'
      }`}
    >
      {children}
    </motion.h2>
  );
};

// --- Main Page ---

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? 'bg-[#1a1410] text-[#f5f1ed]' : 'bg-[#f5f1ed] text-[#1a1410]'
      }`}
    >
      <MinimalNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className={`${spaceGrotesk.className} max-w-4xl mx-auto px-5 pt-24 pb-20`}>
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32 mt-8"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold tracking-tight mb-4"
          >
            Hamza Arif
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`text-lg md:text-xl mb-8 max-w-3xl leading-relaxed ${
              darkMode ? 'text-[#d4ccc4]' : 'text-[#6b5344]'
            }`}
          >
            AI Undergraduate & Full-Stack Developer mapping the intersection of machine learning, avionics, and scalable web architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <AccentButton href="mailto:hamza.arif@example.com" color="#ff6b6b">
              Get in Touch
            </AccentButton>
            <AccentButton href="https://github.com/hamxa296" target="_blank" color="#4ecdc4">
              GitHub
            </AccentButton>
            <AccentButton href="#projects" color="#ffd93d">
              See Work
            </AccentButton>
          </motion.div>
        </motion.header>

        {/* Projects Section */}
        <section className="mb-32" id="projects">
          <SectionTitle darkMode={darkMode}>Featured Work</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="GIKI Chronicles"
              description="A full-stack campus guide engineered to scale, serving over 1,500 active users through a modern web ecosystem."
              index={0}
              darkMode={darkMode}
            />
            <ProjectCard
              title="VisionGuard"
              description="High-performance facial recognition security framework utilizing ResNet-10 SSD and ArcFace algorithms."
              index={1}
              darkMode={darkMode}
            />
            <ProjectCard
              title="GitShare"
              description="A structured, version-controlled file storage and collaboration platform bridging seamless data management."
              index={2}
              darkMode={darkMode}
            />
            <ProjectCard
              title="Autonomous UAS Avionics"
              description="Engineered avionics and optimized power distribution systems for three autonomous Unmanned Aerial Systems."
              index={3}
              darkMode={darkMode}
            />
          </div>
        </section>

        {/* Stack Section */}
        <section className="mb-32">
          <SectionTitle darkMode={darkMode}>Tech Stack</SectionTitle>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
            className={`space-y-4 text-base ${
              darkMode ? 'text-[#d4ccc4]' : 'text-[#6b5344]'
            }`}
          >
            <p>
              <span className="font-bold text-[#8B6F47]">Languages:</span> C++, Python, JavaScript
            </p>
            <p>
              <span className="font-bold text-[#8B6F47]">Frameworks & Tools:</span> React.js, Next.js, Firebase, OpenCV, LaTeX
            </p>
            <p>
              <span className="font-bold text-[#8B6F47]">Focus:</span> Computer Vision, Evolutionary Computation, Reinforcement Learning, and Digital Logic.
            </p>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className={`pt-6 border-t-2 ${
            darkMode ? 'border-[#6b5344]' : 'border-[#8B6F47]'
          } font-bold text-sm`}
        >
          <p>© 2026 Hamza Arif. Built with Next.js and Framer Motion.</p>
        </motion.footer>
      </main>
    </div>
  );
}