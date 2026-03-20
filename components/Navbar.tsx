'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Work', href: '/work' },
  { name: 'Our Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const MotionLink = motion(Link);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/5 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main Navigation">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <MotionLink 
              href="/" 
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-lg font-medium tracking-tight text-white">
                SYN STUDIOS
              </span>
            </MotionLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = link.href === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm font-medium tracking-wide group"
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {link.name}
                      </span>
                      
                      {/* Minimal Underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-px bg-white/50"
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? '100%' : 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MotionLink
                  href="/contact"
                  className="relative inline-flex items-center px-5 py-2 text-sm font-medium bg-white text-black rounded-full overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Inquire</span>
                </MotionLink>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }} className="w-full h-px bg-white origin-left" />
                <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-full h-px bg-white" />
                <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }} className="w-full h-px bg-white origin-left" />
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
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
            
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-white/5 backdrop-blur-xl border-l border-white/10"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => {
                     const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                     return (
                       <motion.div
                         key={link.href}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.1 + index * 0.05 }}
                       >
                         <Link
                           href={link.href}
                           onClick={() => setMobileMenuOpen(false)}
                           className={`block py-2 text-2xl font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}
                         >
                           {link.name}
                         </Link>
                       </motion.div>
                     );
                  })}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}