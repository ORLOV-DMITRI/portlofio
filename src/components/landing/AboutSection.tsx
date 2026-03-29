'use client'

import { motion } from 'framer-motion'

const skills = [
  { name: 'React', icon: '⚛️', level: 95 },
  { name: 'Next.js', icon: '▲', level: 90 },
  { name: 'TypeScript', icon: '📘', level: 92 },
  { name: 'Tailwind CSS', icon: '🎨', level: 95 },
  { name: 'Node.js', icon: '📦', level: 80 },
  { name: 'Supabase', icon: '🔷', level: 85 },
  { name: 'PostgreSQL', icon: '🐘', level: 75 },
  { name: 'Git', icon: '📝', level: 88 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Обо <span className="text-cyan-400">мне</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Frontend-разработчик с страстью к созданию красивых и функциональных интерфейсов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Фото / Аватар */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl rotate-6 opacity-50 blur-lg" />
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-600/20 to-teal-600/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>

          {/* Информация */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground">
              Привет! Я Frontend Engineer 👋
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Специализируюсь на создании современных веб-приложений с использованием React, Next.js и TypeScript.
              Люблю решать сложные задачи и постоянно учусь новому.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Мой подход — это баланс между производительностью, доступностью и красивым дизайном.
              Верю, что хороший код должен быть не только функциональным, но и приятным для чтения.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Supabase'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Технологии */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Технологии</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group p-4 bg-background border border-border rounded-xl hover:border-cyan-500/50 transition-colors"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <div className="font-medium mb-2">{skill.name}</div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-600 to-teal-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
