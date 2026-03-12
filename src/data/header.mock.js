// src/data/header.mock.js
import logo from "../assets/images/logo2.png";
import admissionImage from "../assets/images/admission-open.jpg";
export const publicMock = {
  // ===== HEADER (Global for all pages) =====
  header: {
    topbar: {
      email: "info@aiuniversity.edu.in",
      phone: "+91-9355822001",
      links: [
        { label: "ERP Login", url: "/erp" },
        { label: "Career", url: "/career" },
        { label: "Media", url: "/media" },
      ],
      admissionButton: {
        label: "Admission-2026",
        url: "/admission",
      },
    },

    branding: {
      logo: logo,
      universityName: "Saveetha Amravati University",
      tagline:
        "Established by State Legislature of Government of Tripura by Act No 03 of 2023",
      recognition: "Recognised Under Section 2(f) of UGC Act, 1956",
      rightBanner: admissionImage,
    },

    navigation: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Academics", url: "/academics" },
      { label: "Admission", url: "/admission" },
      { label: "Programs", url: "/programs" },
      { label: "Examination", url: "/examination" },
      { label: "Research", url: "/research" },
      { label: "Gallery", url: "/gallery" },
      { label: "Contact Us", url: "/contact" },
    ],
  },

  // ===== HOME PAGE SECTIONS =====
  home: {
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
      title: "Welcome to Saveetha Amravati University",
      subtitle:
        "Empowering students with world-class education and research opportunities",
      backgroundImage: "/assets/hero-bg.jpg",
      ctaButtons: [
        { label: "Apply Now", url: "/admission", variant: "primary" },
        { label: "Learn More", url: "/about", variant: "secondary" },
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
        description: "Advanced technical education and research",
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
      title: "About Aryavart International University",
      subtitle: "A Legacy of Excellence",
      description:
        "Established with a vision to provide world-class education, Aryavart International University is committed to fostering innovation, research, and holistic development of students.",
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
  },

  // ===== FOOTER =====
  footer: {
    copyright: "© 2026 Aryavart International University. All rights reserved.",
    quickLinks: [
      { label: "About", url: "/about" },
      { label: "Programs", url: "/programs" },
      { label: "Admissions", url: "/admission" },
      { label: "Contact", url: "/contact" },
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms & Conditions", url: "/terms" },
    ],
    contact: {
      phone: "+91-9355822001",
      email: "info@aiuniversity.edu.in",
      address: "Tripura, India - Established by Government of Tripura Act 2023",
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
    content: `Welcome to Aryavart International University, a leading institution of higher education committed to providing an exceptional academic experience for its students. It is the first ever university in North Tripura which offers its students an array of multiple disciplines including Social Sciences and Humanities, Science and technology, management and commerce, library science, computer science, law, pharmacy, physiotherapy, paramedical, skill education and many more. Our faculty members are experts in their fields, and they are committed to helping students develop the knowledge, skills, and critical thinking abilities needed to succeed in today's rapidly changing world. We believe that education is not just about imparting knowledge, but also about fostering the development of well-rounded individuals who can contribute meaningfully to society.`,
    tagline: "AIU: A GATEWAY TO HIGHER EDUCATION",
    readMoreText: "Read More...",
    profiles: [
      {
        id: 1,
        name: "Prof. (Dr) Manik Saha",
        title: "Chief Minister of Tripura",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        testimonial:
          "It gives me immense pleasure to convey my warm greetings and congratulation to Aryavart International University as it embarks on its new journey in our state. I am happy to know that the Aryavart International University, which is going to set up its campus in Tilthai, Dharmanagar, North Tripura District, is the first University in India offering fully 'Learn and Earn' Degree/Diploma programmes with industries. Understandably, the local youths of our state will be immensely benefited by pursuing the courses offered by the said University.",
      },
      {
        id: 2,
        name: "Dr. Rajesh Kumar",
        title: "Vice Chancellor",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        testimonial:
          "Our mission is to provide world-class education that prepares students for global challenges. We are committed to fostering innovation, research excellence, and holistic development of every student who joins our university.",
      },
      {
        id: 3,
        name: "Prof. Neha Sharma",
        title: "Director, Academic Affairs",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        testimonial:
          "Education at Aryavart is not just about academics. We focus on developing critical thinking, leadership skills, and values that will help our students become responsible citizens and change-makers in society.",
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
};
