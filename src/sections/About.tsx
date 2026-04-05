import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, Database, LineChart, Brain, FileSpreadsheet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', icon: Code2 },
  { name: 'SQL', icon: Database },
  { name: 'Tableau', icon: LineChart },
  { name: 'R', icon: Brain },
  { name: 'Machine Learning', icon: Brain },
  { name: 'Excel', icon: FileSpreadsheet },
];

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 12, suffix: '', label: 'Awards Won' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2,
            ease: 'expo.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Content card slide in
      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Stats stagger reveal
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card');
        gsap.from(statCards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gray2 relative overflow-hidden"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Image */}
          <div ref={imageRef} className="lg:col-span-5 relative">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-orange/10 rounded-2xl" />

              <img
                src="/about-person.jpg"
                alt="About Me"
                className="relative z-10 w-full h-auto rounded-2xl shadow-card"
              />

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-orange text-white rounded-xl p-6 shadow-lg z-20">
                <p className="text-4xl font-display font-bold">8+</p>
                <p className="text-sm opacity-90">Years Exp.</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:col-span-7 lg:pl-12">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card">
              <span className="pre-title">About Me</span>
              <h2 className="text-black mb-6">Passionate About Data-Driven Solutions</h2>

              <p className="text-gray1 mb-6 leading-relaxed">
                With over 8 years of experience in data analysis, I specialize in transforming
                raw data into meaningful insights. My expertise spans statistical analysis,
                data visualization, and predictive modeling across various industries including
                finance, healthcare, and e-commerce.
              </p>

              <p className="text-gray1 mb-8 leading-relaxed">
                I believe that every dataset tells a story, and my mission is to help businesses
                discover and communicate that story effectively. From cleaning messy data to
                building predictive models, I handle the entire analytics pipeline.
              </p>

              {/* Skills */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black mb-4">Technical Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-4 py-2 bg-gray2 rounded-full hover:bg-orange/10 hover:text-orange transition-all duration-300 cursor-default group"
                    >
                      <skill.icon className="w-4 h-4 text-gray1 group-hover:text-orange transition-colors" />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href="#contact" className="btn-primary group inline-flex">
                Work With Me
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white rounded-xl p-6 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-4xl md:text-5xl font-display font-bold text-orange mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-gray1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
