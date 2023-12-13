const express = require("express");
const axios = require("axios");
const redis = require("redis");
let redisClient;

const app = express();
app.use(express.json());
//static middleware
app.use(express.static('static'));

// Create and connect Redis client
redisClient = redis.createClient();
redisClient.on('error', (error) => console.log('Redis error: ' + error));

// Removed the unnecessary async IIFE for redisClient connection

const baseUrl = 'https://jsonplaceholder.typicode.com/';
const cacheDuration = 60;

// Corrected variable name to use `redisClient` instead of `client`


const fetchDataAndCache = async (req, res) => {
    try {
      // Changed `client` to `redisClient` here
      const cacheKey = 'posts';
  
      // Check if the Redis client is connected
      if (!redisClient.connected) {
        console.error('Redis client is not connected');
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Try to fetch the data from the cache
      redisClient.get(cacheKey, async (err, cachedData) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        // If data is found in the cache, return it
        if (cachedData) {
          console.log('Cache hit!');
          res.send(JSON.parse(cachedData));
        } else {
          console.log('Cache miss! Fetching from API.');
  
          try {
            // Fetch data from the API
            const response = await axios.get(baseUrl + 'posts');
            const responseData = response.data;
  
            // Store the data in the cache
            redisClient.setex(cacheKey, cacheDuration, JSON.stringify(responseData));
  
            // Return the fetched data
            res.send(responseData);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

  app.get('/normal-posts', async (req, res) => {
    try {
      const response = await axios.get(baseUrl + 'posts');
      const responseData = response.data;
      res.send(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

app.get('/getCach', fetchDataAndCache);
app.get('/getWithApi', fetchDataAndCache);


app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
