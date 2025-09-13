const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Database of over 60 questions ---
const questionDatabase = {
    "Identity & Access Management": [
        { text: "Do you use a unique password for every online account?", description: "This prevents a single breach from compromising all your accounts.", answerOptions: ["Yes", "No", "I use a few different ones"], score: { "Yes": 10, "No": 0, "I use a few different ones": 5 } },
        { text: "Is Two-Factor Authentication (2FA) enabled on your critical accounts (email, banking, social media)?", description: "2FA adds an extra layer of security, requiring a second verification factor.", answerOptions: ["Yes", "No", "On some accounts"], score: { "Yes": 10, "No": 0, "On some accounts": 7 } },
        { text: "Do you use a password manager?", description: "A password manager helps you securely generate and store complex, unique passwords.", answerOptions: ["Yes", "No", "I've considered it"], score: { "Yes": 10, "No": 0, "I've considered it": 5 } },
        { text: "Do you regularly review and update your privacy settings on social media?", description: "This ensures you are only sharing information with your intended audience.", answerOptions: ["Yes", "No", "Sometimes"], score: { "Yes": 10, "No": 0, "Sometimes": 5 } },
        { text: "Do you use biometric authentication (fingerprint, face ID) to unlock your devices?", description: "Biometrics provide a convenient and strong layer of protection for your devices.", answerOptions: ["Yes", "No", "My device doesn't have it"], score: { "Yes": 10, "No": 5, "My device doesn't have it": 5 } },
        { text: "Do you avoid using public computers to log into sensitive accounts?", description: "Public computers can have keyloggers or malware that steals your credentials.", answerOptions: ["Yes", "No", "Sometimes"], score: { "Yes": 10, "No": 0, "Sometimes": 5 } },
        { text: "Have you checked if your email or passwords have been part of a public data breach?", description: "Services like Have I Been Pwned can alert you if your information is exposed.", answerOptions: ["Yes, I check regularly", "Yes, once or twice", "No"], score: { "Yes, I check regularly": 10, "Yes, once or twice": 7, "No": 0 } },
        { text: "Do you use a separate email address for online shopping and newsletters?", description: "This reduces the amount of spam and phishing emails that reach your primary inbox.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a VPN to change your virtual location?", description: "A VPN can protect your identity and allow you to access content not available in your region.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you regularly clear your browser's cookies and cache?", description: "Clearing cookies and cache helps to remove tracking data and potential security risks.", answerOptions: ["Yes", "No", "Sometimes"], score: { "Yes": 10, "No": 0, "Sometimes": 5 } },
        { text: "Have you ever given personal information in response to a request via text or social media?", description: "Scammers often use these channels for 'smishing' or 'vishing' attacks.", answerOptions: ["Yes", "No"], score: { "Yes": 0, "No": 10 } },
        { text: "Do you review the permissions an app asks for before installing it?", description: "Granting excessive permissions can give apps unauthorized access to your data.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a different password for your router than the default one?", description: "Default router passwords are easy for hackers to find online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a public Wi-Fi network that is not password protected?", description: "These networks are highly susceptible to 'man-in-the-middle' attacks.", answerOptions: ["Yes", "No"], score: { "Yes": 0, "No": 10 } },
        { text: "Do you use a different login for your work and personal accounts?", description: "This is a key security practice to prevent personal breaches from affecting your professional life.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } }
    ],
    "Data & Privacy Protection": [
        { text: "Do you regularly back up your important files?", description: "Backups are your last line of defense against data loss from theft, fire, or ransomware.", answerOptions: ["Yes, automatically", "Yes, manually", "No"], score: { "Yes, automatically": 10, "Yes, manually": 7, "No": 0 } },
        { text: "Do you use a Virtual Private Network (VPN) when on public Wi-Fi?", description: "A VPN encrypts your internet connection, protecting your data from hackers on unsecure networks.", answerOptions: ["Yes, always", "Sometimes", "No"], score: { "Yes, always": 10, "Sometimes": 7, "No": 0 } },
        { text: "Do you encrypt sensitive files on your computer?", description: "Encryption turns your data into unreadable code, protecting it even if your device is stolen.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use 'private' or 'incognito' browsing mode regularly?", description: "This mode helps prevent your browser from saving your history, cookies, and other data locally.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Are you cautious about what personal information you share on social media?", description: "Criminals can use this information for social engineering or identity theft.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a data shredding program to permanently delete sensitive files?", description: "Simply deleting files does not erase them from the disk. Shredding makes them unrecoverable.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a service to monitor for identity theft?", description: "These services monitor your credit reports and public records for signs of fraud.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different login for your work and personal accounts?", description: "This is a key security practice to prevent personal breaches from affecting your professional life.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a VPN on your mobile devices?", description: "Mobile data is often more secure, but a VPN is still a good idea, especially on public Wi-Fi.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you review the privacy policies of apps and websites you use?", description: "This helps you understand how your personal data is being collected and used.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an ad-blocker or privacy-focused browser?", description: "These tools can prevent malicious ads and web trackers from following you online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your data is compromised?", description: "A plan can help you act quickly to mitigate the damage of a breach.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an encrypted messaging app (e.g., Signal, Telegram)?", description: "These apps offer end-to-end encryption to protect your conversations from being read by third parties.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different login for your work and personal accounts?", description: "This is a key security practice to prevent personal breaches from affecting your professional life.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } }
    ],
    "Device & Network Security": [
        { text: "Is your computer's operating system kept up-to-date?", description: "Software updates often contain critical security patches that fix vulnerabilities attackers could exploit.", answerOptions: ["Yes, automatically", "Yes, manually", "No"], score: { "Yes, automatically": 10, "Yes, manually": 7, "No": 0 } },
        { text: "Do you have an active antivirus/antimalware program on your computer?", description: "Antivirus software helps protect your devices from malicious software like viruses and ransomware.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Is your home Wi-Fi secured with a strong password (WPA2/WPA3)?", description: "A strong Wi-Fi password prevents unauthorized people from connecting to your network.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a screen lock or password on your smartphone?", description: "A screen lock is the first line of defense if your phone is lost or stolen.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a firewall on your computer and router?", description: "A firewall filters network traffic and blocks unauthorized access to your devices.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you avoid using public USB charging stations?", description: "These can be used for 'juice jacking' to install malware or steal data from your phone.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your device is lost or stolen?", description: "A plan for remote wiping or tracking can help protect your data in an emergency.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you regularly review and update the permissions on your mobile apps?", description: "Apps often ask for more permissions than they need, which can be a privacy risk.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different password for your router than the default one?", description: "Default router passwords are easy for hackers to find online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your data is compromised?", description: "A plan can help you act quickly to mitigate the damage of a breach.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different login for your work and personal accounts?", description: "This is a key security practice to prevent personal breaches from affecting your professional life.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a VPN on your mobile devices?", description: "Mobile data is often more secure, but a VPN is still a good idea, especially on public Wi-Fi.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you review the privacy policies of apps and websites you use?", description: "This helps you understand how your personal data is being collected and used.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an ad-blocker or privacy-focused browser?", description: "These tools can prevent malicious ads and web trackers from following you online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your data is compromised?", description: "A plan can help you act quickly to mitigate the damage of a breach.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an encrypted messaging app (e.g., Signal, Telegram)?", description: "These apps offer end-to-end encryption to protect your conversations from being read by third parties.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different login for your work and personal accounts?", description: "This is a key security practice to prevent personal breaches from affecting your professional life.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different password for your router than the default one?", description: "Default router passwords are easy for hackers to find online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } }
    ],
    "Awareness & Behavior": [
        { text: "Can you identify a phishing email?", description: "Phishing emails often contain spelling mistakes, generic greetings, and urgent requests for information.", answerOptions: ["Yes, always", "Sometimes", "No"], score: { "Yes, always": 10, "Sometimes": 7, "No": 0 } },
        { text: "Do you avoid clicking on suspicious links or pop-up ads?", description: "Clicking on these can lead to malware infections or phishing sites.", answerOptions: ["Yes, always", "Sometimes", "No"], score: { "Yes, always": 10, "Sometimes": 5, "No": 0 } },
        { text: "Do you use a different password for your banking or financial accounts?", description: "Using a unique, strong password for financial accounts is a critical security practice.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you download apps and software only from official app stores?", description: "Official stores have security checks to prevent malicious software from being uploaded.", answerOptions: ["Yes", "No", "Sometimes"], score: { "Yes": 10, "No": 0, "Sometimes": 5 } },
        { text: "Do you regularly monitor your bank and credit card statements for suspicious activity?", description: "Regularly checking your statements is the best way to detect financial fraud early.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a firewall on your computer and router?", description: "A firewall filters network traffic and blocks unauthorized access to your devices.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you avoid using public USB charging stations?", description: "These can be used for 'juice jacking' to install malware or steal data from your phone.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your device is lost or stolen?", description: "A plan for remote wiping or tracking can help protect your data in an emergency.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you regularly review and update the permissions on your mobile apps?", description: "Apps often ask for more permissions than they need, which can be a privacy risk.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different password for your router than the default one?", description: "Default router passwords are easy for hackers to find online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your data is compromised?", description: "A plan can help you act quickly to mitigate the damage of a breach.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an encrypted messaging app (e.g., Signal, Telegram)?", description: "These apps offer end-to-end encryption to protect your conversations from being read by third parties.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a different login for your work and personal accounts?", description: "This is a key security practice to prevent personal breaches from affecting your professional life.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use a VPN on your mobile devices?", description: "Mobile data is often more secure, but a VPN is still a good idea, especially on public Wi-Fi.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you review the privacy policies of apps and websites you use?", description: "This helps you understand how your personal data is being collected and used.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an ad-blocker or privacy-focused browser?", description: "These tools can prevent malicious ads and web trackers from following you online.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you have a plan for what to do if your data is compromised?", description: "A plan can help you act quickly to mitigate the damage of a breach.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } },
        { text: "Do you use an encrypted messaging app (e.g., Signal, Telegram)?", description: "These apps offer end-to-end encryption to protect your conversations from being read by third parties.", answerOptions: ["Yes", "No"], score: { "Yes": 10, "No": 0 } }
    ]
};

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// API endpoint to start an assessment and get randomized questions
app.post('/api/assessment/start', (req, res) => {
    const { name, email } = req.body;
    const questionsForAssessment = {};
    const TOTAL_QUESTIONS = 60;
    const questionsPerCategory = Math.floor(TOTAL_QUESTIONS / Object.keys(questionDatabase).length);

    for (const category in questionDatabase) {
        shuffleArray(questionDatabase[category]);
        questionsForAssessment[category] = questionDatabase[category].slice(0, questionsPerCategory);
    }

    res.json({
        assessmentId: Date.now(),
        user: { name, email },
        questions: questionsForAssessment
    });
});

// API endpoint to submit answers and get the report
app.post('/api/assessment/submit', (req, res) => {
    const { answers, assessmentId, userName } = req.body;
    
    let totalScore = 0;
    const totalPossibleScore = 600; // 60 questions * max score of 10
    const categoryScores = {};
    const recommendations = [];

    // Calculate scores and generate recommendations
    for (const category in answers) {
        let categoryScore = 0;
        let categoryMaxScore = 0;
        
        answers[category].forEach((answer, index) => {
            const question = questionDatabase[category][index];
            const scoreValue = question.score[answer];
            categoryScore += scoreValue;
            totalScore += scoreValue;
            categoryMaxScore += 10;
        });

        const percentScore = (categoryScore / categoryMaxScore) * 100;
        categoryScores[category] = {
            score: percentScore,
            maxScore: 100
        };

        if (percentScore < 80) {
            let priority;
            if (percentScore < 50) {
                priority = 'Critical';
            } else if (percentScore < 70) {
                priority = 'Important';
            } else {
                priority = 'Suggested';
            }
            recommendations.push({ category, priority });
        }
    }

    const overallScore = Math.round((totalScore / totalPossibleScore) * 100);
    let riskLevel = 'Low Risk';
    if (overallScore < 80) riskLevel = 'Medium Risk';
    if (overallScore < 50) riskLevel = 'High Risk';

    const report = {
        assessmentId,
        userName,
        overallScore,
        riskLevel,
        categoryScores,
        recommendations,
        dateCompleted: new Date().toLocaleDateString()
    };

    res.json(report);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});