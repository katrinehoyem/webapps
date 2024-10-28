import React from 'react';

interface Project {
  title: string;
  repoLink: string;
  description: string;
}

interface ProjectItemProps {
  project: Project;
}

function ProjectItem({ project }: ProjectItemProps): JSX.Element {
  return (
    <div className="project-item">
      <h3>{project.title}</h3>
      <p>
        <strong>Repository:</strong> <a href={project.repoLink} target="_blank" rel="noopener noreferrer">{project.repoLink}</a>
      </p>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
    </div>
  );
}

export default ProjectItem;
