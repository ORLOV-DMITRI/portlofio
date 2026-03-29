import { getPublicExperience } from '@/lib/public/data'
import { ExperienceSectionClient } from './ExperienceSectionClient'

export async function ExperienceSection() {
  const experiences = await getPublicExperience()

  return <ExperienceSectionClient experiences={experiences} />
}
