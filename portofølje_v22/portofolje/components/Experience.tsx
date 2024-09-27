import React from "react";
import { ExperienceProps } from "./Types";

function Experience({ name }: { name: string }) {
  return <p>{name}</p>;
}

export default function Experiences(props: Readonly<ExperienceProps>) {
  const { experiences = [] } = props;
  return (
    <section id="experience">
      <h3>Experiences:</h3>
      <ul>
        {experiences.length === 0 ? (
          <p>You have no experience</p>
        ) : (
          experiences.map((experience) => (
            <li key={experience.name}>{experience.name}</li>
          ))
        )}
      </ul>
    </section>
  );
}