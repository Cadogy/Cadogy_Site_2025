import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "PlayerBay",
    description: "A secure marketplace for digital gaming assets.",
    image: "/images/playerbay_demo.png",
    status: "Coming Soon",
  },
  {
    id: 2,
    title: "Real estate Application",
    description: "Navigate real estate seamlessly. Find and explore easily.",
    image: "/images/gradient-5.jpg",
    status: null,
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description:
      "Streamline your social presence with our intuitive dashboard.",
    image: "/images/gradient-6.jpg",
    status: null,
  },
  {
    id: 4,
    title: "Meeting dashboard",
    description: "Effortless meetings. Your agenda, participants, and actions.",
    image: "/images/gradient-7.png",
    status: null,
  },
]

const ProjectsSection = () => {
  return (
    <section className="min-h-screen w-full py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-20 grid grid-cols-1 gap-12 md:mb-32 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="mb-6 text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Work We&apos;ve Done
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Explore our accomplished projects and endeavors, showcasing a
              diverse range of successful work that reflects our expertise and a
              commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.status && (
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1 backdrop-blur-sm">
                      <div className="h-2 w-2 animate-pulse rounded-lg bg-amber-400"></div>
                      <span className="text-xs font-medium text-white">
                        {project.status}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="mb-2 text-lg font-medium text-foreground md:text-xl">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
