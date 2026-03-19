"use client";
import React from "react";
import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";




const Home = () => {
	return (
		<div
			className="flex flex-col"
			style={{
				msOverflowStyle: "none",
				scrollbarWidth: "none",
			}}
		>

			{/* 3D canvas world — locked to 100dvh */}
			<div className="h-[100dvh] w-full flex-shrink-0 relative">
				<CanvasLoader>
					<ScrollWrapper>
						<Hero />
						<Experience />
						<Footer />
					</ScrollWrapper>
				</CanvasLoader>
			</div>
		</div>
	);
};

export default Home;
