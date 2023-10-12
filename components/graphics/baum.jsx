import React, { useRef, useEffect, forwardRef } from "react";

//COMPS
import { CoverImage } from "../images";

//ASSETS
import Baum from "../../assets/baum3.svg";

//HOOKS
import useElementDimensions from "../../hooks/useDimensions";

// STATE
import useStore from "../../store/store";

const BaumGraphic = () => {
    const { ref, dimensions } = useElementDimensions();
    const setDimensions = useStore((state) => state.setDimensions);

    //GLOBAL ANIMATION TREE STATE
    const animateTree = useStore((state) => state.animateTree);
    const animationEndCounter = useStore((state) => state.animationEndCounter);
    const setAnimationEndCounter = useStore((state) => state.setAnimationEndCounter);

    //ANIMATION TRACKER
    const swipeCount = useStore((state) => state.swipeCount);

    useEffect(() => {
        console.log("ANIMAT TREEE", animationEndCounter);

        const handleAnimationEnd = () => {
            ref.current.classList.remove(animateTree == "right" ? "slide-out-right" : "slide-out-left");
            console.log("ANIMATION HAS ENDED");
            const randomString = [...Array(6)]
                .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
                .join("");

            setAnimationEndCounter(randomString);
        };

        if (animateTree === "right") {
            ref.current.classList.add("slide-out-right");
            ref.current.removeEventListener("animationend", handleAnimationEnd);
            ref.current.addEventListener("animationend", handleAnimationEnd);
        } else if (animateTree === "left") {
            ref.current.classList.add("slide-out-left");
            ref.current.removeEventListener("animationend", handleAnimationEnd);
            ref.current.addEventListener("animationend", handleAnimationEnd);
        } else {
            // Reset any animation classes and remove event listener
            ref.current.classList.remove("slide-out-right", "slide-out-left");
            ref.current.removeEventListener("animationend", handleAnimationEnd);
        }

        return () => {
            ref.current?.removeEventListener("animationend", handleAnimationEnd);
        };
    }, [animateTree, swipeCount]);

    useEffect(() => {
        console.log(animationEndCounter);
    }, [animationEndCounter]);

    // Use useEffect to set the dimensions once they are available
    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            console.log(dimensions.width, dimensions.height);
            setDimensions(dimensions.width, dimensions.height);
        }
        console.log(ref.current);
    }, [dimensions, setDimensions]);

    return (
        <>
            <CoverImage
                src={Baum.src} // Replace with the actual path to your image
                mobileSrc={Baum.src} // Replace with the actual path to your image
                alt="Cover Background"
                position="absolute"
                height="251px" // Set the desired height of the background image
                width="169px"
                style={{ aspectRatio: "618 / 877" }}
                className="z-[-1]  top-0 w-[72vw] sm:w-[60vw] h-[auto] lg:w-[33vw] xl:h-[auto] 2xl:w-[58vh] 3xl:w-[40vw]"
                ref={ref}
                onLoadingComplete={(e) => {
                    console.log(e.clientWidth, e.clientHeight);
                    if (dimensions.width > 0 && dimensions.height > 0) {
                        console.log(dimensions.width, dimensions.height);
                        setDimensions(dimensions.width, dimensions.height);
                    }
                }}
            />
        </>
    );
};

export default BaumGraphic;
