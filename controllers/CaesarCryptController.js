module.exports = {
    cryptography (offset, text, crypt=true) {
        let new_text = '';
    
        text = text.toLowerCase();
    
        for (const char of text) {
            const char_code = char.charCodeAt();
    
            if ((char_code > 96) && (char_code < 123)) {
                let final_code;
    
                if (crypt) {
                    final_code = char_code + offset;
                    if (final_code > 122) final_code = (final_code - 122) + 97 - 1;
                } else {
                    final_code = char_code - offset;
                    if (final_code < 97) final_code = (final_code - 97) + 122 + 1;
                }
                
                new_text += String.fromCharCode(final_code);
            } else {
                new_text += char;
            }
        }
    
        return new_text;
    }
};