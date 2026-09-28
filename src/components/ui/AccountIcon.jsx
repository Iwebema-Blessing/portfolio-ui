/** A plain outline person-in-a-circle icon — the kind every site with user accounts has. */
export const AccountIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.2 18.2c1.1-2.2 3.2-3.5 5.8-3.5s4.7 1.3 5.8 3.5" />
  </svg>
);
