import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Manvendra Singh. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground text-center md:text-right">
            Built with <span className="text-primary">React</span>, <span className="text-primary">Vite</span> & <span className="text-primary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
