let markovModel = {};

// Function to read and process the dataset from a file
function readFile(file) {
  const reader = new FileReader();
  
  reader.onload = function(event) {
    const text = event.target.result;
    const processedData = processText(text);
    markovModel = buildMarkovModel(processedData);
  };
  
  reader.readAsText(file);
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

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    readFile(file);
  }
});
