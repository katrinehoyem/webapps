import './style.css'

const fetchDataFromServer = async () => {
  const respons = await fetch('http://localhost:3999/json')
  const result = await respons.json()

  const id = document.getElementById("json");
  id?.innerHTML = result;

}

fetchDataFromServer();