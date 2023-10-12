import React from "react";
//TYPO
import { H2, P } from "../../typography";

import Logo from "../../../assets/logoFull.svg";

const Info = () => {
    return (
        <div width=" grid grid-cols-12 relative h-full bg-white">
            <div className="col-span-12 p-4 lg:pt-4 xl:pt-10 sm:pt-4  lg:p-10 bg-white">
                <H2>SPENDEN, DEKORIEREN, HOFFNUNG SCHENKEN</H2>
                <div className="mb-6 xl:mb-8"></div>
                <P>
                    Willkommen auf unserer Spendenplattform zur Weihnachtszeit, wo der Geist der Großzügigkeit auf die
                    Magie der Saison trifft. Mit unserer einzigartigen Web-App haben Sie die Möglichkeit, einen
                    Unterschied zu bewirken, der ebenso persönlich wie bedeutsam ist. Sie wählen die
                    Wohltätigkeitsorganisation aus, die Ihr Herz berührt, und wir gestalten einen wunderschönen
                    virtuellen Weihnachtsbaum nur für Sie.
                </P>
                <div className="mb-4 xl:mb-66"></div>
                <P>
                    Dann laden Sie Besucher ein, Ihren Baum mit digitalen Ornamenten zu schmücken, die ihre Spenden
                    repräsentieren. Es ist eine herzerwärmende Möglichkeit, Ihre Gemeinschaft zusammenzubringen, die
                    Saison zu feiern und echte Wirkung für die Anliegen zu erzielen, die Ihnen am Herzen liegen.
                    Schließen Sie sich uns an und verbreiten Sie Freude, Ornament für Ornament.{" "}
                </P>
                <div className="mb-4 xl:mb-66"></div>
                <P>
                    <span className="font-bold">Sabocon GmbH</span>
                    <br />
                    Alte Bogengasse 23<br></br>
                    63303 Dreieich
                    <br></br>
                    <br></br>
                    <a
                        className="font-semibold underline hover:opacity-70"
                        href="https://xmsdonate.de/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        www.xmsdonate.de
                    </a>
                    <br></br>
                    <a className="font-semibold underline hover:opacity-70" href="mailto:contact@sabocon.com">
                        contact@sabocon.com
                    </a>
                </P>
                <div className="mb-4 xl:mb-66"></div>

                <div className="mb-4 xl:mb-66"></div>
                <P>
                    <span className="font-bold">Design & Umsetzung</span>
                    <br />
                    <a
                        className="font-semibold underline hover:opacity-70"
                        href="https://www.sabocon.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Sabocon GmbH
                    </a>
                </P>
                {/* <img src={Logo.src} className="mt-6" alt="" /> */}
            </div>
        </div>
    );
};

export default Info;
