import Link from "next/link";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

const social = [
  { label: "GitHub", href: "https://github.com/eliashak425-rgb" },
];

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-[#0a0a0b] px-6 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="#"
              className="mb-6 block font-serif text-3xl tracking-tighter text-white"
            >
              Eli Isaac
            </Link>
            <p className="max-w-xs text-sm font-light leading-relaxed text-zinc-500">
              Thanks for stopping by! Whether you need a new website or want to 
              refresh an existing one, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="mb-6 font-medium text-white">Navigate</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-purple-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 font-medium text-white">Connect</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {social.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-purple-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 font-medium text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link
                  href="mailto:eliashak425@gmail.com"
                  className="transition-colors hover:text-purple-400"
                >
                  eliashak425@gmail.com
                </Link>
              </li>
              <li>
                <span className="text-purple-400">Belgium</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-purple-500/20 pt-8 md:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Eli Isaac. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 text-xs text-zinc-600 md:mt-0">
            <span>Made with <span className="text-purple-500">♥</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
