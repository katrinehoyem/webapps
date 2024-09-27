import type { PropsWithChildren } from "react";
import CreateProject from "./CreateProject";
import { useEffect, useState } from "react";
import { ProjectProps } from "./Types";
import Total from "./Total";
import { ofetch } from "ofetch";
import React from "react";

function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
  const { children, project_name, description, catagory, repo_link } = props;
  return (
    <>
      {children}
      <h3>{project_name}</h3>
      <p>description: {description}</p>
      <p>catagory: {catagory.join(", ")}</p>
      <a>Link: {repo_link}</a>
    </>
  );
}

type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects(props: Readonly<ProjectsProps>) {
  const [projects, setProjects] = useState<ProjectProps[]>(
    props.projects ?? []
  );

  const onAddProject = (project: {
    title: string;
    description: string;
    categories: string;
    repo_link: string;
  }) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        project_name: project.title,
        description: project.description,
        catagory: project.categories,
        repo_link: project.repo_link,
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const initializeData = async () => {
    console.log("Fetching data...");
    try {
      const fetchedProjects = await ofetch("http://localhost:3999/projects");
      console.log("Data fetched");
      setProjects(fetchedProjects.projects);
      console.log("Data initialized");
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <>
      <section id="projects">
        {projects.length === 0 ? (
          <p>You have no projects</p>
        ) : (
          projects.map((project) => (
            <article key={project.id}>
              {" "}
              <Project
                id={project.id}
                project_name={project.project_name}
                description={project.description}
                catagory={project.catagory}
                repo_link={project.repo_link}
              />
              <button
                id="remove_prosject"
                onClick={() => removeProject(project.id)}
                type="button"
              >
                Remove project
              </button>
            </article>
          ))
        )}
      </section>
      <Total total={projects.length} />
      <CreateProject onAddProject={onAddProject} />
    </>
  );
}