import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const preTitleRef = useRef<HTMLSpanElement>(null);
  const titleRefs = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Data visualization canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animated data particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 73, 0, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connection lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 73, 0, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Pre-title reveal
      tl.from(preTitleRef.current, {
        clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)',
        duration: 0.6,
        ease: 'expo.out',
      });

      // Title lines stagger reveal
      titleRefs.current.forEach((ref, i) => {
        tl.from(
          ref,
          {
            y: 50,
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
          },
          `-=${i === 0 ? 0.4 : 0.55}`
        );
      });

      // Description fade in
      tl.from(
        descRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'expo.out',
        },
        '-=0.4'
      );

      // Buttons scale in
      tl.from(
        buttonsRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );

      // Person image slide in
      tl.from(
        imageRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.8'
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['Transforming', 'Data into', 'Actionable Insights'];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange/5 to-transparent clip-diagonal hidden lg:block" />

      <div className="container-main relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="max-w-2xl">
            <span
              ref={preTitleRef}
              className="pre-title inline-block"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              Data Analyst
            </span>

            <h1 className="font-display font-bold text-black mb-6">
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) titleRefs.current[i] = el;
                  }}
                  className="block"
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={descRef}
              className="text-lg text-gray1 mb-8 max-w-lg leading-relaxed"
            >
              I analyze complex datasets to uncover patterns, trends, and opportunities
              that drive strategic business decisions. Let me help you turn your data
              into competitive advantage.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary group">
                View My Projects
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button className="btn-secondary group">
                Download CV
                <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange/20 rounded-full blur-3xl" />

              {/* Floating data cards */}
              <div className="absolute -left-16 top-1/4 bg-white shadow-card rounded-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">+</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray1">Growth</p>
                    <p className="font-semibold text-black">+127%</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-12 top-1/2 bg-white shadow-card rounded-xl p-4 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center">
                    <span className="text-orange text-lg">📊</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray1">Projects</p>
                    <p className="font-semibold text-black">150+</p>
                  </div>
                </div>
              </div>

              {/* Main image */}
              <img
                src="/hero-person.png"
                alt="Data Analyst"
                className="relative z-10 w-full max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="w-6 h-10 border-2 border-orange/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-orange rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
