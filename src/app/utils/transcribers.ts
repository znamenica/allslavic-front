const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const localF = (symbol: string) => {
    switch (symbol.toLowerCase()) {
        case "а": return "a";
        case "б": return "b";
        case "в": return "v";
        case "г": return "g";
        case "д": return "d";
        case "е": return "e";
        case "ѣ": return "iě";
        case "ж": return "ž";
        case "з": return "z";
        case "и": return "i";
        case "к": return "k";
        case "л": return "l";
        case "м": return "m";
        case "н": return "n";
        case "о": return "o";
        case "п": return "p";
        case "р": return "r";
        case "с": return "s";
        case "т": return "t";
        case "у": return "u";
        case "ф": return "f";
        case "х": return "h";
        case "ц": return "c";
        case "ч": return "č";
        case "ш": return "š";
        case "ы": return "y";
        case "ю": return "iu";
        case "я": return "ia";
        case "ь": return "ė";
        case "ї": return "ji";
        case "ԑ": return "ie";
        case "ꙇ": return "j";
        case "ꙉ": return "dž";
        case "є": return "je";
        case "щ": return "šč";
        case "ё": return "io";
        case "ꙏ": return "ȯ";
        case "ъ": return "ẏ";
        case "ѧ": return "ę";
        case "ѫ": return "ų";
        case "ꙟ": return "į";
        case "ꙛ": return "ǫ";
        default: return symbol;
    }
};

export const transcribe = (value: string) => {
    const isUpper = value !== value.toLowerCase();
    const res = localF(value);
    return isUpper ? capitalizeFirstLetter(res) : res;
};
