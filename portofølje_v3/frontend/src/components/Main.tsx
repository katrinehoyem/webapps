import React, { useState } from 'react';
import NewProject from './NewProject';
import ProjectList from './ProjectList';
import Project from './ProjectItem';

interface Project {
  title: string;
  repoLink: string;
  description: string;
  publishedAt: string;
  tags: string;
}

function Main(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<Project[]>([]);

  const addProject = (updatedProjects: Project[]): void => {
    setProjects(updatedProjects);
  };

  return (
    <main className="main-content">
      <NewProject addProject={addProject} />
      <ProjectList projects={projects} />
    </main>
  );
}

export default Main;
