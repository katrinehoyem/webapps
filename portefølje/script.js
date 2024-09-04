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

