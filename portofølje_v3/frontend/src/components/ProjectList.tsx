import React, { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';
import { DateValues } from 'date-fns';

interface Project {
  title: string;
  repoLink: string;
  description: string;
  publishedAt: DateValues;
  public: boolean;
  status: string;
  tags: string;
}

function ProjectList(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('http://localhost:8787/projects')
      .then((response) => response.json())
      .then((data: Project[]) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
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
