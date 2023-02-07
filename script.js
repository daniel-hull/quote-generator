let apiQuotes = [];

// Get Quotes from API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // This is where you would catch your error.
  }
}

// Show new quote
function newQuote() {
  // Pick a random quote from API Quotes array
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(randomQuote);
}

// On load
getQuotes();
