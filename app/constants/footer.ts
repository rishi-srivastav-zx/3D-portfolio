


export type FooterLink = {
  name: string;
  hoverText?: string;
  icon: string;
  url?: string;          
  type?: "spotify";      
  popup?: {              
    title: string;
    message: string;
  };
};



export const FOOTER_LINKS: FooterLink[] = [
	{
		name: "LinkedIn",
		hoverText: "Connect with me",
		icon: "/icons/linkedin.svg",
		url: "https://www.linkedin.com/in/rishi-srivastav-13a017293/ ",
	},
	{
		name: "GitHub",
		hoverText: "View my projects",
		icon: "/icons/github.svg",
		url: "https://github.com/rishi-srivastav-zx ",
	},
	{
		name: "Spotify",
		hoverText: "Definitely not my playlist",
		icon: "/icons/spotify.svg",
		type: "spotify", 
		popup: {
			title: "404: Singer Not Found",
			message:
				"Bro I'm a coder, not a singer.\nMy playlist is just keyboard typing sounds",
		},
	},
	{
		name: "Instagram",
		hoverText: "Follow my life",
		icon: "/icons/instagram.svg",
		url: "https://www.instagram.com/ ",
	},
	{
		name: "Resume",
		hoverText: "Download Resume",
		icon: "/icons/file.svg",
		url: "/Rishi-Srivastav-Resume.pdf",
	},

];