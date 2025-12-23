import { User } from "lucide-react";

const highlights = [
  {
    title: "Background",
    description: "Self-taught developer with a passion for clean code and modern web technologies. Always learning, always building.",
  },
  {
    title: "Current Role",
    description:
      "Freelance Web Developer & Editor, helping businesses across Belgium and the EU establish their digital presence.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0b] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Profile Image Placeholder */}
          <div className="relative">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-full border border-purple-500/30 bg-[#111113]">
              <div className="bg-grid-pattern-dark absolute inset-0 opacity-30" />
              <div className="flex h-2/3 w-2/3 items-center justify-center rounded-full border border-purple-500/20">
                <div className="flex h-2/3 w-2/3 items-center justify-center rounded-full border border-purple-500/20 bg-[#0a0a0b]">
                  <User strokeWidth={1} className="h-16 w-16 text-purple-500/50" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 max-w-xs rounded-lg border border-purple-500/30 bg-[#111113] p-6 shadow-xl shadow-purple-500/10">
              <p className="mb-2 font-serif text-xl italic text-white">
                &ldquo;Good code is like a good joke—it doesn&apos;t need 
                explanation.&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest text-purple-400">
                Personal Motto
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <span className="mb-2 block text-xs uppercase tracking-widest text-purple-400">
              About Me
            </span>
            <h2 className="font-serif text-5xl leading-[1.1] tracking-tight text-white md:text-6xl">
              Passionate about <br />
              <span className="text-purple-400">building the web.</span>
            </h2>
            <p className="text-xl font-light leading-relaxed text-zinc-400">
              I&apos;m a frontend developer with a love for clean design and smooth 
              user experiences. When I&apos;m not coding, you can find me exploring 
              new coffee spots, gaming, or diving into the latest web frameworks. 
              I believe great websites should feel effortless to use.
            </p>

            <div className="space-y-6 pt-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-purple-500/30">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
