import React, { useState } from 'react';

function NewProject({ addProject }) {
  const [project, setProject] = useState({
    title: '',
    repoLink: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8787/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        const updatedProjects = await response.json();
        addProject(updatedProjects)
        setProject({ title: '', repoLink: '', description: '' })
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <div className="make-new-project">
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />
        </div>

        <div>
          <label htmlFor="repoLink">Repository Link:</label>
          <input
            type="url"
            id="repoLink"
            name="repoLink"
            value={project.repoLink}
            onChange={handleChange}
            placeholder="Enter repository link"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Enter project description"
            required
          />
        </div>
        <div>
          <label htmlFor="tags">tags:</label>
          <textarea
            id="tags"
            name="tags"
            value={project.tags}
            onChange={handleChange}
            placeholder="Enter project tags"
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewProject;
