import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css"
import Message from "./Message.jsx";

function CitiesList({cities, isLoading}) {
    if (isLoading) return <Spinner/>
    if(!cities.length) return <Message message="Add your first city by clicking on the map"/>
    return (
        <ul className={styles.cityList}>
            {cities.map(city => (
                <CityItem key={city.id} city={city}/>
            ))}

        </ul>
    );
}

export default CitiesList;
