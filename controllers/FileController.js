const fs = require('fs');

module.exports = {
    readFile (file_path) {
        return new Promise((res, rej) => {
            try {
                fs.readFile(file_path, (err, content) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(content);
                    }
                });
            } catch (error) {
                console.error('Failed to read data from the file', error);
            }
            
        });
    },

    writeFile (file_name, content) {
        return new Promise((res, rej) => {
            try {
                fs.writeFile(file_name, content, err => {
                    if (err) {
                        rej(err);
                    } else {
                        res('- File created successfully');
                    }
                });
            } catch (error) {
                console.error('Failed to write the file', error);
            }
        });
    }
};