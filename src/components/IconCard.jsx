export default function IconCart({ className = "w-6 h-6" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path
                d="M3 3h2l.4 2M7 13h10l3-8H6.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
        </svg>
    );
}
