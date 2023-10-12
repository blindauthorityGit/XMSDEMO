import React from "react";
import Image from "next/image";
//COMPS
import { CoverImage } from "../images";

//ASSETS
import BG from "../../assets/bg1.svg";
import BGMobile from "../../assets/bgMobile1.svg";

const BGDesktop = () => {
    return (
        <CoverImage
            src={BG.src} // Replace with the actual path to your image
            mobileSrc={BGMobile.src}
            alt="Cover Background"
        />
    );
};

export default BGDesktop;
