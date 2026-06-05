export const JOB_SUGGESTIONS = [
    { text: "Software Engineer", icon: "💻" },
    { text: "Full Stack Developer", icon: "🔧" },
    { text: "Data Scientist", icon: "📊" },
    { text: "Product Manager", icon: "📱" },
    { text: "DevOps Engineer", icon: "⚙️" },
    { text: "UI/UX Designer", icon: "🎨" },
    { text: "Python Developer", icon: "🐍" },
    { text: "Java Developer", icon: "☕" },
    { text: "React Developer", icon: "⚛️" },
    { text: "Machine Learning Engineer", icon: "🤖" },
    { text: "Backend Developer", icon: "🖧" },
    { text: "Frontend Developer", icon: "🎨" },
    { text: "Node.js Developer", icon: "🌿" },
    { text: "Cloud Engineer", icon: "☁️" },
    { text: "Security Engineer", icon: "🛡️" }
];

export const LOCATION_SUGGESTIONS = [
    { text: "Bangalore", icon: "📍" },
    { text: "Mumbai", icon: "📍" },
    { text: "Delhi", icon: "📍" },
    { text: "Hyderabad", icon: "📍" },
    { text: "Pune", icon: "📍" },
    { text: "Chennai", icon: "📍" },
    { text: "Noida", icon: "📍" },
    { text: "Gurgaon", icon: "📍" },
    { text: "Ahmedabad", icon: "📍" },
    { text: "Remote", icon: "🏠" },
    { text: "Work from Home", icon: "🏠" }
];

export const JOB_TYPES = [
    { id: "all", text: "All Types" },
    { id: "full-time", text: "Full Time" },
    { id: "part-time", text: "Part Time" },
    { id: "contract", text: "Contract" },
    { id: "internship", text: "Internship" },
    { id: "remote", text: "Remote" }
];

export const EXPERIENCE_RANGES = [
    { id: "all", text: "All Levels" },
    { id: "fresher", text: "Fresher" },
    { id: "1-3", text: "1-3 years" },
    { id: "3-5", text: "3-5 years" },
    { id: "5-7", text: "5-7 years" },
    { id: "7+", text: "7+ years" }
];

export const SALARY_RANGES = [
    { id: "all", text: "All Ranges" },
    { id: "0-3", text: "0-3 LPA" },
    { id: "3-6", text: "3-6 LPA" },
    { id: "6-10", text: "6-10 LPA" },
    { id: "10-15", text: "10-15 LPA" },
    { id: "15+", text: "15+ LPA" }
];

export const FEATURED_COMPANIES = {
    tech: [
        {
            name: "Google",
            icon: "fas fa-google",
            color: "#4285F4",
            careers_url: "https://careers.google.com",
            description: "Leading technology company known for search, cloud, and innovation",
            categories: ["Software", "AI/ML", "Cloud"]
        },
        {
            name: "Microsoft",
            icon: "fas fa-microsoft",
            color: "#00A4EF",
            careers_url: "https://careers.microsoft.com",
            description: "Global leader in software, cloud, and enterprise solutions",
            categories: ["Software", "Cloud", "Gaming"]
        },
        {
            name: "Amazon",
            icon: "fas fa-amazon",
            color: "#FF9900",
            careers_url: "https://www.amazon.jobs",
            description: "E-commerce and cloud computing giant",
            categories: ["Software", "Operations", "Cloud"]
        }
    ],
    indian_tech: [
        {
            name: "TCS",
            icon: "fas fa-building",
            color: "#0070C0",
            careers_url: "https://www.tcs.com/careers",
            description: "India's largest IT services company",
            categories: ["IT Services", "Consulting", "Digital"]
        },
        {
            name: "Infosys",
            icon: "fas fa-building",
            color: "#007CC3",
            careers_url: "https://www.infosys.com/careers",
            description: "Global leader in digital services and consulting",
            categories: ["IT Services", "Consulting", "Digital"]
        }
    ],
    global_corps: [
        {
            name: "IBM",
            icon: "fas fa-server",
            color: "#1F70C1",
            careers_url: "https://www.ibm.com/careers",
            description: "Global leader in technology and consulting",
            categories: ["Software", "Consulting", "Cloud"]
        },
        {
            name: "Accenture",
            icon: "fas fa-building",
            color: "#A100FF",
            careers_url: "https://www.accenture.com/careers",
            description: "Global professional services company",
            categories: ["Consulting", "Technology", "Digital"]
        }
    ]
};

export const JOB_MARKET_INSIGHTS = {
    trending_skills: [
        { name: "Artificial Intelligence", growth: "+45%", icon: "BrainCircuit" },
        { name: "Cloud Computing", growth: "+38%", icon: "Cloud" },
        { name: "Data Science", growth: "+35%", icon: "LineChart" },
        { name: "Cybersecurity", growth: "+32%", icon: "ShieldAlert" },
        { name: "DevOps", growth: "+30%", icon: "GitBranch" },
        { name: "Machine Learning", growth: "+28%", icon: "Bot" }
    ],
    top_locations: [
        { name: "Bangalore", jobs: "50,000+", icon: "MapPin" },
        { name: "Mumbai", jobs: "35,000+", icon: "MapPin" },
        { name: "Delhi NCR", jobs: "30,000+", icon: "MapPin" },
        { name: "Hyderabad", jobs: "25,000+", icon: "MapPin" },
        { name: "Remote", jobs: "15,000+", icon: "Globe" }
    ],
    salary_insights: [
        { role: "Machine Learning Engineer", range: "10-35 LPA", experience: "0-5 years" },
        { role: "Software Engineer", range: "5-25 LPA", experience: "0-5 years" },
        { role: "Data Scientist", range: "8-30 LPA", experience: "0-5 years" },
        { role: "DevOps Engineer", range: "6-28 LPA", experience: "0-5 years" },
        { role: "Full Stack Developer", range: "8-30 LPA", experience: "0-5 years" }
    ]
};
