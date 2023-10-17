import styles from './CityItem.module.css';
import flagEmojiToPng from "../utils/flagEmojiToPng.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({city}) {
    const {cityName, emoji, date} = city;
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{flagEmojiToPng(emoji)}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}

export default CityItem;
