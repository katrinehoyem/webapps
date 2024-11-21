
const form = document.getElementById('myProjects');
const projects= [];

form.addEventListener("submit", async (event) => {

    console.log("#¤!")
    event.preventDefault(); 

    const formData = {};
    new FormData(form).forEach((value, key) => {
        formData[key] = value;
    });


    const title = formData.title;
    const link = formData.link;
    const description = formData.description;
    console.log(`title: ${title}, link: ${link}, description: ${description}`);
   
   const newProject ={
    title: title, link: link, description: description
    };

    projects.push(newProject);
    try {
        const response = await fetch("http://localhost:3999/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newProject),
        })

        console.log(response);
    } catch (error) {
        console.error("An error occured sending the data to the server");
    }
    
    form.reset();

    loadProjects();
});

// loadFromAPI

function loadProjects(){
    fetch('http://localhost:3999/')
    .then(response => response.json())
    .then(data => {

        const parent = document.getElementById('project-list');
        parent.innerHTML = '';
        for (const project of data){
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `
            <h2>${project.title}</h2>
            <a href="${project.link}">Link</a>
            <p>${project.description}</p>
            `;
            parent.appendChild(projectElement);
        }
    });
}

loadProjects();