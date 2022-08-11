import { API_URL } from '@env';

const postNewPet = async data => {
    try {
        const result = await fetch(API_URL, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (result.ok) {
            const jsonData = await result.json();
            console.log('new pet added: ', jsonData);
            return jsonData;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

export default postNewPet;
