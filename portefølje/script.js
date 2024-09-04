function saveProject (){
    let projects = [];

    const projectInput = document.querySelectorAll("#project-list input");

    for (const element of projectInput) {
        projects.push(element.textContent);
    }
    localStorage.setItem("projects.textContent");
}