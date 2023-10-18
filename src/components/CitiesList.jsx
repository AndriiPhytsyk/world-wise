import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css"
import Message from "./Message.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

function CitiesList() {
    const {cities, isLoading} = useCities();
    if (isLoading) return <Spinner/>
    if(!cities?.length) return <Message message="Add your first city by clicking on the map"/>
    return (
        <ul className={styles.cityList}>
            {cities.map(city => (
                <CityItem key={city.id} city={city}/>
            ))}

        </ul>
    );
}

export default CitiesList;
