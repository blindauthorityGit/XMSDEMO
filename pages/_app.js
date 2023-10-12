import "../styles/globals.css";
import "../styles/animations.css";

import { useEffect, useState } from "react";
import LoadingScreen from "../components/loading";
import Overlay from "../components/overlay";

import scrollToTop from "../functions/scrollToTop";

import { CookieConsentComponent } from "../components/cookie";

//STORE
import useStore from "../store/store"; // Import the zustand store

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true);

    //GLOBAL OVERLAY STATE
    const showOverlay = useStore((state) => state.showOverlay);
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    //GLOBAL MODAL STATE
    const closeModal = useStore((state) => state.closeModal);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    //GLOBAL UNCLAIMED STATE
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);

    //GLOBAL SUCCESS STATE
    const setShowSuccess = useStore((state) => state.setShowSuccess);

    //MODAL COMPONENT
    const setOnBoardingAndCookie = useStore((state) => state.setOnBoardingAndCookie); // Get the setter function

    // Function to handle overlay click
    const handleOverlayClick = () => {
        scrollToTop();
        setShowOverlay(false);
        closeModal();
        setSidebarOpen();
        setShowUnclaimed(false);
        setOnBoardingAndCookie(false);
        setShowSuccess(false);
    };

    useEffect(() => {
        const startTime = performance.now();

        window.onload = () => {
            const endTime = performance.now();
            const loadingTime = endTime - startTime;
            console.log(`Site loaded in ${loadingTime} milliseconds.`);
            setLoading(false);
        };
    });

    return (
        <>
            {/* ...other components */}
            {showOverlay && <Overlay onClick={handleOverlayClick} />} {/* Render the overlay if showOverlay is true */}
            {/* <CookieConsentComponent /> */}
            <Component {...pageProps} setShowOverlay={setShowOverlay} /> {/* Pass setShowOverlay to child components */}
        </>
    );
}

export default MyApp;
