const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const localFLat = (symbol: string) => {
    switch (symbol.toLowerCase()) {
        case "а": return "a";
        case "б": return "b";
        case "в": return "v";
        case "г": return "h";
        case "ґ": return "g";
        case "д": return "d";
        case "е": return "e";
        case "і": return "j";
        case "ѣ": return "e";
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
        case "х": return "x";
        case "ц": return "c";
        case "ч": return "č";
        case "ш": return "š";
        case "ы": return "y";
        case "ю": return "ju";
        case "я": return "ja";
        case "ь": return "j";
        case "ї": return "ji";
        case "ԑ": return "ě";
        case "ꙇ": return "j";
        case "ꙉ": return "dž";
        case "є": return "je";
        case "щ": return "šč";
        case "ё": return "jo";
        case "ꙏ": return "";
        case "ъ": return "";
        case "ѧ": return "e";
        case "ѫ": return "u";
        case "ꙟ": return "i";
        case "ꙛ": return "o";
        default: return symbol;
    }
};

const localFLatPhon = (symbol: string) => {
    switch (symbol.toLowerCase()) {
        case "а": return "a";
        case "б": return "b";
        case "в": return "v";
        case "г": return "h";
        case "ґ": return "g";
        case "д": return "d";
        case "е": return "e";
        case "ѣ": return "ıě";
        case "ж": return "ž";
        case "з": return "z";
        case "и": return "i";
        case "і": return "j";
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
        case "х": return "x";
        case "ц": return "c";
        case "ч": return "č";
        case "ш": return "š";
        case "ы": return "y";
        case "ю": return "ıu";
        case "я": return "ıa";
        case "ь": return "ė";
        case "ї": return "ıi";
        case "ԑ": return "ě";
        case "ꙇ": return "j";
        case "ꙉ": return "dž";
        case "є": return "ıe";
        case "щ": return "šč";
        case "ё": return "ıo";
        case "ꙏ": return "ȯ";
        case "ъ": return "ẏ";
        case "ѧ": return "ę";
        case "ѫ": return "ų";
        case "ꙟ": return "į";
        case "ꙛ": return "ǫ";
        default: return symbol;
    }
};

const localFSci = (symbol: string) => {
    switch (symbol.toLowerCase()) {
        case "а": return "а";
        case "б": return "б";
        case "в": return "в";
        case "г": return "г";
        case "ґ": return "ґ";
        case "д": return "д";
        case "е": return "е";
        case "ѣ": return "ѣ";
        case "ж": return "ж";
        case "з": return "з";
        case "и": return "и";
        case "і": return "і";
        case "к": return "к";
        case "л": return "л";
        case "м": return "м";
        case "н": return "н";
        case "о": return "о";
        case "п": return "п";
        case "р": return "р";
        case "с": return "с";
        case "т": return "т";
        case "у": return "у";
        case "ф": return "ф";
        case "х": return "х";
        case "ц": return "ц";
        case "ч": return "ч";
        case "ш": return "ш";
        case "ы": return "ы";
        case "ю": return "іу";
        case "я": return "іа";
        case "ь": return "і";
        case "ї": return "іи";
        case "ԑ": return "іе";
        case "ꙇ": return "і";
        case "ꙉ": return "дж";
        case "є": return "іе";
        case "щ": return "шч";
        case "ё": return "іо";
        case "ꙏ": return "";
        case "ъ": return "";
        case "ѧ": return "ѧ";
        case "ѫ": return "ѫ";
        case "ꙟ": return "и";
        case "ꙛ": return "ѫ";
        default: return symbol;
    }
};

const localF = (symbol: string) => {
    switch (symbol.toLowerCase()) {
        case "а": return "а";
        case "б": return "б";
        case "в": return "в";
        case "г": return "г";
        case "ґ": return "г";
        case "д": return "д";
        case "е": return "е";
        case "ѣ": return "е";
        case "ж": return "ж";
        case "з": return "з";
        case "и": return "и";
        case "і": return "і";
        case "к": return "к";
        case "л": return "л";
        case "м": return "м";
        case "н": return "н";
        case "о": return "о";
        case "п": return "п";
        case "р": return "р";
        case "с": return "с";
        case "т": return "т";
        case "у": return "у";
        case "ф": return "ф";
        case "х": return "х";
        case "ц": return "ц";
        case "ч": return "ч";
        case "ш": return "ш";
        case "ы": return "ы";
        case "ю": return "іу";
        case "я": return "іа";
        case "ь": return "і";
        case "ї": return "іи";
        case "ԑ": return "іе";
        case "ꙇ": return "і";
        case "ꙉ": return "дж";
        case "є": return "іе";
        case "щ": return "шч";
        case "ё": return "іо";
        case "ꙏ": return "";
        case "ъ": return "";
        case "ѧ": return "е";
        case "ѫ": return "у";
        case "ꙟ": return "и";
        case "ꙛ": return "о";
        default: return symbol;
    }
};

export enum ORTHOGRAPHY {
    CYR,
    CYR_SCI,
    CYR_PHON,
    LAT,
    LAT_SCI,
    LAT_PHON,
}

export const commonTranscribe = (value: string, toType: string, fromType: ORTHOGRAPHY = ORTHOGRAPHY.CYR_PHON) => {
    switch (parseInt(toType, 10)) {
        case ORTHOGRAPHY.CYR:
            return transcribeWord(value, localF);
        case ORTHOGRAPHY.CYR_SCI:
            return transcribeWord(value, localFSci);
        case ORTHOGRAPHY.LAT:
            return transcribeWord(value, localFLat);
        case ORTHOGRAPHY.LAT_PHON:
            return transcribeWord(value, localFLatPhon);
        default:
            return value;
    }
}

export const transcribe = (value: string, f = localFLat) => {
    const isUpper = value !== value.toLowerCase();
    const res = f(value);
    return isUpper ? capitalizeFirstLetter(res) : res;
};

export const transcribeWord = (value: string, f = localFLat) => {
    return value.split("").map(e => transcribe(e, f)).join("");
};
