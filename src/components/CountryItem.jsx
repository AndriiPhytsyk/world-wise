import styles from "./CountryItem.module.css";
import flagEmojiToPng from "../utils/flagEmojiToPng.jsx";


function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPng(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
