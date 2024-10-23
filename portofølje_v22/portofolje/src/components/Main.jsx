import React, { useState } from 'react';
import NewProject from './NewProject';
import ProjectList from './ProjectList';

function Main() {
  const [projects, setProjects] = useState([]);

  const addProject = (updatedProjects) => {
    setProjects(updatedProjects)
  };

  return (
    <main className="main-content">
      <NewProject addProject={addProject} />
      <ProjectList />
    </main>
  );
}

export default Main;
