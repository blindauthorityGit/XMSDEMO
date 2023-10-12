import React from "react";

// COMPS
import { MainButton } from "../buttons";
import { H1, H2, H3 } from "../typography";
import { P } from "../typography";

//STORE
import useStore from "../../store/store"; // Import the zustand store

const StartText = () => {
    //GLOBAL UNCLAIMED STATE
    const showUnclaimed = useStore((state) => state.showUnclaimed);
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);

    //GLOBAL OVERLAY STATE
    const showOverlay = useStore((state) => state.showOverlay);
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    //GLOBAL MODAL OPEN
    const openModal = useStore((state) => state.openModal);
    const setModalPosition = useStore((state) => state.setModalPosition);

    //GET TO THE LAST TREE
    const setGetToLastTree = useStore((state) => state.setGetToLastTree);

    //MODAL FUNCION
    const handleModal = (event) => {
        openModal(event.clientX, event.clientY);
        setModalPosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <div className="absolute lg:static bottom-8 lg:bottom-auto w-full lg:mt-8 3xl:mt-16">
            <H1 klasse=" lg:block mb-20 lg:mb-4 lg:text-white">Schmücken Sie den Baum</H1>
            <P klasse="text-xl font-semibold tracking-wide hidden lg:block lg:text-white">
                Wir sammeln Spenden für ein wundervolles<br></br> Weihnachtsfest für unsere Charity.
            </P>
            <MainButton
                onClick={(e) => {
                    console.log("BUBUBU");
                    setShowUnclaimed(!showUnclaimed);
                    setShowOverlay(true);
                    handleModal(e);
                    setGetToLastTree(true);
                }}
                klasse={"bg-primaryColor hover:bg-primaryColor-950 mt-8 text-white z-[60]"}
            >
                Jetzt Spenden
            </MainButton>
        </div>
    );
};

export default StartText;
