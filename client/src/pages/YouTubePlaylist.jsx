import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API_KEY = '....'; // Replace with your YouTube Data API key
const PLAYLIST_ID = '...'; // Replace with your YouTube playlist ID


const YouTubePlaylist = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(''); // Token for fetching more videos
  const [fetchedTokens, setFetchedTokens] = useState(new Set()); // Set to track fetched tokens

  // Function to fetch playlist videos
  const fetchPlaylistVideos = async (pageToken = '') => {
    if (fetchedTokens.has(pageToken)) return; // Prevent fetching duplicate tokens

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: 'snippet',
            playlistId: PLAYLIST_ID,
            key: API_KEY,
            maxResults: 20,
            pageToken: pageToken, // Fetch next page if token exists
          },
        }
      );

      const newVideos = response.data.items;
      
      // Filter out duplicate videos
      setVideos((prevVideos) => {
        const existingIds = new Set(prevVideos.map(video => video.snippet.resourceId.videoId)); // Create a set of existing video IDs
        const filteredVideos = newVideos.filter(video => !existingIds.has(video.snippet.resourceId.videoId)); // Filter out duplicates
        return [...prevVideos, ...filteredVideos]; // Append new unique videos to the existing list
      });

      setNextPageToken(response.data.nextPageToken || null); // Set next page token, or null if there are no more pages
      setFetchedTokens((prevTokens) => new Set(prevTokens).add(pageToken)); // Add token to fetchedTokens set

    } catch (error) {
      console.error('Error fetching playlist videos', error);
    }
  };

  useEffect(() => {
    // Initial fetch to get the first set of videos
    fetchPlaylistVideos();
  }, []);

  // Automatically fetch more videos if there's a nextPageToken and it hasn't been fetched before
  useEffect(() => {
    if (nextPageToken && !fetchedTokens.has(nextPageToken)) {
      fetchPlaylistVideos(nextPageToken);
    }
  }, [nextPageToken]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Flex Container */}
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Video Titles Section */}
        <div className="bg-blue-500 dark:bg-blue-950 w-1/4 h-full overflow-y-auto p-4">
          <h2 className="text-white text-lg font-semibold mb-4">Video Titles</h2>
          {videos.map((video) => (
            <div
              key={video.snippet.resourceId.videoId}
              title={video.snippet.title}
              onClick={() => setSelectedVideo(video)} // Set the selected video on click
              className={`p-3 py-4 bg-blue-600 rounded mb-2 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis text-white ${
                selectedVideo?.snippet.resourceId.videoId === video.snippet.resourceId.videoId
                  ? 'bg-blue-700 font-bold'
                  : ''
              }`}
            >
              {video.snippet.title}
            </div>
          ))}
        </div>

        {/* Video Player Section */}
        <div className="flex-1 bg-blue-800 flex justify-center items-center flex-col p-4 overflow-hidden">
          {selectedVideo ? (
            <>
              <h3 className="text-white text-2xl mb-4">{selectedVideo.snippet.title}</h3>
              <iframe
                className="w-full max-w-2xl h-64 md:h-96"
                src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
                title={selectedVideo.snippet.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </>
          ) : (
            <p className="text-white">Select a video to watch</p>
          )}
        </div>
      </div>
    </>
  );
};

export default YouTubePlaylist;
