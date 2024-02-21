require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const fileOptions = {
  fieldname: 'image', // Field name specified in the form
  fieldNameSize: 10, // Max field name size (default 100 bytes)
  fileSize: 1000000, // For multipart forms, the max file size (in bytes) (default Infinity)
  // 'Invalid file size, file size should be smaller than 1MB'
  fields: 1, // Max number of non-file fields (default Infinity)
  files: 1, // For multipart forms, the max number of file fields (default Infinity)
  fileTypes: /jpg|jpeg|png|bmp|pbm|webp/, // Set allowed file extensions
  imageMaxWidth: 2000,
  imageMaxHeight: 2000
}

const imageToText = {
  langs: 'eng', //a string to indicate the languages traineddata to download, multiple languages are specified using an array (['eng', 'chi_sim'])
  oem: 1, // a enum to indicate the OCR Engine Mode you use
  imagePath: '.data/ocr/image_to_text', // Specify the directory where you want to store the uploaded files
  langPath: '.data/ocr/tesseract/traineddata', // path for downloading traineddata (e.g. eng.traineddata.gz), do not include / at the end of the path
  cachePath: '.data/ocr/tesseract/traineddata' // path for the cached traineddata, more useful for Node, for browser it only changes the key in IndexDB
}

module.exports = { fileOptions, imageToText }
