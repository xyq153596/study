var Tesseract = require('tesseract.js')
let fs=require('fs')

// Tesseract.recognize('./test.jpeg')
//   .progress(message => console.log(message))
//   .catch(err => console.error(err))
//   .then(result => console.log(result))
//   .finally(resultOrError => console.log(resultOrError))

  Tesseract.recognize(fs.readFileSync('./test.jpg'))
    .then(function (result) {
      console.log('result is: ', result)
    })