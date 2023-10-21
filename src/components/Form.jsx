// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker"

import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../contexts/CitiesContext.jsx";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [lat, lng] = useUrlPosition();
    const {setCity, isLoading} = useCities();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeoData, setIsLoadingGeoData] = useState();
    const [emoji, setEmoji] = useState();
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(function () {
        async function fetchCityData() {
            if (!lat && !lng) return;
            try {
                setGeocodingError("");
                setIsLoadingGeoData(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                if (!data.countryCode) throw new Error('That`s doesn\'t seem to be a city. Click somewhere else')

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));

            } catch (err) {
                setGeocodingError(err.message);
            } finally {
                setIsLoadingGeoData(false);
            }
        }

        fetchCityData();
    }, [lat, lng])

    async function handleSubmit(e) {
        e.preventDefault();
        if (!date && !cityName) return

        const newCity = {
            cityName,
            country,
            date,
            emoji,
            notes,
            position: {lat, lng}
        }

        await setCity(newCity);

        navigate("/app");

    }

    if (isLoadingGeoData) <Spinner/>

    if (geocodingError) return <Message message={geocodingError}/>

    if (!lat && !lng) return <Message message="Start by clicking on the map"/>

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker selected={date} onChange={date => setDate(date)}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }} type="back">&larr; Back</Button>
            </div>
        </form>
    );
}

export default Form;
