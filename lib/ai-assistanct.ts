// lib/ai-assistant.ts
import { plantDiseases, farmingQuestions, findQuestionById } from './farm-data';

// Function to generate response based on user input
export const generateResponse = (input: string) => {
  // Search for matching questions
  const matchingQuestions = searchQuestions(input);

  if (matchingQuestions.length > 0) {
    // Return the answer from the best matching question
    return {
      hindiText: getHindiResponse(matchingQuestions[0].answer),
      englishText: matchingQuestions[0].answer,
      recommendations: getRecommendationsForTopic(matchingQuestions[0].category)
    };
  }

  // Check for specific keywords
  if (input.toLowerCase().includes("disease") || 
      input.toLowerCase().includes("रोग") || 
      input.toLowerCase().includes("बीमारी")) {
    return {
      hindiText: "पौधों के रोगों का निदान करने के लिए, रोग के लक्षणों का निरीक्षण करें जैसे पत्तियों पर धब्बे, मुरझाना, या असामान्य वृद्धि। सटीक निदान के लिए, रोग प्रभावित पौधे की तस्वीर अपलोड करें।",
      englishText: "To diagnose plant diseases, observe symptoms like spots on leaves, wilting, or abnormal growth. For accurate diagnosis, upload a photo of the affected plant in the Plant Diagnosis section.",
      recommendations: [
        "रोग वाले पौधे की तस्वीर अपलोड करें",
        "रोग के लक्षणों का विस्तृत वर्णन करें",
        "रोग प्रभावित पौधों को अलग करें"
      ],
      treatmentGuide: {
        title: "सामान्य पौधों के रोग और उपचार",
        description: "यहां कुछ सामान्य पौधों के रोगों के लिए उपचार दिए गए हैं",
        treatments: [
          {
            disease: "पाउडरी मिल्ड्यू (चूर्णिल फफूंदी)",
            symptoms: "पत्तियों पर सफेद पाउडर जैसा दिखाई देता है",
            treatment: "नीम तेल स्प्रे (5ml/लीटर पानी) या बेकिंग सोडा स्प्रे (1 चम्मच/लीटर पानी)"
          },
          {
            disease: "लेट ब्लाइट",
            symptoms: "पत्तियों पर भूरे धब्बे, नीचे सफेद फफूंदी",
            treatment: "कॉपर फंगीसाइड स्प्रे, प्रभावित पत्तियों को हटाएं"
          },
          {
            disease: "डैम्पिंग ऑफ",
            symptoms: "छोटे पौधे जमीन के पास से मुरझा जाते हैं",
            treatment: "मिट्टी का pH संतुलित करें, ड्रेनेज सुधारें"
          }
        ]
      }
    };
  }

  if (input.toLowerCase().includes("fertilizer") || 
      input.toLowerCase().includes("उर्वरक") || 
      input.toLowerCase().includes("खाद")) {
    return {
      hindiText: "फसलों के लिए उर्वरक:\n\n1. मिट्टी परीक्षण के आधार पर उर्वरक का प्रयोग करें\n\n2. जैविक खाद जैसे गोबर की खाद या वर्मीकम्पोस्ट का प्रयोग करें\n\n3. नाइट्रोजन युक्त उर्वरक पत्तियों की वृद्धि के लिए प्रयोग करें\n\n4. फॉस्फोरस युक्त उर्वरक जड़ों और फूलों के विकास के लिए प्रयोग करें\n\n5. पोटैशियम युक्त उर्वरक पौधों के स्वास्थ्य और रोग प्रतिरोधक क्षमता के लिए प्रयोग करें",
      englishText: "For fertilizing crops:\n\n1. Apply fertilizers based on soil testing\n\n2. Use organic compost like cow dung manure or vermicompost\n\n3. Apply nitrogen-rich fertilizers for leaf growth\n\n4. Use phosphorus-rich fertilizers for root development and flowering\n\n5. Apply potassium-rich fertilizers for plant health and disease resistance",
      recommendations: [
        "मिट्टी परीक्षण करवाएं",
        "जैविक और रासायनिक उर्वरकों का संतुलित प्रयोग करें",
        "फसल चक्र अपनाएं"
      ],
      seasonalTips: {
        title: "मौसम के अनुसार उर्वरक प्रयोग",
        tips: [
          "खरीफ फसलों के लिए: बुवाई से पहले गोबर की खाद, 30 दिन बाद यूरिया",
          "रबी फसलों के लिए: बुवाई से पहले DAP, 40 दिन बाद यूरिया",
          "बागवानी फसलों के लिए: हर 3 महीने में संतुलित NPK"
        ]
      }
    };
  }

  if (input.toLowerCase().includes("water") || 
      input.toLowerCase().includes("पानी") || 
      input.toLowerCase().includes("irrigation") ||
      input.toLowerCase().includes("सिंचाई")) {
    return {
      hindiText: "सिंचाई के लिए सुझाव:\n\n1. गहरी सिंचाई करें लेकिन कम बार, इससे जड़ें गहरी होंगी\n\n2. सुबह जल्दी सिंचाई करें ताकि वाष्पीकरण कम हो\n\n3. ड्रिप सिंचाई का प्रयोग करें जिससे पानी सीधे जड़ों तक पहुंचे\n\n4. अधिकांश सब्जियों को प्रति सप्ताह लगभग 1-1.5 इंच पानी की आवश्यकता होती है",
      englishText: "For optimal irrigation:\n\n1. Water deeply but infrequently to encourage deep root growth\n\n2. Water early in the morning to reduce evaporation\n\n3. Consider drip irrigation to deliver water directly to the roots\n\n4. Most vegetables need about 1-1.5 inches of water per week",
      recommendations: [
        "ड्रिप सिंचाई अपनाएं",
        "मिट्टी की नमी के अनुसार सिंचाई करें",
        "सुबह या शाम को सिंचाई करें"
      ],
      weatherInfo: {
        title: "आपके क्षेत्र के लिए मौसम पूर्वानुमान",
        forecast: [
          { day: "आज", temp: "32°C", condition: "धूप", humidity: "65%" },
          { day: "कल", temp: "30°C", condition: "बादल", humidity: "70%" },
          { day: "परसों", temp: "29°C", condition: "हल्की बारिश", humidity: "80%" }
        ],
        recommendation: "कल से बारिश की संभावना है, सिंचाई योजना को समायोजित करें"
      }
    };
  }

  // Default response
  return {
    hindiText: "आपके प्रश्न के लिए धन्यवाद। कृषि सहायक के रूप में, मैं पौधों के रोग, कीट प्रबंधन, सिंचाई तकनीक, फसल चक्र, मिट्टी स्वास्थ्य और टिकाऊ खेती के बारे में मदद कर सकता हूं। क्या आप अपनी विशिष्ट कृषि चुनौती के बारे में अधिक जानकारी प्रदान कर सकते हैं?",
    englishText: "Thank you for your question. As a farming assistant, I can help with plant diseases, pest management, irrigation techniques, crop rotation, soil health, and sustainable farming practices. Could you provide more details about your specific farming challenge?",
    recommendations: [
      "अपना प्रश्न विस्तार से पूछें",
      "अपनी फसल का नाम बताएं",
      "समस्या के लक्षणों का उल्लेख करें"
    ]
  };
};

// Function to search questions by keyword
export const searchQuestions = (keyword: string) => {
  const lowerKeyword = keyword.toLowerCase();
  return farmingQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerKeyword) ||
      q.answer.toLowerCase().includes(lowerKeyword) ||
      q.category.toLowerCase().includes(lowerKeyword),
  );
};

// Helper function to get Hindi translation of a response
// In a real app, this would use proper translation
const getHindiResponse = (englishText: string) => {
  // This is a placeholder. In a real app, you would use a translation service
  // or have pre-translated content
  return englishText.replace("For", "के लिए").replace("the", "").replace("and", "और");
};

// Helper function to get recommendations based on topic
const getRecommendationsForTopic = (category: string) => {
  switch (category) {
    case "Pest Management":
      return [
        "जैविक कीटनाशकों का प्रयोग करें",
        "फसल चक्र अपनाएं",
        "प्राकृतिक शत्रुओं को बढ़ावा दें"
      ];
    case "Irrigation":
      return [
        "ड्रिप सिंचाई अपनाएं",
        "मिट्टी की नमी के अनुसार सिंचाई करें",
        "सुबह या शाम को सिंचाई करें"
      ];
    case "Soil & Fertilization":
      return [
        "मिट्टी परीक्षण करवाएं",
        "जैविक खाद का प्रयोग करें",
        "हरी खाद का प्रयोग करें"
      ];
    case "Planting & Harvesting":
      return [
        "मौसम के अनुसार बुवाई करें",
        "उन्नत बीजों का प्रयोग करें",
        "फसल की उचित देखभाल करें"
      ];
    case "Disease Management":
      return [
        "रोग प्रतिरोधी किस्मों का उपयोग करें",
        "फसल चक्र अपनाएं",
        "उचित दूरी पर बुवाई करें"
      ];
    default:
      return [
        "अपना प्रश्न विस्तार से पूछें",
        "अपनी फसल का नाम बताएं",
        "समस्या के लक्षणों का उल्लेख करें"
      ];
  }
};

// Function to get Indian farming tips
export const getIndianFarmingTips = () => {
  return [
    {
      title: "खरीफ फसल सुझाव",
      tips: [
        "धान की रोपाई के लिए जून-जुलाई का समय उत्तम है",
        "मक्का के लिए नाइट्रोजन उर्वरक का प्रयोग करें",
        "बाजरा सूखा प्रतिरोधी फसल है, कम पानी वाले क्षेत्रों के लिए उपयुक्त"
      ]
    },
    {
      title: "रबी फसल सुझाव",
      tips: [
        "गेहूं की बुवाई अक्टूबर-नवंबर में करें",
        "चना के लिए फॉस्फोरस उर्वरक का प्रयोग करें",
        "सरसों के लिए 3-4 सिंचाई पर्याप्त होती है"
      ]
    },
    {
      title: "जैविक खेती सुझाव",
      tips: [
        "गोबर की खाद का प्रयोग करें",
        "नीम के तेल का कीटनाशक के रूप में प्रयोग करें",
        "फसल चक्र अपनाएं"
      ]
    }
  ];
};

// Function to get crop calendar
export const getCropCalendar = () => {
  return {
    months: [
      {
        name: "जनवरी",
        crops: ["गेहूं", "चना", "मटर", "सरसों", "आलू"]
      },
      {
        name: "फरवरी",
        crops: ["गेहूं", "चना", "मटर", "सरसों", "प्याज"]
      },
      {
        name: "मार्च",
        crops: ["गेहूं की कटाई", "तरबूज", "खरबूजा", "ककड़ी"]
      },
      {
        name: "अप्रैल",
        crops: ["गेहूं की कटाई", "तरबूज", "खरबूजा", "भिंडी"]
      },
      {
        name: "मई",
        crops: ["भिंडी", "लौकी", "करेला", "खीरा"]
      },
      {
        name: "जून",
        crops: ["धान", "मक्का", "अरहर", "मूंग", "उड़द"]
      },
      {
        name: "जुलाई",
        crops: ["धान", "मक्का", "बाजरा", "ज्वार", "मूंगफली"]
      },
      {
        name: "अगस्त",
        crops: ["धान", "मक्का", "बाजरा", "ज्वार", "तिल"]
      },
      {
        name: "सितंबर",
        crops: ["धान", "मक्का", "बाजरा", "ज्वार", "कपास"]
      },
      {
        name: "अक्टूबर",
        crops: ["धान की कटाई", "गेहूं", "चना", "मटर", "सरसों"]
      },
      {
        name: "नवंबर",
        crops: ["गेहूं", "चना", "मटर", "सरसों", "आलू"]
      },
      {
        name: "दिसंबर",
        crops: ["गेहूं", "चना", "मटर", "सरसों", "आलू", "प्याज"]
      }
    ]
  };
};

// Function to get localized content
export const getLocalizedContent = (key: string, language: string) => {
  const content = {
    "welcome_message": {
      "hindi": "नमस्ते! मैं आपका कृषि सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
      "english": "Hello! I am your farming assistant. How can I help you today?"
    },
    "intelligent_mode": {
      "hindi": "बुद्धिमान मोड",
      "english": "Intelligent Mode"
    },
    "enable_voice": {
      "hindi": "आवाज़ सक्षम करें",
      "english": "Enable Voice"
    },
    "clear_chat": {
      "hindi": "चैट साफ़ करें",
      "english": "Clear Chat"
    },
    "common_questions": {
      "hindi": "सामान्य प्रश्न",
      "english": "Common Questions"
    },
    "recommendations": {
      "hindi": "सुझाव:",
      "english": "Recommendations:"
    },
    "type_question": {
      "hindi": "अपना प्रश्न यहां टाइप करें...",
      "english": "Type your farming question..."
    }
  };
  
  return content[key]?.[language] || content[key]?.["english"] || key;
};