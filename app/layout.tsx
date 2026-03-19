import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
import "./globals.css";

const soriaFont = localFont({
	src: "../public/soria-font.ttf",
	variable: "--font-soria",
});

const vercettiFont = localFont({
	src: "../public/Vercetti-Regular.woff",
	variable: "--font-vercetti",
});

export const metadata = {
	title: "Rishi Srivastav ✌️",
	description: "A frontend developer by profession, a creative at heart.",
	keywords:
		"Rishi Srivastav, Frontend Engineer, React Developer, Three.js, Creative Developer, Web Development, Angular, JavaScript, TypeScript, Portfolio",
	authors: [{ name: "Rishi Srivastav" }],
	creator: "Rishi Srivastav",
	publisher: "Rishi Srivastav",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		title: "Rishi Srivastav - Frontend Engineer",
		description: "Frontend engineer by profession, creative at heart.",
		url: "https://rishisrivastav.github.io ",
		siteName: "Rishi Srivastav's Portfolio",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Rishi Srivastav - Frontend Engineer",
		description: "Frontend engineer by profession, creative at heart.",
	},
	verification: {
		google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
	},
};

export const viewport = {
	themeColor: "#000000",
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="overscroll-y-none no-scrollbar">
			<body
				className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased , no-scrollbar`}
			>
				{children}
				<GoogleAnalytics gaId="G-7WD4HM3XRE" />
			</body>
		</html>
	);
}
