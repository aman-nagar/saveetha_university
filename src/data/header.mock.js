// src/data/header.mock.js
import logo from "../assets/images/logo2.png";
import admissionImage from "../assets/images/admission-open.jpg";
import successPathImg from "../assets/images/success-path.jpg";
import studentImg from "../assets/images/student.jpg";
import bgGallery from "../assets/images/bg-gallery.jpg";
import bottomEducation from "../assets/images/bottomEducation.png";
import aicteLogo from "../assets/images/section/aicte.png";
import aiuLogo from "../assets/images/section/aiu.svg";
import bciLogo from "../assets/images/section/bci.png";
import pciLogo from "../assets/images/section/Pharmacy_Council_of_India_Logo.png";
import ugcLogo from "../assets/images/section/ugc.png";

export const publicMock = {
  // ===== HEADER (Global for all pages) =====
  header: {
    topbar: {
      email: "info@aiuniversity.edu.in",
      phone: "+918062182405",
      links: [{ label: "Login", url: "/portal" }],
      admissionButton: {
        label: "Admission-2026",
        url: "/admission",
      },
    },

    branding: {
      logo: logo,
      universityName: "Saveetha Amravati University",
      tagline:
        "Established by State Legislature of Government of Andhra pradesh by Act No 18 of 2018",
      recognition: "Recognised Under Section 2(f) of UGC Act, 1956",
      rightBanner: admissionImage,
    },

    navigation: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Academics", url: "/academics" },
      { label: "News", url: "/news" },
      { label: "Gallery", url: "/gallery" },
      { label: "Contact us", url: "/contact" },
    ],
  },

  // ===== HOME PAGE SECTIONS =====
  home: {
    accreditationSection: {
      title: "Approvals & Accreditation",
      highlight: "and Membership",
      description:
        "SAU has been Established by State Legislature of Government of Andhra Pradesh by Act No 03 of 2023 & Established by the UGC under Section 2(f) of the UGC Act 1956.",
      approvals: [
        {
          id: 1,
          title: "Established under Andhra Pradesh Act No. 03 of 2023",
          links: [
            "Andhra Pradesh Act No. 03 of 2023",
            "Notification on Enforcement",
          ],
          color: "bg-[#FFD700]", // Gold
          logo: ugcLogo,
        },
        {
          id: 2,
          title: "Under Section 2(f) of UGC Act 1956",
          links: ["Extract of UGC letter", "AIU List of Universities"],
          color: "bg-[#FF671F]", // Saffron
          logo: ugcLogo,
        },
        {
          id: 3,
          title: "Member of Association of Indian Universities (AIU)",
          links: ["AIU Letter for Membership"],
          color: "bg-[#B22222]", // Deep Red
          logo: aiuLogo,
        },
        {
          id: 4,
          title: "All India Council for Technical Education (AICTE)",
          links: ["AICTE Public Notice"],
          color: "bg-[#2E7D32]", // Academic Green
          logo: aicteLogo,
        },
        {
          id: 5,
          title: "PCI Approved",
          links: ["PCI Approval (2025-2026)", "PCI Approval (2026-2027)"],
          color: "bg-[#1565C0]", // Research Blue
          logo: pciLogo,
        },
        {
          id: 6,
          title: "Bar Council of India Approved",
          links: ["BCI Approval", "BCI Approval List"],
          color: "bg-[#455A64]", // Legal Slate
          logo: bciLogo,
        },
      ],
    },
    leadingSection: {
      title: "LEADING THE WAY IN",
      highlight: "EDUCATION",
      image: bgGallery, // Your parallax background
      features: [
        {
          id: 1,
          label: "RANKED NO. 1",
          sublabel: "Educational Leader",
          icon: "rank",
        },
        {
          id: 2,
          label: "Anti Ragging",
          sublabel: "Secured Campus",
          icon: "secure",
        },
        {
          id: 3,
          label: "Tie-Up with",
          sublabel: "Research Bodies",
          icon: "research",
        },
        { id: 4, label: "Industry", sublabel: "Exposure", icon: "industry" },
        { id: 5, label: "24X7", sublabel: "Secured Campus", icon: "clock" },
        {
          id: 6,
          label: "Medical",
          sublabel: "Facilities in Campus",
          icon: "medical",
        },
      ],
    },
    slider: [
      {
        id: 1,
        title: "Welcome to Saveetha Amaravati University",
        subtitle: "Excellence in Education",
        image:
          "https://saveethaamaravatiuniversity.ac.in/uploads/slider__17705748893.jpg",
        bgColor: "bg-primary",
      },
      {
        id: 2,
        title: "State-of-the-Art Facilities",
        subtitle: "Modern Campus for Tomorrow's Leaders",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        bgColor: "bg-primary",
      },
      {
        id: 3,
        title: "Shape Your Bright Future",
        subtitle: "Join Our Community of Achievers",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        bgColor: "bg-primary",
      },
      {
        id: 4,
        title: "Innovation & Research",
        subtitle: "Discover Your Potential",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
        bgColor: "bg-primary",
      },
    ],

    hero: {
      title: "Shaping Futures Through Quality Education",
      subtitle: "EXCELLENCE IN ACADEMICS",
      description:
        "Industry-oriented programs, experienced faculty, and a modern campus designed for tomorrow's leaders.",
      backgroundImage:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070",
      ctaButtons: [
        { label: "Apply Now", variant: "primary", url: "/contact" },
        { label: "Explore Programs", variant: "secondary", url: "/programs" },
      ],
    },

    programs: [
      {
        id: 1,
        name: "Bachelor of Technology",
        description: "4-year engineering program with industry focus",
        image: "/assets/program-btech.jpg",
        duration: "4 Years",
        link: "/programs/btech",
      },
      {
        id: 2,
        name: "Master of Technology",
        description: "Advanced philosophy and research ",
        image: "/assets/program-mtech.jpg",
        duration: "2 Years",
        link: "/programs/mtech",
      },
      {
        id: 3,
        name: "Bachelor of Science",
        description: "Science-based undergraduate program",
        image: "/assets/program-bsc.jpg",
        duration: "3 Years",
        link: "/programs/bsc",
      },
      {
        id: 4,
        name: "Master of Business Administration",
        description: "Leadership and business management program",
        image: "/assets/program-mba.jpg",
        duration: "2 Years",
        link: "/programs/mba",
      },
    ],

    stats: {
      students: 5000,
      faculty: 200,
      programs: 25,
      research: 50,
    },

    about: {
      title: "About Saveetha Amravati University",
      subtitle: "A Legacy of Excellence",
      description:
        "Established with a vision to provide world-class education, Saveetha Amravati University is committed to fostering innovation, research, and holistic development of students.",
      image: "/assets/about-banner.jpg",
      points: [
        "State-of-the-art infrastructure and laboratories",
        "Experienced and dedicated faculty members",
        "Industry partnerships and internship programs",
        "Focus on research and innovation",
      ],
    },

    testimonials: [
      {
        id: 1,
        name: "Rahul Kumar",
        role: "B.Tech Graduate, 2023",
        message:
          "The education and exposure I received here shaped my career. Highly recommend for aspiring engineers.",
        avatar: "/assets/testimonial-1.jpg",
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "MBA Student, 2024",
        message:
          "Excellent faculty and industry connections. Great place to build your professional network.",
        avatar: "/assets/testimonial-2.jpg",
      },
      {
        id: 3,
        name: "Amit Patel",
        role: "Ph.D. Researcher",
        message:
          "Outstanding research facilities and supportive environment for academic growth.",
        avatar: "/assets/testimonial-3.jpg",
      },
    ],

    announcements: [
      {
        id: 1,
        title: "Admissions open for 2026 session",
        date: "2026-03-12",
        link: "/admission",
        isHighlight: true,
      },
      {
        id: 2,
        title: "PhD Entrance Test registration started",
        date: "2026-03-11",
        link: "/phd",
        isHighlight: false,
      },
      {
        id: 3,
        title: "New academic programs announced",
        date: "2026-03-10",
        link: "/programs",
        isHighlight: false,
      },
    ],

    academicStreams: {
      title: "Explore",
      highlightTitle: "Futuristic Courses",
      subtitle: "at Saveetha Amravati",
      streams: [
        {
          id: 1,
          name: "School of Legal Studies",
          approval: "BCI Approved",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000",
        },
        {
          id: 2,
          name: "School of Agriculture",
          approval: "PCI Approved",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1587854685352-25d82032960f?q=80&w=1000",
        },
        {
          id: 3,
          name: "School of Paramedical",
          approval: "DME Approved",
          levels: "Certificate | Diploma | U.G.",
          image:
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000",
        },
        {
          id: 4,
          name: "School of Social Science & Humanities",
          approval: "UGC Recognized",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1000",
        },
        {
          id: 5,
          name: "School of Library Science",
          approval: "State Approved",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000",
        },
        {
          id: 6,
          name: "School of Computer Science & Technology",
          approval: "AICTE Approved",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
        },
        {
          id: 7,
          name: "School of Commerce & Management",
          approval: "UGC Approved",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1454165833767-62a651b7c2d5?q=80&w=1000",
        },
        {
          id: 8,
          name: "School of Vocational Studies",
          approval: "NSDC Partner",
          levels: "Certificate | Diploma | U.G. | P.G. | Research",
          image:
            "https://images.unsplash.com/photo-1581092921461-eab62e92c859?q=80&w=1000",
        },
      ],
    },
    // Inside publicMock.home
    stats: {
      items: [
        { value: 100, suffix: "+", label: "Programs" },
        { value: 200, suffix: "+", label: "Expert Faculty" },
        { value: 5000, suffix: "+", label: "Global Students" },
        { value: 50, suffix: "+", label: "Research Centers" },
      ],
    },
    whyUs: {
      heading: "Why",
      highlight: "Choose Us",
      reasons: [
        {
          id: 1,
          title: "Academic Excellence",
          icon: "graduation",
          desc: "Comprehensive programs in Management, faculty of science, and Tech, guided by experts who prioritize high standards.",
        },
        {
          id: 2,
          title: "Industry-Oriented",
          icon: "industry",
          desc: "Our curriculum bridges the gap between classroom theory and real-world industrial application.",
        },
        {
          id: 3,
          title: "Modern Infrastructure",
          icon: "infrastructure",
          desc: "State-of-the-art labs, expansive libraries, and sports complexes designed for a holistic experience.",
        },
        {
          id: 4,
          title: "Research & Innovation",
          icon: "microscope",
          desc: "Promoting discovery through dedicated research centers and collaborations with global leaders.",
        },
      ],
      stats: [
        { id: 1, number: "100+", label: "Programs" },
        { id: 2, number: "200+", label: "Expert Faculty" },
        { id: 3, number: "5000+", label: "Global Students" },
        { id: 4, number: "50+", label: "Research Centers" },
      ],
    },
    gallery: {
      heading: "Photo",
      highlight: "Gallery",
      description:
        "A visual journey through the vibrant student life, prestigious ceremonies, and innovative learning at our university.",
      images: [
        {
          id: 1,
          src: studentImg,
          alt: "University Event Group",
          category: "Campus Life",
        },
        {
          id: 2,
          src: studentImg,
          alt: "Official Graduation Ceremony",
          category: "Academics",
        },
        {
          id: 3,
          src: studentImg,
          alt: "Modern Research Laboratory",
          category: "Innovation",
        },
      ],
    },
  },

  // ===== FOOTER =====
  footer: {
    copyright: "2026 Saveetha Amravati University. All rights reserved.",
    quickLinks: [
      { label: "About", url: "/about" },
      { label: "Programs", url: "/programs" },
      { label: "Admissions", url: "/admission" },
      { label: "Contact", url: "/contact" },
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms & Conditions", url: "/terms" },
    ],
    contact: {
      phone: "+9108062182405",
      email: "info@saveethaamaravatiuniversity.ac.in",
      address:
        "Vaishnavi Complex, Chennai - Kolkata Hwy, Guru Nanak Colony, Vijayawada, Andhra Pradesh 520008",
    },
    social: [
      {
        platform: "Facebook",
        url: "https://facebook.com/aiuniversity",
        icon: "facebook",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/aiuniversity",
        icon: "twitter",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/aiuniversity",
        icon: "linkedin",
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/aiuniversity",
        icon: "instagram",
      },
    ],
  },

  // ===== ABOUT US SECTION =====
  aboutUs: {
    heading: "About Us",
    content: `Welcome to Saveetha Amravati University, a leading institution of higher education committed to providing an exceptional academic experience for its students. It is the first ever university in North Andhra Pradesh which offers its students an array of multiple disciplines including Social Sciences and Humanities, Science and technology, management and commerce, library science, computer science, faculty of science, agriculture, physiotherapy, paramedical, skill education and many more. Our faculty members are experts in their fields, and they are committed to helping students develop the knowledge, skills, and critical thinking abilities needed to succeed in today's rapidly changing world. We believe that education is not just about imparting knowledge, but also about fostering the development of well-rounded individuals who can contribute meaningfully to society.`,
    tagline: "SA: A GATEWAY TO HIGHER EDUCATION",
    readMoreText: "Read More...",
    profiles: [
      {
        id: 1,
        name: "Prof. (Dr) Manik Saha",
        title: "Chief Minister of Andhra Pradesh",
        image:
          "https://img.freepik.com/premium-photo/portrait-handsome-positive-young-man-isolated-gray-background_146377-4812.jpg?w=1480",
        testimonial:
          "It gives me immense pleasure to convey my warm greetings and congratulation to Saveetha Amravati University as it embarks on its new journey in our state. I am happy to know that the Saveetha Amravati University, which is going to set up its campus in Tilthai, Dharmanagar, North Andhra Pradesh District, is the first University in India offering fully 'Learn and Earn' Degree/Diploma programmes with industries. Understandably, the local youths of our state will be immensely benefited by pursuing the courses offered by the said University.",
      },
      {
        id: 2,
        name: "Dr. Rajesh Kumar",
        title: "Vice Chancellor",
        image:
          "https://img.freepik.com/free-photo/photo-handsome-unshaven-guy-looks-with-pleasant-expression-directly-camera_176532-8164.jpg?t=st=1773393986~exp=1773397586~hmac=405bb7ddaa8378bc9c94c667e341148acd51b482ece3a3869203e9e4db999090&w=1480",
        testimonial:
          "Our mission is to provide world-class education that prepares students for global challenges. We are committed to fostering innovation, research excellence, and holistic development of every student who joins our university.",
      },
      {
        id: 3,
        name: "Prof. Neha Sharma",
        title: "Director, Academic Affairs",
        image:
          "https://img.freepik.com/free-photo/portrait-expressive-young-woman_1258-48167.jpg?t=st=1773394017~exp=1773397617~hmac=cee6ebf524eb801faffe6cd6d2d15408740f5174aae5b2d1d608b8cbf83e0994&w=1480",
        testimonial:
          "Education at Saveetha Amravati is not just about academics. We focus on developing critical thinking, leadership skills, and values that will help our students become responsible citizens and change-makers in society.",
      },
    ],
  },

  // ===== ANNOUNCEMENTS (Scrolling banner) =====
  announcements: [
    "Admissions open for 2026 session",
    "PhD Entrance Test registration started",
    "New academic programs announced",
    "Campus recruitment drives in progress",
    "Scholarship applications now open",
  ],

  academics: {
    // Separate by specific sub-pages
    examinationCommittee: {
      title: "Examination Committee",
      subtitle:
        "Structure and Functions of the Examination and Assessment Council",
      overview:
        "The Examination Committee is a key body within Saveetha Amravati University, led by the Vice Chancellor and supported by three divisions: Examination, Assessment, and Record Maintenance. Its primary responsibilities include conducting examinations, publishing results, and awarding certificates to students who successfully complete their final examinations. Additionally, the Committee maintains comprehensive records related to examinations and organizes workshops and seminars aimed at enhancing the examination system.",
      objective:
        "To manage all aspects of Internal and External Assessment Examinations in accordance with University notifications and regulations.",
      responsibilities: [
        "Exam Cell distributes and collects completed exam forms for verification within designated timeframes.",
        "Issuance of notices to students regarding collection and submission deadlines for exam forms.",
        "Preparation of relevant timetables for university examinations.",
        "Organization of block and seating arrangements for display on notice boards and website.",
        "Coordination of teaching faculty for examination duties (minimum two-week availability).",
        "Ensuring availability of necessary stationery (answer sheets, drawing sheets, charts, etc.).",
        "Conducting pre-exam meetings to brief faculty on procedures and invigilation responsibilities.",
        "Preparation of examiner lists in consultation with the Chief of Examinations (COE).",
        "Analysis and verification of exam results before distribution to appropriate officials.",
        "Conducting internal assessments according to the academic calendar.",
        "Processing of university circulars, guidelines, and notifications under COE signature.",
      ],
      members: [
        { id: 1, name: "Dr. Shaiju David, VC", designation: "Chairperson" },
        {
          id: 2,
          name: "Mrs. Jyoti Agrawal, COE",
          designation: "Member Secretary",
        },
        { id: 3, name: "Mrs. Ruma Koiri, Registrar", designation: "Member" },
        { id: 4, name: "Mr. Gourish Chakraborty", designation: "Member" },
        { id: 5, name: "Mr. Chandan Kumar Debnath", designation: "Member" },
      ],
    },
  },
  galleryPage: {
    title: "Gallery",
    albums: [
      {
        id: 1,
        title: "Meeting With Andhra Pradesh Ministers",
        image:
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800",
        link: "/gallery/ministers",
      },
      {
        id: 2,
        title: "World Environment Day 2023",
        image:
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
        link: "/gallery/environment",
      },
      {
        id: 3,
        title: "First Admission",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
        link: "/gallery/admission-1",
      },
      {
        id: 4,
        title: "Admission August 2023",
        image:
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800",
        link: "/gallery/admission-aug",
      },
      {
        id: 5,
        title: "News & Facebook Links",
        image:
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800",
        link: "/gallery/social",
      },
      {
        id: 6,
        title: "Admission September 2023",
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
        link: "/gallery/admission-sep",
      },
    ],
  },
};
