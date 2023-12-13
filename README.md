This experiment aims to compare the response time between retrieving data from the cache and retrieving it directly from the API using a proxy server.

## Configuration

Describe the server and frontend of  configuration:

- Server: Express server using Redis for caching and a proxy endpoint to retrieve data.
- Frontend: HTML page with JavaScript to initiate requests and display the results.

## How to run it?

To get started, download the project and install the Node Package Manager by running the following command:

```bash
npm init --yes
```

Now, open your browser and type "[localhost:3000](http://localhost:3000)" in the address bar to display an HTML page like this:

![Untitled](https://github.com/YassinMk/Test-Redis/assets/122708120/74619391-e574-42ab-9b0c-3c408458bc59)


You can now observe the significant difference in timing after sending 50 requests. This difference becomes even more pronounced when you send more requests in your browser. Based on my experience, I hope you find it beneficial to see how this can enhance the performance of your application.

Thank you for your curiosity and enthusiasm.
