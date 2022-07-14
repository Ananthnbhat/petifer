import { API_URL } from "../constants/urls";

const fetchAllPets = async () => {
    const result = await fetch(API_URL);
    const data = await result.json();
    return data;
}

export default fetchAllPets;