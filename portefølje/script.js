//function saveProject (){
  //  let projects = [];

    //const projectInput = document.querySelectorAll("#project-list input");

    //for (const element of projectInput) {
      //  projects.push(element.textContent);
    //}
    //localStorage.setItem("projects.textContent");
//}

const form = document.getElementById('myProjects');
const projects= [];

form.addEventListener('add-project-button', function(event){
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
    

});

try {
    const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newProject),
    })
} catch (error) {
    console.error("An error occured sending the data to the server");
}

function loadProjects(){
    let projects = JSON.parse(window.localStorage.getItem("myProjects")) || [];
    console.log(projects);
}