import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -100 - Math.random() * 100,
          x: (Math.random() - 0.5) * 50,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          ease: 'none',
          delay: i * 0.5,
        });
      });
    }

    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-orange overflow-hidden"
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
            }}
          />
        ))}
      </div>

      {/* Diagonal decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 hidden lg:block"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="text-white/80 text-sm uppercase tracking-widest font-medium mb-4 block">
              Let&apos;s Work Together
            </span>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ready to Unlock Your Data&apos;s Potential?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-lg leading-relaxed">
              I&apos;m always excited to take on new data challenges. Whether you need a
              comprehensive analysis or ongoing analytics support, let&apos;s discuss how I
              can help.
            </p>

            <a
              href="mailto:hello@dataanalyst.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange font-medium rounded-full hover:bg-black hover:text-white transition-all duration-400 group"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <a
                    href="mailto:hello@dataanalyst.com"
                    className="text-white font-medium hover:underline"
                  >
                    hello@dataanalyst.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Phone</p>
                  <a href="tel:+15551234567" className="text-white font-medium hover:underline">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
