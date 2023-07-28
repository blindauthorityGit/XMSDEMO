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
const baumstumpfHeight = 0.1512;

const showGoal = false;
const goalSum = 1000;
const goalStep = 1000;

// IMAGES
const maxSize = 1; // in MB

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
};
