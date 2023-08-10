export const parseReferer = (referer: string) => {
  switch (referer) {
    case 'https://cosysoft.org/careers/devops-engeneer': return 'DevOps'
    case 'https://cosysoft.org/careers/react-middle': return 'React-разработчик Middle'
    case 'https://cosysoft.org/careers/sales-manager': return 'Sales-менеджер в IT'
    case 'https://cosysoft.org/careers/system-analyst': return 'Cистемный аналитик Middle | Senior'
    case 'https://cosysoft.org/careers/it-recruiter': return 'IT-рекрутер'
    default: return 'Не указано'
  }
}