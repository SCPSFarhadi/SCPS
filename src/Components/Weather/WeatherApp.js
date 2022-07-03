import { useEffect, useState } from "react";
import ReactWeather from "react-open-weather";
import { LocationSearchInput } from "./LocationSearch";
import { API } from "../utils/API";
import { round } from "../utils/helpers";

// exported for tests
export const _getWeather = (_API) => async (lat, lon) => {
    const weather = await _API.getCurrentWeather(lat, lon);

    if (!weather) return;

    return {
        icon: weather.weather[0].icon,
        data: {
            cityName: weather.name,
            data: {
                forecast: [],
                current: {
                    date: new Date().toDateString(),
                    description: weather.weather[0].description,
                    temperature: {
                        current: round(weather.main.temp - 273.15, 1),
                        min: round(weather.main.temp_min - 273.15, 1),
                        max: round(weather.main.temp_max - 273.15, 1)
                    },
                    wind: weather.wind.speed,
                    humidity: weather.main.humidity
                }
            }
        }
    };
};

const getWeather = _getWeather(API);

export default function WeatherApp() {
    const [weather, setWeather] = useState();
    const [latLng, setLatLng] = useState({
        // default to Chicago
        lat: 41.8755616,
        lng: -87.6244212
    });
    const [icon, setIcon] = useState();

    const updateWeather = async (lat, lng) => {
        const { icon, data } = await getWeather(lat, lng);
        setWeather(data);
        setIcon(icon);
    };

    useEffect(() => {
        updateWeather(latLng.lat, latLng.lng);
    }, [latLng]);

    return weather ? (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <span style={styles.title}>What's the Weather? 🌤</span>
                <LocationSearchInput setLatLng={setLatLng} />
            </div>
            <div style={styles.weatherContainer}>
                <ReactWeather
                    isLoading={false}
                    data={weather.data}
                    lang="en"
                    locationLabel={weather.cityName}
                    unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
                />
                <div style={styles.icon}>
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                        alt="icon"
                    />
                </div>
            </div>
        </div>
    ) : null;
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column"
    },
    headerContainer: {
        alignSelf: "center",
        marginLeft: -170,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    icon: {
        zIndex: 100,
        marginTop: -225,
        marginLeft: 315,
        display: "flex"
    },
    weatherContainer: { alignSelf: "center", width: 500 },
    title: {
        textAlign: "center",
        fontWeight: 700,
        fontSize: "20px"
    },
    backgroundCard: {
        height: 100,
        width: 100
    }
};
