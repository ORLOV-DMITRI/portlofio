import { getPublicProjects } from '@/lib/public/data'
import { ProjectsSectionClient } from './ProjectsSectionClient'

export async function ProjectsSection() {
  const projects = await getPublicProjects()

  return <ProjectsSectionClient projects={projects} />
}
