// Import the createClient function from the pexels-api-wrapper library
import { createClient } from 'pexels-api-wrapper';

// Replace 'YOUR_API_KEY' with your actual Pexels API key
const client = createClient('YOUR_API_KEY');

// Example: Fetch popular videos
async function fetchPopularVideos() {
    try {
        const response = await client.videos.popular();

        // You can access the videos in response.data
        const videos = response.data;

        // Display or process the videos as needed
        console.log(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

// Call the fetchPopularVideos function to fetch and handle videos
fetchPopularVideos();
