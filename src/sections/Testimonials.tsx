import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote:
      "Exceptional analytical skills and attention to detail. The insights provided transformed our marketing strategy and significantly improved our ROI. Highly recommended!",
    name: 'Sarah Johnson',
    position: 'CEO, TechCorp',
    avatar: '/avatar-1.jpg',
  },
  {
    id: 2,
    quote:
      "Working with this data analyst was a game-changer for our business. The predictive models helped us anticipate market trends and stay ahead of competitors.",
    name: 'Michael Chen',
    position: 'Director, DataFlow Inc',
    avatar: '/avatar-2.jpg',
  },
  {
    id: 3,
    quote:
      "Professional, timely, and incredibly skilled. The dashboards created are not only visually stunning but also provide actionable insights that drive decisions.",
    name: 'Emily Rodriguez',
    position: 'Manager, Analytics Pro',
    avatar: '/avatar-3.jpg',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      // Carousel animation
      gsap.from(carouselRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-main relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="pre-title">Testimonials</span>
          <h2 className="text-black mb-4">What Clients Say</h2>
          <p className="text-gray1">
            Don&apos;t just take my word for it. Here&apos;s what clients have to say about
            working together.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Card */}
            <div className="bg-gray2 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-orange" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-500 ${
                      index === activeIndex
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 absolute inset-0 translate-x-8'
                    }`}
                  >
                    <p className="text-xl md:text-2xl text-black leading-relaxed mb-8 font-light">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-black">{testimonial.name}</p>
                        <p className="text-sm text-gray1">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-orange w-8'
                        : 'bg-gray-300 hover:bg-orange/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-gray2 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-gray2 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
