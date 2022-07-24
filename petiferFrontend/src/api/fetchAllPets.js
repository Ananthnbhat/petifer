import { API_URL } from '@env';

const fetchAllPets = async () => {
    try {
        const result = await fetch(API_URL);
        if (result.ok) {
            const jsonData = await result.json();
            console.log('jsondata is', jsonData)
            return jsonData;
        }
        //catch any request errors
        const err = await result.json();
        //throw or log the error
        console.error(err)
    }
    //catch remaining errors
    catch (err) {
        console.error(err)
    }
}

export default fetchAllPets;