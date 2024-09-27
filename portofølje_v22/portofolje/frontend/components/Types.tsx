export type ContactProps = {
    email: string;
  };
  
  export type AddProjectFormProps = {
    onAddProject: (project: {
      title: string;
      description: string;
      categories: string;
      repo_link: string;
    }) => void;
  };
  
  export type ExperienceProps = {
    experiences: {
      name: string;
    }[];
  };
  
  export type HeaderProps = {
    name: string;
    degree: string;
    points: number;
  };
  
  export type ProjectProps = {
    id: string;
    project_name: string;
    description: string;
    category: string;
    repo_link: string;
  };
  
  export const actions = {
    add: "add",
    remove: "remove",
  };
  
  export type Action = (typeof actions)[keyof typeof actions];