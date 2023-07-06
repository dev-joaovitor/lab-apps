// inputs
const inpUserId = document.querySelector("#inp-userid");
const inpBatchNo = document.querySelector("#inp-batchno");
const inpWaterDensity = document.querySelector("#inp-waterdensity");
      inpWaterDensity.value = 0.998;
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

const formCookie = document.cookie.split("=");
let form = {};

// read cookies
if (formCookie[0] === "form") {
    form = JSON.parse(decodeURIComponent(formCookie[1]));
    const { userId, batchNo, waterDensity, equipment, nominalVolume } = form;

    [
     inpUserId.value, inpBatchNo.value, inpWaterDensity.value,
     inpEquipment.value, inpVolume.value
    ] = [
        userId, batchNo, waterDensity,
        equipment, nominalVolume
    ]
}

balanceForm.addEventListener("change", () => {
    form = {
        userId:        parseInt(inpUserId.value),
        batchNo:       parseInt(inpBatchNo.value),
        waterDensity:  parseFloat(inpWaterDensity.value),
        equipment:     inpEquipment.value,
        nominalVolume: parseInt(inpVolume.value),
    }
})

btnSaveData.addEventListener("click", async (e) => {
    e.preventDefault();

    idError.textContent = "";
    batchError.textContent = "";
    densityError.textContent = "";
    equipError.textContent = "";
    volumeError.textContent = "";

    const response = await fetch("/api/store-form", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form)
    });

    const res = await response.json();

    console.log(res);

    if (res.error === 1) return idError.textContent = "Verifique o ID inserido";
    if (res.error === 2) return batchError.textContent = "Verifique o número do lote";
    if (res.error === 3) return densityError.textContent = "Verifique a densidade inserida";
    if (res.error === 4) return equipError.textContent = "Um equipamento deve ser selecionado";
    if (res.error === 5) return volumeError.textContent = "Um volume deve ser selecionado";
    
    if (res.message === "success") window.location = "/balance-table";
})