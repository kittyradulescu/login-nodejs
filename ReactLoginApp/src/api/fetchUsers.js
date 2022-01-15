import axios from 'axios';

export const fetchUsers = async() => {
    const response = await axios.get("http://localhost:3001/user");
    return response.data;
} 