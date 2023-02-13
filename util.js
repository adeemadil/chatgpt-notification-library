//Helper functions

const extractNumberedList = (text) => {
    return text.split("\n").reduce((all, current) => {
        const values = current.match(/\d+\.(.*)/);
        if (values?.length > 1) {
            return [...all, values[1].trim()];
        }

        return all;
    }, []);
}