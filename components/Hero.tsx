'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative w-full flex items-center overflow-hidden">
      {/* No background color here - transparent to show global bg */}
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Creative Agency
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none"
            >
              We Build
              <br />
              <span className="text-gray-400">Digital</span>{' '}
              <span className="italic font-light">Luxury</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-lg text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              A premier creative partner for visionary brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Primary: White */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/work" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide uppercase bg-white text-black rounded-full">
                  View Portfolio
                </Link>
              </motion.div>

              {/* Secondary: Glass */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide uppercase text-white bg-white/10 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Abstract Shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden lg:flex items-center justify-center h-full"
          >
            <div className="relative w-96 h-96 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="absolute w-64 h-64 border border-white/10 rotate-45" />
              <div className="absolute w-48 h-48 bg-white/5 rounded-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}