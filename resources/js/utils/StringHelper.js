export function singularize(word) {
    if (!word) return "";

    const exceptions = {
        children: "child",
    };

    // Exception
    if (exceptions[word.toLowerCase()]) {
        return exceptions[word.toLowerCase()];
    }

    // Règles générales
    if (word.endsWith("ies") && word.length > 3) return word.slice(0, -3) + "y";
    if (word.endsWith("ves")) return word.slice(0, -3) + "f";
    if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);

    return word;
}

export function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatUnderscore(str) {
    if (!str) return "";
    return str
        .split("_")
        .map((word) => capitalize(word))
        .join(" ");
}
