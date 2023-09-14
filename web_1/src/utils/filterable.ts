export const removeDuplicates = (arr: any) => {
    const uniqueArray = [];
    const seenValues = new Set();

    for (const item of arr) {
        if (!seenValues.has(item.value)) {
            seenValues.add(item.value);
            uniqueArray.push(item);
        }
    }

    return uniqueArray;
}