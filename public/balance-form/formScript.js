// inputs
const inpUserId = document.querySelector("#inp-userid");
const inpBatchNo = document.querySelector("#inp-batchno");
const inpWaterDensity = document.querySelector("#inp-waterdensity");
const inpEquipment = document.querySelector("#inp-equipment");
const inpVolume = document.querySelector("#inp-volume");

// span errors
const idError = document.querySelector("#error-id");
const batchError = document.querySelector("#error-batch");
const densityError = document.querySelector("#error-density");
const equipError = document.querySelector("#error-equipment");
const volumeError = document.querySelector("#error-volume");

const balanceForm = document.querySelector("#balance-form");

const btnSaveData = document.querySelector("#btn-save-data");

let userId = "",
    batchNo = "",
    waterDensity = "",
    equipment = "",
    volume = "",
    form;

balanceForm.addEventListener("change", (e) => {
    userId = inpUserId.value;
    batchNo = inpBatchNo.value;
    waterDensity = inpWaterDensity.value;
    equipment = inpEquipment.value;
    volume = inpVolume.value;

    form = {
        userId,
        batchNo,
        waterDensity,
        equipment,
        volume,
    }
    // window.location = "/balance-table";
})

btnSaveData.addEventListener("click", (e) => {
    e.preventDefault();

    idError.textContent = ""
    batchError.textContent = ""
    densityError.textContent = ""
    equipError.textContent = ""
    volumeError.textContent = "";

    if (userId.length !== 8) return idError.textContent = "Por favor, verifique o ID inserido";
    if (batchNo <= 0 || batchNo === "") return batchError.textContent = "Número do lote deve ser maior que zero";
    if (waterDensity <= 0 || waterDensity === "") return densityError.textContent = "Densidade da água deve ser maior que zero";
    if (equipment === "") return equipError.textContent = "Um equipamento deve ser selecionado";
    if (volume === "") return volumeError.textContent = "Um volume deve ser selecionado";

    console.log("you're good to go");
    console.log(form);

})