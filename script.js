let patients = [];
// add event listener to form to read file with papa parser module
const form = document.forms[0];

form.addEventListener("submit", event => {
    event.preventDefault();
    const file = event.target.files.files[0];
    console.log({ file })
    Papa.parse(file, {
        header: true,
        complete: function(results) {
            // iterate through each row and save patient's record in object containing the patient id and rx code for med taken
            results.data.forEach(row => {
                const { CODE, PATIENT } = row;
                const record = patients.find(patient => patient.id === PATIENT);
                if (!record) {
                    const newRecord = { id: PATIENT, medCode: [CODE] };
                    patients.push(newRecord);

                } else {
                    record.medCode.push(CODE)
                }
            });
            console.log({ patients });
            // initialize a variable that count the number of pt with drug interactions
            const number = numberOfPtWithDrugInteraction(patients);
            console.log(`Number of patients taking medications with drug interactions: ${number}`);

        }
    });
})


//  call the api for to check drug interaction.

async function checkDrugInteraction(rxCodes) {
    let interaction = await fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxCodes.join('+')}`)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data.fullInteractionTypeGroup)
            if (data.fullInteractionTypeGroup && data.fullInteractionTypeGroup.length > 0) {
                return true
            }
            return false
        })
        .catch(error => "")
    return interaction
};

// function to find the number of patients take a med with drug interactions

function numberOfPtWithDrugInteraction(patients, number = 0) {
    patients.forEach(patient => {
        const interaction = checkDrugInteraction(patient.medCode)
        if (interaction) {
            number += 1;
        } else {
            console.log({ patient })
        }
    });
    return number;
}