const sha1 = require('js-sha1');

const ApiController = require('./controllers/ApiController');
const FileController = require('./controllers/FileController');
const CaesarCryptController = require('./controllers/CaesarCryptController');

const token = "";

const saveData = async (data, file_name) => {
    const file_content = JSON.stringify(data);

    const result = await FileController.writeFile(file_name, file_content);
    console.log(result);
};

const getData = async () => {
    const api_data = await ApiController.getCryptData(token);
    
    await saveData(api_data, 'answer.json');

    console.log('- Data saved into the file answer.json');
};

const decryptText = async () => {
    const buffer = await FileController.readFile('./answer.json');

    const data = JSON.parse(String(buffer));

    const plain_text = CaesarCryptController.cryptography(data.numero_casas, data.cifrado, false);
    data.decifrado = plain_text;

    await saveData(data, 'answer.json');

    console.log('- File answer.json updated with the decrypted text');
};

const encryptSha1 = async () => {
    const buffer = await FileController.readFile('./answer.json');

    const data = JSON.parse(String(buffer));

    data.resumo_criptografico = sha1(data.decifrado);

    await saveData(data, 'answer.json');

    console.log('- File answer.json updated with encrypted sha1');
};

const postData = async () => {
    const resp = await ApiController.postCryptData(token);
    console.log('Response:', resp);

    console.log('- File answer.json submitted for correction');
};

const main = async () => {
    await getData();
    await decryptText();
    await encryptSha1();
    await postData();
};

main();
