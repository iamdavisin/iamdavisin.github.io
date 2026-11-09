import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const EMAIL = "perezdavidcv@gmail.com";

export const socials = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/iamdavisin", external: true },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/davidperezmi", external: true },
    { name: "Email", icon: <FaEnvelope />, url: `mailto:${EMAIL}`, external: false },
];
