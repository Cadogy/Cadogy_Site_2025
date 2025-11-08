import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const services = [
  {
    id: 1,
    title: "Build powerful brand experiences",
    description:
      "We create interfaces and experiences that bring your vision to life. From concept to deployment, we ensure your brand stands out with pixel-perfect design and seamless functionality.",
    image: "/images/homepage/cadogy_building_brand_experiences.jpg",
  },
  {
    id: 2,
    title: "Manage content that converts, at scale",
    description:
      "Our content management solutions empower your team to update and scale effortlessly. Built-in SEO tools ensure your content performs in search while maintaining brand consistency.",
    image: "/images/homepage/cadogy_manage_content_that_converts.jpg",
  },
  {
    id: 3,
    title: "Optimize for conversion with AI",
    description:
      "Leverage intelligent analytics and AI-powered insights to understand what works. We help you scale winning strategies globally and drive measurable results.",
    image: "/images/homepage/cadogy_Optimize_for_conversion_with_AI.jpg",
  },
]

const GoodAtSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="min-h-screen w-full py-20 pt-0 md:py-32">
      <div className="mx-auto px-0">
        <div className="mb-16 text-center">
          <h2 className="mb-8 text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl">
            What We Do
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
          >
            We build digital products that actually work. Clean code, smart
            design, and results that matter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <motion.div
                    animate={{
                      y: hoveredCard === service.id ? -20 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h3 className="text-xl font-medium leading-tight text-white md:text-2xl">
                      {service.title}
                    </h3>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredCard === service.id ? "auto" : 0,
                        opacity: hoveredCard === service.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
                        {service.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoodAtSection
