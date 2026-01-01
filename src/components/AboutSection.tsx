import { Brain, Code2, Eye, Database } from "lucide-react";
import { aboutMe, domainFocus } from "@/data/portfolioData";

const domainIcons = [Brain, Code2, Eye, Database];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="glass-card rounded-2xl p-8 glow-border">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {aboutMe}
            </p>
          </div>

          {/* Domain Focus Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domainFocus.map((domain, index) => {
              const Icon = domainIcons[index];
              return (
                <div
                  key={domain.title}
                  className="glass-card rounded-xl p-5 glow-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{domain.title}</h3>
                      <p className="text-xs text-muted-foreground">{domain.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
