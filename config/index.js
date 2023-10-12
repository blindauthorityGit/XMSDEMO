// Import the SVG images from your assets folder
import Bob from "../assets/bob.svg";
import Jessy from "../assets/jessy.svg";
import Mika from "../assets/mika.svg";
import Jerome from "../assets/jerome.svg";

// Define the array of images
const avatars = [Bob, Jessy, Mika, Jerome];

const colors = {
    background: "#fff",
    primaryColor: "#7d866f",
    bgColors: ["#870F3B", "#335381", "#F26522", "#EC008C", "#FFF200"],
    kugeln: [
        {
            kugel1: "#EB4511",
        },
        {
            kugel2: "#DCDFDC",
        },
        {
            kugel3: "#000000",
        },
        {
            kugel4: "#fff",
        },
    ],
    baum: "#04151F",
};

const bgColors = ["#033F63", "#AF4D98", "#FF4A1C", "#CC3363", "#0197F6"];

const startInfo = {
    headline: "Spenden Sie Hoffnung!",
    subline: "Lorem ipsum dolor sit amet delurum omes bubu",
    buttonText: "Jetzt spenden",
};

const anzahlRows = 14;
const anzahlBaumKugeln = 75;

//BAUMSTUMPF HÖHE % (Baumstumpf / gesamthöhe)
const baumstumpfHeight = 0.147;

const showGoal = false;
const goalSum = 10000;
const goalStep = 10000;

// IMAGES
const maxSize = 5; // in MB

const dev = false;
const local = false;

export {
    colors,
    goalStep,
    baumstumpfHeight,
    anzahlRows,
    startInfo,
    goalSum,
    showGoal,
    dev,
    anzahlBaumKugeln,
    local,
    maxSize,
    bgColors,
    avatars,
};
