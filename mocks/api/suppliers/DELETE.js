const fs = require('fs');
const path = require('path');

module.exports = function (request, response) {
    // Чтение данных из файла data.json
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            response.status(500).send('{"error": "Ошибка чтения файла"}');
            return;
        }

        let existingData = JSON.parse(data || '[]');

        const index = existingData.findIndex((item) => item.id === parseInt(request.body.id));
        
        if (index !== -1) {
            existingData.splice(index, 1);
        }

        // Запись объединенных данных обратно в файл data.json
        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(existingData), 'utf8', (err) => {
            if (err) {
                console.error(err);
                response.status(500).send('{"error": "Ошибка записи файла"}');
                return;
            }

            response.status(200).send('{"success": "Успешно!"}');
        });
    });
}
