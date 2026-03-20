'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  { id: 1, title: 'Lumina', category: 'Photography', image: 'https://picsum.photos/seed/lux1/800/1000.jpg', link: '/work/1' },
  { id: 2, title: 'Vertex', category: 'Web', image: 'https://picsum.photos/seed/lux2/800/1000.jpg', link: '/work/2' },
  { id: 3, title: 'Aura', category: 'Branding', image: 'https://picsum.photos/seed/lux3/800/1000.jpg', link: '/work/3' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function WorkPreview() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* No background color - transparent */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              Selected Work
            </h2>
            <p className="mt-4 text-gray-400 max-w-md">
              Curated projects for forward-thinking brands.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <Link href={project.link} key={project.id} className="block w-full">
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative group aspect-[3/4] overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-colors duration-500"
              >
                {/* Image - Slight opacity to let glass tint show */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 transition-colors duration-300 group-hover:text-white">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}