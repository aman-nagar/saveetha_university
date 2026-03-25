// src/data/header.mock.js
import logo from "../assets/images/logo2.png";

import studentImg from "../assets/images/student.jpg";
import aicteLogo from "../assets/images/section/aicte.png";
import aiuLogo from "../assets/images/section/aiu.svg";
import bciLogo from "../assets/images/section/bci.png";
import pciLogo from "../assets/images/section/Pharmacy_Council_of_India_Logo.png";
import ugcLogo from "../assets/images/section/ugc.png";

export const publicMock = {
  header: {
    topbar: {
      email: "info@saveethaamaravatiuniversity.ac.in",
      phone: "+918062182405",
      links: [{ label: "Login", url: "/portal" }],
    },

    branding: {
      logo: logo,
      universityName: "Saveetha Amaravati University",
      tagline:
        "Established by State Legislature of Government of Andhra pradesh by Act No 18 of 2018",
      recognition: "Recognised Under Section 2(f) of UGC Act, 1956",
    },

    navigation: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Academics", url: "/academics" },
      { label: "News", url: "/news" },
      { label: "Gallery", url: "/gallery" },
      { label: "Contact us", url: "/contact" },
      { label: "Download", url: "/download-form" },
      { label: "WIEP Form", url: "/wiep-Form" },
      { label: "Student Admission", url: "/apply-admission" },
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
          title: "Established under Andhra Pradesh Act No. 18 of 2018",
          links: [
            "Andhra Pradesh Act No. 18 of 2018",
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
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
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
      title: "About Saveetha Amaravati University",
      subtitle: "A Legacy of Excellence",
      description:
        "Established with a vision to provide world-class education, Saveetha Amaravati University is committed to fostering innovation, research, and holistic development of students.",
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
      subtitle: "at Saveetha Amaravati",
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

  footer: {
    copyright: "Saveetha Amaravati University. All rights reserved.",
    columns: [
      {
        title: "Academics & Admissions",
        links: [
          { label: "Programs Offered", url: "/programs" },
          { label: "Apply for 2026", url: "/apply" },
          { label: "Fee Structure", url: "/fees" },
          { label: "Academic Calendar", url: "/calendar" }, // Kept original
          { label: "E-Learning Portal", url: "/e-learning" },
        ],
      },
      {
        title: "Campus Life",
        links: [
          { label: "Hostel & Dining", url: "/hostel" },
          { label: "Student Clubs", url: "/clubs" },
          { label: "Library Resources", url: "/library" }, // Kept original (slightly modified for better UX)
          { label: "Innovation Cell", url: "/innovation" },
          { label: "Career Opportunities", url: "/career" }, // Kept original, shuffled from Quick Links
        ],
      },
      {
        title: "Statutory Compliances", // Sounds much more official than "Policy"
        links: [
          { label: "Mandatory Disclosures", url: "/disclosures" }, // Replaces UGC and Public Disclosure
          { label: "Equal Opportunity Cell", url: "/equal-opportunity" }, // Replaces Caste Based Discrimination with a more standard academic term
          { label: "Anti-Ragging Committee", url: "/anti-ragging" }, // Kept original (Mandatory for Indian Unis)
          { label: "Privacy Policy", url: "/privacy" }, // Kept original
          { label: "Terms of Use", url: "/terms" },
        ],
      },
    ],
    contact: {
      phone: "+91-8062182405",
      emails: [
        { label: "General", value: "info@saveethaamaravatiuniversity.ac.in" },
        { label: "VC Office", value: "vc@saveethaamaravatiuniversity.ac.in" },
      ],
      address: "Vaishnavi Complex, Vijaywada, Andhra Pradesh, 520008",
    },
  },

  // ===== ABOUT US SECTION =====
  aboutUs: {
    heading:
      "Saveetha Amaravati University – Leading Higher Education & Innovation Hub",
    subHeading: "About Saveetha Amaravati University",
    content: `Saveetha Amaravati University is a modern institution dedicated to providing high-quality higher education, research opportunities, and industry-focused learning. The university is committed to developing future leaders, innovators, and professionals through a strong combination of academic excellence, practical exposure, and value-based education.

Established with the vision of transforming education into a powerful tool for personal growth, professional success, and national development, Saveetha Amaravati University focuses on nurturing talent and preparing students for the challenges of the global workforce.

With a progressive academic approach and a commitment to innovation, the university aims to build a Centre of Excellence in education, research, technology, management, and applied sciences. Students benefit from an environment that combines modern teaching methods, advanced technology, and holistic development.`,
    tagline: "Leading Higher Education & Innovation Hub",
    readMoreText: "Read More...",
    sponsoringBodyHeading: "Sponsoring Body of Saveetha Amaravati University",
    sponsoringBodyIntro: `The sponsoring body behind Saveetha Amaravati University plays a vital role in shaping the institution's vision, governance, and long-term academic growth. The foundation is dedicated to promoting quality education, research, and innovation while creating opportunities for students from diverse backgrounds.

Its mission is to develop an education system that blends discipline, culture, ethics, and modern technological knowledge. By focusing on both academic excellence and character development, the institution prepares students to become responsible professionals and global citizens.

The sponsoring body also believes strongly in social responsibility and community development. Through various educational initiatives and outreach programs, it works toward providing access to education and supporting the growth of underprivileged communities.`,
    sponsoringBody: {
      mission: `The foundation is dedicated to promoting quality education, research, and innovation. Its mission is to develop an education system that blends discipline, culture, ethics, and modern technological knowledge.`,
      socialResponsibility: `The sponsoring body believes strongly in social responsibility and community development. Through various educational initiatives and outreach programs, it works toward providing access to education and supporting the growth of underprivileged communities.`,
    },
    fourPillars: {
      modernCampus: `Saveetha Amaravati University offers a modern, student-centric campus designed to promote creativity, innovation, and academic excellence. The campus environment supports collaborative learning, research, and extracurricular development, allowing students to grow both academically and personally. Students have access to modern classrooms, advanced laboratories, research facilities, and digital learning resources that support a future-ready education system.`,
      industryFocused: `The academic programs at Saveetha Amaravati University are designed to align with Education 4.0 and Industry 4.0, preparing students for the evolving demands of the global job market. The university also focuses on future trends such as Education 5.0 and Industry 5.0, where human creativity and advanced technologies work together. Through industry collaborations, practical training, internships, and project-based learning, students gain the skills, knowledge, and confidence required to succeed in competitive industries.`,
      experiencedFaculty: `The faculty at Saveetha Amaravati University consists of experienced professors, academic researchers, and industry professionals dedicated to guiding students toward success. Their expertise in teaching, research, and innovation helps students develop strong analytical skills and practical knowledge. Faculty members actively encourage research, innovation, entrepreneurship, and critical thinking, ensuring that students graduate with both academic knowledge and real-world problem-solving abilities.`,
      visionInnovation: `Saveetha Amaravati University aims to become a leading center for higher education, innovation, and research in India. By fostering academic excellence, ethical values, and global perspectives, the university is committed to shaping future leaders, entrepreneurs, and responsible global citizens.`,
    },
    visionStatement: `Saveetha Amaravati University aims to become a leading center for higher education, innovation, and research in India. By fostering academic excellence, ethical values, and global perspectives, the university is committed to shaping future leaders, entrepreneurs, and responsible global citizens.`,
    profiles: [
      {
        id: 1,
        name: "Prof. (Dr) Manik Saha",
        image:
          "https://img.freepik.com/premium-photo/portrait-handsome-positive-young-man-isolated-gray-background_146377-4812.jpg?w=1480",
        testimonial:
          "It gives me immense pleasure to convey my warm greetings and congratulation to Saveetha Amaravati University as it embarks on its new journey in our state. I am happy to know that the Saveetha Amaravati University, which is going to set up its campus in Tilthai, Dharmanagar, North Andhra Pradesh District, is the first University in India offering fully 'Learn and Earn' Degree/Diploma programmes with industries.",
      },
      {
        id: 2,
        name: "Dr. Rajesh Kumar",
        image:
          "https://img.freepik.com/free-photo/photo-handsome-unshaven-guy-looks-with-pleasant-expression-directly-camera_176532-8164.jpg?t=st=1773393986~exp=1773397586~hmac=405bb7ddaa8378bc9c94c667e341148acd51b482ece3a3869203e9e4db999090&w=1480",
        testimonial:
          "Our mission is to provide world-class education that prepares students for global challenges. We are committed to fostering innovation, research excellence, and holistic development of every student who joins our university.",
      },
      {
        id: 3,
        name: "Prof. Neha Sharma",
        image:
          "https://img.freepik.com/free-photo/portrait-expressive-young-woman_1258-48167.jpg?t=st=1773394017~exp=1773397617~hmac=cee6ebf524eb801faffe6cd6d2d15408740f5174aae5b2d1d608b8cbf83e0994&w=1480",
        testimonial:
          "Education at Saveetha Amaravati is not just about academics. We focus on developing critical thinking, leadership skills, and values that will help our students become responsible citizens and change-makers in society.",
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
    overview: {
      eyebrow: "Academics at SAU",
      title: "Future-Focused Academics Built for Depth, Choice, and Impact",
      subtitle:
        "Saveetha Amaravati University integrates outcome-based learning, CBCS flexibility, internships, research exposure, and holistic education into one modern academic ecosystem.",
      intro: [
        "Saveetha Amaravati University, established in 2018, integrates comprehensive educational components such as outcome-based education and the Choice Based Credit System (CBCS). Across its seven schools, the university offers a robust range of undergraduate and postgraduate programs designed to cultivate academic excellence and practical proficiency.",
        "The academic structure emphasizes strong disciplinary foundations while also encouraging flexibility, interdisciplinary exploration, and real-world learning. Students are supported through an ecosystem that combines academic rigor, future-ready skills, and broad-based intellectual development.",
      ],
      stats: [
        { id: 1, label: "Established", value: "2018" },
        { id: 2, label: "Academic Schools", value: "7" },
        { id: 3, label: "Curriculum Model", value: "CBCS" },
        { id: 4, label: "Learning Focus", value: "Outcome-Based" },
      ],
      pillars: [
        {
          id: 1,
          title: "Outcome-Based Education",
          description:
            "Programs are designed around measurable learning outcomes so students develop clear academic competencies, practical understanding, and career readiness.",
        },
        {
          id: 2,
          title: "Choice Based Credit System",
          description:
            "The CBCS framework gives students flexibility to shape their journey through core papers, electives, interdisciplinary options, honors pathways, and research-focused choices.",
        },
        {
          id: 3,
          title: "Mandatory Internships",
          description:
            "Internship courses connect classroom learning with real-world practice, helping students understand industry expectations and build confidence through hands-on exposure.",
        },
        {
          id: 4,
          title: "Global Readiness",
          description:
            "Foreign language learning and cross-disciplinary engagement broaden perspectives and strengthen communication skills for modern global workplaces.",
        },
      ],
      futureReady: {
        title: "Designed for Education 4.0, Ready for Education 5.0",
        description:
          "The university aligns its academic philosophy with evolving industry and educational models where technology, human creativity, innovation, and adaptability work together.",
        badges: [
          "Education 4.0",
          "Industry 4.0",
          "Education 5.0",
          "Industry 5.0",
        ],
        points: [
          "Interdisciplinary learning pathways aligned with NEP 2020.",
          "Multiple entry and exit options within the CBCS framework.",
          "Open electives and skill enhancement courses to support diverse career goals.",
          "Opportunities to pursue honors and research-oriented academic tracks.",
        ],
      },
      holisticDevelopment: {
        title: "Holistic Education Beyond the Classroom",
        description:
          "Academic excellence is supported by courses and experiences that build values, cultural awareness, ethical judgment, and a sense of responsibility toward society.",
        tracks: [
          {
            id: 1,
            code: "AEC",
            name: "Ability Enhancement Courses",
            description:
              "Designed to strengthen communication, analytical ability, and applied competencies needed across professional environments.",
          },
          {
            id: 2,
            code: "VEC",
            name: "Value Education Courses",
            description:
              "Encourage ethical reflection, integrity, and the development of responsible decision-making.",
          },
          {
            id: 3,
            code: "IKS",
            name: "Indian Knowledge System",
            description:
              "Introduces students to India’s intellectual and cultural traditions while connecting heritage with contemporary learning.",
          },
        ],
      },
      faculty: {
        title: "Faculty Excellence that Strengthens Learning and Research",
        description:
          "Our faculty members are selected from esteemed institutions across India and beyond, including IITs, NITs, and other respected universities. They bring strong subject knowledge, academic rigor, and active research engagement into the classroom.",
        points: [
          "Experienced educators who combine teaching depth with practical relevance.",
          "Active researchers involved in innovation, emerging ideas, and applied scholarship.",
          "Mentors who inspire students to think critically, explore broadly, and achieve their full potential.",
        ],
      },
    },
    examinationCommittee: {
      title: "Examination Committee",
      subtitle:
        "Structure and Functions of the Examination and Assessment Council",
      overview:
        "The Examination Committee is a key body within Saveetha Amaravati University, led by the Vice Chancellor and supported by three divisions: Examination, Assessment, and Record Maintenance. Its primary responsibilities include conducting examinations, publishing results, and awarding certificates to students who successfully complete their final examinations. Additionally, the Committee maintains comprehensive records related to examinations and organizes workshops and seminars aimed at enhancing the examination system.",
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
