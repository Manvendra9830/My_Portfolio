import { useState, useMemo } from "react";
import { ExternalLink, Github, Filter, X, Search } from "lucide-react";
import { projects } from "@/data/portfolioData";
import type { Project } from "@/types";

export const ProjectsSection = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-derive unique domains and tech from project data
  const allDomains = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.domains))).sort(),
    []
  );
  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
    []
  );

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // Filter logic: search + domain + tech
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return projects.filter((project: Project) => {
      // Search match
      const searchMatch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query)) ||
        project.domains.some((d) => d.toLowerCase().includes(query));

      // Domain match (ANY selected)
      const domainMatch =
        selectedDomains.length === 0 ||
        selectedDomains.some((d) => project.domains.includes(d));

      // Tech match (ANY selected)
      const techMatch =
        selectedTech.length === 0 ||
        selectedTech.some((t) =>
          project.tech.some((pt) => pt.toLowerCase() === t.toLowerCase())
        );

      return searchMatch && domainMatch && techMatch;
    });
  }, [searchQuery, selectedDomains, selectedTech]);

  const clearFilters = () => {
    setSelectedDomains([]);
    setSelectedTech([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedDomains.length > 0 || selectedTech.length > 0 || searchQuery.trim().length > 0;

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 md:p-6 mb-12">
          {/* Filter Header + Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Filter Projects</span>
              <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary/50 rounded-full">
                {filteredProjects.length} of {projects.length}
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-52 pl-9 pr-3 py-2 text-sm bg-secondary/50 border border-border/50 rounded-lg placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  id="project-search"
                />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-primary hover:underline whitespace-nowrap"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Domain Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">By Domain:</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {allDomains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => toggleDomain(domain)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedDomains.includes(domain)
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">By Tech Stack:</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {allTech.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedTech.includes(tech)
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:text-primary-foreground">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedDomains.map((domain) => (
                  <span
                    key={`active-${domain}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs"
                  >
                    {domain}
                    <button onClick={() => toggleDomain(domain)} className="hover:text-primary-foreground">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedTech.map((tech) => (
                  <span
                    key={`active-${tech}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs"
                  >
                    {tech}
                    <button onClick={() => toggleTech(tech)} className="hover:text-primary-foreground">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className="glass-card rounded-xl overflow-hidden group glow-border animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">{project.id}</span>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.subtitle}</p>
              </div>

              {/* Project Body */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-tag">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Domain Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.domains.map((domain) => (
                    <span
                      key={domain}
                      className="px-2 py-1 text-xs bg-secondary/30 text-muted-foreground rounded"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Footer */}
              <div className="px-6 pb-6 flex gap-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-primary rounded-lg text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                  >
                    Use Application <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2 ${
                    project.liveLink ? "bg-secondary/50 hover:bg-secondary/70" : "bg-primary text-primary-foreground hover:bg-primary/90"
                  } rounded-lg text-sm font-medium transition-all duration-300`}
                >
                  View on GitHub <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects match the selected filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
