'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

// Генерируем фиксированные позиции для частиц чтобы избежать гидратации
function generateParticles(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100, // Используем проценты
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    opacityDuration: Math.random() * 2 + 1,
    offsetY: Math.random() * -50 - 50, // Фиксированное смещение для анимации
  }))
}

export function HeroSection() {
  const [particles, setParticles] = useState<Array<{
    x: number
    y: number
    duration: number
    delay: number
    opacityDuration: number
  }>>([])

  // Генерируем частицы только на клиенте после монтирования
  useEffect(() => {
    setParticles(generateParticles(20))
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Фоновый эффект - градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-background to-background" />

      {/* Анимированные частицы на фоне */}
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, particle.y, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frontend Engineer
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Создаю современные, производительные и красивые веб-интерфейсы
            с использованием передовых технологий
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Смотреть проекты
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10 px-8 py-6 text-lg"
              onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Связаться
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
