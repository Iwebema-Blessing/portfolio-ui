import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPhp,
  SiMongodb,
  SiPostgresql,
  SiFlutter,
  SiBootstrap,
  SiWordpress,
} from 'react-icons/si';

/**
 * Each entry renders as a floating bubble.
 * color is the logo's own brand colour, used on the SVG itself.
 * darkColor is only set where the brand colour goes muddy on black.
 */
export const techStack = [
  { id: 'html', name: 'HTML5', Icon: SiHtml5, color: '#E34F26', note: 'Structure and semantics' },
  { id: 'css', name: 'CSS3', Icon: SiCss, color: '#1572B6', note: 'Layout, motion, theming' },
  { id: 'js', name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', note: 'The language underneath it all' },
  { id: 'react', name: 'React', Icon: SiReact, color: '#61DAFB', note: 'Interfaces and state' },
  { id: 'react-native', name: 'React Native', Icon: SiReact, color: '#0FA5E9', note: 'One codebase, both stores' },
  { id: 'node', name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', note: 'APIs and services' },
  { id: 'php', name: 'PHP', Icon: SiPhp, color: '#777BB4', note: 'Server side and legacy work' },
  { id: 'mongodb', name: 'MongoDB', Icon: SiMongodb, color: '#47A248', note: 'Document database' },
  { id: 'postgres', name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', note: 'Relational database' },
  { id: 'flutter', name: 'Flutter', Icon: SiFlutter, color: '#02569B', darkColor: '#42A5F5', note: 'Android and iOS from one file tree' },
  { id: 'bootstrap', name: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3', note: 'Quick, steady layouts' },
  { id: 'wordpress', name: 'WordPress', Icon: SiWordpress, color: '#21759B', darkColor: '#5BA7CE', note: 'Sites clients can edit' },
];
