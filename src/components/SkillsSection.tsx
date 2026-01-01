import { skills } from "@/data/portfolioData";

export const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
        </div>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(skills.technical).map(([category, items], index) => (
            <div
              key={category}
              className="glass-card rounded-xl p-6 glow-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-bold text-lg mb-4 gradient-text">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Non-Technical Skills */}
        <div className="glass-card rounded-xl p-6 glow-border">
          <h3 className="font-bold text-lg mb-4 text-center gradient-text">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.nonTechnical.map((skill) => (
              <span
                key={skill}
                className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-full text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
