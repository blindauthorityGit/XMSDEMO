import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";

//COMPS
import { BallChoice, Sum, Anonymus, Name, Avatar, Comment, DragBall, Payment } from "../steps/index";
import { MainButton } from "../../../buttons";
import Item from "../../../dragNDrop/item";

//Store
import useStore from "../../../../store/store";

//FUNCTIONS
import isStepDataValid from "../../../../functions/isStepDataValid";
import { handleContinue } from "../../../../functions/handleContinue";
import uploadToDatabase from "../../../../functions/uploadToDatabase";

//DATABASE
import saveUserDataToFirestore from "../../../../functions/saveDataToFirestore"; // Import the saveUserDataToFirestore function
import { fetchFirestoreData } from "../../../../config/firebase";

//PAYPAL
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "../../../../config/paypal";

const StepOne = (props) => {
    // GLOABAL STATE
    const userData = useStore((state) => state.userData);
    const userList = useStore((state) => state.userList);
    const setUserList = useStore((state) => state.setUserList);
    //MODAL
    //OVERLAY
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    //UNCLAIMED
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);
    const closeModal = useStore((state) => state.closeModal);
    //STEPS
    const [currentStep, setCurrentStep] = useState(1);
    //BackState
    const [disabledBack, setDisabledBack] = useState(true);
    // SUCCESS
    const setShowSuccess = useStore((state) => state.setShowSuccess);
    // SUCCESS
    const setModalHeight = useStore((state) => state.setModalHeight);
    // SHOW BUTTONS OR NOT
    const isInputFocused = useStore((state) => state.isInputFocused);

    // Button POsition
    const [buttonPosition, setButtonPosition] = useState(false);

    //SIZE FOR DRAG BALL
    const [size, setSize] = useState(56);

    const variants = {
        open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, delay: 0.2 } },
        closed: { x: -100, opacity: 0 },
    };

    const [isDisabled, setIsDisabled] = useState(true);

    // SHOW BUTTONS OR NOT
    const finalStep = useStore((state) => state.finalStep);

    const handleContinueClick = (e) => {
        handleContinue(
            currentStep,
            userData,
            setCurrentStep,
            setIsDisabled,
            userList,
            setUserList,
            setShowOverlay,
            setShowSuccess,
            closeModal,
            setShowUnclaimed,
            saveUserDataToFirestore,
            fetchFirestoreData,
            setModalHeight
        );
    };

    useEffect(() => {
        console.log(initialOptions);
    }, []);

    const handleBack = () => {
        if (currentStep == 6 && userData.isAnonymous) {
            setCurrentStep(currentStep - 3);
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    useEffect(() => {
        // Update the disabledBack state when the component mounts and when currentStep changes
        setDisabledBack(currentStep === 1);
    }, [currentStep]);

    useEffect(() => {
        // Update the isDisabled state based on the selected values in each step
        setIsDisabled(!isStepDataValid(currentStep, userData));
    }, [currentStep, userData]);

    // Render the respective step component based on the currentStep state
    let currentStepComponent;
    switch (currentStep) {
        case 1:
            currentStepComponent = (
                <BallChoice
                    size="48"
                    onNext={() => {
                        handleNext();
                    }}
                />
            );
            break;
        case 2:
            currentStepComponent = (
                <Sum
                    key="sum"
                    onNext={() => {
                        handleNext();
                    }}
                />
            );
            break;
        case 3:
            currentStepComponent = (
                <Anonymus
                    key="anon"
                    onNext={() => {
                        handleNext();
                    }}
                />
            );
            break;
        case 4:
            currentStepComponent = (
                <Name
                    key="namer"
                    onNext={() => {
                        handleNext();
                    }}
                />
            );
            break;
        case 5:
            currentStepComponent = (
                <Avatar
                    key="avatar"
                    onNext={() => {
                        handleNext();
                    }}
                />
            );
            break;
        case 6:
            currentStepComponent = (
                <Comment
                    key="comment"
                    onNext={() => {
                        handleNext();
                    }}
                />
            );
            break;
        case 7:
            currentStepComponent = (
                <DragBall
                    key="dragor"
                    onNext={() => {
                        console.log("NÄCHSTER CLICK");
                        uploadToDatabase(
                            userData,
                            setUserList,
                            setShowOverlay,
                            setShowSuccess,
                            setShowUnclaimed,
                            closeModal,
                            userList
                        );
                    }}
                    isDropped={props.isDropped}
                    isDragging={props.isDragging}
                />
            );
            break;
        case 8:
            currentStepComponent = (
                <Payment
                    onNext={() => {
                        console.log("here we go sateliete radio");
                    }}
                />
            );
            break;
        // Add more cases for other steps here
        default:
            break;
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            {" "}
            {/* Add AnimatePresence here */}
            {currentStepComponent}
            <button onClick={handleContinueClick}></button>
            <div
                className={`absolute  left-8 right-8 grid grid-cols-12 gap-4`}
                style={{
                    bottom: currentStep === 8 ? "auto" : "24px",
                    marginBottom: currentStep === 8 ? "16px" : null,
                }}
            >
                {!isInputFocused ? (
                    <>
                        <div className="col-span-6">
                            <MainButton disabled={disabledBack} onClick={handleBack} klasse="border-2 text-darkText">
                                Zurück
                            </MainButton>
                        </div>
                        <div className="col-span-6 flex justify-end">
                            {" "}
                            <MainButton
                                disabled={isDisabled}
                                onClick={(e) => {
                                    finalStep
                                        ? uploadToDatabase(
                                              userData,
                                              setUserList,
                                              setShowOverlay,
                                              setShowSuccess,
                                              setShowUnclaimed,
                                              closeModal,
                                              userList
                                          )
                                        : handleContinueClick(e);
                                }}
                                klasse="border-2 text-darkText"
                            >
                                Weiter
                            </MainButton>
                        </div>
                    </>
                ) : null}
            </div>
            {createPortal(
                <DragOverlay
                    dropAnimation={{
                        duration: 300,
                        easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                    }}
                >
                    {props.activeId ? (
                        <Item
                            style={{ width: size + "px", height: size + "px", background: userData.color }}
                            value={`Item ${props.activeId}`}
                            klasse="rounded-full touch-none"
                        />
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </PayPalScriptProvider>
    );
};

export default StepOne;
