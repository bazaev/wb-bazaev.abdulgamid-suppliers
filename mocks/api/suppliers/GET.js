const fs = require('fs');
const path = require('path');

module.exports = function (request, response) {
  let targetFileName = 'data.json';

  const filePath = path.join(__dirname, targetFileName);
  // If file does not exist then respond with 404 header
  try {
    fs.accessSync(filePath);
  }
  catch (err) {
    return response.status(404);
  }
  // Respond with filePath
  setTimeout(()=>response.sendFile(filePath), 500)
}