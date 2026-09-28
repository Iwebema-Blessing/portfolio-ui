/**
 * Bento layout uses the span field: 'wide', 'tall' or 'normal'.
 * Add an entry and the grid picks it up.
 */
export const services = [
  {
    id: 'websites',
    title: 'Websites that earn their keep',
    body: 'Marketing sites, company sites and landing pages built in React. Fast on a mid range phone, easy to update, and set up so search engines can read them.',
    points: ['React and Next', 'Content you can edit yourself', 'Speed budget on every page'],
    span: 'wide',
  },
  {
    id: 'ecommerce',
    title: 'Online stores',
    body: 'Product pages, carts and checkouts that do not lose people halfway. Payment, stock and orders wired into one dashboard.',
    points: ['Checkout that converts', 'Payments and orders', 'Stock in one place'],
    span: 'normal',
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    body: 'Android and iOS from one codebase with Flutter or React Native, including the API behind it and the release to both stores.',
    points: ['Flutter and React Native', 'Offline first where it helps', 'Store release handled'],
    span: 'tall',
  },
  {
    id: 'backend',
    title: 'APIs and dashboards',
    body: 'Node and Express services on MongoDB or PostgreSQL, with an admin area your team can run without calling a developer.',
    points: ['Node, Express, Mongo, Postgres', 'Roles and permissions', 'Admin built for non developers'],
    span: 'normal',
  },
  {
    id: 'motion',
    title: 'Motion and interaction',
    body: 'Scroll work, transitions and small interactions that explain what just changed instead of showing off.',
    points: ['Framer Motion and GSAP', 'Scroll led storytelling', 'Reduced motion respected'],
    span: 'normal',
  },
  {
    id: 'care',
    title: 'Fixes and upkeep',
    body: 'Taking over a site that is slow, broken or stuck on an old stack, and keeping it healthy after launch.',
    points: ['Speed and bug work', 'WordPress rescue', 'Monthly upkeep'],
    span: 'normal',
  },
];
