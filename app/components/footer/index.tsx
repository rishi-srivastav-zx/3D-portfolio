import { Svg, Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { FOOTER_LINKS } from "../../constants";
import { FooterLink } from "../../constants/footer";

// ─── Popup ────────────────────────────────────────────────────────────────────
const LinkPopup = ({
	link,
	onClose,
	onConfirm,
}: {
	link: FooterLink | null;
	onClose: () => void;
	onConfirm: () => void;
}) => {
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!link || !boxRef.current) return;
		gsap.fromTo(
			boxRef.current,
			{ opacity: 0, y: 24, scale: 0.94 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.6)" },
		);
	}, [link]);

	const handleClose = () => {
		if (!boxRef.current) {
			onClose();
			return;
		}
		gsap.to(boxRef.current, {
			opacity: 0,
			y: 16,
			scale: 0.95,
			duration: 0.2,
			ease: "power2.in",
			onComplete: onClose,
		});
	};

	const handleConfirm = () => {
		if (!boxRef.current) {
			onConfirm();
			return;
		}
		gsap.to(boxRef.current, {
			opacity: 0,
			y: 16,
			scale: 0.95,
			duration: 0.2,
			ease: "power2.in",
			onComplete: onConfirm,
		});
	};

	if (!link) return null;

	const isSpotify = link.type === "spotify";

	// ── Icon mapping ──────────────────────────────────────────────────────────
	const ICONS: Record<string, string> = {
		LinkedIn: "in",
		GitHub: "</>",
		Spotify: "♫",
		Instagram: "◎",
		Resume: "↓",
	};

	const icon = ICONS[link.name] ?? "↗";

	return createPortal(
		<div
			onClick={handleClose}
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 9999,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(0,0,0,0.6)",
				backdropFilter: "blur(6px)",
				WebkitBackdropFilter: "blur(6px)",
			}}
		>
			<div
				ref={boxRef}
				onClick={(e) => e.stopPropagation()}
				style={{
					background: "#0c0c0c",
					border: "1px solid rgba(255,255,255,0.1)",
					borderRadius: "20px",
					padding: "2.5rem 2rem 2rem",
					maxWidth: "360px",
					width: "90%",
					textAlign: "center",
					color: "white",
					fontFamily: "'Segoe UI', system-ui, sans-serif",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{/* Top accent bar */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: "10%",
						right: "10%",
						height: "2px",
						background: isSpotify
							? "linear-gradient(90deg, #1DB954, #1ed760)"
							: "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
						borderRadius: "0 0 4px 4px",
					}}
				/>

				{/* Close button */}
				<button
					onClick={handleClose}
					style={{
						position: "absolute",
						top: "1rem",
						right: "1rem",
						background: "rgba(255,255,255,0.06)",
						border: "1px solid rgba(255,255,255,0.1)",
						borderRadius: "50%",
						width: "28px",
						height: "28px",
						color: "rgba(255,255,255,0.5)",
						cursor: "pointer",
						fontSize: "14px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						lineHeight: 1,
					}}
				>
					×
				</button>

				{/* Icon circle */}
				<div
					style={{
						width: "56px",
						height: "56px",
						borderRadius: "16px",
						background: isSpotify
							? "rgba(29,185,84,0.12)"
							: "rgba(255,255,255,0.06)",
						border: `1px solid ${isSpotify ? "rgba(29,185,84,0.3)" : "rgba(255,255,255,0.12)"}`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "20px",
						margin: "0 auto 1.25rem",
						color: isSpotify ? "#1DB954" : "white",
						fontWeight: 700,
						letterSpacing: "-0.5px",
					}}
				>
					{icon}
				</div>

				{isSpotify && link.popup ? (
					// ── Spotify popup (no confirm button) ──────────────────────────
					<>
						<h3
							style={{
								margin: "0 0 0.6rem",
								fontSize: "1.1rem",
								fontWeight: 700,
								letterSpacing: "-0.3px",
							}}
						>
							{link.popup.title}
						</h3>
						<p
							style={{
								margin: "0 0 1.8rem",
								whiteSpace: "pre-line",
								color: "rgba(255,255,255,0.55)",
								lineHeight: 1.65,
								fontSize: "0.88rem",
							}}
						>
							{link.popup.message}
						</p>
						<button
							onClick={handleClose}
							style={{
								background: "#1DB954",
								color: "#000",
								border: "none",
								borderRadius: "999px",
								padding: "0.6rem 1.8rem",
								fontWeight: 700,
								cursor: "pointer",
								fontSize: "0.9rem",
								width: "100%",
							}}
						>
							Got it 👍
						</button>
					</>
				) : (
					// ── External link confirm popup ────────────────────────────────
					<>
						<p
							style={{
								margin: "0 0 0.35rem",
								fontSize: "0.72rem",
								letterSpacing: "0.12em",
								color: "rgba(255,255,255,0.3)",
								textTransform: "uppercase",
							}}
						>
							Opening
						</p>
						<h3
							style={{
								margin: "0 0 0.5rem",
								fontSize: "1.3rem",
								fontWeight: 700,
								letterSpacing: "-0.5px",
							}}
						>
							{link.name}
						</h3>
						{link.url && (
							<p
								style={{
									margin: "0 0 1.8rem",
									fontSize: "0.75rem",
									color: "rgba(255,255,255,0.25)",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{link.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
							</p>
						)}
						<div style={{ display: "flex", gap: "0.75rem" }}>
							<button
								onClick={handleClose}
								style={{
									flex: 1,
									padding: "0.6rem",
									background: "transparent",
									border: "1px solid rgba(255,255,255,0.12)",
									borderRadius: "10px",
									color: "rgba(255,255,255,0.5)",
									cursor: "pointer",
									fontSize: "0.88rem",
								}}
							>
								Cancel
							</button>
							<button
								onClick={handleConfirm}
								style={{
									flex: 2,
									padding: "0.6rem",
									background: "white",
									color: "#000",
									border: "none",
									borderRadius: "10px",
									fontWeight: 700,
									cursor: "pointer",
									fontSize: "0.88rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "6px",
								}}
							>
								Open {link.name} ↗
							</button>
						</div>
					</>
				)}
			</div>
		</div>,
		document.body,
	);
};

// ─── Shared popup state ───────────────────────────────────────────────────────
let _setActivePopup: React.Dispatch<React.SetStateAction<FooterLink | null>>;

// ─── Footer Link Item ─────────────────────────────────────────────────────────
const FooterLinkItem = ({ link }: { link: FooterLink }) => {
	const [hovered, setHovered] = useState(false);
	const [letterSpacing, setLetterSpacing] = useState(0);

	const onPointerOver = () => setHovered(true);
	const onPointerOut = () => setHovered(false);

	// Spotify shows spotify page, others show popup
	const onClick = () => {
		if (link.type === "spotify") {
			window.open("/spotify", "_blank");
		} else if (_setActivePopup) {
			_setActivePopup(link);
		}
	};

	const onPointerMove = (e: MouseEvent) => {
		if (isMobile) return;
		const hoverDiv = document.getElementById(`footer-link-${link.name}`);
		if (!hoverDiv) return;
		gsap.to(hoverDiv, {
			top: `${e.clientY + 14}px`,
			left: `${e.clientX}px`,
			duration: 0.6,
		});
	};

	const fontProps = {
		font: "./Vercetti-Regular.woff",
		fontSize: 0.2,
		color: "white",
		letterSpacing,
		onPointerOver,
		onPointerMove,
		onPointerOut,
		onClick,
	};

	useEffect(() => {
		if (document.getElementById(`footer-link-${link.name}`)) return;
		const div = document.createElement("div");
		div.id = `footer-link-${link.name}`;
		div.textContent = link.hoverText ?? link.name.toUpperCase();
		Object.assign(div.style, {
			position: "fixed",
			zIndex: "2",
			bottom: "0",
			opacity: "0",
			left: `${window.innerWidth / 2}px`,
			fontSize: "0.8rem",
			pointerEvents: "none",
		});
		document.body.appendChild(div);
	}, [link.name, link.hoverText]);

	useEffect(() => {
		if (isMobile) return;
		const hoverDiv = document.getElementById(`footer-link-${link.name}`);
		if (hovered) {
			gsap.fromTo(hoverDiv, { opacity: 0 }, { opacity: 0.5, delay: 0.2 });
		} else {
			gsap.to(hoverDiv, { opacity: 0 });
		}
		setLetterSpacing(hovered ? 0.3 : 0);
		return () => {
			gsap.killTweensOf(hoverDiv);
		};
	}, [hovered, link.name]);

	useCursor(hovered);

	if (isMobile) {
		return (
			<Svg
				onClick={onClick}
				scale={0.0015}
				position={[0.1, 0.25, 0]}
				src={link.icon}
			/>
		);
	}

	return (
		<Text {...fontProps}>
			{link.name.toUpperCase()}
		</Text>
	);
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
	const groupRef = useRef<THREE.Group>(null);
	const data = useScroll();
	const [activePopup, setActivePopup] = useState<FooterLink | null>(null);

	useEffect(() => {
		_setActivePopup = setActivePopup;
	}, []);

	const handleConfirm = () => {
		if (activePopup?.url) window.open(activePopup.url, "_blank");
		setActivePopup(null);
	};

	useFrame(() => {
		const d = data.range(0.8, 0.2);
		if (groupRef.current) groupRef.current.visible = d > 0;
	});

	return (
		<>
			<LinkPopup
				link={activePopup}
				onClose={() => setActivePopup(null)}
				onConfirm={handleConfirm}
			/>

			<group
				position={[0, -44, 18]}
				rotation={[-Math.PI / 2, 0, 0]}
				ref={groupRef}
			>
				<group position={[isMobile ? -2.5 : -4, 0, 0]}>
					{FOOTER_LINKS.map((link, i) => (
						<group key={i} position={[i * (isMobile ? 1.1 : 2), 0, 0]}>
							<FooterLinkItem link={link} />
						</group>
					))}
				</group>
			</group>
		</>
	);
};

export default Footer;