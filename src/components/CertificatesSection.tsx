import { Award, ExternalLink } from "lucide-react";
import { certificates } from "@/data/portfolioData";

export const CertificatesSection = () => {
  return (
    <section id="certificates" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Achievements & <span className="gradient-text">Recognition</span>
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-6 group glow-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    View Certificate <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
