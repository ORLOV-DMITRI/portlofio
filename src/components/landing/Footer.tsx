'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'GitHub' },
  { name: 'Telegram', url: 'https://t.me', icon: 'Telegram' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'LinkedIn' },
  { name: 'Email', url: 'mailto:hello@portfolio.local', icon: 'Email' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacts" className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Информация */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Frontend Engineer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Создаю современные веб-приложения с фокусом на производительность и пользовательский опыт.
            </p>
          </motion.div>

          {/* Навигация */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Навигация</h3>
            <a href="#about" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
              Обо мне
            </a>
            <a href="#experience" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
              Опыт работы
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
              Проекты
            </a>
            <a href="/blog" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
              Блог
            </a>
          </motion.div>

          {/* Соцсети */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Связаться</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 text-sm border border-border rounded-md hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Копирайт */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-border text-center text-muted-foreground text-sm"
        >
          © {currentYear} Frontend Engineer Portfolio. Все права защищены.
        </motion.div>
      </div>
    </footer>
  )
}
