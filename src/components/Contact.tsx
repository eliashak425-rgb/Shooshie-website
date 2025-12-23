"use client";

import { useState } from "react";
import { Send, Github, Mail, Check, Loader2 } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/eliashak425-rgb", label: "GitHub" },
  { icon: Mail, href: "mailto:eliashak425@gmail.com", label: "Email" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form
    (e.target as HTMLFormElement).reset();

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="bg-[#0a0a0b] px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-xl border border-purple-500/30 bg-[#111113] p-8 text-center shadow-xl shadow-purple-500/10 md:p-16">
        <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">
          Let&apos;s <span className="text-purple-400">Connect</span>
        </h2>
        <p className="mx-auto mb-10 max-w-lg font-light text-zinc-400">
          I&apos;m always open to new opportunities, collaborations, or just a
          friendly chat. Feel free to reach out!
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md space-y-5 text-left"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full border-b border-purple-500/30 bg-transparent px-0 py-3 text-white placeholder-zinc-500 transition-all focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full border-b border-purple-500/30 bg-transparent px-0 py-3 text-white placeholder-zinc-500 transition-all focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your message"
              rows={4}
              required
              className="w-full resize-none border-b border-purple-500/30 bg-transparent px-0 py-3 text-white placeholder-zinc-500 transition-all focus:border-purple-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`group mt-8 flex w-full items-center justify-center gap-2 rounded-md py-4 font-medium tracking-wide transition-all ${
              isSubmitted
                ? "bg-green-600 text-white shadow-lg shadow-green-500/25"
                : "bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-500 hover:shadow-purple-500/40"
            } disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : isSubmitted ? (
              <>
                <Check className="h-4 w-4" />
                Message Sent!
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-12 border-t border-purple-500/20 pt-8">
          <p className="mb-6 text-xs uppercase tracking-widest text-zinc-500">
            Or find me on
          </p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                aria-label={social.label}
                className="rounded-full border border-purple-500/30 bg-purple-500/10 p-3 text-purple-400 transition-all hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <social.icon strokeWidth={1.5} className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
