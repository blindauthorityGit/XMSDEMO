import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Head from "next/head";
import MainContainer from "../components/layout/mainContainer";

//COPMPS
const Full = dynamic(() => import("../components/graphics/full"), {
    ssr: false,
});
import { StartText } from "../components/text";
import { StartFloaterFull } from "../components/floater";
import Goal from "../components/goal";
import { ModalOne, ModalSidebar, RoundModal } from "../components/modal";
const OnBoardModal = dynamic(() => import("../components/modal/onBoardModal"), {
    ssr: false,
});
import DonatorList from "../components/modalContent/donatorList/donatorList";
import OnboardingContent from "../components/modalContent/onboarding";
import Info from "../components/modalContent/info";
import { Desktop } from "../components/modalContent/donation";
import { SuccessModalContent } from "../components/modalContent/success";

//DND STUFF
import { DndContext, closestCenter } from "@dnd-kit/core";

//DEV
import { TestData } from "../config/testData";
import { fetchFirestoreData } from "../config/firebase";

// FX
import { Snow } from "../components/fx";

//STORE
import useStore from "../store/store"; // Import the zustand store

export default function Home() {
    const userList = useStore((state) => state.userList);
    const setUserList = useStore((state) => state.setUserList);

    //GLOBAL USER DATA
    const userData = useStore((state) => state.userData);
    const setUserData = useStore((state) => state.setUserData);

    //MODAL
    const isModalOpen = useStore((state) => state.isModalOpen);
    const modalPosition = useStore((state) => state.modalPosition);
    const closeModal = useStore((state) => state.closeModal);
    //SIDEBAR
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);
    //OVERLAY
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    //UNCLAIMED
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);
    //SUCCESS
    const showSuccess = useStore((state) => state.showSuccess);
    const setShowSuccess = useStore((state) => state.setShowSuccess);

    //MODAL COMPONENT
    const onBoarding = useStore((state) => state.onBoarding); // Get the onBoarding state
    // const setOnBoarding = useStore((state) => state.setOnBoarding);
    const setOnBoardingAndCookie = useStore((state) => state.setOnBoardingAndCookie);

    const [activeComponent, setActiveComponent] = useState(null);

    const handleToggleComponent = (componentName) => {
        setActiveComponent(componentName);
    };

    //DND STUFF
    function droppedZone(id, state) {
        const elem = document.getElementById(id);
        if (state) {
            elem.classList.remove("opacity-30");
            elem.classList.add("opacity-100");
        }
    }
    const [parent, setParent] = useState(null);
    const [isDropped, setIsDropped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [activeId, setActiveId] = useState(null);

    function handleDragStart(event) {
        console.log(event.active.id);
        setActiveId(event.active.id);
        setIsDragging(true);
        setIsDropped(false);
    }

    function handleDragEnd(event) {
        const { over } = event;
        console.log(over);
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
        setActiveId(null);
        setIsDropped(over ? true : false);
        setIsDragging(false);
        droppedZone(over.id);
        console.log(over.id);
        setUserData({
            ...userData,
            id: over ? over.id : null,
            claimed: true,
            createdAt: new Date(),
            // winner: Array.from(document.querySelectorAll(".kugel"))[over.id].dataset.iswinner == "true" ? true : false,
        });
    }

    useEffect(() => {
        // setUserList(TestData);
        onBoarding ? setShowOverlay(true) : null;
        JSON.parse(process.env.NEXT_PUBLIC_DEV)
            ? setUserList(TestData)
            : fetchFirestoreData("donation")
                  .then((data) => {
                      setUserList(data);
                  })
                  .catch((error) => {
                      console.error("Error fetching data:", error);
                  });
    }, []);

    useEffect(() => {
        console.log(userList);
    }, [userList]);

    useEffect(() => {
        console.log("SUCESS XXXXX");
        console.log(showSuccess);
    }, [showSuccess]);

    return (
        <>
            {" "}
            {onBoarding ? (
                <>
                    <OnBoardModal
                        isOpen={onBoarding}
                        onClose={() => {
                            setOnBoardingAndCookie(false);
                            setShowOverlay(false);
                            setShowUnclaimed(false);
                        }}
                    >
                        <OnboardingContent
                            onClose={() => {
                                setOnBoardingAndCookie(false);
                                setShowOverlay(false);
                                setShowUnclaimed(false);
                            }}
                        />
                    </OnBoardModal>{" "}
                </>
            ) : null}
            {showSuccess ? (
                <RoundModal
                    isOpen={showSuccess}
                    onClose={() => {
                        setShowSuccess(false);
                        setShowOverlay(false);
                    }}
                >
                    <SuccessModalContent />
                </RoundModal>
            ) : null}
            <MainContainer width="w-full h-full min-h-[100svh] relative">
                <Head>
                    <title>Site title</title>
                </Head>
                <Snow />
                {/* // FLOAT BUTTONS */}

                <StartFloaterFull
                    onClickPeople={() => {
                        setSidebarOpen(true);
                        setShowOverlay(true);
                        handleToggleComponent("donorList");
                    }}
                    onClickInfo={() => {
                        setSidebarOpen(true);
                        setShowOverlay(true);
                        handleToggleComponent("info");
                    }}
                ></StartFloaterFull>
                <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    {isModalOpen && (
                        <ModalOne
                            isOpen={isModalOpen}
                            onClose={() => {
                                closeModal();
                                setShowOverlay(false);
                                setShowUnclaimed(false);
                            }}
                            x={modalPosition.x}
                            y={modalPosition.y}
                        >
                            <Desktop activeId={activeId} isDropped={isDropped} isDragging={isDragging} />
                        </ModalOne>
                    )}
                    {isSidebarOpen && (
                        <ModalSidebar
                            isOpen={isModalOpen}
                            onClose={() => {
                                setSidebarOpen(false);
                                setShowOverlay(false);
                                setShowUnclaimed(false);
                            }}
                        >
                            {activeComponent === "info" && <Info />}
                            {activeComponent === "donorList" && <DonatorList />}
                        </ModalSidebar>
                    )}
                    <div className="col-span-12 container mx-auto grid grid-cols-12 min-h-[100svh] z-20 px-8 lg:px-0">
                        <div className="col-span-12 lg:col-span-5 h-full  flex flex-col pt-[10%] relative overflow-hidden">
                            <Goal
                                data={TestData}
                                klasse="w-full lg:mb-20 xl:mb-36 2xl:mb-36 absolute lg:relative bottom-32 lg:bottom-auto lg:top-0"
                            ></Goal>
                            <StartText />
                        </div>
                    </div>
                    {/* // GRAPHICS */}
                    <Full parent={parent} />
                </DndContext>
            </MainContainer>
        </>
    );
}
