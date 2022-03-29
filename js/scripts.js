// Utility Logic

function NoInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

function topThree(word1, word2) {
  if (word1[1] < word2[1]) {
    return 1;
  }
  if (word1[1] > word2[1]) {
    return -1;
  }
  return 0;
}


// Business Logic

function mostCommonWords(text) {
  let wordArray = text.split(" ");
  let sortArray = [];
  wordArray.forEach(function(word) {
    let multipleWord = false;
    sortArray.forEach(function(element) {
      if (element.includes(word.toLowerCase())) {
        multipleWord = true;
      };
    });
    if (!multipleWord) {
      sortArray.push([word.toLowerCase(), numberOfOccurrencesInText(word, text)]);
    };
  });
  sortArray.sort(topThree);
  return sortArray.slice(0, 3);
}

// function mostCommonWords(text) {
//   const array = text.split(" ");
//   // sortArray = array.sort();
//   let count = 0;
//   finalCount = [];

//   array.forEach(function(word) {
//     finalCount.forEach(function(element) {
//     if (element.includes(word)) {
//       count++;
//     } else {
//       finalCount.push(element);
//     }
//   })
//   finalCount.push(element+ " " + count);
//   })
// }

function wordCounter(text) {
  if (text.trim().length === 0)  {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (NoInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

// UI Logic

function boldPassage(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#common-words").html(mostCommonWords(passage, word));
  });
});