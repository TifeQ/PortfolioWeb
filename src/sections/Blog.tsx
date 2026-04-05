import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: '10 Essential Data Visualization Techniques',
    excerpt:
      'Learn the fundamentals of creating compelling data visualizations that communicate insights effectively to stakeholders.',
    image: '/blog-1.jpg',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    category: 'Data Viz',
  },
  {
    id: 2,
    title: 'Predictive Analytics in Business',
    excerpt:
      'How machine learning is transforming decision-making and helping businesses stay ahead of market trends.',
    image: '/blog-2.jpg',
    date: 'Jan 10, 2024',
    readTime: '12 min read',
    category: 'ML & AI',
  },
  {
    id: 3,
    title: 'SQL Optimization Tips for Analysts',
    excerpt:
      'Improve your query performance with these expert techniques that will speed up your data retrieval.',
    image: '/blog-3.jpg',
    date: 'Jan 5, 2024',
    readTime: '6 min read',
    category: 'SQL',
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.blog-card');
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="section-padding bg-gray2 relative overflow-hidden"
    >
      <div className="container-main">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="pre-title">Latest Articles</span>
            <h2 className="text-black">From My Blog</h2>
          </div>

          <a href="#" className="btn-secondary group mt-6 md:mt-0 inline-flex">
            View All Posts
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Blog Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="blog-card group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-orange">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray1 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-black mb-3 group-hover:text-orange transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray1 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                {/* Read more link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-orange font-medium text-sm group/link"
                >
                  <span>Read More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
