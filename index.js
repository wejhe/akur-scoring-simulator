const Scores = {
    h1: "50",
    h2: "30",
    h3: "20",
    mh1: "40",
    mh2: "25",
    mh3: "15",
    m1: "35",
    m2: "23",
    m3: "12",
    l1: "25",
    l2: "15",
    l3: "10"
}

const itemsToUpdate = [
    111, 112, 113, 121, 122, 123, 131, 132, 133, 141, 142, 143, 151, 152, 153, 161, 162, 163, 171, 172, 173,
    211, 212, 213,
    311, 312, 313, 321, 322, 323, 331, 332, 333, 341, 342, 343, 351, 352, 353,
    411, 412, 413, 421, 422, 423,
    511, 512, 513, 521, 522, 523
]

const mandatoryItems = [
    12, 13, 16, 21, 33, 34, 41, 42, 52
]

const skorsToUpdate = [
    11, 12, 13, 14, 15, 16, 17,
    21,
    31, 32, 33, 34, 35,
    41, 42,
    51, 52
];


const finalScore = {
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    21: "",
    31: "",
    32: "",
    33: "",
    34: "",
    35: "",
    41: "",
    42: "",
    51: "",
    52: "",
}

function initialize() {
    itemsToUpdate.forEach(item => {
        statusChange(item.toString());
    })
}

function checkAll() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
    });
}

function uncheckAll() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
    });
}

function statusChange(itemNo) {
    const risk = document.getElementById("risk" + itemNo[0] + itemNo[1]).innerText;
    const activity = document.getElementById("activity" + itemNo).innerText;
    const status = document.getElementById("status" + itemNo).checked;
    let score = document.getElementById("temp" + itemNo);

    if (risk == "H") {
        if (activity == "1") {
            if (status == true) {
                score.innerText = Scores.h1;
            } else {
                score.innerText = parseInt(Scores.h1) / 2;
            }
        } else if (activity == "2") {
            if (status == true) {
                score.innerText = Scores.h2;
            } else {
                score.innerText = parseInt(Scores.h2) / 2;
            }
        } else if (activity == "3") {
            if (status == true) {
                score.innerText = Scores.h3;
            } else {
                score.innerText = parseInt(Scores.h3) / 2;
            }
        }
    } else if (risk == "MH") {
        if (activity == "1") {
            if (status == true) {
                score.innerText = Scores.mh1;
            } else {
                score.innerText = parseInt(Scores.mh1) / 2;
            }
        } else if (activity == "2") {
            if (status == true) {
                score.innerText = Scores.mh2;
            } else {
                score.innerText = parseInt(Scores.mh2) / 2;
            }
        } else if (activity == "3") {
            if (status == true) {
                score.innerText = Scores.mh3;
            } else {
                score.innerText = parseInt(Scores.mh3) / 2;
            }
        }
    } else if (risk == "M") {
        if (activity == "1") {
            if (status == true) {
                score.innerText = Scores.m1;
            } else {
                score.innerText = parseInt(Scores.m1) / 2;
            }
        } else if (activity == "2") {
            if (status == true) {
                score.innerText = Scores.m2;
            } else {
                score.innerText = parseInt(Scores.m2) / 2;
            }
        } else if (activity == "3") {
            if (status == true) {
                score.innerText = Scores.m3;
            } else {
                score.innerText = parseInt(Scores.m3) / 2;
            }
        }
    } else if (risk == "L") {
        if (activity == "1") {
            if (status == true) {
                score.innerText = Scores.l1;
            } else {
                score.innerText = parseInt(Scores.l1) / 2;
            }
        } else if (activity == "2") {
            if (status == true) {
                score.innerText = Scores.l2;
            } else {
                score.innerText = parseInt(Scores.l2) / 2;
            }
        } else if (activity == "3") {
            if (status == true) {
                score.innerText = Scores.l3;
            } else {
                score.innerText = parseInt(Scores.l3) / 2;
            }
        }
    }

    const status1 = document.getElementById("status" + itemNo[0] + itemNo[1] + "1").checked;
    const status2 = document.getElementById("status" + itemNo[0] + itemNo[1] + "2").checked;
    const status3 = document.getElementById("status" + itemNo[0] + itemNo[1] + "3").checked;
    const bukti = document.getElementById("bukti" + itemNo[0] + itemNo[1]);

    if (mandatoryItems.includes(parseInt(itemNo[0] + itemNo[1]))) {
        if (status1 == true || status2 == true || status3 == true) {
            bukti.removeAttribute("hidden");
        } else {
            bukti.setAttribute("hidden", true);
        }
    }

    const score1 = document.getElementById("temp" + itemNo[0] + itemNo[1] + "1").innerText;
    const score2 = document.getElementById("temp" + itemNo[0] + itemNo[1] + "2").innerText;
    const score3 = document.getElementById("temp" + itemNo[0] + itemNo[1] + "3").innerText;
    let final = document.getElementById("final" + itemNo[0] + itemNo[1]);

    final.innerText = parseFloat(score1) + parseFloat(score2) + parseFloat(score3);
    finalScore[itemNo[0] + itemNo[1]] = parseFloat(score1) + parseFloat(score2) + parseFloat(score3);

    buktiChange(itemNo[0] + itemNo[1]);
}

function buktiChange(itemNo) {
    let final = document.getElementById("final" + itemNo[0] + itemNo[1]);

    if (document.getElementById("bukti" + itemNo).hasAttribute("hidden")) {
        final.innerText = finalScore[itemNo];
    } else {
        const selected = document.getElementById("bukti" + itemNo).value;
        final.innerText = finalScore[itemNo] * parseInt(selected) / 100;
    }

    updateSkor();
}

function updateSkor() {
    let result = 0;
    skorsToUpdate.forEach(skor => {
        let finalSkor = document.getElementById("final" + skor).innerText;
        result += parseFloat(finalSkor);
    })
    document.getElementById("skorAkhir").innerText = result;
    const percent = Math.floor((result - 565) / (1130 - 565) * 100);
    document.getElementById("persentase").innerText = percent;
    const profilRisiko = document.getElementById("profilRisiko");
    if (result >= 1008 && result <= 1130) {
        profilRisiko.innerText = "SANGAT BAIK"; //3M 1LM
    } else if (result >= 915 && result < 1008) {
        profilRisiko.innerText = "BAIK"; //1MH 5M
    } else if (result >= 810 && result < 915) {
        profilRisiko.innerText = "CUKUP BAIK"; //1MH 8M
    } else if (result >= 702.5 && result < 810) {
        profilRisiko.innerText = "TIDAK BAIK"; //Batas if all Tidak Koheren
    } else if (result >= 565 && result < 702.5) {
        profilRisiko.innerText = "BURUK"; //sisa bawah
    }
}