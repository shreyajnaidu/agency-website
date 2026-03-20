'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// ✅ FIX: Explicitly typed Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut", // ✅ Replaced cubic-bezier array
    },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut", // ✅ Replaced cubic-bezier array
    },
  },
};

const services = [
  'Photography',
  'Videography',
  'Web Development',
  'Startup Promotion',
];

export default function Hero() {
  return (
    <section className="relative w-full flex items-center overflow-hidden bg-slate-950">
      
      {/* Background Grid & Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Height calc subtracts navbar height (5rem = 80px) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                Creative Agency
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight md:leading-[1.1]"
              style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
            >
              We Build Digital{' '}
              {/* Animated Gradient Text */}
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0% 50%', '200% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Experiences
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              A full-service creative studio specializing in photography, videography, 
              web development, and startup promotion.
            </motion.p>

            {/* Service Tags with Hover Lift */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
              {services.map((service) => (
                <span 
                  key={service}
                  className="text-xs font-medium text-slate-400 bg-white/5 px-3 py-1 rounded border border-white/10 transition-transform hover:scale-105 cursor-default"
                >
                  {service}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Primary Button */}
              <motion.div
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
                whileTap={{ scale: 0.96 }}
              >
                <Link href="/work">
                  <span className="relative z-10">View Our Work</span>
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Abstract Visuals */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center h-full"
          >
            <div className="relative w-full h-[500px]">
              
              {/* Abstract Shape 1 (Central Glass Card) */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/20 overflow-hidden"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent" />
                
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 mb-4" />
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                </div>
              </motion.div>

              {/* Abstract Shape 2 (Orb Top Right) */}
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 opacity-60"
                style={{ filter: 'blur(40px)', willChange: 'transform' }}
              />

              {/* Abstract Shape 3 (Orb Bottom Left) */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-bl from-teal-400 to-blue-600 opacity-50"
                style={{ filter: 'blur(40px)', willChange: 'transform' }}
              />

              {/* Rotating Geometric elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-64 h-64 border border-white/5 rounded-full"
                style={{ willChange: 'transform' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-80 h-80 border border-dashed border-white/5 rounded-full"
                style={{ willChange: 'transform' }}
              />
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}