const { models, Sequelize } = require('../models')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Tesseract = require('tesseract.js')
const imageSize = require('image-size')
const { fileOptions, imageToText } = require('../config/ocrOptions')

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: imageToText.imagePath,
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileExtension = path.extname(file.originalname)
    const fileBaseName = path.basename(file.originalname, fileExtension)
    const fileName = fileBaseName + '-' + uniqueSuffix + fileExtension
    cb(null, fileName)
  }
})

function checkFileType(file, cb) {
  // Check file extension
  const extname = fileOptions.fileTypes.test(path.extname(file.originalname).toLowerCase())
  // Check file mimetype
  const mimetype = fileOptions.fileTypes.test(file.mimetype)

  if (!mimetype || !extname) {
    cb({ message: 'Only .jpg, .png, bmp, pbm and .webp formats are allowed!' }, false)
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: fileOptions.fieldNameSize,
    fileSize: fileOptions.fileSize,
    files: fileOptions.files,
    fields: fileOptions.fields
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb)
    // checkImageResolution(file, cb)
  }
}).single(fileOptions.fieldname)

// Function to check if the image resolution is within limits
function checkImageResolution(file) {
  const { width, height } = imageSize(file.path)

  if (width > fileOptions.imageMaxWidth || height > fileOptions.imageMaxHeight) {
    return false
  } else {
    return true
  }
}

// Function to delete file
function deleteFile(path) {
  fs.unlinkSync(path)
}

const getImageToText = async (req, res) => {
  try {
    // Access the uploaded image file information through req.file
    upload(req, res, async error => {
      const language = req.body?.language || imageToText.langs

      // Handle multer error
      if (error) {
        return res.status(400).json({ error: error })
      }

      // If file not exist in request
      if (!req.file) {
        return res.status(400).json({ error: { message: 'Image is required' } })
      }

      const dimensions = checkImageResolution(req.file)

      if (!dimensions) {
        deleteFile(req.file.path)
        return res.status(400).json({ error: { message: `Image resolution must be at most ${fileOptions.imageMaxWidth}x${fileOptions.imageMaxHeight}` } })
      }

      // Process the image file or perform OCR
      const worker = await Tesseract.createWorker(language, imageToText.oem, {
        // langPath: imageToText.langPath,
        cachePath: imageToText.cachePath
        // logger: m => console.log(m)
      })

      const result = await worker.recognize(req.file.path)

      // Send a response back to the client
      // result.data
      res.status(200).json(result.data.text)

      // Delete the uploaded file after processing
      deleteFile(req.file.path)

      await worker.terminate()
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getImageToText
}
