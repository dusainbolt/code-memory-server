export const removeBreakLine = (string: String): String => {
    return string.replace(/(\r\n|\n|\r)/gm, '').trim();
};
