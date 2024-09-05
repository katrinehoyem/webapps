import "./style.css";

const loadWeatherData = async() => {
    const response = await fetch('http://localhost:3999', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }
        
    );
    console.log(response.status)
    console.log(response.ok)

    const data = await response.json()
    console.log(data.data)
}