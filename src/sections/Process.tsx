import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Sparkles, BarChart3, Presentation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Data Collection',
    description:
      'Gathering relevant data from multiple sources ensuring quality and completeness. I work with APIs, databases, and files to collect the information needed.',
    icon: Database,
  },
  {
    number: '02',
    title: 'Data Cleaning',
    description:
      'Processing raw data to remove inconsistencies, handle missing values, and prepare for analysis. Clean data is the foundation of accurate insights.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Analysis',
    description:
      'Applying statistical methods and algorithms to uncover patterns, trends, and correlations that drive meaningful business decisions.',
    icon: BarChart3,
  },
  {
    number: '04',
    title: 'Visualization',
    description:
      'Creating compelling visual representations that tell the story behind the data, making complex insights accessible to all stakeholders.',
    icon: Presentation,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Timeline line draw animation
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        });
      }

      // Steps animation
      if (timelineRef.current) {
        const stepCards = timelineRef.current.querySelectorAll('.step-card');
        const stepNumbers = timelineRef.current.querySelectorAll('.step-number');

        gsap.from(stepNumbers, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        });

        gsap.from(stepCards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding bg-gray2 relative overflow-hidden"
    >
      <div className="container-main">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="pre-title">My Process</span>
          <h2 className="text-black mb-4">How I Work</h2>
          <p className="text-gray1">
            A systematic approach to transforming raw data into actionable insights that drive
            business growth.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Connection Line - Desktop */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-orange/20 via-orange to-orange/20"
          />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step Number Circle */}
                <div className="step-number relative z-10 w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white font-display font-bold text-xl">
                    {step.number}
                  </span>

                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full bg-orange animate-ping opacity-20" />
                </div>

                {/* Card */}
                <div className="step-card bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300">
                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-orange" />
                  </div>

                  <h3 className="text-xl font-display font-semibold text-black mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray1 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Connector arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                    <div className="flex items-center justify-center">
                      <div className="w-full h-0.5 bg-orange/30" />
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-orange/30" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
