import React, { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8787/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error))
  }, []);

  return (
    <div className="my-projects-container" id="projects-list">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))
      ) : (
        <p>No projects yet. Add a new project!</p>
      )}
    </div>
  );
}

export default ProjectList;
