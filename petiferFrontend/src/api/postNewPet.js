import { API_URL } from '@env';

const postNewPet = async data => {
    try {
        const result = await fetch('http://192.168.1.11:8000/pets/', {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return [await result.json(), result.ok];
    } catch (err) {
        console.error(err);
        return false;
    }
};

export default postNewPet;
