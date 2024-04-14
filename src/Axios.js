import axios from 'axios';

// Local endpoint URL
const baseURL = 'http://localhost:8081';

export async function createProfile(profileData) {
    try {
        const response = await axios.post(baseURL + '/create-profile', profileData);
        return response.data;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}
