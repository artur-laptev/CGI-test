/*
  node read.js
*/

const fs = require('fs')

const stream = fs.createReadStream('raamat.txt', {encoding: 'utf8'})
const getStringArr = (text) => text.split(/[\s\-\’\'\”\“\"\.\,\(\)\?\/\@\:\;\!]+/)

// Find the most longest word in text
let longestWordArr = []
let longestWordLength = 0
function findLongestWords(text) {
  const stringArr = getStringArr(text)

  stringArr.map(word => {
    if (word.length > longestWordLength) {
      longestWordArr = [] // clear previous array with less length
      longestWordArr.push(word)
	    longestWordLength = word.length
    }
    else if (word.length >= longestWordLength) {
      longestWordArr.push(word)
    }
  })
}


// Find the most frequent word in text with minumum length
const minWordLength = 8
let allRepeats = {}
function getWordRepeats(text) {
  const stringArr = getStringArr(text)

  stringArr.filter(i => i.length >= minWordLength).map(word => {
    const key = word.toLowerCase()
    allRepeats[key] = (key in allRepeats) ? allRepeats[key]+1 : 1
  })
}

const getMostRepeatedWord = () => {
  const word = Object.keys(allRepeats).reduce((a, b) => allRepeats[a] > allRepeats[b] ? a : b)
  return [word, allRepeats[word]]
}

stream
  .on('data', (chunk) => {
    findLongestWords(chunk)
    getWordRepeats(chunk)
  })
  .on('close', () => {
    // 1) Leia tekstis esinev pikim sõna. Kui tingimusele vastab mitu sõna, leia need kõik.
    console.log(longestWordArr)

    // 2) Leia tekstis kõige sagedasem sõna, mille pikkus on 8 või rohkem tähemärki.
    const [word, count] = getMostRepeatedWord()
    console.log(`${word} - ${count}`)
  });