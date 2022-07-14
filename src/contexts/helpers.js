import { API_URL } from "./config";
import { Alert } from 'react-native'

export async function fetchPublishableKey() {
    try {
        const response = await fetch(`${API_URL}/config`);
        const { publishableKey } = await response.json();
        return publishableKey;
    } catch (error) {
        Alert.alert('Error', 'Error fetching publishable key')
        return '';
    }
}