'use client'

import { motion } from 'framer-motion'

interface Experience {
  id: string
  company: string
  position: string
  start_date: string
  end_date: string | null
  description: string
  order: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export function ExperienceSectionClient({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Опыт <span className="text-cyan-400">работы</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мой профессиональный путь в разработке
          </p>
        </motion.div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <p className="text-muted-foreground">
              Записей об опыте работы пока нет.
            </p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Вертикальная линия */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-600 via-teal-600 to-cyan-600" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-12"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Точка на линии */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-600 rounded-full border-4 border-background z-10" />

                  {/* Контент */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-card border border-border rounded-xl hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="flex flex-col gap-2 mb-4">
                        <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
                        <div className="text-cyan-400 font-medium">{exp.company}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(exp.start_date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })} — {exp.end_date ? new Date(exp.end_date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' }) : 'Настоящее время'}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                    </motion.div>
                  </div>

                  {/* Пустое пространство для балансировки */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
