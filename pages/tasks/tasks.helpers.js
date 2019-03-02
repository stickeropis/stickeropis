/* eslint-disable */
const formatValue = value => {
    if (value == null) {
        return '';
    }
    if (Array.isArray(value)) {
        return value.join(', ');
    }

    if (value instanceof Date) {
        return value.toLocaleDateString();
    }

    return value.toString();
};

export default formatValue;
