/**
 * Fallback copy. The same fields come from the API at /api/settings,
 * and anything the admin saves there wins over what is written here.
 */
export const siteFallback = {
  name: 'Blessing Iwebema',
  role: 'Web and mobile developer',
  email: 'iwebemablessing9@gmail.com',
  whatsapp: '+2348123241847',
  location: 'Lagos, Nigeria — working remotely',
  headline: 'I build web and mobile products people actually get on with.',
  subline:
    'Three years of shipping sites and apps that load fast, move smoothly and make the next step obvious.',
  mission:
    'To help businesses turn their ideas, expertise and ambition into digital products that people understand, trust and enjoy using.',
  missionPoints: [
    'Start with the business problem',
    'Design around real customer needs',
    'Build for performance and growth',
  ],
  vision:
    'To become a leading remote engineering studio recognized globally for redefining web interactivity, fluid motion design, and seamless e-commerce user experiences.',
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About us', to: '/about' },
  { label: 'Contact us', to: '/contact' },
];
