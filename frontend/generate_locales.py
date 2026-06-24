import json
import os

locales_dir = r"c:\Users\Lenovo\Desktop\WEB\SBI Saathiii\frontend\src\locales"
os.makedirs(locales_dir, exist_ok=True)

translations = {
    "en": {
        "nav": {
            "dashboard": "Dashboard",
            "aiAssistant": "AI Assistant",
            "fraudDetection": "Fraud Detection",
            "documents": "Documents",
            "learningHub": "Learning Hub",
            "settings": "Settings",
            "profile": "View Profile",
            "signOut": "Sign Out",
            "brandName": "SBI Saathi"
        },
        "settings": {
            "title": "Settings",
            "language": "Language",
            "languageDescription": "Select your preferred language. The application will instantly switch to the selected language.",
            "save": "Save Settings",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "Welcome back",
            "overview": "Overview",
            "recentActivity": "Recent Activity",
            "viewAll": "View All",
            "stats": {
                "alerts": "Active Alerts",
                "docs": "Documents Processed",
                "score": "Security Score",
                "modules": "Modules Completed"
            }
        },
        "auth": {
            "login": "Sign In",
            "signup": "Create Account",
            "email": "Email Address",
            "password": "Password",
            "forgotPassword": "Forgot Password?",
            "dontHaveAccount": "Don't have an account?",
            "alreadyHaveAccount": "Already have an account?"
        },
        "chat": {
            "title": "AI Assistant",
            "placeholder": "Type your message here...",
            "send": "Send"
        },
        "fraud": {
            "title": "Fraud Detection",
            "scan": "Scan Transaction",
            "history": "Scan History"
        },
        "docs": {
            "title": "Document Analysis",
            "upload": "Upload Document",
            "processing": "Processing..."
        },
        "learn": {
            "title": "Learning Hub",
            "courses": "Available Courses",
            "progress": "Your Progress"
        }
    },
    "hi": {
        "nav": {
            "dashboard": "डैशबोर्ड",
            "aiAssistant": "एआई सहायक",
            "fraudDetection": "धोखाधड़ी पहचान",
            "documents": "दस्तावेज़",
            "learningHub": "लर्निंग हब",
            "settings": "सेटिंग्स",
            "profile": "प्रोफ़ाइल देखें",
            "signOut": "साइन आउट",
            "brandName": "एसबीआई साथी"
        },
        "settings": {
            "title": "सेटिंग्स",
            "language": "भाषा",
            "languageDescription": "अपनी पसंदीदा भाषा चुनें। एप्लिकेशन तुरंत चयनित भाषा में बदल जाएगा।",
            "save": "सेटिंग्स सहेजें",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "वापसी पर स्वागत है",
            "overview": "अवलोकन",
            "recentActivity": "हाल की गतिविधि",
            "viewAll": "सभी देखें",
            "stats": {
                "alerts": "सक्रिय अलर्ट",
                "docs": "संसाधित दस्तावेज़",
                "score": "सुरक्षा स्कोर",
                "modules": "पूर्ण मॉड्यूल"
            }
        },
        "auth": {
            "login": "साइन इन करें",
            "signup": "खाता बनाएँ",
            "email": "ईमेल पता",
            "password": "पासवर्ड",
            "forgotPassword": "पासवर्ड भूल गए?",
            "dontHaveAccount": "खाता नहीं है?",
            "alreadyHaveAccount": "क्या आपके पास पहले से खाता है?"
        },
        "chat": {
            "title": "एआई सहायक",
            "placeholder": "अपना संदेश यहाँ टाइप करें...",
            "send": "भेजें"
        },
        "fraud": {
            "title": "धोखाधड़ी पहचान",
            "scan": "लेनदेन स्कैन करें",
            "history": "स्कैन इतिहास"
        },
        "docs": {
            "title": "दस्तावेज़ विश्लेषण",
            "upload": "दस्तावेज़ अपलोड करें",
            "processing": "प्रसंस्करण..."
        },
        "learn": {
            "title": "लर्निंग हब",
            "courses": "उपलब्ध पाठ्यक्रम",
            "progress": "आपकी प्रगति"
        }
    },
    "bn": {
        "nav": {
            "dashboard": "ড্যাশবোর্ড",
            "aiAssistant": "এআই সহকারী",
            "fraudDetection": "প্রতারণা সনাক্তকরণ",
            "documents": "নথিপত্র",
            "learningHub": "লার্নিং হাব",
            "settings": "সেটিংস",
            "profile": "প্রোফাইল দেখুন",
            "signOut": "সাইন আউট",
            "brandName": "এসবিআই সাথী"
        },
        "settings": {
            "title": "সেটিংস",
            "language": "ভাষা",
            "languageDescription": "আপনার পছন্দের ভাষা নির্বাচন করুন। অ্যাপ্লিকেশন অবিলম্বে নির্বাচিত ভাষায় স্যুইচ হবে।",
            "save": "সেটিংস সংরক্ষণ করুন",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "ফিরে আসার জন্য স্বাগতম",
            "overview": "ওভারভিউ",
            "recentActivity": "সাম্প্রতিক কার্যকলাপ",
            "viewAll": "সব দেখুন",
            "stats": {
                "alerts": "সক্রিয় সতর্কতা",
                "docs": "প্রক্রিয়াজাত নথিপত্র",
                "score": "নিরাপত্তা স্কোর",
                "modules": "মডিউল সম্পন্ন"
            }
        },
        "auth": {
            "login": "সাইন ইন করুন",
            "signup": "অ্যাকাউন্ট তৈরি করুন",
            "email": "ইমেইল ঠিকানা",
            "password": "পাসওয়ার্ড",
            "forgotPassword": "পাসওয়ার্ড ভুলে গেছেন?",
            "dontHaveAccount": "অ্যাকাউন্ট নেই?",
            "alreadyHaveAccount": "ইতোমধ্যে একটি অ্যাকাউন্ট আছে?"
        },
        "chat": {
            "title": "এআই সহকারী",
            "placeholder": "আপনার বার্তা এখানে টাইপ করুন...",
            "send": "পাঠান"
        },
        "fraud": {
            "title": "প্রতারণা সনাক্তকরণ",
            "scan": "লেনদেন স্ক্যান করুন",
            "history": "স্ক্যানের ইতিহাস"
        },
        "docs": {
            "title": "নথি বিশ্লেষণ",
            "upload": "নথি আপলোড করুন",
            "processing": "প্রক্রিয়াজাতকরণ..."
        },
        "learn": {
            "title": "লার্নিং হাব",
            "courses": "উপলব্ধ কোর্স",
            "progress": "আপনার অগ্রগতি"
        }
    },
    "ta": {
        "nav": {
            "dashboard": "முகப்புப் பலகை",
            "aiAssistant": "AI உதவியாளர்",
            "fraudDetection": "மோசடி கண்டறிதல்",
            "documents": "ஆவணங்கள்",
            "learningHub": "கற்றல் மையம்",
            "settings": "அமைப்புகள்",
            "profile": "சுயவிவரம் காண்க",
            "signOut": "வெளியேறு",
            "brandName": "எஸ்பிஐ சாத்தி"
        },
        "settings": {
            "title": "அமைப்புகள்",
            "language": "மொழி",
            "languageDescription": "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும். பயன்பாடு உடனடியாக தேர்ந்தெடுக்கப்பட்ட மொழிக்கு மாறும்.",
            "save": "அமைப்புகளைச் சேமி",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "மீண்டும் வருக",
            "overview": "மேலோட்டம்",
            "recentActivity": "சமீபத்திய செயல்பாடு",
            "viewAll": "அனைத்தையும் காண்க",
            "stats": {
                "alerts": "செயலில் உள்ள எச்சரிக்கைகள்",
                "docs": "செயலாக்கப்பட்ட ஆவணங்கள்",
                "score": "பாதுகாப்பு மதிப்பெண்",
                "modules": "முடிக்கப்பட்ட தொகுதிகள்"
            }
        },
        "auth": {
            "login": "உள்நுழைக",
            "signup": "கணக்கை உருவாக்கு",
            "email": "மின்னஞ்சல் முகவரி",
            "password": "கடவுச்சொல்",
            "forgotPassword": "கடவுச்சொல் மறந்துவிட்டதா?",
            "dontHaveAccount": "கணக்கு இல்லையா?",
            "alreadyHaveAccount": "ஏற்கனவே கணக்கு உள்ளதா?"
        },
        "chat": {
            "title": "AI உதவியாளர்",
            "placeholder": "உங்கள் செய்தியை இங்கே தட்டச்சு செய்க...",
            "send": "அனுப்பு"
        },
        "fraud": {
            "title": "மோசடி கண்டறிதல்",
            "scan": "பரிவர்த்தனையை ஸ்கேன் செய்",
            "history": "ஸ்கேன் வரலாறு"
        },
        "docs": {
            "title": "ஆவண பகுப்பாய்வு",
            "upload": "ஆவணத்தைப் பதிவேற்று",
            "processing": "செயலாக்கப்படுகிறது..."
        },
        "learn": {
            "title": "கற்றல் மையம்",
            "courses": "கிடைக்கும் படிப்புகள்",
            "progress": "உங்கள் முன்னேற்றம்"
        }
    },
    "te": {
        "nav": {
            "dashboard": "డాష్‌బోర్డ్",
            "aiAssistant": "AI సహాయకుడు",
            "fraudDetection": "మోసాల గుర్తింపు",
            "documents": "పత్రాలు",
            "learningHub": "లెర్నింగ్ హబ్",
            "settings": "సెట్టింగ్‌లు",
            "profile": "ప్రొఫైల్ చూడండి",
            "signOut": "సైన్ అవుట్",
            "brandName": "SBI సాథి"
        },
        "settings": {
            "title": "సెట్టింగ్‌లు",
            "language": "భాష",
            "languageDescription": "మీకు నచ్చిన భాషను ఎంచుకోండి. అప్లికేషన్ వెంటనే ఎంచుకున్న భాషకు మారుతుంది.",
            "save": "సెట్టింగ్‌లను సేవ్ చేయండి",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "తిరిగి స్వాగతం",
            "overview": "అవలోకనం",
            "recentActivity": "ఇటీవలి కార్యాచరణ",
            "viewAll": "అన్నీ చూడండి",
            "stats": {
                "alerts": "క్రియాశీల హెచ్చరికలు",
                "docs": "ప్రాసెస్ చేయబడిన పత్రాలు",
                "score": "భద్రతా స్కోరు",
                "modules": "పూర్తయిన మాడ్యూల్స్"
            }
        },
        "auth": {
            "login": "సైన్ ఇన్ చేయండి",
            "signup": "ఖాతాను సృష్టించండి",
            "email": "ఇమెయిల్ చిరునామా",
            "password": "పాస్‌వర్డ్",
            "forgotPassword": "పాస్‌వర్డ్ మర్చిపోయారా?",
            "dontHaveAccount": "ఖాతా లేదా?",
            "alreadyHaveAccount": "ఇప్పటికే ఖాతా ఉందా?"
        },
        "chat": {
            "title": "AI సహాయకుడు",
            "placeholder": "మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి...",
            "send": "పంపండి"
        },
        "fraud": {
            "title": "మోసాల గుర్తింపు",
            "scan": "లావాదేవీని స్కాన్ చేయండి",
            "history": "స్కాన్ చరిత్ర"
        },
        "docs": {
            "title": "పత్ర విశ్లేషణ",
            "upload": "పత్రాన్ని అప్‌లోడ్ చేయండి",
            "processing": "ప్రాసెస్ అవుతోంది..."
        },
        "learn": {
            "title": "లెర్నింగ్ హబ్",
            "courses": "అందుబాటులో ఉన్న కోర్సులు",
            "progress": "మీ పురోగతి"
        }
    },
    "mr": {
        "nav": {
            "dashboard": "डॅशबोर्ड",
            "aiAssistant": "AI सहाय्यक",
            "fraudDetection": "फसवणूक शोध",
            "documents": "दस्तऐवज",
            "learningHub": "शिक्षण केंद्र",
            "settings": "सेटिंग्ज",
            "profile": "प्रोफाइल पहा",
            "signOut": "साइन आउट",
            "brandName": "एसबीआय साथी"
        },
        "settings": {
            "title": "सेटिंग्ज",
            "language": "भाषा",
            "languageDescription": "तुमची पसंतीची भाषा निवडा. अ‍ॅप्लिकेशन त्वरित निवडलेल्या भाषेत बदलेल.",
            "save": "सेटिंग्ज जतन करा",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "परत स्वागत आहे",
            "overview": "आढावा",
            "recentActivity": "अलीकडील क्रियाकलाप",
            "viewAll": "सर्व पहा",
            "stats": {
                "alerts": "सक्रिय सूचना",
                "docs": "प्रक्रिया केलेले दस्तऐवज",
                "score": "सुरक्षा स्कोअर",
                "modules": "पूर्ण झालेले मॉड्यूल"
            }
        },
        "auth": {
            "login": "साइन इन करा",
            "signup": "खाते तयार करा",
            "email": "ईमेल पत्ता",
            "password": "पासवर्ड",
            "forgotPassword": "पासवर्ड विसरलात?",
            "dontHaveAccount": "खाते नाही?",
            "alreadyHaveAccount": "आधीपासूनच खाते आहे?"
        },
        "chat": {
            "title": "AI सहाय्यक",
            "placeholder": "तुमचा संदेश येथे टाइप करा...",
            "send": "पाठवा"
        },
        "fraud": {
            "title": "फसवणूक शोध",
            "scan": "व्यवहार स्कॅन करा",
            "history": "स्कॅन इतिहास"
        },
        "docs": {
            "title": "दस्तऐवज विश्लेषण",
            "upload": "दस्तऐवज अपलोड करा",
            "processing": "प्रक्रिया करत आहे..."
        },
        "learn": {
            "title": "शिक्षण केंद्र",
            "courses": "उपलब्ध अभ्यासक्रम",
            "progress": "तुमची प्रगती"
        }
    },
    "gu": {
        "nav": {
            "dashboard": "ડેશબોર્ડ",
            "aiAssistant": "એઆઇ સહાયક",
            "fraudDetection": "છેતરપિંડી શોધ",
            "documents": "દસ્તાવેજો",
            "learningHub": "લર્નિંગ હબ",
            "settings": "સેટિંગ્સ",
            "profile": "પ્રોફાઇલ જુઓ",
            "signOut": "સાઇન આઉટ",
            "brandName": "એસબીઆઇ સાથી"
        },
        "settings": {
            "title": "સેટિંગ્સ",
            "language": "ભાષા",
            "languageDescription": "તમારી પસંદીદા ભાષા પસંદ કરો. એપ્લિકેશન તરત જ પસંદ કરેલી ભાષામાં બદલાઈ જશે.",
            "save": "સેટિંગ્સ સાચવો",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "પરત સ્વાગત છે",
            "overview": "ઝાંખી",
            "recentActivity": "તાજેતરની પ્રવૃત્તિ",
            "viewAll": "બધું જુઓ",
            "stats": {
                "alerts": "સક્રિય ચેતવણીઓ",
                "docs": "પ્રક્રિયા કરેલા દસ્તાવેજો",
                "score": "સુરક્ષા સ્કોર",
                "modules": "પૂર્ણ કરેલા મોડ્યુલો"
            }
        },
        "auth": {
            "login": "સાઇન ઇન કરો",
            "signup": "ખાતું બનાવો",
            "email": "ઇમેઇલ સરનામું",
            "password": "પાસવર્ડ",
            "forgotPassword": "પાસવર્ડ ભૂલી ગયા છો?",
            "dontHaveAccount": "શું તમારી પાસે ખાતું નથી?",
            "alreadyHaveAccount": "શું તમારી પાસે પહેલેથી જ ખાતું છે?"
        },
        "chat": {
            "title": "એઆઇ સહાયક",
            "placeholder": "તમારો સંદેશ અહીં લખો...",
            "send": "મોકલો"
        },
        "fraud": {
            "title": "છેતરપિંડી શોધ",
            "scan": "ટ્રાન્ઝેક્શન સ્કેન કરો",
            "history": "સ્કેન ઇતિહાસ"
        },
        "docs": {
            "title": "દસ્તાવેજ વિશ્લેષણ",
            "upload": "દસ્તાવેજ અપલોડ કરો",
            "processing": "પ્રક્રિયા થઈ રહી છે..."
        },
        "learn": {
            "title": "લર્નિંગ હબ",
            "courses": "ઉપલબ્ધ અભ્યાસક્રમો",
            "progress": "તમારી પ્રગતિ"
        }
    },
    "kn": {
        "nav": {
            "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            "aiAssistant": "ಎಐ ಸಹಾಯಕ",
            "fraudDetection": "ವಂಚನೆ ಪತ್ತೆ",
            "documents": "ದಾಖಲೆಗಳು",
            "learningHub": "ಲರ್ನಿಂಗ್ ಹಬ್",
            "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
            "profile": "ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ",
            "signOut": "ಸೈನ್ ಔಟ್",
            "brandName": "ಎಸ್‌ಬಿಐ ಸಾಥಿ"
        },
        "settings": {
            "title": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
            "language": "ಭಾಷೆ",
            "languageDescription": "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಅಪ್ಲಿಕೇಶನ್ ತಕ್ಷಣವೇ ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆಗೆ ಬದಲಾಗುತ್ತದೆ.",
            "save": "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "ಮರಳಿ ಸ್ವಾಗತ",
            "overview": "ಅವಲೋಕನ",
            "recentActivity": "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
            "viewAll": "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",
            "stats": {
                "alerts": "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
                "docs": "ಸಂಸ್ಕರಿಸಿದ ದಾಖಲೆಗಳು",
                "score": "ಭದ್ರತಾ ಸ್ಕೋರ್",
                "modules": "ಪೂರ್ಣಗೊಂಡ ಮಾಡ್ಯೂಲ್‌ಗಳು"
            }
        },
        "auth": {
            "login": "ಸೈನ್ ಇನ್",
            "signup": "ಖಾತೆ ರಚಿಸಿ",
            "email": "ಇಮೇಲ್ ವಿಳಾಸ",
            "password": "ಪಾಸ್ವರ್ಡ್",
            "forgotPassword": "ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?",
            "dontHaveAccount": "ಖಾತೆ ಇಲ್ಲವೇ?",
            "alreadyHaveAccount": "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?"
        },
        "chat": {
            "title": "ಎಐ ಸಹಾಯಕ",
            "placeholder": "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
            "send": "ಕಳುಹಿಸಿ"
        },
        "fraud": {
            "title": "ವಂಚನೆ ಪತ್ತೆ",
            "scan": "ವಹಿವಾಟನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
            "history": "ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ"
        },
        "docs": {
            "title": "ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆ",
            "upload": "ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            "processing": "ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ..."
        },
        "learn": {
            "title": "ಲರ್ನಿಂಗ್ ಹಬ್",
            "courses": "ಲಭ್ಯವಿರುವ ಕೋರ್ಸ್‌ಗಳು",
            "progress": "ನಿಮ್ಮ ಪ್ರಗತಿ"
        }
    },
    "ml": {
        "nav": {
            "dashboard": "ഡാഷ്ബോർഡ്",
            "aiAssistant": "എഐ അസിസ്റ്റന്റ്",
            "fraudDetection": "തട്ടിപ്പ് കണ്ടെത്തൽ",
            "documents": "രേഖകൾ",
            "learningHub": "ലേണിംഗ് ഹബ്",
            "settings": "ക്രമീകരണങ്ങൾ",
            "profile": "പ്രൊഫൈൽ കാണുക",
            "signOut": "സൈൻ ഔട്ട്",
            "brandName": "എസ്ബിഐ സാഥി"
        },
        "settings": {
            "title": "ക്രമീകരണങ്ങൾ",
            "language": "ഭാഷ",
            "languageDescription": "നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക. ആപ്ലിക്കേഷൻ ഉടനടി തിരഞ്ഞെടുത്ത ഭാഷയിലേക്ക് മാറും.",
            "save": "ക്രമീകരണങ്ങൾ സംരക്ഷിക്കുക",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "തിരികെ സ്വാഗതം",
            "overview": "അവലോകനം",
            "recentActivity": "സമീപകാല പ്രവർത്തനം",
            "viewAll": "എല്ലാം കാണുക",
            "stats": {
                "alerts": "സജീവ അലർട്ടുകൾ",
                "docs": "പ്രോസസ്സ് ചെയ്ത രേഖകൾ",
                "score": "സുരക്ഷാ സ്കോർ",
                "modules": "പൂർത്തിയാക്കിയ മൊഡ്യൂളുകൾ"
            }
        },
        "auth": {
            "login": "സൈൻ ഇൻ",
            "signup": "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
            "email": "ഇമെയിൽ വിലാസം",
            "password": "പാസ്‌വേഡ്",
            "forgotPassword": "പാസ്‌വേഡ് മറന്നോ?",
            "dontHaveAccount": "അക്കൗണ്ട് ഇല്ലേ?",
            "alreadyHaveAccount": "നിലവിൽ അക്കൗണ്ട് ഉണ്ടോ?"
        },
        "chat": {
            "title": "എഐ അസിസ്റ്റന്റ്",
            "placeholder": "നിങ്ങളുടെ സന്ദേശം ഇവിടെ ടൈപ്പ് ചെയ്യുക...",
            "send": "അയയ്ക്കുക"
        },
        "fraud": {
            "title": "തട്ടിപ്പ് കണ്ടെത്തൽ",
            "scan": "ഇടപാട് സ്കാൻ ചെയ്യുക",
            "history": "സ്കാൻ ചരിത്രം"
        },
        "docs": {
            "title": "രേഖാ വിശകലനം",
            "upload": "രേഖ അപ്‌ലോഡ് ചെയ്യുക",
            "processing": "പ്രോസസ്സ് ചെയ്യുന്നു..."
        },
        "learn": {
            "title": "ലേണിംഗ് ഹബ്",
            "courses": "ലഭ്യമായ കോഴ്സുകൾ",
            "progress": "നിങ്ങളുടെ പുരോഗതി"
        }
    },
    "pa": {
        "nav": {
            "dashboard": "ਡੈਸ਼ਬੋਰਡ",
            "aiAssistant": "ਏਆਈ ਸਹਾਇਕ",
            "fraudDetection": "ਧੋਖਾਧੜੀ ਦੀ ਪਛਾਣ",
            "documents": "ਦਸਤਾਵੇਜ਼",
            "learningHub": "ਸਿਖਲਾਈ ਹੱਬ",
            "settings": "ਸੈਟਿੰਗਜ਼",
            "profile": "ਪ੍ਰੋਫਾਈਲ ਦੇਖੋ",
            "signOut": "ਸਾਈਨ ਆਊਟ",
            "brandName": "ਐਸਬੀਆਈ ਸਾਥੀ"
        },
        "settings": {
            "title": "ਸੈਟਿੰਗਜ਼",
            "language": "ਭਾਸ਼ਾ",
            "languageDescription": "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ। ਐਪਲੀਕੇਸ਼ਨ ਤੁਰੰਤ ਚੁਣੀ ਗਈ ਭਾਸ਼ਾ ਵਿੱਚ ਬਦਲ ਜਾਵੇਗੀ।",
            "save": "ਸੈਟਿੰਗਜ਼ ਸੁਰੱਖਿਅਤ ਕਰੋ",
            "english": "English",
            "hindi": "Hindi - हिन्दी",
            "bengali": "Bengali - বাংলা",
            "tamil": "Tamil - தமிழ்",
            "telugu": "Telugu - తెలుగు",
            "marathi": "Marathi - मराठी",
            "gujarati": "Gujarati - ગુજરાતી",
            "kannada": "Kannada - ಕನ್ನಡ",
            "malayalam": "Malayalam - മലയാളം",
            "punjabi": "Punjabi - ਪੰਜਾਬੀ"
        },
        "dashboard": {
            "welcome": "ਵਾਪਸੀ 'ਤੇ ਸਵਾਗਤ ਹੈ",
            "overview": "ਸੰਖੇਪ ਜਾਣਕਾਰੀ",
            "recentActivity": "ਹਾਲੀਆ ਗਤੀਵਿਧੀ",
            "viewAll": "ਸਾਰੇ ਦੇਖੋ",
            "stats": {
                "alerts": "ਸਰਗਰਮ ਅਲਰਟ",
                "docs": "ਪ੍ਰੋਸੈਸ ਕੀਤੇ ਦਸਤਾਵੇਜ਼",
                "score": "ਸੁਰੱਖਿਆ ਸਕੋਰ",
                "modules": "ਪੂਰੇ ਕੀਤੇ ਮੋਡਿਊਲ"
            }
        },
        "auth": {
            "login": "ਸਾਈਨ ਇਨ ਕਰੋ",
            "signup": "ਖਾਤਾ ਬਣਾਓ",
            "email": "ਈਮੇਲ ਪਤਾ",
            "password": "ਪਾਸਵਰਡ",
            "forgotPassword": "ਕੀ ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ ਹੋ?",
            "dontHaveAccount": "ਕੀ ਖਾਤਾ ਨਹੀਂ ਹੈ?",
            "alreadyHaveAccount": "ਕੀ ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?"
        },
        "chat": {
            "title": "ਏਆਈ ਸਹਾਇਕ",
            "placeholder": "ਆਪਣਾ ਸੁਨੇਹਾ ਇੱਥੇ ਟਾਈਪ ਕਰੋ...",
            "send": "ਭੇਜੋ"
        },
        "fraud": {
            "title": "ਧੋਖਾਧੜੀ ਦੀ ਪਛਾਣ",
            "scan": "ਟ੍ਰਾਂਜੈਕਸ਼ਨ ਸਕੈਨ ਕਰੋ",
            "history": "ਸਕੈਨ ਇਤਿਹਾਸ"
        },
        "docs": {
            "title": "ਦਸਤਾਵੇਜ਼ ਵਿਸ਼ਲੇਸ਼ਣ",
            "upload": "ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ",
            "processing": "ਪ੍ਰੋਸੈਸ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..."
        },
        "learn": {
            "title": "ਸਿਖਲਾਈ ਹੱਬ",
            "courses": "ਉਪਲਬਧ ਕੋਰਸ",
            "progress": "ਤੁਹਾਡੀ ਪ੍ਰਗਤੀ"
        }
    }
}

for lang, data in translations.items():
    file_path = os.path.join(locales_dir, f"{lang}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Translations generated successfully.")
