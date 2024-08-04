let markovModel = {};

// URL of the data.txt file in GitHub Pages
const dataUrl = 'https://kanteer.github.io/word-guesser/data.txt';

// Function to fetch and process the dataset
function fetchData() {
  fetch(dataUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(text => {
      const processedData = processText(text);
      markovModel = buildMarkovModel(processedData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to process the text
function processText(text) {
  text = text.toLowerCase().replace(/[.,?!;()"']/g, '');
  return text.split(/\s+/);
}

// Function to build the Markov model
function buildMarkovModel(words) {
  const model = {};
  
  for (let i = 0; i < words.length - 1; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    
    if (!model[word]) {
      model[word] = [];
    }
    
    model[word].push(nextWord);
  }
  
  return model;
}

// Function to predict the next word
function predictNextWord() {
  const currentWord = document.getElementById('currentWord').value.toLowerCase();
  const resultElement = document.getElementById('result');
  
  if (!markovModel[currentWord]) {
    resultElement.textContent = 'No prediction available for this word.';
    return;
  }
  
  const possibleWords = markovModel[currentWord];
  const randomIndex = Math.floor(Math.random() * possibleWords.length);
  const nextWord = possibleWords[randomIndex];
  
  resultElement.textContent = `Next word prediction after '${currentWord}': ${nextWord}`;
}

// Fetch the data when the page loads
window.onload = fetchData;
