import React from "react";
import * as projects from "./projectData.json";

export default function Total({ total }: { total: number }) {
  const categoryCounts = {};
  const projects = projects.projects;

  projects.forEach((project) => {
    const { categories } = project;

    categories.forEach((category) => {
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  return (
    <>
      <section id="total">
        <h3>All categories</h3>
        <ul>
          {Object.keys(categoryCounts).map((category) => (
            <li key={category}>
              {category}: {categoryCounts[category]} projects
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}