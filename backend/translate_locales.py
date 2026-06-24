import json
import os
import time
from deep_translator import GoogleTranslator

# ISO 639-1 language codes mapping based on user request
languages = {
    'hi': 'hindi',
    'bn': 'bengali',
    'ta': 'tamil',
    'te': 'telugu',
    'mr': 'marathi',
    'gu': 'gujarati',
    'kn': 'kannada',
    'ml': 'malayalam',
    'pa': 'punjabi'
}

def translate_dict(data, translator, target_lang):
    translated_data = {}
    for key, value in data.items():
        if isinstance(value, dict):
            translated_data[key] = translate_dict(value, translator, target_lang)
        elif isinstance(value, str):
            try:
                # Do not translate empty strings or pure numbers (simplification)
                if value.strip() == "" or value.isdigit():
                    translated_data[key] = value
                else:
                    # Retry logic for google translator
                    max_retries = 3
                    for attempt in range(max_retries):
                        try:
                            translated_text = translator.translate(value)
                            translated_data[key] = translated_text
                            break
                        except Exception as e:
                            if attempt == max_retries - 1:
                                print(f"Failed to translate '{value}' to {target_lang}: {e}")
                                translated_data[key] = value
                            time.sleep(1)
            except Exception as e:
                print(f"Error on {key}: {value} - {e}")
                translated_data[key] = value
        else:
            translated_data[key] = value
    return translated_data

def main():
    base_dir = r"c:\Users\Lenovo\Desktop\WEB\SBI Saathiii\frontend\src\locales"
    en_file = os.path.join(base_dir, "en.json")
    
    if not os.path.exists(en_file):
        print(f"English base file not found at {en_file}")
        return

    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)

    for lang_code, lang_name in languages.items():
        out_file = os.path.join(base_dir, f"{lang_code}.json")
        print(f"Translating to {lang_name} ({lang_code})...")
        
        translator = GoogleTranslator(source='en', target=lang_code)
        translated_data = translate_dict(en_data, translator, lang_code)
        
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        print(f"Saved {lang_code}.json")
        time.sleep(2) # Prevent rate limiting between languages

if __name__ == '__main__':
    main()
