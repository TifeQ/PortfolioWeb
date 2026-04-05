import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Sales Forecasting Dashboard',
    category: 'Predictive Analytics',
    image: '/project-1.jpg',
    description:
      'Developed a comprehensive sales forecasting dashboard that uses machine learning algorithms to predict future sales trends. The dashboard provides real-time insights into sales performance, inventory levels, and customer behavior patterns.',
    technologies: ['Python', 'TensorFlow', 'Tableau', 'SQL'],
    results: 'Increased forecast accuracy by 35% and reduced inventory costs by 20%.',
    link: '#',
  },
  {
    id: 2,
    title: 'Customer Segmentation Analysis',
    category: 'Machine Learning',
    image: '/project-2.jpg',
    description:
      'Implemented K-means clustering and RFM analysis to segment customers based on purchasing behavior. This enabled targeted marketing campaigns and personalized customer experiences.',
    technologies: ['R', 'Python', 'Scikit-learn', 'Power BI'],
    results: 'Improved marketing ROI by 45% through targeted campaigns.',
    link: '#',
  },
  {
    id: 3,
    title: 'Financial Performance Report',
    category: 'Data Visualization',
    image: '/project-3.jpg',
    description:
      'Created an interactive financial dashboard that consolidates data from multiple sources to provide executives with real-time visibility into company performance metrics.',
    technologies: ['Tableau', 'SQL', 'Excel', 'Python'],
    results: 'Reduced reporting time by 60% and improved decision-making speed.',
    link: '#',
  },
  {
    id: 4,
    title: 'Supply Chain Optimization',
    category: 'Operations Research',
    image: '/project-4.jpg',
    description:
      'Built an optimization model to streamline supply chain operations, reducing delivery times and minimizing costs through advanced network analysis and route optimization.',
    technologies: ['Python', 'Gurobi', 'Pandas', 'NetworkX'],
    results: 'Reduced logistics costs by 25% and improved delivery times by 30%.',
    link: '#',
  },
];

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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

      // Cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
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
      id="projects"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-main">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="pre-title">My Portfolio</span>
            <h2 className="text-black">Featured Projects</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-orange text-white'
                    : 'bg-gray2 text-gray1 hover:bg-orange/10 hover:text-orange'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative rounded-2xl overflow-hidden cursor-pointer ${
                index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-8'
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-orange text-sm font-medium mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-display font-semibold mb-3">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm group/link">
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </div>
                </div>
              </div>

              {/* Card shadow effect */}
              <div className="absolute inset-0 rounded-2xl shadow-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary group">
            View All Projects
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover rounded-lg mb-4"
                />
                <span className="text-orange text-sm font-medium">
                  {selectedProject.category}
                </span>
                <DialogTitle className="text-2xl font-display font-bold text-black">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-gray1">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray2 rounded-full text-sm text-gray1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-orange/5 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-black mb-2">Key Results</h4>
                  <p className="text-gray1">{selectedProject.results}</p>
                </div>

                {/* CTA */}
                <a
                  href={selectedProject.link}
                  className="btn-primary w-full justify-center group"
                >
                  View Live Project
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
