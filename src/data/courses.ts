export interface CourseModule {
  title: string;
  lessons: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number | null;
  status: "available" | "coming-soon";
  badge: string;
  image: string;
  features: string[];
  modules: CourseModule[];
  instructor: {
    name: string;
    title: string;
    image: string;
  };
  testimonials: {
    name: string;
    role: string;
    quote: string;
    image: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metadata: {
    duration: string;
    lessons: number;
    level: string;
    certificate: boolean;
    access: string;
    updates: string;
  };
}

export const courses: Course[] = [
  {
    id: "ki-automatisierung",
    slug: "ki-automatisierung",
    title: "KI-Automatisierung Masterclass",
    subtitle: "Transformiere Unternehmen mit intelligenter Automatisierung",
    description:
      "Lerne, wie du mit n8n, Make und Claude AI repetitive Aufgaben automatisierst und Unternehmen transformierst.",
    longDescription: `In dieser umfassenden Masterclass lernst du alles, was du brauchst, um als KI-Automatisierungsexperte durchzustarten.

Von den Grundlagen der Prozessautomatisierung bis hin zu fortgeschrittenen KI-Integrationen - wir führen dich Schritt für Schritt durch den gesamten Prozess.

Du wirst lernen, wie du:
- Ineffiziente Geschäftsprozesse identifizierst
- Automatisierungslösungen mit n8n und Make entwickelst
- KI-Modelle wie Claude AI integrierst
- Professionelle Workflows für Kunden erstellst
- Deine Dienstleistung vermarktest und verkaufst`,
    price: 997,
    status: "available",
    badge: "JETZT VERFÜGBAR",
    image: "/images/course_ki_automatisierung.jpg",
    features: [
      "30+ Video-Lektionen",
      "Praxis-Projekte zum Mitmachen",
      "Vorlagen & Templates",
      "Community-Zugang",
      "Offizielles Zertifikat",
      "Lebenslanger Zugang",
      "Kostenlose Updates",
      "14-Tage Geld-zurück-Garantie",
    ],
    modules: [
      {
        title: "Grundlagen der Automatisierung",
        lessons: [
          "Einführung in die KI-Automatisierung",
          "Prozesse analysieren und optimieren",
          "Die richtigen Tools auswählen",
          "Dein erstes Automatisierungsprojekt",
        ],
      },
      {
        title: "n8n Masterclass",
        lessons: [
          "n8n Installation und Setup",
          "Workflows erstellen",
          "Trigger und Actions",
          "Fortgeschrittene Nodes",
          "Error Handling",
        ],
      },
      {
        title: "Make (Integromat) Deep Dive",
        lessons: [
          "Make Grundlagen",
          "Szenarien erstellen",
          "Router und Filter",
          "Webhooks und APIs",
        ],
      },
      {
        title: "KI-Integration",
        lessons: [
          "Claude AI API nutzen",
          "OpenAI Integration",
          "Prompts optimieren",
          "KI-gestützte Workflows",
        ],
      },
      {
        title: "Kundengewinnung & Business",
        lessons: [
          "Deine Zielgruppe definieren",
          "Angebote erstellen",
          "Testkunden gewinnen",
          "Von Testkunden zu Hochpreis-Kunden",
        ],
      },
    ],
    instructor: {
      name: "KI Lernen Team",
      title: "Experten für KI-Automatisierung",
      image: "/team/instructor.jpg",
    },
    testimonials: [
      {
        name: "Michael S.",
        role: "Freelance Automatisierungsexperte",
        quote:
          "Nach dem Kurs konnte ich direkt meine ersten Kunden gewinnen. Die Praxisbeispiele haben mir enorm geholfen.",
        image: "/testimonials/michael.jpg",
      },
      {
        name: "Sarah K.",
        role: "Agenturinhaberin",
        quote:
          "Endlich ein Kurs, der nicht nur Theorie vermittelt, sondern echte Ergebnisse liefert. Absolut empfehlenswert!",
        image: "/testimonials/sarah.jpg",
      },
      {
        name: "Thomas B.",
        role: "IT-Berater",
        quote:
          "Die Kombination aus n8n, Make und KI ist genial. Ich biete jetzt Automatisierung als Premium-Service an.",
        image: "/testimonials/thomas.jpg",
      },
    ],
    faqs: [
      {
        question: "Brauche ich Programmierkenntnisse?",
        answer:
          "Nein, der Kurs ist so aufgebaut, dass du auch ohne Vorkenntnisse starten kannst. Wir erklären alles von Grund auf.",
      },
      {
        question: "Wie lange habe ich Zugang zum Kurs?",
        answer:
          "Du erhältst lebenslangen Zugang zu allen Kursinhalten, inklusive aller zukünftigen Updates.",
      },
      {
        question: "Gibt es eine Geld-zurück-Garantie?",
        answer:
          "Ja, wir bieten eine 14-tägige Geld-zurück-Garantie. Wenn du nicht zufrieden bist, erstatten wir den vollen Kaufpreis.",
      },
      {
        question: "Erhalte ich ein Zertifikat?",
        answer:
          "Ja, nach erfolgreichem Abschluss des Kurses erhältst du ein offizielles Zertifikat von KI Lernen.",
      },
      {
        question: "Kann ich Fragen stellen?",
        answer:
          "Ja, du hast Zugang zu unserer Community, wo du Fragen stellen und dich mit anderen Kursteilnehmern austauschen kannst.",
      },
    ],
    metadata: {
      duration: "12+ Stunden",
      lessons: 30,
      level: "Anfänger bis Fortgeschritten",
      certificate: true,
      access: "Lebenslang",
      updates: "Kostenlos",
    },
  },
  {
    id: "prompt-engineering",
    slug: "prompt-engineering",
    title: "Prompt Engineering Pro",
    subtitle: "Meistere die Kunst der KI-Kommunikation",
    description:
      "Meistere die Kunst des Prompt Engineerings und hole das Maximum aus KI-Modellen wie ChatGPT und Claude heraus.",
    longDescription: `Prompt Engineering ist die Schlüsselkompetenz im KI-Zeitalter. In diesem Kurs lernst du, wie du KI-Modelle effektiv steuerst und optimale Ergebnisse erzielst.`,
    price: null,
    status: "coming-soon",
    badge: "BALD VERFÜGBAR",
    image: "/images/course_prompt_engineering.jpg",
    features: [
      "Fortgeschrittene Techniken",
      "System Prompts meistern",
      "Chain-of-Thought Prompting",
      "Praxis-Beispiele",
      "Prompt-Bibliothek",
    ],
    modules: [
      {
        title: "Coming Soon",
        lessons: ["Kursinhalte werden noch bekannt gegeben"],
      },
    ],
    instructor: {
      name: "KI Lernen Team",
      title: "Experten für KI-Automatisierung",
      image: "/team/instructor.jpg",
    },
    testimonials: [],
    faqs: [],
    metadata: {
      duration: "TBD",
      lessons: 0,
      level: "Fortgeschritten",
      certificate: true,
      access: "Lebenslang",
      updates: "Kostenlos",
    },
  },
  {
    id: "voice-agents",
    slug: "voice-agents",
    title: "Voice Agent Development",
    subtitle: "Baue intelligente Sprach-Agenten",
    description:
      "Entwickle intelligente Sprach-Agenten mit modernsten KI-Technologien für Kundenservice und Automatisierung.",
    longDescription: `Voice Agents sind die Zukunft der Kundeninteraktion. Lerne, wie du intelligente Sprach-Agenten entwickelst, die natürliche Gespräche führen können.`,
    price: null,
    status: "coming-soon",
    badge: "BALD VERFÜGBAR",
    image: "/images/course_voice_agents.jpg",
    features: [
      "Realtime Voice AI",
      "Integration Guide",
      "Best Practices",
      "Live-Demos",
      "API-Dokumentation",
    ],
    modules: [
      {
        title: "Coming Soon",
        lessons: ["Kursinhalte werden noch bekannt gegeben"],
      },
    ],
    instructor: {
      name: "KI Lernen Team",
      title: "Experten für KI-Automatisierung",
      image: "/team/instructor.jpg",
    },
    testimonials: [],
    faqs: [],
    metadata: {
      duration: "TBD",
      lessons: 0,
      level: "Fortgeschritten",
      certificate: true,
      access: "Lebenslang",
      updates: "Kostenlos",
    },
  },
  {
    id: "rag-llm",
    slug: "rag-llm",
    title: "RAG & LLM Implementierung",
    subtitle: "Enterprise-KI für Unternehmen",
    description:
      "Baue leistungsstarke RAG-Systeme und lerne, wie du LLMs in Unternehmensanwendungen integrierst.",
    longDescription: `RAG (Retrieval Augmented Generation) ist der Schlüssel zu unternehmenstauglichen KI-Anwendungen. Lerne, wie du LLMs mit deinen eigenen Daten verbindest.`,
    price: null,
    status: "coming-soon",
    badge: "BALD VERFÜGBAR",
    image: "/images/course_rag_llm.jpg",
    features: [
      "Vector Databases",
      "LangChain Framework",
      "Enterprise RAG",
      "Deployment Strategien",
      "Security Best Practices",
    ],
    modules: [
      {
        title: "Coming Soon",
        lessons: ["Kursinhalte werden noch bekannt gegeben"],
      },
    ],
    instructor: {
      name: "KI Lernen Team",
      title: "Experten für KI-Automatisierung",
      image: "/team/instructor.jpg",
    },
    testimonials: [],
    faqs: [],
    metadata: {
      duration: "TBD",
      lessons: 0,
      level: "Fortgeschritten",
      certificate: true,
      access: "Lebenslang",
      updates: "Kostenlos",
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getAvailableCourses(): Course[] {
  return courses.filter((course) => course.status === "available");
}

export function getComingSoonCourses(): Course[] {
  return courses.filter((course) => course.status === "coming-soon");
}
