import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Linkedin, Github, Dribbble, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pageLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const utilityLinks = [
  { name: 'Style Guide', href: '#' },
  { name: 'Licenses', href: '#' },
  { name: 'Changelog', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Dribbble', icon: Dribbble, href: '#' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer ref={footerRef} className="bg-black text-white pt-20 pb-8">
      <div ref={contentRef} className="container-main">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">D</span>
              </div>
              <span className="font-display font-semibold text-xl">Data Analyst</span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Transforming data into decisions. Helping businesses unlock insights and drive
              growth through advanced analytics.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Pages</h4>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-orange transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Utility</h4>
            <ul className="space-y-3">
              {utilityLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-orange transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/40 text-sm mb-1">Email</p>
                <a
                  href="mailto:hello@dataanalyst.com"
                  className="text-white/80 hover:text-orange transition-colors"
                >
                  hello@dataanalyst.com
                </a>
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Phone</p>
                <a
                  href="tel:+15551234567"
                  className="text-white/80 hover:text-orange transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Location</p>
                <p className="text-white/80">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Data Analyst. All rights reserved.
          </p>

          <p className="text-white/40 text-sm">
            Designed with{' '}
            <span className="text-orange">&hearts;</span> for data enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}
