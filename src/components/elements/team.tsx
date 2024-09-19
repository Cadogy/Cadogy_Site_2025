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
        image: "https://www.hshv.org/wp-content/uploads/formidable/105/IMG_7026.jpeg",
      },
    ];
  
    return (
      <section className="container mx-auto mt-40 mb-80">
        <h2 className="text-2xl font-semibold text-gray-100 text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img src={member.image} alt={member.name} className="rounded-md w-32 h-32 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-100">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  