## OCR API Endpoints

Note: The authorization header requires a valid authentication token. Use the generated token in the `Authorization` header.

### Image to Text

- **Endpoint:** `/api/v1/ocr/image-to-text`
- **Method:** `POST`
- **Description:** Retrieves extracted text from an image.
- **Example:** `http://localhost:3000/api/v1/ocr/image-to-text`
- **Authorization:** Requires a valid authentication token.
- **Parameters:**
  - `image`: Image file to be processed (Supported formats: jpg, jpeg, png, bmp, pbm, webp)
  - `language`: Language code for OCR processing (Supported languages: deu, eng, fra, hin, ita, rus, spa, tur)

**Request**

```bash
curl -X POST -H "Authorization: Bearer <your-generated-token>" -F "image=@/path/to/your/image.jpg" -F "language=eng" http://localhost:3000/api/v1/ocr/image-to-text
```

**Response**

```bash
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
```

Note: Maximum allowed image file size is pre-defined as `1 MB`, and the maximum image resolution is set to `2000x2000`. You can modify these configurations in `src/config/ocrOptions.js`.

Currently, the API supports the following languages:

| Lang Code | Language           |
| --------- | ------------------ |
| eng       | English            |
| fra       | French             |
| deu       | German             |
| hin       | Hindi              |
| ita       | Italian            |
| rus       | Russian            |
| spa       | Spanish; Castilian |
| tur       | Turkish            |

For additional languages supported by Tesseract, you can refer to [Tesseract's Data Files](https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016).
