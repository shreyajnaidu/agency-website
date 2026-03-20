'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Work', href: '/work' },
  { name: 'Our Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

// Create a motion component for Link to enable animations on the element itself
const MotionLink = motion(Link);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // FIX 3: Optimized Scroll Listener (requestAnimationFrame)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX 4: Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* FIX 5: Accessibility aria-label */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main Navigation">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - FIX 7: Polish scale animation */}
            <MotionLink 
              href="/" 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span
                className="text-xl font-semibold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
              >
                YourBrand
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </MotionLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => {
                // FIX 1: Correct active link logic for nested routes
                const isActive = link.href === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.1 + index * 0.05, 
                      duration: 0.5, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    <Link
                      href={link.href}
                      className="relative px-4 py-2 text-sm font-medium group"
                      // FIX 5: Accessibility aria-current
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span
                        className={`relative z-10 transition-colors duration-300 ${
                          isActive 
                            ? 'text-cyan-400' 
                            : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {link.name}
                      </span>
                      
                      <motion.div
                        className={`absolute inset-0 rounded-full ${
                          isActive 
                            ? 'bg-white/5' 
                            : 'bg-white/0 group-hover:bg-white/5'
                        } transition-colors duration-300`}
                      />
                      
                      <motion.div
                        className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"
                        initial={{ width: 0, x: '-50%' }}
                        animate={{ width: isActive ? '60%' : 0 }}
                        whileHover={{ width: '60%' }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* CTA Button - FIX 6: Tactile feedback */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="ml-4"
              >
                <MotionLink
                  href="/contact"
                  className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full overflow-hidden group"
                  whileTap={{ scale: 0.97 }} // Tactile feel
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </MotionLink>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {/* Hamburger Icon Animation Logic */}
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <motion.span
                  animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="w-full h-0.5 bg-white rounded-full origin-left"
                />
                <motion.span
                  animate={{ opacity: mobileMenuOpen ? 0 : 1, x: mobileMenuOpen ? -10 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="w-full h-0.5 bg-white rounded-full origin-left"
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                     // FIX 1 applied to mobile menu as well
                     const isActive = link.href === '/' 
                       ? pathname === '/' 
                       : pathname.startsWith(link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.1 + index * 0.05, 
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-cyan-400/10 text-cyan-400 border-l-2 border-cyan-400'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-auto"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}