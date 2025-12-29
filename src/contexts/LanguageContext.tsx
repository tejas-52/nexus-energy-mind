import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.dashboard': 'Dashboard',
    'nav.calculator': 'Calculator',
    'nav.forecast': 'Forecast',
    'nav.marketplace': 'Marketplace',
    'nav.predictor': 'AI Predictor',
    'nav.subsidy': 'Subsidy Calculator',
    'nav.getStarted': 'Get Started',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.badge': 'Smart Energy for Every Indian Home',
    'hero.title1': 'Save Money with',
    'hero.title2': 'Solar Power',
    'hero.subtitle': 'Track, trade, and optimize your solar energy. Start saving on electricity bills from day one.',
    'hero.cta': 'Start Saving Today',
    'hero.secondary': 'See How It Works',
    
    // Features
    'features.title': 'Everything You Need',
    'features.subtitle': 'Simple tools to help you save money and go green',
    
    // Predictor
    'predictor.badge': 'AI-Powered Prediction',
    'predictor.title': 'Solar Energy',
    'predictor.titleHighlight': 'Predictor',
    'predictor.subtitle': 'Get AI-powered predictions for your solar panel setup. Enter your location or temperature manually to see accurate energy generation estimates.',
    'predictor.panelConfig': 'Panel Configuration',
    'predictor.searchCity': 'Search City (Get Live Weather)',
    'predictor.cityPlaceholder': 'Enter city name (e.g., Delhi, Mumbai)',
    'predictor.panelCount': 'Number of Panels',
    'predictor.panelCapacity': 'Panel Capacity (Watts)',
    'predictor.panelEfficiency': 'Panel Efficiency',
    'predictor.panelTilt': 'Panel Tilt Angle',
    'predictor.temperature': 'Temperature (Manual Entry)',
    'predictor.sunlightHours': 'Sunlight Hours/Day',
    'predictor.cloudCover': 'Cloud Cover',
    'predictor.month': 'Month (for seasonal adjustment)',
    'predictor.yearlyAverage': 'Yearly Average',
    'predictor.systemCapacity': 'Total System Capacity',
    'predictor.predict': 'Predict Energy Generation',
    'predictor.analyzing': 'AI is analyzing...',
    'predictor.results': 'AI Prediction Results',
    'predictor.confidence': 'confidence',
    'predictor.dailyGen': 'Daily Generation',
    'predictor.monthlyGen': 'Monthly Generation',
    'predictor.monthlySavings': 'Monthly Savings',
    'predictor.carbonOffset': 'CO₂ Offset/Month',
    'predictor.yearlyProjections': 'Yearly Projections',
    'predictor.annualGen': 'Annual Generation',
    'predictor.annualSavings': 'Annual Savings',
    'predictor.peakHours': 'Peak Hours',
    'predictor.actualEfficiency': 'Actual Efficiency',
    'predictor.recommendations': 'AI Recommendations',
    'predictor.ready': 'Ready to Predict',
    'predictor.readyDesc': 'Configure your solar panel setup on the left and click "Predict" to get AI-powered energy generation estimates.',
    'predictor.tip': 'Tip:',
    'predictor.tipText': 'Search for your city to get live temperature and weather data, or enter temperature manually for custom calculations.',
    'predictor.howItWorks': 'How It Works',
    'predictor.step1': 'Search your city for live weather or enter temperature manually',
    'predictor.step2': 'Configure your solar panel specifications',
    'predictor.step3': 'Our AI analyzes weather patterns & solar irradiance',
    'predictor.step4': 'Get accurate predictions with savings in ₹ (INR)',
    'predictor.savePrediction': 'Save Prediction',
    'predictor.history': 'Prediction History',
    
    // Subsidy
    'subsidy.title': 'Government Subsidy',
    'subsidy.titleHighlight': 'Calculator',
    'subsidy.subtitle': 'Calculate your solar subsidy under PM Surya Ghar Yojana and state schemes.',
    'subsidy.selectState': 'Select Your State',
    'subsidy.systemSize': 'System Size (kW)',
    'subsidy.calculate': 'Calculate Subsidy',
    'subsidy.results': 'Subsidy Breakdown',
    'subsidy.central': 'Central Govt Subsidy (PM Surya Ghar)',
    'subsidy.state': 'State Subsidy',
    'subsidy.totalSubsidy': 'Total Subsidy',
    'subsidy.estimatedCost': 'Estimated System Cost',
    'subsidy.netCost': 'Net Cost After Subsidy',
    'subsidy.youSave': 'You Save',
    'subsidy.note': 'Note: Subsidy amounts are estimates based on current schemes. Actual amounts may vary.',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.welcome': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.loginDesc': 'Sign in to save your predictions and access your dashboard',
    'auth.signupDesc': 'Join thousands of Indian households saving with solar',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
  },
  hi: {
    // Header
    'nav.dashboard': 'डैशबोर्ड',
    'nav.calculator': 'कैलकुलेटर',
    'nav.forecast': 'पूर्वानुमान',
    'nav.marketplace': 'बाज़ार',
    'nav.predictor': 'AI भविष्यवक्ता',
    'nav.subsidy': 'सब्सिडी कैलकुलेटर',
    'nav.getStarted': 'शुरू करें',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    
    // Hero
    'hero.badge': 'हर भारतीय घर के लिए स्मार्ट ऊर्जा',
    'hero.title1': 'सोलर पावर से',
    'hero.title2': 'पैसे बचाएं',
    'hero.subtitle': 'अपनी सौर ऊर्जा को ट्रैक करें, व्यापार करें और अनुकूलित करें। पहले दिन से बिजली बिलों पर बचत शुरू करें।',
    'hero.cta': 'आज ही बचत शुरू करें',
    'hero.secondary': 'देखें कैसे काम करता है',
    
    // Features
    'features.title': 'आपकी ज़रूरत की हर चीज़',
    'features.subtitle': 'पैसे बचाने और हरित बनने में मदद के लिए सरल उपकरण',
    
    // Predictor
    'predictor.badge': 'AI-संचालित भविष्यवाणी',
    'predictor.title': 'सौर ऊर्जा',
    'predictor.titleHighlight': 'भविष्यवक्ता',
    'predictor.subtitle': 'अपने सोलर पैनल सेटअप के लिए AI-संचालित भविष्यवाणी प्राप्त करें। सटीक ऊर्जा उत्पादन अनुमान देखने के लिए अपना स्थान या तापमान मैन्युअल रूप से दर्ज करें।',
    'predictor.panelConfig': 'पैनल कॉन्फ़िगरेशन',
    'predictor.searchCity': 'शहर खोजें (लाइव मौसम प्राप्त करें)',
    'predictor.cityPlaceholder': 'शहर का नाम दर्ज करें (जैसे दिल्ली, मुंबई)',
    'predictor.panelCount': 'पैनलों की संख्या',
    'predictor.panelCapacity': 'पैनल क्षमता (वाट)',
    'predictor.panelEfficiency': 'पैनल दक्षता',
    'predictor.panelTilt': 'पैनल झुकाव कोण',
    'predictor.temperature': 'तापमान (मैन्युअल एंट्री)',
    'predictor.sunlightHours': 'धूप के घंटे/दिन',
    'predictor.cloudCover': 'बादल आवरण',
    'predictor.month': 'महीना (मौसमी समायोजन के लिए)',
    'predictor.yearlyAverage': 'वार्षिक औसत',
    'predictor.systemCapacity': 'कुल सिस्टम क्षमता',
    'predictor.predict': 'ऊर्जा उत्पादन की भविष्यवाणी करें',
    'predictor.analyzing': 'AI विश्लेषण कर रहा है...',
    'predictor.results': 'AI भविष्यवाणी परिणाम',
    'predictor.confidence': 'विश्वास',
    'predictor.dailyGen': 'दैनिक उत्पादन',
    'predictor.monthlyGen': 'मासिक उत्पादन',
    'predictor.monthlySavings': 'मासिक बचत',
    'predictor.carbonOffset': 'CO₂ ऑफसेट/माह',
    'predictor.yearlyProjections': 'वार्षिक अनुमान',
    'predictor.annualGen': 'वार्षिक उत्पादन',
    'predictor.annualSavings': 'वार्षिक बचत',
    'predictor.peakHours': 'पीक घंटे',
    'predictor.actualEfficiency': 'वास्तविक दक्षता',
    'predictor.recommendations': 'AI अनुशंसाएं',
    'predictor.ready': 'भविष्यवाणी के लिए तैयार',
    'predictor.readyDesc': 'बाईं ओर अपना सोलर पैनल सेटअप कॉन्फ़िगर करें और AI-संचालित ऊर्जा उत्पादन अनुमान प्राप्त करने के लिए "भविष्यवाणी" पर क्लिक करें।',
    'predictor.tip': 'सुझाव:',
    'predictor.tipText': 'लाइव तापमान और मौसम डेटा प्राप्त करने के लिए अपना शहर खोजें, या कस्टम गणना के लिए तापमान मैन्युअल रूप से दर्ज करें।',
    'predictor.howItWorks': 'यह कैसे काम करता है',
    'predictor.step1': 'लाइव मौसम के लिए अपना शहर खोजें या तापमान मैन्युअल रूप से दर्ज करें',
    'predictor.step2': 'अपने सोलर पैनल विनिर्देश कॉन्फ़िगर करें',
    'predictor.step3': 'हमारा AI मौसम पैटर्न और सौर विकिरण का विश्लेषण करता है',
    'predictor.step4': '₹ (INR) में बचत के साथ सटीक भविष्यवाणी प्राप्त करें',
    'predictor.savePrediction': 'भविष्यवाणी सहेजें',
    'predictor.history': 'भविष्यवाणी इतिहास',
    
    // Subsidy
    'subsidy.title': 'सरकारी सब्सिडी',
    'subsidy.titleHighlight': 'कैलकुलेटर',
    'subsidy.subtitle': 'पीएम सूर्य घर योजना और राज्य योजनाओं के तहत अपनी सोलर सब्सिडी की गणना करें।',
    'subsidy.selectState': 'अपना राज्य चुनें',
    'subsidy.systemSize': 'सिस्टम साइज (kW)',
    'subsidy.calculate': 'सब्सिडी की गणना करें',
    'subsidy.results': 'सब्सिडी विवरण',
    'subsidy.central': 'केंद्र सरकार सब्सिडी (पीएम सूर्य घर)',
    'subsidy.state': 'राज्य सब्सिडी',
    'subsidy.totalSubsidy': 'कुल सब्सिडी',
    'subsidy.estimatedCost': 'अनुमानित सिस्टम लागत',
    'subsidy.netCost': 'सब्सिडी के बाद शुद्ध लागत',
    'subsidy.youSave': 'आप बचाते हैं',
    'subsidy.note': 'नोट: सब्सिडी राशि वर्तमान योजनाओं के आधार पर अनुमान है। वास्तविक राशि भिन्न हो सकती है।',
    
    // Auth
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.haveAccount': 'पहले से खाता है?',
    'auth.welcome': 'वापसी पर स्वागत है',
    'auth.createAccount': 'खाता बनाएं',
    'auth.loginDesc': 'अपनी भविष्यवाणियां सहेजने और डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    'auth.signupDesc': 'सोलर से बचत करने वाले हजारों भारतीय परिवारों से जुड़ें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
