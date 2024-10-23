import React from 'react';

function ProjectItem({ project }) {
  return (
    <div className="project-item">
      <h3>{project.title}</h3>
      <p><strong>Repository:</strong> <a href={project.repoLink} target="_blank">{project.repoLink}</a></p>
      <p><strong>Description:</strong> {project.description}</p>
    </div>
  );
}

export default ProjectItem;
