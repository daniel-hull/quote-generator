// Connecting the HTML to the JS

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show that we are loading the page
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading once completed
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quotes from API & defining the global variable of apiQuotes
let apiQuotes = [];
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // This is where you would catch your error with an alert() etc.
  }
}

// Show new quote
function newQuote() {
  loading();
  // Pick a random quote from API Quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author field is null, if so replace with the string "unknown"
  if (quote.author === null) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine styling to be applied
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  complete();

  // Return the final quote text
  quoteText.textContent = quote.text;
}

// Tweet Quote with pre-populated quote and author
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// Adding event listeners. These generally go at the bottom to ensure all functions and variables are declared and assigned. In this case, invokes the new quote function and invokes tweeting the quote function.
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
