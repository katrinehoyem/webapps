import { readFile } from "fs/promises";
import { text } from "stream/consumers";

export async function getWeatherData() {
    const data = await readFile('./data/weather.json', "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
};
