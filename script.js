const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loading Spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading Spinner - Completed
function hideLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const proxyUrl = 'https://radiant-springs-29991.herokuapp.com/';
    let count = 0;
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        authorText.innerHTML = (data.quoteAuthor === '') ? 'Unknown': data.quoteAuthor ;
        if(data.quoteText.length > 120){
           quoteText.classList.add('long-quote'); 
        } else{
            quoteText.classList.remove('long-quote'); 
        }
        quoteText.innerHTML = data.quoteText;
        hideLoadingSpinner();
    } catch (error) {
        while(count < 10) getQuote();
    }
}
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Initial Page Load
getQuote();