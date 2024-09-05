import { writeFile } from "fs/promises";
import { readFile } from "fs/promises";
import { Weather } from "./types";

export async function getWeatherData() {
    const data = await readFile('./data/weather.json', "utf-8");
    const parsedData = JSON.parse(data) as Weather[];
    return parsedData;
};

export async function updateWeatherDataWeatherData(newData: Weather[]) {
    await writeFile("./data/weather.json", JSON.stringify(newData, null, 2))


};
