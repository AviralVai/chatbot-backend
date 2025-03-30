const axios = require("axios");
const stringSimilarity = require("string-similarity");

exports.chatWithBot = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Hardcoded responses for specific questions
    const hardcodedResponses = {
        // "what should we know about your life story in a few sentences":
        //     "Aviral is a curious and ambitious boy who loves technology and dreams of making a big impact in the world.",
        // "what’s your #1 superpower":
        //     "Aviral's #1 superpower is his ability to learn new things quickly and adapt to any situation.",
        // "what are the top 3 areas you’d like to grow in":
        //     "Aviral wants to grow in public speaking, coding, and leadership skills.",
        // "what misconception do your coworkers have about you":
        //     "Some people think Aviral is shy, but he’s actually very thoughtful and observant.",
        // "how do you push your boundaries and limits":
        //     "Aviral constantly challenges himself by taking on difficult projects and learning from his mistakes."
        "what should we know about your life story in a few sentences": 
        "A naturally curious and ambitious individual, always eager to explore new ideas and push the boundaries of technology. Passionate about innovation, constantly seeking opportunities to create meaningful impact and drive positive change.",
    
    "what’s your #1 superpower": 
        "The ability to learn rapidly and adapt to any situation. Whether it’s mastering a new skill, solving complex problems, or navigating challenges, resilience and adaptability make anything possible.",
    
    "what are the top 3 areas you’d like to grow in": 
        "Public speaking to communicate ideas more effectively, coding to build smarter and more efficient solutions, and leadership to inspire and collaborate with teams in making a lasting impact.",
    
    "what misconception do your coworkers have about you": 
        "Some might assume quietness means shyness, but in reality, it’s a thoughtful and observant nature that focuses on understanding before speaking, ensuring meaningful contributions.",
    
    "how do you push your boundaries and limits": 
        "By embracing challenges, stepping outside comfort zones, and continuously learning from both successes and setbacks. Every obstacle is an opportunity for growth and improvement."
    };

    // Normalize the input message (trim and convert to lowercase)
    const normalizedMessage = message.trim().toLowerCase().replace(/[?]/g, ""); // Remove question marks

    // Get the keys (questions) from the hardcoded responses
    const questions = Object.keys(hardcodedResponses);

    // Find the closest matching question using string-similarity
    const bestMatch = stringSimilarity.findBestMatch(normalizedMessage, questions);

    // Check if the best match has a high enough similarity score
    if (bestMatch.bestMatch.rating > 0.6) {
        const reply = hardcodedResponses[bestMatch.bestMatch.target];
        res.json({ reply });
    } else {
        res.json({ reply: "Sorry, I don't have an answer for that." });
    }
};
