import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import profile from './profile'
import skill from './skill'
import experience from './experience' 
import certification from './certification'
import testimonial from './testimonial' 
import contact from './contact'
import navigation from './navigation'
import blog from './blog'
import service from './service'
import siteSettings from './siteSettings'
import achievement from './achievement'
import education from './education'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    experience,
    project,
    skill,
    testimonial,
    contact,
    navigation,
    blog,
    service,   
    education,
    certification,
    siteSettings,
    achievement,
  ],
}
