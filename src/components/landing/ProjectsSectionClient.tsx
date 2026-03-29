'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[] | null
  image_url: string | null
  demo_url: string | null
  repo_url: string | null
  order: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ProjectsSectionClient({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Мои <span className="text-cyan-400">проекты</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Избранные работы, демонстрирующие мои навыки и опыт
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-muted-foreground">
              Проектов пока нет. Они появятся здесь после добавления через админ-панель.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="group overflow-hidden bg-background border-border hover:border-cyan-500/50 transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Изображение проекта */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-600/20 to-teal-600/20">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          📁
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />

                      {/* Overlay при наведении */}
                      <div className="absolute inset-0 bg-cyan-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                          >
                            Demo
                          </a>
                        )}
                        {project.repo_url && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-muted-foreground"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Информация о проекте */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
