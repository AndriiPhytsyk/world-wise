import Spinner from "./Spinner.jsx";
import styles from "./CountryList.module.css"
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

function CountriesList() {
    const {cities, isLoading} = useCities();

    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message="Add your first city by clicking on the map"/>

    const countries = Object.values(cities.reduce((acc, city) => {
        return {...acc, [city.country]: {country: city.country, emoji: city.emoji}}
    }, {}))
    return <ul className={styles.countryList}>
        {countries.map(country => (
            <CountryItem key={country.id} country={country}/>
        ))}

    </ul>

}

export default CountriesList;
