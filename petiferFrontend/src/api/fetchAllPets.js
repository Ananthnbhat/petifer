import { API_URL } from "../constants/urls";

const fetchAllPets = async () => {
    try {
        console.log(API_URL)
        const result = await fetch("http://localhost:8000/pets/");
        if (result.ok) {
            const jsonData = await result.json();
            return jsonData;
        }
        //catch any request errors
        const err = await result.json();
        //throw or log the error
        console.log(err)
    }
    //catch remaining errors
    catch (err) {
        console.log(err)
    }
}

export default fetchAllPets;