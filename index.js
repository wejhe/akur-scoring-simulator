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

    if (status === true) {
        score.innerText = 1;
    } else {
        score.innerText = 0;
    }

    const status1 = document.getElementById("status" + itemNo[0] + itemNo[1] + "1").checked;
    const status2 = document.getElementById("status" + itemNo[0] + itemNo[1] + "2").checked;
    const status3 = document.getElementById("status" + itemNo[0] + itemNo[1] + "3").checked;
    const bukti = document.getElementById("bukti" + itemNo[0] + itemNo[1]);

    //if (mandatoryItems.includes(parseInt(itemNo[0] + itemNo[1]))) {
        if (status1 == true || status2 == true || status3 == true) {
            bukti.removeAttribute("hidden");
        } else {
            bukti.setAttribute("hidden", true);
        }
    //}

    const score1 = document.getElementById("temp" + itemNo[0] + itemNo[1] + "1").innerText;
    const score2 = document.getElementById("temp" + itemNo[0] + itemNo[1] + "2").innerText;
    const score3 = document.getElementById("temp" + itemNo[0] + itemNo[1] + "3").innerText;
    const scoresArr = [score1, score2, score3];
    let final = document.getElementById("final" + itemNo[0] + itemNo[1]);

    if (scoresArr.includes("0")) {
        final.innerText = "0";
        finalScore[itemNo[0] + itemNo[1]] = "0";
    } else {
        final.innerText = "1";
        finalScore[itemNo[0] + itemNo[1]] = "1";
    }

    //final.innerText = parseFloat(score1) + parseFloat(score2) + parseFloat(score3);
    //finalScore[itemNo[0] + itemNo[1]] = parseFloat(score1) + parseFloat(score2) + parseFloat(score3);

    buktiChange(itemNo[0] + itemNo[1]);
}

function buktiChange(itemNo) {
    let final = document.getElementById("final" + itemNo[0] + itemNo[1]);

    if (document.getElementById("bukti" + itemNo).hasAttribute("hidden")) {
        final.innerText = finalScore[itemNo];
    } else {
        const selected = document.getElementById("bukti" + itemNo).value;
        if (selected === "25") {
            final.innerText = "0";
            finalScore[itemNo[0] + itemNo[1]] = "0";
        } else {
            final.innerText = "1";
            finalScore[itemNo[0] + itemNo[1]] = "1";
        }
    }

    updateSkor();
}

function updateSkor() {
    let resultH = 0;
    let resultMH = 0;
    let resultM = 0;
    let resultLM = 0;
    let resultL = 0;

    skorsToUpdate.forEach(skor => {
        let finalSkor = document.getElementById("final" + skor).innerText;
        let risk = document.getElementById("risk" + skor).innerText;

        if (finalSkor === "0") {
            if (risk === "H") {
                resultH++;
            } else if (risk === "MH") {
                resultMH++;
            } else if (risk === "M") {
                resultM++;
            } else if (risk === "LM") {
                resultLM++;
            } else if (risk === "L") {
                resultL++;
            }
        }
    })

    document.getElementById("temuan").innerHTML = `${resultH} H<br>${resultMH} MH<br>${resultM} M<br>${resultLM} LM<br>${resultL} L`;

    const kategori = document.getElementById("kategori").value;

    let riskProfile = [];

    if (kategori === "besar") {
        if (resultH > 0) {
            riskProfile.push(1);
        } else {
            riskProfile.push(5);
        }

        if (resultMH === 0) {
            riskProfile.push(5);
        } else if (resultMH === 1) {
            riskProfile.push(4);
        } else if (resultMH === 2) {
            riskProfile.push(3);
        } else if (resultMH === 3) {
            riskProfile.push(2);
        } else if (resultMH >= 4) {
            riskProfile.push(1);
        }

        if (resultM <= 3) {
            riskProfile.push(5);
        } else if (resultM === 4) {
            riskProfile.push(4);
        } else if (resultM === 5) {
            riskProfile.push(3);
        } else if (resultM === 6) {
            riskProfile.push(2);
        } else if (resultM >= 7) {
            riskProfile.push(1);
        }

        if (resultLM <= 6) {
            riskProfile.push(5);
        } else if (resultLM === 7) {
            riskProfile.push(4);
        } else if (resultLM === 8) {
            riskProfile.push(3);
        } else if (resultLM === 9) {
            riskProfile.push(2);
        } else if (resultLM >= 10) {
            riskProfile.push(1);
        }

        if (resultL <= 4) {
            riskProfile.push(5);
        } else if (resultL === 5) {
            riskProfile.push(4);
        } else if (resultL === 6) {
            riskProfile.push(3);
        } else if (resultL === 7) {
            riskProfile.push(2);
        } else if (resultL >= 8) {
            riskProfile.push(1);
        }
    } else if (kategori === "kecil") {
        if (resultH > 0) {
            riskProfile.push(1);
        }

        if (resultMH === 0) {
            riskProfile.push(5);
        } else if (resultMH === 1) {
            riskProfile.push(3);
        } else if (resultMH === 2) {
            riskProfile.push(2);
        } else if (resultMH >= 3) {
            riskProfile.push(1);
        }

        if (resultM <= 2) {
            riskProfile.push(5);
        } else if (resultM === 3) {
            riskProfile.push(4);
        } else if (resultM === 4) {
            riskProfile.push(3);
        } else if (resultM === 5) {
            riskProfile.push(2);
        } else if (resultM >= 6) {
            riskProfile.push(1);
        }

        if (resultLM <= 4) {
            riskProfile.push(5);
        } else if (resultLM === 5) {
            riskProfile.push(4);
        } else if (resultLM === 6) {
            riskProfile.push(3);
        } else if (resultLM === 7) {
            riskProfile.push(2);
        } else if (resultLM >= 8) {
            riskProfile.push(1);
        }

        if (resultL <= 4) {
            riskProfile.push(5);
        } else if (resultL === 5) {
            riskProfile.push(4);
        } else if (resultL === 6) {
            riskProfile.push(3);
        } else if (resultL === 7) {
            riskProfile.push(2);
        } else if (resultL >= 8) {
            riskProfile.push(1);
        }
    }

    riskProfile.sort();

    const profilRisiko = document.getElementById("profilRisiko");

    if (riskProfile[0] === 5) {
        profilRisiko.innerText = "SANGAT BAIK";
    } else if (riskProfile[0] === 4) {
        profilRisiko.innerText = "BAIK";
    } else if (riskProfile[0] === 3) {
        profilRisiko.innerText = "CUKUP BAIK";
    } else if (riskProfile[0] === 2) {
        profilRisiko.innerText = "KURANG BAIK";
    } else if (riskProfile[0] === 1) {
        profilRisiko.innerText = "TIDAK BAIK";
    }

    /*skorsToUpdate.forEach(skor => {
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
    }*/
}