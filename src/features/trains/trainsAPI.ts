export async function fetchTrains() {
    try {
        const URL = process.env.REACT_APP_TRAINS_URL;

        if (!URL)
            throw new Error('No trains fetch URL was provided!');

        const response = await fetch(URL);

        if (!response.ok)
            throw new Error(`Http error! Status ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}