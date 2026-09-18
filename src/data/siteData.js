// All copy lives here so content can be edited without touching component
// markup — mirrors the reference site's content 1:1.

export const clinicInfo = {
  doctorName: "Dr. Manoj Bandwar",
  tagline: "Classical Homeopathy • Badi Sarwan",
  taglineLong: "CLASSICAL HOMEOPATHY • BADI SARWAN",
  phone: "+91 94259 87654",
  phoneRaw: "919425987654",
  hoursShort: "9:30 AM - 1:30 PM & 4:30 PM - 8:00 PM",
  location: "Serving Patients at Badi Sarwan (Ratlam) & Remote Consultations",
  // Placeholder social profile links — swap in the clinic's real handles.
  facebookUrl: "https://facebook.com/",
  instagramUrl: "https://instagram.com/",
  youtubeUrl: "https://youtube.com/",
};

export const navLinks = [
  { label: "About Doctor", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Fee Structure", href: "#fees" },
  { label: "Timings", href: "#timings" },
  { label: "Location & Map", href: "#location" },
  { label: "FAQs", href: "#faqs" },
];

export const heroStats = [
  { value: "15+", label: "Years Clinical Experience" },
  { value: "10,000+", label: "Patients Treated" },
  { value: "100%", label: "Original German Dilutions" },
];

export const heroTrustPoints = [
  "In-Person & Remote Calls",
  "Safe for Children, Adults & Elderly",
  "Zero Chemical Toxicity",
];

export const aboutParagraph =
  "Practicing at Badi Sarwan (Ratlam District, Madhya Pradesh), Dr. Manoj Bandwar is widely revered by " +
  "families across Ratlam, Sailana, and adjoining regions for his meticulous, empathetic diagnosis — treating " +
  "the individual in their wholeness, not merely the isolated disease. With over 15 years of dedicated clinical " +
  "practice, he addresses stubborn, prolonged conditions such as chronic eczema, recurrent pediatric asthma, " +
  "digestive ailments, migraines, kidney stone tendencies, and rheumatic joint pain with German-standard " +
  "homeopathic remedies.";

export const aboutFeatures = [
  {
    title: "In-depth Constitutional Case Taking",
    description:
      "Detailed evaluation of physical symptoms, emotional stress, past medical history, and genetic tendencies.",
    icon: "case",
  },
  {
    title: "Original High-Potency Formulations",
    description:
      "Pure German dilutions and Hahnemannian preparations guaranteeing absolute safety and medicinal potency.",
    icon: "flask",
  },
  {
    title: "Affordable & Patient-First Care",
    description:
      "Committed to providing accessible, honest, and pocket-friendly healthcare to the entire community of Badi Sarwan.",
    icon: "heart",
  },
];

export const credentials = [
  {
    label: "DEGREE",
    value: "B.H.M.S.",
    sub: "Bachelor of Homeopathic Medicine & Surgery",
  },
  {
    label: "CLINICAL TENURE",
    value: "15+ Years",
    sub: "Active Practice in Ratlam District",
  },
  {
    label: "LOCATION",
    value: "Badi Sarwan",
    sub: "Sailana Tehsil, Ratlam, M.P. 457550",
  },
  {
    label: "CONSULTATION MODES",
    value: "Clinic & Remote",
    sub: "In-Person & Telephonic/WhatsApp",
  },
];

export const treatments = [
  {
    icon: "shield",
    title: "Skin Disorders & Allergies",
    description:
      "Long-term cure without suppressive steroids for chronic eczema, psoriasis, recurrent urticaria (hives), fungal infections, and skin allergies.",
    points: [
      "Eczema & Psoriasis relief",
      "Chronic urticaria & allergy",
      "Corns, warts & fungal patches",
    ],
  },
  {
    icon: "bone",
    title: "Arthritis, Sciatica & Joint Pain",
    description:
      "Gentle anti-inflammatory remedies reducing swelling, improving flexibility, and addressing cervical spondylosis, gout, and radiating nerve pain.",
    points: [
      "Osteoarthritis & knee stiffness",
      "Sciatica & lumbar spondylosis",
      "High uric acid & gout flares",
    ],
  },
  {
    icon: "stomach",
    title: "Digestive & Gastric Health",
    description:
      "Restore intestinal equilibrium. Targeted remedies for hyper-acidity, GERD, chronic constipation, irritable bowel (IBS), piles, and sluggish liver.",
    points: [
      "Non-surgical piles & fissure care",
      "Acid reflux & burning stomach",
      "Fatty liver & poor assimilation",
    ],
  },
  {
    icon: "lungs",
    title: "Child Immunity & Respiratory",
    description:
      "Sweet globule pills children take without resistance. Enhances immunity against seasonal colds, bronchitis, wheezing, and recurring tonsillitis.",
    points: [
      "Recurrent wheezing & child cough",
      "Enlarged tonsils & adenoids",
      "Sinus congestion & dust sneezing",
    ],
  },
  {
    icon: "brain",
    title: "Migraine, Headaches & Sleep",
    description:
      "Calming, non-habit-forming homeopathic medicine for pulsating migraines, stress-induced headaches, insomnia, and nervous restlessness.",
    points: [
      "Periodic one-sided migraines",
      "Sleep latency & broken sleep",
      "Nervous exhaustion & tension",
    ],
  },
  {
    icon: "leaf",
    title: "Women's Hormonal Care",
    description:
      "Balancing endocrine health naturally. Comprehensive homeopathic support for PCOS/PCOD, irregular menstrual cycles, and menopausal distress.",
    points: [
      "PCOS/PCOD constitutional support",
      "Painful or irregular cycles",
      "Hormonal acne & mood changes",
    ],
  },
];

export const feePlans = [
  {
    tag: "INITIAL CHECK-UP",
    highlighted: false,
    title: "Comprehensive Intake",
    description:
      "Detailed constitutional examination, symptom inventory & lifestyle guidelines.",
    price: "₹300",
    priceSuffix: "/ 30–40 min session",
    features: [
      "Exhaustive constitutional case taking",
      "Diet & lifestyle assessment",
      "Medical report analysis",
      "Personalized remedy regimen",
    ],
    cta: "Book First Consultation",
  },
  {
    tag: "CONSULT + MEDICINES",
    badge: "MOST SELECTED BY PATIENTS",
    highlighted: true,
    title: "Standard Treatment Pack",
    description:
      "Doctor check-up plus 15 to 30 days of high-grade German homeopathic dilutions.",
    price: "₹500 – ₹700",
    priceSuffix: "/ 15–30 days cycle",
    features: [
      "Doctor consultation included",
      "15 to 30 days genuine German dilutions",
      "Sweet globule / liquid drop doses",
      "Mid-cycle WhatsApp status check",
    ],
    cta: "Select Complete Plan",
  },
  {
    tag: "FOLLOW-UP / REMOTE",
    highlighted: false,
    title: "Progress Review",
    description:
      "For returning patients or patients consulting remotely across Ratlam district via WhatsApp.",
    price: "₹150 – ₹200",
    priceSuffix: "/ review session",
    features: [
      "Symptom relief tracking",
      "Potency adjustment as recovery proceeds",
      "WhatsApp voice/text follow-up",
      "Medicine dispatch support if distant",
    ],
    cta: "Book Follow-up",
  },
];

export const feeFootnote =
  "* Medicine charges vary moderately if specialized mother tinctures, biochemic tissue salts, or rare import potencies are prescribed.";

export const clinicSchedule = [
  {
    day: "Monday – Friday",
    slots: ["09:30 AM – 01:30 PM", "04:30 PM – 08:00 PM"],
    status: "open",
  },
  {
    day: "Saturday",
    slots: ["09:30 AM – 01:30 PM", "04:30 PM – 07:30 PM"],
    status: "open",
  },
  {
    day: "Sunday",
    slots: ["10:00 AM – 01:00 PM"],
    note: "Prior Appointment Preferred",
    status: "limited",
  },
];

export const visitExpectations = [
  {
    title: "Attentive, Unhurried Listening",
    description:
      "Dr. Manoj devotes sufficient time to understand every physical symptom, emotional trigger, and health background.",
  },
  {
    title: "Fresh Custom Dilutions",
    description:
      "Medicines are dispensed fresh in sweet globules or distilled drops with precise dosage directions.",
  },
  {
    title: "Simple Diet Guidance",
    description:
      "You will receive easy guidance on avoiding strong substances (raw onion, coffee, camphor) near your doses.",
  },
  {
    title: "Continuous WhatsApp Support",
    description:
      "Have an urgent question between doses? Stay connected directly with the doctor on WhatsApp.",
  },
];

export const testimonials = [
  {
    quote:
      "I suffered from chronic skin allergy and eczema on my hands for over 3 years. Allopathic ointments gave only temporary relief. Dr. Manoj Bandwar's 4-month homeopathic treatment healed it completely.",
    name: "Rajesh Sharma",
    location: "Sailana, Ratlam",
    initials: "RS",
  },
  {
    quote:
      "My 8-year-old child had constant colds, cough and throat issues every winter. Dr. Bandwar's gentle sweet pills worked wonders. My child's immunity has improved noticeably.",
    name: "Meena Patidar",
    location: "Badi Sarwan",
    initials: "MP",
  },
  {
    quote:
      "Severe knee pain made walking difficult. Dr. Manoj prescribed remedies that gave real relief without any acidity or painkiller side effects. Honest fees and very polite doctor.",
    name: "Virendra Singh Rathore",
    location: "Ratlam City",
    initials: "VR",
  },
];

export const clinicAddress = {
  name: "Dr. Manoj Bandwar Clinic",
  lines: [
    "Near Main Market / Bus Stop Area,",
    "Village Badi Sarwan (Sarwan),",
    "Tehsil: Sailana, District: Ratlam,",
    "Madhya Pradesh - 457550, India.",
  ],
  notes: [
    { label: "From Ratlam:", text: "Approx 30–35km via Sailana-Sarwan Highway." },
    { label: "Local Bus:", text: "Regular passenger buses connect Ratlam to Badi Sarwan." },
    { label: "Parking:", text: "Convenient roadside space for two-wheelers and cars." },
  ],
  mapEmbedSrc:
    "https://www.google.com/maps?q=Badi+Sarwan,+Sailana,+Ratlam,+Madhya+Pradesh&output=embed",
};

export const faqs = [
  {
    question: "Are homeopathic sweet pills safe for diabetic patients?",
    answer:
      "Yes, completely safe. The tiny globules contain a negligible amount of lactose or cane sugar that does not alter blood glucose levels. Furthermore, for strictly monitored diabetic patients, Dr. Manoj also dispenses remedies in distilled water drops without any sugar pellets.",
  },
  {
    question: "Can I continue my regular allopathic medicines (BP, Thyroid, Diabetes)?",
    answer:
      "Yes. Homeopathic remedies are prescribed alongside your existing essential medication for BP, thyroid or diabetes. Dr. Manoj will guide you on a safe schedule, and dosages of allopathic medicines are only ever tapered in coordination with your primary physician.",
  },
  {
    question: "Does homeopathy act slowly?",
    answer:
      "Not necessarily. Acute conditions like fever, cold or acidity often respond within hours to a couple of days. Chronic, long-standing conditions naturally take longer — usually a few months — since the remedy is working to correct the root cause rather than just suppress symptoms.",
  },
  {
    question: "Can distant patients in Ratlam, Jaora, or other towns consult remotely?",
    answer:
      "Yes. Dr. Manoj offers telephonic and WhatsApp consultations for returning and follow-up patients across Ratlam district. Medicines can be dispatched to your location, and progress is tracked through voice or text updates.",
  },
  {
    question: "Are there strict diet restrictions during treatment?",
    answer:
      "Only a few simple precautions — avoiding strong-tasting substances like raw onion, garlic, coffee, mint or camphor products within 30 minutes of taking your dose, since they can interfere with the remedy's action. Otherwise your regular diet can continue.",
  },
];

export const footerLinks = {
  quickLinks: [
    { label: "About Dr. Manoj", href: "#about" },
    { label: "Clinical Treatments", href: "#treatments" },
    { label: "Fee Structure", href: "#fees" },
    { label: "Visiting Timings", href: "#timings" },
    { label: "Google Map & Address", href: "#location" },
    { label: "Patient FAQs", href: "#faqs" },
  ],
  keyTreatments: [
    "Chronic Eczema & Allergies",
    "Osteoarthritis & Sciatica",
    "Hyperacidity, IBS & Piles",
    "Child Bronchitis & Cough",
    "Migraines & Tension Pain",
    "Women's Hormones & PCOS",
  ],
};
