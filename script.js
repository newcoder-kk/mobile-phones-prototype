import { CellPhone, phoneDirectory, IMEIset } from "./PhoneModules/CellPhone.js";
import { SmartPhone, INTERNET } from "./PhoneModules/SmartPhone.js";
import { AndroidPhone } from "./PhoneModules/AndroidPhone.js";
import { IPhone } from "./PhoneModules/IPhone.js";

//DUMMY FOR TESTING
const cellPhone1 = new CellPhone("Nokia 911", 64, 3500, 12, "1111111111");
const smartPhone1 = new SmartPhone("blackBerry 211", 128, 3000, 48, "4444444444", 4, "4444444441");
const androidPhone1 = new AndroidPhone("Galaxy S24", 128, 5000, 48, "7777777777", 8, null, 256);
const androidPhone2 = new AndroidPhone("Galaxy S23", 128, 5000, 48, "7777777778", 8, null, 256);
const IPhone1 = new IPhone("Iphone 16", 512, 5000, 50, "2323232323", 8, "7878787878", 256);
const IPhone2 = new IPhone("Iphone 15", 256, 5000, 50, "2323232324", 8, "7878787879", 256);


const typeSelection = document.getElementById("type-selection");
const phoneSelection = document.getElementById("phone-selection");
const actionSelection = document.getElementById("action-selection");
const cellPhoneArray = [cellPhone1];
const smartPhoneArray = [smartPhone1];
const androidPhoneArray = [androidPhone1, androidPhone2];
const IPhoneArray = [IPhone1, IPhone2];
const cellPhoneMethods = [
    ['cellPhoneDetails', 'Cell Phone Details'],
    ['addContact', 'Add Contact'],
    ['viewAllContacts', 'View All Contacts'],
    ['getContact', 'Get Contact'],
    ['updateContact', 'Update Contact'],
    ['deleteContact', 'Delete Contact'],
    ['makeVoiceCall', 'Make Voice Call'],
    ['viewAllVoiceCallRecord', 'View All Voice Call Records'],
    ['sendTextMessage', 'Send Text Message'],
    ['viewAllMessageRecord', 'View All Message Records'],
    ['changeSimNumber', 'Change Sim Number']
  ]
  
const smartPhoneMethods = [
    ['smartPhoneDetails', 'Smart Phone Details'],
    ['openApp', 'Open App'],
    ['viewAllApps', 'View All Apps'],
    ['saveDocument', 'Save Document'],
    ['deleteDocument', 'Delete Document'],
    ['getDocument', 'Get Document'],
    ['viewAllDocuments', 'View All Documents'],
    ['makeVideoCall', 'Make Video Call'],
    ['viewAllVideoCallRecords', 'View All Video Call Records'],
    ['accessTheInternet', 'Access The Internet'],
    ['changeSim2Number', 'Change Sim 2 Number']
  ]  
const androidPhoneMethods = [
    ['androidPhoneDetails', 'Android Phone Details'],
    ['changeSecurityPin', 'Change Security Pin'],
    ['unlockPhone', 'Unlock Phone'],
    ['lockPhone', 'Lock Phone'],
    ['bluetoothFileTransfer', 'Bluetooth File Transfer'],
    ['downloadApps', 'Download Apps'],
    ['uninstallApps', 'Uninstall Apps'],
    ['uploadDocumentToDrive', 'Upload Document To Drive'],
    ['downloadDocumentFromDrive', 'Download Document From Drive']
  ]
  
const IPhoneMethods = [
    ['IPhoneDetails', 'IPhone Details'],
    ['changeSecurityPin', 'Change Security Pin'],
    ['unlockPhone', 'Unlock Phone'],
    ['lockPhone', 'Lock Phone'],
    ['airdropTransfer', 'Airdrop Transfer'],
    ['downloadApps', 'Download Apps'],
    ['uninstallApps', 'Uninstall Apps'],
    ['uploadDocumentToDrive', 'Upload Document To Drive'],
    ['downloadDocumentFromDrive', 'Download Document From Drive']
  ]
  

//CELL PHONE FORMS
const createCellPhoneForm = document.getElementById("create-cell-phone");
const cellPhoneDetailsForm = document.getElementById("cellPhoneDetails");
const makeVoiceCallForm = document.getElementById("makeVoiceCall");
const sendTextMessageForm = document.getElementById("sendTextMessage");
const changeSimNumberForm = document.getElementById("changeSimNumber");
const addContactForm = document.getElementById("addContact");
const viewAllVoiceCallRecordForm = document.getElementById("viewAllVoiceCallRecord");
const viewAllMessageRecordForm = document.getElementById("viewAllMessageRecord");
const viewAllContactsForm = document.getElementById("viewAllContacts");
const getContactForm = document.getElementById("getContact");
const updateContactForm = document.getElementById("updateContact");
const deleteContactForm = document.getElementById("deleteContact");

// SMART PHONE FORMS
const createSmartPhoneForm = document.getElementById("create-smart-phone");
const smartPhoneDetailsForm = document.getElementById("smartPhoneDetails");
const makeVideoCallForm = document.getElementById("makeVideoCall");
const viewAllVideoCallRecords = document.getElementById("viewAllVideoCallRecords");
const accessTheInternetForm = document.getElementById("accessTheInternet");
const changeSim2NumberForm = document.getElementById("changeSim2Number");
const saveDocumentForm = document.getElementById("saveDocument");
const deleteDocumentForm = document.getElementById("deleteDocument");
const getDocumentForm = document.getElementById("getDocument");
const viewAllDocumentsForm = document.getElementById("viewAllDocuments");
const openAppForm  = document.getElementById("openApp");
const viewAllAppsForm = document.getElementById("viewAllApps");


// ANDROID PHONE FORMS
const createAndroidPhoneForm = document.getElementById("create-android-phone");
const androidPhoneDetailsForm = document.getElementById("androidPhoneDetails");
const changeSecurityPinForm = document.getElementById("changeSecurityPin");
const unlockPhoneForm = document.getElementById("unlockPhone");
const lockPhoneForm = document.getElementById("lockPhone");
const bluetoothFileTransferForm = document.getElementById("bluetoothFileTransfer");
const downloadAppsForm = document.getElementById("downloadApps");
const uninstallAppsForm = document.getElementById("uninstallApps");
const uploadDocumentToDriveForm = document.getElementById("uploadDocumentToDrive");
const downloadDocumentFromDriveFrom = document.getElementById("downloadDocumentFromDrive");


// IPHONE FORMS
const createIPhoneForm = document.getElementById("create-iphone");
const IPhoneDetailsForm = document.getElementById("IPhoneDetails");
const airdropTransferForm = document.getElementById("airdropTransfer");


function closeAllOpenForms(){
    const openForms = document.querySelectorAll(".right-panel form");
    Array.prototype.forEach.call(openForms, (ele)=>{
        ele.removeAttribute("showed");
    })
}

function eraseOpenFormTable(){
    const openForms = document.querySelectorAll(".right-panel form");
    Array.prototype.forEach.call(openForms, (ele)=>{
        if(ele.getAttribute("showed") !== null){
            const tableBody = document.querySelector("#"+ele.getAttribute("id")+" tbody");
            if(tableBody !== null){
                let innerHTMLString = tableBody.innerHTML;
                tableBody.innerHTML = innerHTMLString.split("</tr>")[0] + "</tr>";
            }
        }
    })
}

function eraseOpenFormSelects(){
    const openForms = document.querySelectorAll(".right-panel form");
    Array.prototype.forEach.call(openForms, (ele)=>{
        if(ele.getAttribute("showed") !== null){
            const selectBody = document.querySelector("#"+ele.getAttribute("id")+" select");
            if(tableBody !== null){
                tableBody.innerHTML = "";
            }
        }
    })
}

function populateInnerDocumentSelect(actionValue){
    const innerSelect = document.querySelector(`#${actionValue} select[tempId="document-name-select"]`);
    let innerHTMLString = "";
    innerSelect.innerHTML = innerHTMLString;
    // let innerHTMLString = `<option value="null">--No Selectipn--</option>`;
    let currPhone;
    if(typeSelection.value === "cellPhone") currPhone = cellPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "smartPhone") currPhone = smartPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "androidPhone") currPhone = androidPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "iPhone") currPhone = IPhoneArray[phoneSelection.value - 1];
    else{
        return;
    }
    try{
        currPhone.getAllDocumentNames().forEach((ele)=>{
            innerHTMLString += `<option value="${ele.name}">${ele.name}</option>`;
        })
        innerSelect.innerHTML = innerHTMLString;
    }
    catch(error){
        alert(error.message);
    }

}

function populateInnerPhoneSelect(actionValue, phoneType){
    const innerSelect = document.querySelector(`#${actionValue} select[tempId="phone-select"]`);
    let innerHTMLString = "";
    innerSelect.innerHTML = innerHTMLString;
    try{
        if(phoneType === "AndroidPhone"){
            androidPhoneArray.forEach((androidPhone, ind)=>{
                innerHTMLString += `<option value="${ind}">${androidPhone.getPhoneName()}</option>`;
            })
        }
        else if(phoneType === "IPhone"){
            IPhoneArray.forEach((IPhone, ind)=>{
                innerHTMLString += `<option value="${ind}">${IPhone.getPhoneName()}</option>`;
            })
        }
        innerSelect.innerHTML = innerHTMLString;
    }
    catch(error){
        alert(error.message);
    }

}

function populateInnerAppSelect(actionValue){
    const innerSelect = document.querySelector(`#${actionValue} select[tempId="app-name-select"]`);
    let innerHTMLString = "";
    innerSelect.innerHTML = innerHTMLString;

    // let innerHTMLString = `<option value="null">--No Selectipn--</option>`;
    let currPhone;
    if(typeSelection.value === "cellPhone") currPhone = cellPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "smartPhone") currPhone = smartPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "androidPhone") currPhone = androidPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "iPhone") currPhone = IPhoneArray[phoneSelection.value - 1];
    else{
        return;
    }
    try{
        currPhone.getAllAppNames().forEach((ele)=>{
            innerHTMLString += `<option value="${ele.name}">${ele.name}</option>`
        })
        innerSelect.innerHTML = innerHTMLString;
    }
    catch(error){
        alert(error.message);
    }
}

function populateInternetAppSelect(actionValue, phoneType){
    const innerSelect = document.querySelector(`#${actionValue} select[tempId="app-name-select"]`);
    let innerHTMLString = "";
    innerSelect.innerHTML = innerHTMLString;

    // let innerHTMLString = `<option value="null">--No Selectipn--</option>`;
    if(phoneType === "AndroidPhone"){
        INTERNET.com.google.play.Apps.forEach((key)=>{
            innerHTMLString += `<option value="${key.name}">${key.name}</option>`
        })
    }
    else if(phoneType === "IPhone"){
        INTERNET.com.apple.store.forEach((key)=>{
            innerHTMLString += `<option value="${key.name}">${key.name}</option>`
        })
    }
    innerSelect.innerHTML = innerHTMLString;
}

function populateInternetDocumentSelect(actionValue, driveProvider){
    const innerSelect = document.querySelector(`#${actionValue} select[tempId="document-name-select"]`);
    let innerHTMLString = "";
    innerSelect.innerHTML = innerHTMLString;

    INTERNET.com[driveProvider].drive.forEach((key)=>{
        innerHTMLString += `<option value="${key.name}">${key.name}</option>`
    })
    innerSelect.innerHTML = innerHTMLString;
}

function populatePhoneList(){
    let typeValue = typeSelection.value;
    let htmlString = `<option value="no-option" selected>-- no selection --</option>\n<option value="0">New Phone</option>\n`;
    actionSelection.setAttribute('disabled', "")
    phoneSelection.removeAttribute('disabled');
    // const openForms = document.querySelector(".right-panel form");
    eraseOpenFormTable();
    closeAllOpenForms();
    eraseOpenFormSelects();

    if(typeValue === 'cellPhone'){
        cellPhoneArray.forEach((obj, ind)=>{
            htmlString += `<option value="${ind+1}">${(ind+1)+". "+obj.getPhoneName()}</option>\n`
        })
    }
    else if(typeValue === 'smartPhone'){
        smartPhoneArray.forEach((obj, ind)=>{
            htmlString += `<option value="${ind+1}">${(ind+1)+". "+obj.getPhoneName()}</option>\n`
        })
    }
    else if(typeValue === 'androidPhone'){
        androidPhoneArray.forEach((obj, ind)=>{
            htmlString += `<option value="${ind+1}">${(ind+1)+". "+obj.getPhoneName()}</option>\n`
        })
    }
    else if(typeValue === 'iPhone'){
        IPhoneArray.forEach((obj, ind)=>{
            htmlString += `<option value="${ind+1}">${(ind+1)+". "+obj.getPhoneName()}</option>\n`
        })
    }
    else{
        phoneSelection.setAttribute("disabled", "");
        actionSelection.setAttribute("disabled", "");
    }
    phoneSelection.innerHTML = htmlString;
}
typeSelection.addEventListener("change", ()=> populatePhoneList());

phoneSelection.addEventListener("change", ()=>{
    let phoneValue = phoneSelection.value;
    let typeValue = typeSelection.value;
    let htmlString = `<option value="no-option" selected>-- no selection --</option>\n`;
    // console.log(phoneValue);
    actionSelection.removeAttribute("disabled")
    document.querySelector(".right-panel form").removeAttribute("showed");
    eraseOpenFormTable();
    closeAllOpenForms();
    eraseOpenFormSelects();

    if(phoneValue === '0'){
        htmlString += `<option value="createNewPhone">Create New Phone</option>\n`
    }
    else if(phoneValue !== "no-option"){
        if(typeValue === 'cellPhone'){
            htmlString += `<optgroup label="Cell Phone Features">`
            cellPhoneMethods.forEach((ele, ind)=>{
                htmlString += `<option value="${ele[0]}">${(ind+1)+". "+ele[1]}</option>\n`
            })
            htmlString += `</optgroup>`
        }
        else if(typeValue === 'smartPhone'){
            htmlString += `<optgroup label="Cell Phone Features">`
            cellPhoneMethods.forEach((ele, ind)=>{
                if(ele[0] !== 'cellPhoneDetails'){
                    htmlString += `<option value="${ele[0]}">${(ind)+". "+ele[1]}</option>\n`
                }
            })
            htmlString += `</optgroup>`
            htmlString += `<optgroup label="Smart Phone Features">`
            smartPhoneMethods.forEach((ele, ind)=>{
                htmlString += `<option value="${ele[0]}">${(ind+1)+". "+ele[1]}</option>\n`
            })
            htmlString += `</optgroup>`
        }
        else if(typeValue === 'androidPhone'){
            htmlString += `<optgroup label="Cell Phone Features">`
            cellPhoneMethods.forEach((ele, ind)=>{
                if(ele[0] !== 'cellPhoneDetails'){
                    htmlString += `<option value="${ele[0]}">${(ind)+". "+ele[1]}</option>\n`
                }
            })
            htmlString += `</optgroup>`
            htmlString += `<optgroup label="Smart Phone Features">`
            smartPhoneMethods.forEach((ele, ind)=>{
                if(ele[0] !== 'smartPhoneDetails'){
                    htmlString += `<option value="${ele[0]}">${(ind)+". "+ele[1]}</option>\n`;
                }
            })
            htmlString += `</optgroup>`
            htmlString += `<optgroup label="Android Phone Features">`
            androidPhoneMethods.forEach((ele, ind)=>{
                htmlString += `<option value="${ele[0]}">${(ind+1)+". "+ele[1]}</option>\n`
            })
            htmlString += `</optgroup>`
        }
        else if(typeValue === 'iPhone'){
            htmlString += `<optgroup label="Cell Phone Features">`
            cellPhoneMethods.forEach((ele, ind)=>{
                if(ele[0] !== 'cellPhoneDetails'){
                    htmlString += `<option value="${ele[0]}">${(ind)+". "+ele[1]}</option>\n`
                }
            })
            htmlString += `</optgroup>`
            htmlString += `<optgroup label="Smart Phone Features">`
            smartPhoneMethods.forEach((ele, ind)=>{
                if(ele[0] !== 'smartPhoneDetails'){
                    htmlString += `<option value="${ele[0]}">${(ind)+". "+ele[1]}</option>\n`
                }
            })
            htmlString += `</optgroup>`
            htmlString += `<optgroup label="IPhone Features">`
            IPhoneMethods.forEach((ele, ind)=>{
                htmlString += `<option value="${ele[0]}">${(ind+1)+". "+ele[1]}</option>\n`
            })
            htmlString += `</optgroup>`
        }
        else{
            actionSelection.setAttribute("disabled", "");
        }
    }
    actionSelection.innerHTML = htmlString;
})

actionSelection.addEventListener("change", ()=>{
    let typeValue = typeSelection.value;
    let phoneValue = phoneSelection.value;
    let actionValue = actionSelection.value;
    document.querySelector(".right-panel form").removeAttribute("showed");
    eraseOpenFormTable();
    closeAllOpenForms();
    eraseOpenFormSelects();

    if(phoneValue === "0" && actionValue === "createNewPhone"){
        if(typeValue === "cellPhone"){
            createCellPhoneForm.setAttribute("showed", "");
        }
        else if(typeValue === "smartPhone"){
            createSmartPhoneForm.setAttribute("showed", "");
        }
        else if(typeValue === 'androidPhone'){
            createAndroidPhoneForm.setAttribute("showed", "");
        }
        else if(typeValue === 'iPhone'){
            createIPhoneForm.setAttribute("showed", "");
        }
    }
    else if(actionValue === "no-option"){

    }
    else{
        const selectedForm = document.querySelector("#"+actionValue);
        if(selectedForm){
            if(actionValue === "deleteDocument" || 
                actionValue === "getDocument" || 
                actionValue === "bluetoothFileTransfer" ||
                actionValue === "uploadDocumentToDrive" ||
                actionValue === "airdropTransfer"){
                populateInnerDocumentSelect(actionValue);
            }
            if(actionValue === "openApp" ||
                actionValue === "uninstallApps"
            ){
                populateInnerAppSelect(actionValue);
            }
            if(actionValue === "bluetoothFileTransfer"){
                populateInnerPhoneSelect(actionValue, "AndroidPhone");
            }
            if(actionValue === "airdropTransfer"){
                populateInnerPhoneSelect(actionValue, "IPhone");
            }
            if(actionValue === "downloadApps"){
                if(typeValue === 'androidPhone') populateInternetAppSelect(actionValue, "AndroidPhone");
                else if(typeValue === 'iPhone') populateInternetAppSelect(actionValue, "IPhone");
            }
            if(actionValue === "downloadDocumentFromDrive"){
                populateInternetDocumentSelect(actionValue, "google");
            }
            selectedForm.setAttribute("showed", "");
        }
        else{
            document.querySelector("#featureNotAvailable").setAttribute("showed", "");
        }
    }
})

document.getElementById("drive-select-2").addEventListener("change", ()=>{
    const driveProvider = document.getElementById("drive-select-2").value;
    console.log(driveProvider);
    populateInternetDocumentSelect("downloadDocumentFromDrive", driveProvider);
})

const createPhoneSubmitHandler = function(event, constructor, phoneArray){
    event.preventDefault();
    const form = new FormData(event.target);
    const dataArray = [];
    for(let key of form.keys()){
        dataArray.push(form.get(key).trim(" ") === "" ? null : form.get(key).trim(" "));
    }
    let phoneObject;
    try{
        phoneObject = new constructor(...dataArray);
        console.log(phoneObject);
        phoneArray.push(phoneObject);
        event.target.reset();
        closeAllOpenForms();
        populatePhoneList();
        // actionSelection.setAttribute('disabled', "");
        alert(`Phone - ${phoneObject.getPhoneName()} Created`);
    }
    catch(err){
        alert(err.message);
    }
}

function onlyInputsFormsHandler(event){
    event.preventDefault();
    const currForm = event.target;
    if(currForm.getAttribute("showed") === null){
        return;
    }
    let currPhone;
    const currFormData = new FormData(currForm);
    if(typeSelection.value === "cellPhone") currPhone = cellPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "smartPhone") currPhone = smartPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "androidPhone") currPhone = androidPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "iPhone") currPhone = IPhoneArray[phoneSelection.value - 1];
    else{
        return;
    }
    const methodToCall = currForm.getAttribute("id");
    const paramArray = [];
    for(let key of currFormData.keys()){
        paramArray.push(currFormData.get(key).trim(" ") === "" ? null : currFormData.get(key).trim(" "));
    }
    if(typeSelection.value === "cellPhone"){
        if(methodToCall === "makeVoiceCall" || methodToCall === "sendTextMessage"){
            paramArray[paramArray.length - 1] = null;
        }
    }
    if(typeSelection.value === "androidPhone" && methodToCall === "bluetoothFileTransfer"){
        paramArray[0] = androidPhoneArray[paramArray[0]];
        // paramArray[1] = currPhone.getDocument(paramArray[1]);
    }
    if(typeSelection.value === "iPhone" && methodToCall === "airdropTransfer"){
        paramArray[0] = IPhoneArray[paramArray[0]];
        // paramArray[1] = currPhone.getDocument(paramArray[1]);
    }

    try{
        let result = currPhone[methodToCall](...paramArray);
        currForm.reset();
        closeAllOpenForms();
        // actionSelection.setAttribute('disabled', "");
        alert(`${result}`);
    }
    catch(err){
        alert(err.message);
    }
}

function inputAndOutputFormHandler(event){
    event.preventDefault();
    const currForm = event.target;
    if(currForm.getAttribute("showed") === null){
        return;
    }
    let currPhone;
    const currFormData = new FormData(currForm);

    if(typeSelection.value === "cellPhone") currPhone = cellPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "smartPhone") currPhone = smartPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "androidPhone") currPhone = androidPhoneArray[phoneSelection.value - 1];
    else if(typeSelection.value === "iPhone") currPhone = IPhoneArray[phoneSelection.value - 1];
    else{
        return;
    }
    const methodToCall = currForm.getAttribute("id");
    const paramArray = [];

    for(let key of currFormData.keys()){
        paramArray.push(currFormData.get(key).trim(" ") === "" ? null : currFormData.get(key).trim(" "));
    }

    try{
        let result = currPhone[methodToCall](...paramArray);
        const tableBody = document.querySelector("#"+methodToCall+" tbody");
        let innerHTMLString = tableBody.innerHTML;
        innerHTMLString = innerHTMLString.split("</tr>")[0] + "</tr>";

        result.forEach((obj)=>{
            innerHTMLString += "<tr>"
            for(let key in obj){
                if(obj.hasOwnProperty(key)){
                    innerHTMLString += "<td>"+obj[key]+"</td>";
                }   
            }
            innerHTMLString += "</tr>";
        })
        tableBody.innerHTML = innerHTMLString;
    }
    catch(err){
        alert(err.message);
    }
}

// CELL PHONE EVENT HANDLERS
createCellPhoneForm.addEventListener("submit", (event) => createPhoneSubmitHandler(event, CellPhone, cellPhoneArray));
cellPhoneDetailsForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
makeVoiceCallForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
sendTextMessageForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
changeSimNumberForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
addContactForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
viewAllVoiceCallRecordForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
viewAllMessageRecordForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
viewAllContactsForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
getContactForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
updateContactForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
deleteContactForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));

// SMART PHONE EVENT HANDLERS
createSmartPhoneForm.addEventListener("submit", (event) => createPhoneSubmitHandler(event, SmartPhone, smartPhoneArray));
smartPhoneDetailsForm.addEventListener("submit",  (event)=> inputAndOutputFormHandler(event));
makeVideoCallForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
viewAllVideoCallRecords.addEventListener("submit", event=> inputAndOutputFormHandler(event));
accessTheInternetForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
changeSim2NumberForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
saveDocumentForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
deleteDocumentForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
getDocumentForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
viewAllDocumentsForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
openAppForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
viewAllAppsForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));


// ANDROID PHONE EVENT HANDLERS
createAndroidPhoneForm.addEventListener("submit", (event) => createPhoneSubmitHandler(event, AndroidPhone, androidPhoneArray));
androidPhoneDetailsForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
changeSecurityPinForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
unlockPhoneForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
lockPhoneForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
bluetoothFileTransferForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
downloadAppsForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
uninstallAppsForm.addEventListener("submit", (event)=>  onlyInputsFormsHandler(event));
uploadDocumentToDriveForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
downloadDocumentFromDriveFrom.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));


// IPHONE EVENT HANDLERS
createIPhoneForm.addEventListener("submit", (event) => createPhoneSubmitHandler(event, IPhone, IPhoneArray));
airdropTransferForm.addEventListener("submit", (event)=> onlyInputsFormsHandler(event));
IPhoneDetailsForm.addEventListener("submit", (event)=> inputAndOutputFormHandler(event));
