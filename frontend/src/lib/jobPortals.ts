export const JOB_PORTALS = [
    {
        name: "LinkedIn",
        icon: "linkedin",
        color: "#0077b5",
        url: "https://www.linkedin.com/jobs/search/?keywords={query}&location={location}&f_E={exp}"
    },
    {
        name: "Indeed",
        icon: "indeed",
        color: "#2164f3",
        url: "https://www.indeed.com/jobs?q={query}&l={location}&explvl={exp}"
    },
    {
        name: "Naukri",
        icon: "naukri",
        color: "#4a90e2",
        url: "https://www.naukri.com/{title}-jobs-in-{location}?experience={exp}"
    },
    {
        name: "Foundit",
        icon: "foundit",
        color: "#ff6b6b",
        url: "https://www.foundit.in/srp/results?query=\"{query}\"&locations={location}&experienceRanges={expMin}~{expMax}&experience={expMin}"
    },
    {
        name: "Instahyre",
        icon: "instahyre",
        color: "#00bfa5",
        url: "https://www.instahyre.com/{title}-jobs-in-{location}"
    }
];

export const formatExperience = (expId: string) => {
    if (!expId || expId === "all" || expId === "fresher") {
        return { expLevel: "0", expMin: "0", expMax: "0" };
    }

    const [expMin, maxRaw] = expId.split('-');
    let expMax = maxRaw;
    if (maxRaw === undefined || expId.includes('+')) {
        expMax = "15";
    }

    const expLevelMap: Record<string, string> = {
        "0-1": "0",
        "1-3": "1",
        "3-5": "2",
        "5-7": "3",
        "7+": "4"
    };

    return {
        expLevel: expLevelMap[expId] || "0",
        expMin: expMin || "0",
        expMax: expMax || "0"
    };
};

export const generateJobSearchUrls = (query: string, location: string, experienceId: string) => {
    if (!query) return [];

    const formattedQuery = encodeURIComponent(query);
    const formattedLocation = location ? encodeURIComponent(location.toLowerCase().replace(/ /g, '-')) : "";
    const jobTitle = query.toLowerCase().replace(/(developer|engineer)/g, "").trim().replace(/ /g, '-');
    
    const { expLevel, expMin, expMax } = formatExperience(experienceId);

    return JOB_PORTALS.map(portal => {
        let finalUrl = portal.url;
        finalUrl = finalUrl.replace('{query}', formattedQuery);
        finalUrl = finalUrl.replace('{location}', formattedLocation);
        finalUrl = finalUrl.replace('{title}', jobTitle);
        finalUrl = finalUrl.replace('{exp}', expLevel);
        finalUrl = finalUrl.replace('{expMin}', expMin);
        finalUrl = finalUrl.replace('{expMax}', expMax);

        return {
            ...portal,
            finalUrl
        };
    });
};
