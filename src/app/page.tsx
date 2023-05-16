import Link from "next/link";

// https://feathericons.dev/?search=chevron-right&iconset=feather&format=strict-tsx
export function ChevronRight(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// https://feathericons.dev/?search=arrow-right&iconset=feather&format=strict-tsx
export function ArrowRight(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="text-stone-800 w-full h-full flex flex-col justify-center">
      <div className="mx-auto max-w-7xl p-6 w-full flex flex-col items-start">
        <div>
          <p className="text-3xl font-bold text-stone-800">
            Filesharing like never before
          </p>
          <div className="flex flex-row justify-start w-full mt-2">
            <Link
              className="px-3.5 py-2.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
              href="/dash"
            >
              Get Started
            </Link>
            <button className="ml-2 px-3.5 py-2.5 text-sm rounded-md flex flex-row items-center gap-1">
              Learn More <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
