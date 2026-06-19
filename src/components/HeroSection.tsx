import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { useState } from "react";

export const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl floating-element" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl floating-element" style={{ animationDelay: "2s" }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Avatar */}
          <div className="relative animate-fade-in">
            <div
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                boxShadow: isHovered
                  ? "0 0 40px hsl(174 72% 56% / 0.5), 0 0 80px hsl(174 72% 56% / 0.2)"
                  : "0 0 25px hsl(174 72% 56% / 0.3), 0 0 50px hsl(174 72% 56% / 0.1)",
                transition: "box-shadow 0.4s ease, transform 0.4s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              {/* Gradient border ring */}
              <div
                className="absolute inset-0 rounded-full z-10 pointer-events-none"
                style={{
                  padding: "3px",
                  background: "linear-gradient(135deg, hsl(174 72% 56%), hsl(199 89% 48%), hsl(174 72% 56%))",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 4s ease infinite",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <img
                src="/avatar.png"
                alt="Manvendra Singh - AI/ML Engineer & Software Developer"
                className="w-full h-full object-cover object-top rounded-full"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
            {/* Decorative Ring - pulses */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse scale-110" />
            {/* Outer subtle ring */}
            <div className="absolute -inset-4 rounded-full border border-primary/10" />
            {/* Floating animation wrapper */}
            <style>{`
              .animate-fade-in > div:first-child {
                animation: float 6s ease-in-out infinite;
              }
            `}</style>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="animate-fade-in">
              <p className="text-primary font-mono text-sm mb-2 tracking-wider">
                {"// Hello, I'm"}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                {personalInfo.name.split(" ")[0]}{" "}
                <span className="gradient-text">{personalInfo.name.split(" ")[1]}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-2 max-w-xl">
                {personalInfo.title}
              </p>
              <p className="text-sm text-primary/80 mb-6 max-w-xl">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Achievement Chips - Single Line on Desktop */}
            <div className="animate-fade-in animate-delay-200 mb-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {personalInfo.achievementChips.map((chip, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border/50"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{chip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in animate-delay-300">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in animate-delay-400">
              <a
                href={personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/25"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 bg-secondary/50 border border-border/50 rounded-lg font-medium hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs font-mono">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
