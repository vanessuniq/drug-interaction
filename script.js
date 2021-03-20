let patients = [];
// add event listener to form to read file with papa parser module
const form = document.forms[0];

form.addEventListener("submit", event => {
    event.preventDefault();
    const file = event.target.files.files[0];
    console.log({ file })
    Papa.parse(file, {
        header: true,
        complete: async function(results) {
            // iterate through each row and save patient's record in object containing the patient id and rx code for med taken
            results.data.forEach(row => {
                const { CODE, PATIENT } = row;
                const record = patients.find(patient => patient.id === PATIENT);
                if (!record) {
                    const newRecord = { id: PATIENT, medCode: [CODE] };
                    patients.push(newRecord);

                } else {
                    const existingCode = record.medCode.find(code => code === CODE);
                    if (!existingCode) {
                        record.medCode.push(CODE)
                    }

                }
            });
            console.log({ patients });
            // initialize a variable that count the number of pt with drug interactions
            const number = await numberOfPtWithDrugInteraction(patients);
            console.log(`Number of patients taking medications with drug interactions: ${number}`);

        }
    });
})


//  call the api for to check drug interaction.

// function to find the number of patients take a med with drug interactions

async function numberOfPtWithDrugInteraction(patients, number = 0) {

    for (const patient of patients) {
        const interactions = await fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${patient.medCode.join('+')}`)
            .then(resp => resp.json()).catch(error => "");
        if (interactions.fullInteractionTypeGroup && interactions.fullInteractionTypeGroup.length > 0) {
            number++
        }
    }
    console.log({ number })
    return number;
}