// netlify/functions/substack-feed.js
// Fetches your Substack RSS feed server-side and returns it as JSON.
// No CORS issues, no third-party dependencies, no API keys needed.

const FEED_URL = "https://cyberlifecoach.substack.com/feed";

exports.handler = async function () {
  try {
    const response = await fetch(FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CyberLifeCoach/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Failed to fetch feed from Substack" }),
      };
    }

    const xml = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=300", // cache for 5 minutes
        "Access-Control-Allow-Origin": "*",
      },
      body: xml,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error fetching feed" }),
    };
  }
};
