// generating a hash
export function underscoreToCamelCase(input: string) {
    input = input.charAt(0).toUpperCase() + input.substr(1);
    input = input.replace(/_(.)/g, function (match, letter) {
        return ' ' + letter.toUpperCase();
    });
    return input.replace("_", " ");
}
