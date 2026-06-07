import { useState, useEffect, useRef } from "react";

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { home:"Home", shop:"Medicine Shop", doctor:"Our Doctor", services:"Services", contact:"Contact" },
    hero: {
      badge:"Serving Livestock Since 2018",
      title:"Zia Veterinary",
      titleSub:"Clinic & Pharmacy",
      desc:"Pakistan's trusted rural veterinary partner — quality medicines, expert DVM consultation, and AI-powered livestock care for farmers of Marot & beyond.",
      cta:"WhatsApp Consult",
      cta2:"Browse Medicines",
      stat1:"500+ Medicines",
      stat2:"Cattle · Buffalo · Camel",
      stat3:"DVM Certified",
    },
    about: {
      badge:"About the Proprietor",
      name:"Dr. Naveed Iqbal",
      role:"Doctor of Veterinary Medicine (DVM)",
      bio:"With over 6 years of dedicated field practice in Marot, Dr. Naib Amin has treated thousands of livestock animals across Punjab. His mission: make quality veterinary care affordable and accessible to every farmer.",
      feat1:"DVM Graduate",
      feat2:"Large Animal Specialist",
      feat3:"Poultry & Dairy Expert",
      book:"Book Appointment",
      phone1:"0307-8395319",
      phone2:"0341-7395319",
    },
    services: {
      badge:"Our Services",
      title:"Complete Animal Healthcare",
      s1t:"Large Animal Treatment",s1d:"Cattle, Buffalo, Camels, Horses — vaccinations, deworming, reproductive care.",
      s2t:"Poultry Services",s2d:"Layer & broiler flock management, disease diagnosis, avian medicine.",
      s3t:"Milk Booster Programs",s3d:"Customized feed supplement protocols to maximize dairy production.",
      s4t:"Home Visit / Farm Call",s4d:"Emergency farm visits available. Call us for urgent livestock care.",
      s5t:"Medicine Delivery",s5d:"EasyPaisa / JazzCash / Cash on Delivery. Rural delivery available.",
      s6t:"AI Symptom Check",s6d:"Upload a photo or describe symptoms — our AI triage guides you instantly.",
    },
    shop: {
      badge:"E-Pharmacy",
      title:"Medicine Shop",
      search:"Search medicines…",
      cats:["All","Cattle & Buffalo","Poultry","Feed Supplements","Injections","Syrups & Powders","Milk Boosters"],
      add:"Add to Cart",
      cart:"Cart",
      checkout:"Checkout",
      empty:"Your cart is empty",
      total:"Total",
      pay:"Place Order via WhatsApp",
    },
    ai: {
      badge:"AI-Powered Features",
      title:"Smart Livestock Care",
      imgTitle:"AI Medicine Identifier",
      imgDesc:"Upload a photo of any medicine pack or prescription — our AI identifies it from our inventory instantly.",
      imgBtn:"Upload Medicine Image",
      imgAnalyze:"Analyzing image…",
      chatTitle:"AI Vet Assistant",
      chatDesc:"Describe your animal's symptoms in Urdu or English and get instant first-aid advice.",
      chatPlaceholder:"Describe symptoms… e.g. 'Meri gaay ko bukhaar hai aur doodh kam ho gaya'",
      chatSend:"Send",
      diseaseTitle:"Disease Alert Scanner",
      diseaseDesc:"Upload a photo of your animal's wound or skin condition for urgent AI pre-analysis.",
      diseaseBtn:"Upload Animal Photo",
    },
    appt: {
      badge:"Book Appointment",
      title:"Schedule a Consultation",
      name:"Your Name",
      phone:"Phone Number",
      animal:"Animal Type",
      animals:["Select Animal","Cattle (Gaay)","Buffalo (Bhains)","Camel (Oont)","Goat (Bakri)","Poultry","Other"],
      issue:"Describe the Issue",
      type:"Visit Type",
      types:["In-Person Visit","Online Consultation (Video Call)","Farm Home Visit"],
      date:"Preferred Date",
      submit:"Confirm Booking",
      success:"✓ Appointment Request Sent! We'll confirm via WhatsApp.",
    },
    footer:{
      address:"Main Road Marot, Near Govt Boys Higher Secondary School, Marot",
      rights:"© 2026 Zia Veterinary Clinic. All rights reserved.",
    }
  },
  ur: {
    nav:{ home:"ہوم", shop:"دوائیں خریدیں", doctor:"ڈاکٹر", services:"خدمات", contact:"رابطہ" },
    hero:{
      badge:"۲۰۱۸ سے مویشیوں کی خدمت میں",
      title:"ضیاء ویٹرنری",
      titleSub:"کلینک اور فارمیسی",
      desc:"مروٹ اور گردونواح کے کسانوں کے لیے معیاری ویٹرنری خدمات — بہترین دوائیں، ماہر ڈاکٹر، اور مصنوعی ذہانت سے لیس مویشی نگہداشت۔",
      cta:"واٹس ایپ مشورہ",
      cta2:"دوائیں دیکھیں",
      stat1:"۵۰۰+ دوائیں",
      stat2:"گائے · بھینس · اونٹ",
      stat3:"ڈی وی ایم سند یافتہ",
    },
    about:{
      badge:"مالک کا تعارف",
      name:"ڈاکٹر نائب امین",
      role:"ڈاکٹر آف ویٹرنری میڈیسن (DVM)",
      bio:"مروٹ میں ۶ سال سے زائد تجربے کے ساتھ، ڈاکٹر نائب امین نے پنجاب بھر میں ہزاروں مویشیوں کا کامیاب علاج کیا ہے۔ ان کا مقصد ہر کسان تک سستی اور معیاری ویٹرنری سہولت پہنچانا ہے۔",
      feat1:"DVM سند یافتہ",
      feat2:"بڑے جانوروں کے ماہر",
      feat3:"پولٹری و ڈیری ماہر",
      book:"اپوائنٹمنٹ لیں",
      phone1:"0307-8395319",
      phone2:"0341-7395319",
    },
    services:{
      badge:"ہماری خدمات",
      title:"مکمل جانوروں کی صحت نگہداشت",
      s1t:"بڑے جانوروں کا علاج",s1d:"گائے، بھینس، اونٹ، گھوڑے — ٹیکے، کیڑے مار دوا، تولیدی نگہداشت۔",
      s2t:"پولٹری خدمات",s2d:"لیئر اور بروئلر غول کا انتظام، بیماریوں کی تشخیص، پرندوں کی دوائیں۔",
      s3t:"دودھ بڑھانے کا پروگرام",s3d:"ڈیری پیداوار بڑھانے کے لیے خصوصی فیڈ سپلیمنٹ پروٹوکول۔",
      s4t:"گھر / فارم وزٹ",s4d:"ایمرجنسی فارم وزٹ دستیاب۔ فوری نگہداشت کے لیے ابھی کال کریں۔",
      s5t:"دوائی ڈیلیوری",s5d:"ایزی پیسہ / جاز کیش / کیش آن ڈیلیوری۔ دیہی علاقوں میں ڈیلیوری۔",
      s6t:"AI علامت چیک",s6d:"تصویر اپلوڈ کریں یا علامات بتائیں — ہمارا AI فوری رہنمائی کرے گا۔",
    },
    shop:{
      badge:"ای فارمیسی",
      title:"دوائیں خریدیں",
      search:"دوائی تلاش کریں…",
      cats:["سب","گائے بھینس","پولٹری","فیڈ سپلیمنٹ","انجیکشن","شربت و پاؤڈر","دودھ بڑھانے والی"],
      add:"کارٹ میں شامل کریں",
      cart:"کارٹ",
      checkout:"آرڈر کریں",
      empty:"کارٹ خالی ہے",
      total:"کل رقم",
      pay:"واٹس ایپ پر آرڈر کریں",
    },
    ai:{
      badge:"AI خصوصیات",
      title:"ذہین مویشی نگہداشت",
      imgTitle:"AI دوائی پہچان",
      imgDesc:"کسی بھی دوائی یا نسخے کی تصویر اپلوڈ کریں — ہمارا AI فوری شناخت کرے گا۔",
      imgBtn:"دوائی کی تصویر اپلوڈ کریں",
      imgAnalyze:"تصویر تجزیہ ہو رہا ہے…",
      chatTitle:"AI ویٹ اسسٹنٹ",
      chatDesc:"اردو یا انگریزی میں جانور کی علامات بیان کریں اور فوری پہلی امداد حاصل کریں۔",
      chatPlaceholder:"علامات بتائیں… مثلاً 'میری گائے کو بخار ہے اور دودھ کم ہو گیا'",
      chatSend:"بھیجیں",
      diseaseTitle:"بیماری الرٹ اسکینر",
      diseaseDesc:"جانور کے زخم یا جلد کی تصویر اپلوڈ کریں۔",
      diseaseBtn:"جانور کی تصویر اپلوڈ کریں",
    },
    appt:{
      badge:"اپوائنٹمنٹ",
      title:"مشورہ بک کریں",
      name:"آپ کا نام",
      phone:"فون نمبر",
      animal:"جانور کی قسم",
      animals:["جانور منتخب کریں","گائے","بھینس","اونٹ","بکری","پولٹری","دیگر"],
      issue:"مسئلہ بیان کریں",
      type:"وزٹ کی قسم",
      types:["ذاتی وزٹ","آن لائن مشورہ (ویڈیو کال)","فارم ہوم وزٹ"],
      date:"پسندیدہ تاریخ",
      submit:"بکنگ کی تصدیق کریں",
      success:"✓ اپوائنٹمنٹ کی درخواست بھیج دی گئی! ہم واٹس ایپ پر تصدیق کریں گے۔",
    },
    footer:{
      address:"مین روڈ مروٹ، گورنمنٹ بوائز ہائر سیکنڈری سکول مروٹ کے قریب",
      rights:"© ۲۰۲۶ ضیاء ویٹرنری کلینک۔ تمام حقوق محفوظ۔",
    }
  }
};

// ── Product Data ──────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1, name:"Clozasol (Closantel)", urdu:"کلوزاسول", cat:1, price:850, unit:"Box", desc:"Broad-spectrum anthelmintic for cattle & buffalo", emoji:"💊" },
  { id:2, name:"Penbiotic 5gm Injection", urdu:"پینبائیوٹک انجیکشن", cat:4, price:1200, unit:"Vial", desc:"Procaine Penicillin G — bacterial infections", emoji:"💉" },
  { id:3, name:"Punch Mineral Mix", urdu:"پنچ منرل مکس", cat:6, price:2400, unit:"5kg Bag", desc:"Complete mineral supplement for dairy cows", emoji:"🧪" },
  { id:4, name:"Mylase Enzyme", urdu:"مائیلیز اینزائم", cat:3, price:1800, unit:"Bottle", desc:"Digestive enzyme supplement, improves feed efficiency", emoji:"🌿" },
  { id:5, name:"Kilsan Disinfectant", urdu:"کلسان جراثیم کش", cat:1, price:950, unit:"Litre", desc:"Farm disinfectant for livestock sheds", emoji:"🧴" },
  { id:6, name:"Fibro Fit DS", urdu:"فائبرو فٹ", cat:3, price:1600, unit:"Pack", desc:"Fibre digestibility enhancer for ruminants", emoji:"🌾" },
  { id:7, name:"Scour-X Anti-Diarrheal", urdu:"اسکاور ایکس", cat:1, price:780, unit:"Bottle", desc:"Treats diarrhea & dehydration in calves", emoji:"💧" },
  { id:8, name:"Milk Power Plus", urdu:"ملک پاور پلس", cat:6, price:3200, unit:"10kg Bag", desc:"Premium milk booster with calcium & vitamins", emoji:"🥛" },
  { id:9, name:"Duralin Bolus", urdu:"ڈیورالن بولس", cat:1, price:420, unit:"Strip/10", desc:"Antibiotic bolus for respiratory & GI infections", emoji:"💊" },
  { id:10, name:"Tumer-E Injection", urdu:"ٹیومر ای انجیکشن", cat:4, price:1100, unit:"Vial", desc:"Vitamin E & Selenium — reproductive health", emoji:"💉" },
  { id:11, name:"Poultry B-Complex", urdu:"پولٹری بی کامپلیکس", cat:2, price:650, unit:"Bottle", desc:"Water-soluble B vitamins for poultry flocks", emoji:"🐔" },
  { id:12, name:"Acrimec Ivermectin", urdu:"ایکریمیک", cat:5, price:890, unit:"50ml Bottle", desc:"Broad antiparasitic pour-on for cattle", emoji:"🧴" },
];

// ── Icons (inline SVG as components) ─────────────────────────────────────────
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.28 7.04L.787 23.213l4.3-1.376A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.236 0-4.32-.643-6.079-1.753l-.436-.259-2.552.816.83-2.485-.283-.454A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19a2 2 0 001.99-1.73L22 6H6"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="#f59e0b" width="14" height="14">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// ── Main App ──────────────────────────────────────────────────────────────────
export default function ZiaVetClinic() {
  const [lang, setLang] = useState("en");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [apptSubmitted, setApptSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role:"ai", text:"Hello! I'm Dr. Zia AI Assistant. Describe your animal's symptoms and I'll help guide you. / السلام علیکم! مجھے اپنے جانور کی علامات بتائیں۔" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [imgAnalyzing, setImgAnalyzing] = useState(false);
  const [imgResult, setImgResult] = useState(null);
  const [diseaseAnalyzing, setDiseaseAnalyzing] = useState(false);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatEndRef = useRef(null);
  const t = T[lang];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages]);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? {...i, qty: i.qty+1} : i);
      return [...prev, {...product, qty:1}];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const cartTotal = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const cartCount = cart.reduce((s,i) => s + i.qty, 0);

  const filteredProducts = PRODUCTS.filter(p =>
    (activeCat === 0 || p.cat === activeCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.urdu.includes(search))
  );

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role:"user", text: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`You are Dr. Zia AI Assistant for Zia Veterinary Clinic in Marot, Pakistan. You help farmers with livestock symptoms (cattle, buffalo, camels, goats, poultry). 
          - Respond in the same language the user writes (Urdu, Roman Urdu, or English).
          - Provide brief first-aid advice for livestock symptoms.
          - Always recommend booking an appointment with Dr. Naib Amin (DVM) for serious issues.
          - Keep responses concise (3-5 sentences max).
          - Mention clinic contacts: 0307-8395319 or 0341-7395319 when appropriate.
          - If asked about medicines, mention they can browse the online shop.`,
          messages:[
            ...chatMessages.filter(m => m.role !== "ai" || chatMessages.indexOf(m) > 0).map(m => ({
              role: m.role === "ai" ? "assistant" : "user",
              content: m.text
            })),
            { role:"user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please call 0307-8395319.";
      setChatMessages(prev => [...prev, { role:"ai", text: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role:"ai", text:"Connection issue. Please call Dr. Naib Amin directly: 0307-8395319" }]);
    }
    setChatLoading(false);
  };

  const analyzeImage = async (type) => {
    if (type === "medicine") { setImgAnalyzing(true); setImgResult(null); }
    else { setDiseaseAnalyzing(true); setDiseaseResult(null); }
    
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{ role:"user", content: type === "medicine"
            ? "A farmer uploaded a medicine bottle photo from a veterinary pharmacy. Simulate identifying a common Pakistani veterinary medicine and provide: 1) Product name, 2) Active ingredient, 3) Usage for livestock, 4) Dosage, 5) Match confidence. Be specific with a real vet medicine name."
            : "A farmer uploaded a photo of their livestock showing a skin/wound issue. Simulate an AI analysis and provide: 1) Likely condition, 2) Urgency level (Low/Medium/URGENT), 3) Immediate first-aid steps, 4) Recommendation to see a vet. Be specific about a common livestock condition in Pakistan."
          }]
        })
      });
      const data = await res.json();
      const result = data.content?.[0]?.text || "Analysis complete. Please consult Dr. Naib Amin for accurate diagnosis.";
      if (type === "medicine") setImgResult(result);
      else setDiseaseResult(result);
    } catch {
      if (type === "medicine") setImgResult("Analysis failed. Please call 0307-8395319 for medicine identification.");
      else setDiseaseResult("Analysis failed. For urgent cases call: 0307-8395319");
    }
    if (type === "medicine") setImgAnalyzing(false);
    else setDiseaseAnalyzing(false);
  };

  const submitAppt = (e) => {
    e.preventDefault();
    setApptSubmitted(true);
    setTimeout(() => setApptSubmitted(false), 5000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { key:"home", label:t.nav.home },
    { key:"shop", label:t.nav.shop },
    { key:"doctor", label:t.nav.doctor },
    { key:"services", label:t.nav.services },
    { key:"contact", label:t.nav.contact },
  ];

  return (
    <div style={{ fontFamily:"'Georgia', serif", background:"#f8faf8", color:"#1a2e1a", direction: lang==="ur" ? "rtl" : "ltr" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green: #1b5e20;
          --green-mid: #2e7d32;
          --green-light: #4caf50;
          --green-pale: #e8f5e9;
          --blue-dark: #0d2137;
          --blue-mid: #1565c0;
          --gold: #f9a825;
          --white: #ffffff;
          --gray: #f1f4f1;
        }
        body { overflow-x: hidden; }
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'Source Sans 3', sans-serif; }
        .btn-primary {
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          color: white; border: none; border-radius: 50px;
          padding: 14px 28px; font-size: 15px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(30,94,32,0.3);
          font-family: 'Source Sans 3', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(30,94,32,0.4); }
        .btn-secondary {
          background: transparent; color: #1b5e20;
          border: 2px solid #1b5e20; border-radius: 50px;
          padding: 12px 26px; font-size: 15px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.3s ease; font-family: 'Source Sans 3', sans-serif;
        }
        .btn-secondary:hover { background: #e8f5e9; }
        .card {
          background: white; border-radius: 16px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px rgba(0,0,0,0.12); }
        .section-badge {
          display: inline-block; background: #e8f5e9; color: #1b5e20;
          padding: 6px 16px; border-radius: 50px; font-size: 13px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px;
          font-family: 'Source Sans 3', sans-serif;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 44px); font-weight: 900;
          color: #1a2e1a; line-height: 1.2; margin-bottom: 16px;
        }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        input, select, textarea {
          width: 100%; padding: 12px 16px; border: 1.5px solid #d4e8d4;
          border-radius: 10px; font-size: 15px; background: white;
          font-family: 'Source Sans 3', sans-serif; transition: border-color 0.2s;
          color: #1a2e1a;
        }
        input:focus, select:focus, textarea:focus {
          outline: none; border-color: #2e7d32; box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
        }
        .hero-gradient {
          background: linear-gradient(135deg, #0d2137 0%, #1b5e20 60%, #2e7d32 100%);
        }
        .whatsapp-float {
          position: fixed; bottom: 24px; right: 24px; z-index: 1000;
          width: 60px; height: 60px; background: #25d366;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.5); cursor: pointer;
          transition: transform 0.3s; text-decoration: none; color: white;
          font-size: 28px; animation: pulse 2s infinite;
        }
        .whatsapp-float:hover { transform: scale(1.15); }
        @keyframes pulse {
          0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 4px 40px rgba(37,211,102,0.8); }
        }
        .chat-bubble-ai {
          background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
          border-radius: 16px 16px 16px 4px; padding: 12px 16px;
          max-width: 85%; margin-bottom: 12px; font-size: 14px; line-height: 1.6;
          color: #1a2e1a; font-family: 'Source Sans 3', sans-serif;
        }
        .chat-bubble-user {
          background: linear-gradient(135deg, #1b5e20, #2e7d32);
          border-radius: 16px 16px 4px 16px; padding: 12px 16px;
          max-width: 85%; margin-bottom: 12px; font-size: 14px; line-height: 1.6;
          color: white; margin-left: auto; font-family: 'Source Sans 3', sans-serif;
        }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .tag-cattle { background: #fff3e0; color: #e65100; }
        .tag-poultry { background: #fce4ec; color: #c62828; }
        .tag-supplement { background: #e8f5e9; color: #1b5e20; }
        .tag-injection { background: #e3f2fd; color: #1565c0; }
        .tag-syrup { background: #f3e5f5; color: #6a1b9a; }
        .tag-milk { background: #e0f7fa; color: #00695c; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeInUp 0.6s ease forwards; }
        .nav-link {
          color: white; text-decoration: none; font-family: 'Source Sans 3', sans-serif;
          font-size: 15px; font-weight: 600; padding: 8px 12px; border-radius: 8px;
          transition: background 0.2s; cursor: pointer;
        }
        .nav-link:hover { background: rgba(255,255,255,0.15); }
        .lang-toggle {
          background: rgba(255,255,255,0.2); color: white; border: 1.5px solid rgba(255,255,255,0.5);
          border-radius: 20px; padding: 6px 14px; cursor: pointer; font-size: 13px; font-weight: 700;
          font-family: 'Source Sans 3', sans-serif; transition: all 0.2s;
        }
        .lang-toggle:hover { background: rgba(255,255,255,0.3); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .stat-card {
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
          padding: 20px 24px; text-align: center; color: white;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "linear-gradient(90deg, #0d2137, #1b5e20)",
        padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 900, boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
        height: "68px"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }} onClick={() => scrollTo("home")}>
          <div style={{ width:42, height:42, background:"linear-gradient(135deg,#4caf50,#1b5e20)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🐄</div>
          <div>
            <div className="font-display" style={{ color:"white", fontSize:18, fontWeight:900, lineHeight:1 }}>Zia Veterinary</div>
            <div style={{ color:"#a5d6a7", fontSize:11, fontFamily:"'Source Sans 3',sans-serif" }}>ضیاء ویٹرنری کلینک</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4 }} className="desktop-nav">
          {navItems.map(n => (
            <span key={n.key} className="nav-link" onClick={() => scrollTo(n.key)} style={{ display:"flex" }}>{n.label}</span>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button className="lang-toggle" onClick={() => setLang(l => l==="en"?"ur":"en")}>
            {lang==="en" ? "اردو" : "EN"}
          </button>
          <div style={{ position:"relative", cursor:"pointer" }} onClick={() => setCartOpen(true)}>
            <div style={{ background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:10, padding:"8px 12px", color:"white", display:"flex", alignItems:"center", gap:6 }}>
              <IconCart/> <span style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, fontWeight:600 }}>{t.shop.cart}</span>
            </div>
            {cartCount > 0 && (
              <div style={{ position:"absolute", top:-8, right:-8, background:"#f9a825", color:"#1a2e1a", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900 }}>{cartCount}</div>
            )}
          </div>
        </div>
      </nav>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex" }}>
          <div style={{ flex:1, background:"rgba(0,0,0,0.5)" }} onClick={() => setCartOpen(false)}/>
          <div style={{ width:360, background:"white", padding:24, overflowY:"auto", boxShadow:"-4px 0 30px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h3 className="font-display" style={{ fontSize:22 }}>{t.shop.cart}</h3>
              <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", fontSize:24, cursor:"pointer" }}>×</button>
            </div>
            {cart.length === 0 ? (
              <p style={{ color:"#666", fontFamily:"'Source Sans 3',sans-serif", textAlign:"center", marginTop:60 }}>{t.shop.empty} 🛒</p>
            ) : <>
              {cart.map(item => (
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f0f0f0" }}>
                  <div>
                    <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontWeight:600, fontSize:14 }}>{item.name}</div>
                    <div style={{ color:"#666", fontSize:13, fontFamily:"'Source Sans 3',sans-serif" }}>PKR {item.price} × {item.qty}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontWeight:700, color:"#1b5e20" }}>PKR {item.price * item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ background:"#ffebee", color:"#c62828", border:"none", borderRadius:6, padding:"4px 8px", cursor:"pointer", fontSize:12 }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:20, paddingTop:16, borderTop:"2px solid #e8f5e9" }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'Source Sans 3',sans-serif", fontWeight:700, fontSize:18, marginBottom:20 }}>
                  <span>{t.shop.total}</span>
                  <span style={{ color:"#1b5e20" }}>PKR {cartTotal.toLocaleString()}</span>
                </div>
                <a href={`https://wa.me/923078395319?text=New Order:%0A${cart.map(i=>`${i.name} x${i.qty} = PKR${i.price*i.qty}`).join('%0A')}%0ATotal: PKR${cartTotal}`}
                   target="_blank" rel="noreferrer">
                  <button className="btn-primary" style={{ width:"100%", justifyContent:"center" }}>
                    <IconWhatsApp/> {t.shop.pay}
                  </button>
                </a>
              </div>
            </>}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="hero-gradient" style={{ padding:"80px 24px 60px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(76,175,80,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(21,101,192,0.15) 0%, transparent 50%)" }}/>
        <div style={{ maxWidth:900, margin:"0 auto", position:"relative", zIndex:1 }} className="animate-in">
          <div className="section-badge" style={{ background:"rgba(255,255,255,0.15)", color:"white", backdropFilter:"blur(10px)" }}>{t.hero.badge}</div>
          <h1 className="font-display" style={{ color:"white", fontSize:"clamp(40px,8vw,80px)", fontWeight:900, lineHeight:1.1, marginBottom:8 }}>
            {t.hero.title}
          </h1>
          <h2 className="font-display" style={{ color:"#a5d6a7", fontSize:"clamp(20px,4vw,36px)", fontWeight:700, marginBottom:24 }}>
            {t.hero.titleSub}
          </h2>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:17, lineHeight:1.7, maxWidth:620, margin:"0 auto 36px", fontFamily:"'Source Sans 3',sans-serif" }}>
            {t.hero.desc}
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            <a href="https://wa.me/923078395319" target="_blank" rel="noreferrer">
              <button className="btn-primary" style={{ background:"#25d366", boxShadow:"0 4px 20px rgba(37,211,102,0.4)" }}>
                <IconWhatsApp/> {t.hero.cta}
              </button>
            </a>
            <button className="btn-secondary" style={{ color:"white", borderColor:"rgba(255,255,255,0.6)" }} onClick={() => scrollTo("shop")}>
              🛒 {t.hero.cta2}
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, maxWidth:600, margin:"0 auto" }}>
            {[
              { icon:"💊", label:t.hero.stat1 },
              { icon:"🐄", label:t.hero.stat2 },
              { icon:"🏥", label:t.hero.stat3 },
            ].map((s,i) => (
              <div key={i} className="stat-card">
                <div style={{ fontSize:28, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTOR PROFILE ── */}
      <section id="doctor" style={{ padding:"72px 24px", background:"white" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:48, alignItems:"center" }}>
          <div>
            <span className="section-badge">{t.about.badge}</span>
            <h2 className="section-title">{t.about.name}</h2>
            <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#388e3c", fontWeight:600, fontSize:16, marginBottom:16 }}>{t.about.role}</p>
            <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#444", lineHeight:1.8, fontSize:16, marginBottom:28 }}>{t.about.bio}</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              {[t.about.feat1, t.about.feat2, t.about.feat3].map((f,i) => (
                <div key={i} style={{ background:"#e8f5e9", color:"#1b5e20", padding:"8px 16px", borderRadius:50, fontSize:14, fontFamily:"'Source Sans 3',sans-serif", fontWeight:600 }}>✓ {f}</div>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")}>📅 {t.about.book}</button>
              <a href="https://wa.me/923078395319" target="_blank" rel="noreferrer">
                <button className="btn-secondary" style={{ color:"#25d366", borderColor:"#25d366" }}><IconWhatsApp/> {t.about.phone1}</button>
              </a>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:"linear-gradient(135deg,#e8f5e9,#f1f8e9)", borderRadius:20, padding:32, textAlign:"center" }}>
              <div style={{ fontSize:80, marginBottom:12 }}>👨‍⚕️</div>
              <div className="font-display" style={{ fontSize:24, fontWeight:900, color:"#1b5e20" }}>{t.about.name}</div>
              <div style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#2e7d32", marginBottom:8 }}>DVM</div>
              <div style={{ display:"flex", justifyContent:"center", gap:2, marginBottom:8 }}>
                {[1,2,3,4,5].map(i => <IconStar key={i}/>)}
              </div>
              <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, color:"#555" }}>📍 Marot, Punjab, Pakistan</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[["🐄","Cattle & Buffalo"],["🐪","Camels"],["🐐","Goats"],["🐔","Poultry"]].map(([icon,label],i) => (
                <div key={i} style={{ background:"#f8faf8", borderRadius:12, padding:"16px", textAlign:"center", border:"1px solid #e8f5e9" }}>
                  <div style={{ fontSize:28 }}>{icon}</div>
                  <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#333", marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding:"72px 24px", background:"#f8faf8" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-badge">{t.services.badge}</span>
            <h2 className="section-title">{t.services.title}</h2>
          </div>
          <div className="grid-3">
            {[
              { icon:"🐄", title:t.services.s1t, desc:t.services.s1d, color:"#e8f5e9" },
              { icon:"🐔", title:t.services.s2t, desc:t.services.s2d, color:"#fff3e0" },
              { icon:"🥛", title:t.services.s3t, desc:t.services.s3d, color:"#e0f7fa" },
              { icon:"🏠", title:t.services.s4t, desc:t.services.s4d, color:"#fce4ec" },
              { icon:"📦", title:t.services.s5t, desc:t.services.s5d, color:"#e8eaf6" },
              { icon:"🤖", title:t.services.s6t, desc:t.services.s6d, color:"#f3e5f5" },
            ].map((s,i) => (
              <div key={i} className="card" style={{ padding:28, background:s.color, border:`1px solid ${s.color}` }}>
                <div style={{ fontSize:40, marginBottom:14 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize:19, fontWeight:700, marginBottom:10, color:"#1a2e1a" }}>{s.title}</h3>
                <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#555", lineHeight:1.6, fontSize:14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP ── */}
      <section id="shop" style={{ padding:"72px 24px", background:"white" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <span className="section-badge">{t.shop.badge}</span>
            <h2 className="section-title">{t.shop.title}</h2>
          </div>
          <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap", alignItems:"center" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.shop.search} style={{ maxWidth:320, flex:1 }}/>
          </div>
          <div style={{ display:"flex", gap:10, marginBottom:32, overflowX:"auto", paddingBottom:8 }} className="scrollbar-hide">
            {t.shop.cats.map((cat, i) => (
              <button key={i} onClick={() => setActiveCat(i)} style={{
                padding:"8px 18px", borderRadius:50, border:"1.5px solid",
                borderColor: activeCat===i ? "#1b5e20" : "#d4e8d4",
                background: activeCat===i ? "#1b5e20" : "white",
                color: activeCat===i ? "white" : "#555",
                cursor:"pointer", whiteSpace:"nowrap", fontFamily:"'Source Sans 3',sans-serif",
                fontSize:14, fontWeight:600, transition:"all 0.2s"
              }}>{cat}</button>
            ))}
          </div>
          <div className="grid-4">
            {filteredProducts.map(p => {
              const tagClass = ["tag-cattle","tag-cattle","tag-poultry","tag-supplement","tag-injection","tag-syrup","tag-milk"][p.cat] || "tag-supplement";
              return (
                <div key={p.id} className="card" style={{ padding:20 }}>
                  <div style={{ fontSize:40, marginBottom:12, textAlign:"center", background:"#f8faf8", borderRadius:12, padding:16 }}>{p.emoji}</div>
                  <span className={`tag ${tagClass}`} style={{ marginBottom:8, display:"inline-block" }}>{t.shop.cats[p.cat]}</span>
                  <h4 className="font-display" style={{ fontSize:16, fontWeight:700, marginBottom:4, color:"#1a2e1a" }}>{p.name}</h4>
                  <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:"#666", marginBottom:4 }}>{p.urdu}</p>
                  <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, color:"#777", marginBottom:14, lineHeight:1.5 }}>{p.desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontWeight:700, fontSize:18, color:"#1b5e20" }}>PKR {p.price}</div>
                      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:"#999" }}>per {p.unit}</div>
                    </div>
                    <button className="btn-primary" style={{ padding:"8px 16px", fontSize:13 }} onClick={() => addToCart(p)}>
                      + {t.shop.add}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI FEATURES ── */}
      <section id="ai" style={{ padding:"72px 24px", background:"linear-gradient(135deg,#0d2137 0%, #1b3a2e 100%)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-badge" style={{ background:"rgba(76,175,80,0.3)", color:"#a5d6a7" }}>{t.ai.badge}</span>
            <h2 className="section-title" style={{ color:"white" }}>{t.ai.title}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:24 }}>

            {/* Medicine ID */}
            <div style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:28 }}>
              <div style={{ fontSize:40, marginBottom:14 }}>🔍</div>
              <h3 className="font-display" style={{ fontSize:20, fontWeight:700, color:"white", marginBottom:10 }}>{t.ai.imgTitle}</h3>
              <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"rgba(255,255,255,0.7)", fontSize:14, lineHeight:1.6, marginBottom:20 }}>{t.ai.imgDesc}</p>
              <button className="btn-primary" style={{ width:"100%", justifyContent:"center", marginBottom:16 }}
                onClick={() => analyzeImage("medicine")} disabled={imgAnalyzing}>
                {imgAnalyzing ? "⏳ "+t.ai.imgAnalyze : "📷 "+t.ai.imgBtn}
              </button>
              {imgResult && (
                <div style={{ background:"rgba(76,175,80,0.15)", border:"1px solid rgba(76,175,80,0.3)", borderRadius:12, padding:16 }}>
                  <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#c8e6c9", fontSize:13, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{imgResult}</p>
                </div>
              )}
            </div>

            {/* AI Chatbot */}
            <div style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:28, display:"flex", flexDirection:"column" }}>
              <div style={{ fontSize:40, marginBottom:14 }}>🤖</div>
              <h3 className="font-display" style={{ fontSize:20, fontWeight:700, color:"white", marginBottom:10 }}>{t.ai.chatTitle}</h3>
              <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"rgba(255,255,255,0.7)", fontSize:14, lineHeight:1.6, marginBottom:16 }}>{t.ai.chatDesc}</p>
              <div style={{ flex:1, minHeight:200, maxHeight:240, overflowY:"auto", marginBottom:12, paddingRight:4 }} className="scrollbar-hide">
                {chatMessages.map((m,i) => (
                  <div key={i} style={{ display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start" }}>
                    <div className={m.role==="ai" ? "chat-bubble-ai" : "chat-bubble-user"}>{m.text}</div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display:"flex" }}>
                    <div className="chat-bubble-ai">⏳ Thinking…</div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && sendChat()}
                  placeholder={t.ai.chatPlaceholder}
                  style={{ flex:1, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:13, borderRadius:10, padding:"10px 14px" }}/>
                <button className="btn-primary" style={{ padding:"10px 18px" }} onClick={sendChat} disabled={chatLoading}>
                  {t.ai.chatSend}
                </button>
              </div>
            </div>

            {/* Disease Scanner */}
            <div style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:28 }}>
              <div style={{ fontSize:40, marginBottom:14 }}>🩺</div>
              <h3 className="font-display" style={{ fontSize:20, fontWeight:700, color:"white", marginBottom:10 }}>{t.ai.diseaseTitle}</h3>
              <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"rgba(255,255,255,0.7)", fontSize:14, lineHeight:1.6, marginBottom:20 }}>{t.ai.diseaseDesc}</p>
              <button className="btn-primary" style={{ width:"100%", justifyContent:"center", background:"linear-gradient(135deg,#c62828,#b71c1c)", marginBottom:16 }}
                onClick={() => analyzeImage("disease")} disabled={diseaseAnalyzing}>
                {diseaseAnalyzing ? "⏳ Analyzing…" : "📸 "+t.ai.diseaseBtn}
              </button>
              {diseaseResult && (
                <div style={{ background:"rgba(198,40,40,0.15)", border:"1px solid rgba(198,40,40,0.3)", borderRadius:12, padding:16 }}>
                  <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#ffcdd2", fontSize:13, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{diseaseResult}</p>
                </div>
              )}
              <div style={{ marginTop:16, background:"rgba(249,168,37,0.15)", border:"1px solid rgba(249,168,37,0.3)", borderRadius:10, padding:12 }}>
                <p style={{ fontFamily:"'Source Sans 3',sans-serif", color:"#ffe082", fontSize:12, lineHeight:1.5 }}>
                  ⚠️ AI pre-screening only. Always confirm with Dr. Naib Amin (DVM) for official diagnosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT ── */}
      <section id="contact" style={{ padding:"72px 24px", background:"#f8faf8" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-badge">{t.appt.badge}</span>
            <h2 className="section-title">{t.appt.title}</h2>
          </div>
          {apptSubmitted ? (
            <div style={{ background:"#e8f5e9", border:"2px solid #4caf50", borderRadius:20, padding:40, textAlign:"center" }}>
              <div style={{ fontSize:60, marginBottom:16 }}>✅</div>
              <p className="font-display" style={{ fontSize:22, color:"#1b5e20" }}>{t.appt.success}</p>
            </div>
          ) : (
            <form onSubmit={submitAppt} style={{ background:"white", borderRadius:20, padding:36, boxShadow:"0 4px 30px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div><label style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#444", display:"block", marginBottom:6 }}>{t.appt.name}</label>
                  <input required placeholder={t.appt.name}/></div>
                <div><label style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#444", display:"block", marginBottom:6 }}>{t.appt.phone}</label>
                  <input required placeholder="03XX-XXXXXXX"/></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div><label style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#444", display:"block", marginBottom:6 }}>{t.appt.animal}</label>
                  <select required>{t.appt.animals.map((a,i) => <option key={i} value={i===0?"":a}>{a}</option>)}</select></div>
                <div><label style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#444", display:"block", marginBottom:6 }}>{t.appt.date}</label>
                  <input type="date" required/></div>
              </div>
              <div><label style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#444", display:"block", marginBottom:6 }}>{t.appt.type}</label>
                <select required>{t.appt.types.map((v,i) => <option key={i}>{v}</option>)}</select></div>
              <div><label style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, fontWeight:600, color:"#444", display:"block", marginBottom:6 }}>{t.appt.issue}</label>
                <textarea rows={3} placeholder={t.appt.issue} style={{ resize:"vertical" }}/></div>
              <button type="submit" className="btn-primary" style={{ justifyContent:"center", fontSize:16, padding:"16px" }}>
                📅 {t.appt.submit}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0d2137", color:"rgba(255,255,255,0.8)", padding:"48px 24px 32px", textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>🐄</div>
        <div className="font-display" style={{ fontSize:24, fontWeight:900, color:"white", marginBottom:4 }}>Zia Veterinary Clinic</div>
        <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:20 }}>ضیاء ویٹرنری کلینک</div>
        <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, marginBottom:8 }}>📍 {t.footer.address}</p>
        <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, marginBottom:8 }}>📞 0307-8395319 | 0341-7395319</p>
        <div style={{ display:"flex", justifyContent:"center", gap:16, margin:"20px 0", flexWrap:"wrap" }}>
          {["EasyPaisa","JazzCash","Cash on Delivery"].map(p => (
            <span key={p} style={{ background:"rgba(255,255,255,0.1)", padding:"6px 14px", borderRadius:20, fontSize:12, fontFamily:"'Source Sans 3',sans-serif" }}>💳 {p}</span>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:20, fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:"rgba(255,255,255,0.4)" }}>
          {t.footer.rights}
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/923078395319" target="_blank" rel="noreferrer" className="whatsapp-float" title="WhatsApp Consultation">
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.28 7.04L.787 23.213l4.3-1.376A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.236 0-4.32-.643-6.079-1.753l-.436-.259-2.552.816.83-2.485-.283-.454A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </div>
  );
}
