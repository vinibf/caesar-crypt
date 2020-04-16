const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

module.exports = {
    async getCryptData(token) {
        try {
            const get_url = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`;

            const response = await fetch(get_url, { method: 'GET' });
            const data = await response.json();
    
            return data;
        } catch (error) {
            console.error('Failed to get data from the API', error);
        }
    },

    async postCryptData(token) {
        try {
            const post_url = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`;

            const formData = new FormData();
            formData.append('answer', fs.createReadStream('./answer.json'), {
                filename: 'answer.json'
            });

            const options = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch(post_url, options);
            const data = await response.json();
    
            return data;
        } catch (error) {
            console.error('Failed to post data to the API', error);
        }
    }
};