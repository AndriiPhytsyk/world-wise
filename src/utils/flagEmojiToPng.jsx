const flagEmojiToPng = function (flag) {
    let countryCode = Array.from(flag)
        .map(codeUnit => String.fromCodePoint(codeUnit.codePointAt(0) - 127397))
        .join('')
        .toLowerCase();

    return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag'/>
    );
}

export default flagEmojiToPng;
