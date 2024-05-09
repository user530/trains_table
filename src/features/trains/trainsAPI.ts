export async function fetchTrains(url: string) {
    try {
        const response = await fetch(url)
        if (!response.ok)
            throw new Error(`Http error! Status ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}