import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon as Github } from './Icons';
import { projects, type Project } from '../data/projects';

interface ProjectsListProps {
  id?: string;
  className?: string;
  onBackTo3D?: () => void;
  showBackTo3D?: boolean;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  id = 'projects-list',
  className = '',
  onBackTo3D,
  showBackTo3D = false,
}) => {
  return (
    <section
      id={id}
      aria-label="Featured Projects Directory"
      className={`min-h-screen bg-[#0B1120] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
              <Sparkles size={14} aria-hidden="true" />
              <span>Curated Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured <span className="text-indigo-400">Projects</span>
            </h1>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              An accessible, full-featured directory of recent client projects, enterprise platforms, mobile applications, and interactive experiences.
            </p>
          </div>

          {showBackTo3D && onBackTo3D && (
            <button
              type="button"
              onClick={onBackTo3D}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Back to 3D Experience
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {projects.map((proj: Project) => (
            <article
              key={proj.id}
              role="listitem"
              className="group relative flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800 p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              {proj.image ? (
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 bg-slate-800 border border-slate-700/50">
                  <img
                    src={proj.image}
                    alt={`${proj.title} preview screenshot`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-slate-800 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-300 tracking-wider">
                    {proj.title}
                  </span>
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-medium mb-2">
                  <span>{proj.role}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {proj.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies used">
                  {proj.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600/90 hover:bg-indigo-500 px-3.5 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={`Visit live site for ${proj.title} (opens in new tab)`}
                  >
                    <span>Visit Project</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                      aria-label={`View GitHub repository for ${proj.title} (opens in new tab)`}
                    >
                      <Github size={13} aria-hidden="true" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
