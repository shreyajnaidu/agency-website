'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// 1. Data Structure with Category Colors
const projects = [
  {
    id: 1,
    title: 'Neon Horizon',
    category: 'Photography',
    color: 'text-cyan-400',
    image: 'https://picsum.photos/seed/project1/800/600.jpg',
    link: '/work/1',
  },
  {
    id: 2,
    title: 'Cinematic Pulse',
    category: 'Videography',
    color: 'text-pink-400',
    image: 'https://picsum.photos/seed/project4/800/600.jpg',
    link: '/work/2',
  },
  {
    id: 3,
    title: 'Digital Flux',
    category: 'Web Development',
    color: 'text-purple-400',
    image: 'https://picsum.photos/seed/project2/800/600.jpg',
    link: '/work/2',
  },
  {
    id: 4,
    title: 'Brand Elevation',
    category: 'Startup Promotion',
    color: 'text-teal-400',
    image: 'https://picsum.photos/seed/project3/800/600.jpg',
    link: '/work/3',
  },
];

// 2. Animation Variants

// For Scroll Stagger (Container)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// For Scroll Entry (Individual Cards)
const cardScrollVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// For Interaction (Hover State)
const interactionVariants: Variants = {
  hidden: { scale: 1, opacity: 0.4 }, // Default state (overlay opacity 0.4)
  visible: { 
    scale: 1.05, // Image zoom
    opacity: 0.9, // Overlay opacity 0.9
    transition: { duration: 0.4, ease: 'easeOut' } 
  },
};

// For Text Reveal (Children)
const textVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function WorkPreview() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-900/10 to-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
          >
            Selected Work
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            A curated selection of our finest projects, crafted with precision and passion.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            /* ✅ FIX 3: Link is top-level for full clickable area */
            <Link 
              href={project.link} 
              key={project.id} 
              className="block w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 group"
            >
              {/* Outer Motion Div handles Scroll Entry */}
              <motion.div 
                variants={cardScrollVariants} 
                className="relative w-full h-full"
              >
                
                {/* Inner Motion Div handles Interaction State */}
                {/* ✅ FIX 1 & 2: Removed animate="hidden", used clean initial/whileHover */}
                <motion.div
                  initial="hidden"
                  whileHover="visible"
                  variants={interactionVariants}
                  className="relative w-full h-full"
                >
                  {/* Image Layer */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  {/* Overlay Layer - Controlled by interactionVariants */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent"
                  />

                  {/* Content Layer */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <motion.span
                      variants={textVariants}
                      className={`text-xs font-medium ${project.color} mb-2`}
                    >
                      {project.category}
                    </motion.span>

                    <motion.h3
                      variants={textVariants}
                      className="text-xl md:text-2xl font-semibold text-white"
                      style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.div
                      className="mt-3 flex items-center gap-2 text-sm text-white"
                      variants={textVariants}
                    >
                      <span>View Project</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}>
            <div className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
              <span>View All Work</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}