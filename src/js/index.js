// Sort items by numerical index
function indexedSort(items) {

    // Reverse items in categories
    const result = items.map((item) => {

        if (item.type === 'category') {
            return { ...item, items: indexedSort(item.items) };
        }
        return item;
    });

    result.sort((a, b) => a.id - b.id)
    return result;
}

// Sort number indexed items alphabetically according to their letter labels (default separator is `.`)
function alphabeticalDiscardIndexSort(items,sep='.') {

    const result = items.map((item) => {

        if (item.type === 'category') {
            return { ...item, items: alphabeticalDiscardIndexSort(item.items) };
        }
        return item;
    });

    result.sort((a, b) =>
        a.label.includes(sep) && b.label.includes(sep)
            ? (a.label.split(sep)[1].trim()).localeCompare(b.label.split(sep)[1].trim())
            : 0)

    return result;
}

module.exports = {indexedSort,alphabeticalDiscardIndexSort}