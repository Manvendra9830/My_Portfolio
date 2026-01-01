import { GraduationCap, Calendar, Award } from "lucide-react";
import { education } from "@/data/portfolioData";

export const EducationSection = () => {
  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 md:p-8 glow-border"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{edu.institution}</h3>
                  <p className="text-primary font-medium mb-2">{edu.degree}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {edu.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
