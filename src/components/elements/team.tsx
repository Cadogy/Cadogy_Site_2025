import Image from "next/image"

export function TeamSection() {
  const teamMembers = [
    {
      name: "Charles Knapp",
      role: "Lead Developer",
      image: "https://avatars.githubusercontent.com/u/115595915?v=4",
    },
    {
      name: "Dylan Safra",
      role: "Lead Developer",
      image: "https://avatars.githubusercontent.com/u/106191331?v=4",
    },
    {
      name: "Rouge Knapfra",
      role: "Office Support",
      image:
        "https://www.hshv.org/wp-content/uploads/formidable/105/IMG_7026.jpeg",
    },
  ]

  return (
    <section className="container mx-auto mb-80 mt-40">
      <h2 className="mb-10 text-center text-2xl font-semibold text-gray-100">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <Image
              src={member.image}
              alt={member.name}
              className="mx-auto mb-4 h-32 w-32 rounded-md"
              width={128} // Set width based on the size you want to display
              height={128} // Set height based on the size you want to display
              objectFit="cover" // Ensures the image scales properly
            />
            <h3 className="text-lg font-medium text-gray-100">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
