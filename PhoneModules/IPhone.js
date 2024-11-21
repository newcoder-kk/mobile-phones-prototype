import { SmartPhone , INTERNET} from "./SmartPhone.js";

class IPhone extends SmartPhone{
    #GPS = true;
    #securityPin = null;
    #unlocked = false;
    screenCapturesNumber = 0;
    constructor(name, storage, battery, camera, sim, RAM, sim2 = null){
        super(name, storage, battery, camera, sim, RAM, sim2);
        this.updateOS("iOS");
        this.#unlocked = true;
        this.setType("IPHONE");
        return new Proxy(this, {
            get(target, prop, receiver) {
                if(prop === "changeSecurityPin" || prop === "lockPhone" || prop === "unlockPhone" || prop === "isUnlocked"){
                    const value = target[prop];
                    return function (...args) {
                        return value.apply(this === receiver ? target : this, args);
                    };
                }
                else if(target.isUnlocked()){
                    const value = target[prop];
                    if (value instanceof Function) {
                      return function (...args) {
                        return value.apply(this === receiver ? target : this, args);
                      };
                    }
                    return value;
                }
                else{
                    console.error("Unlock the phone to do the process");
                    throw new Error("Unlock the phone to do the process");
                    return null;
                }
            },
        })
    }

    isUnlocked(){
        return this.#unlocked;
    }

    changeSecurityPin(newPin, oldPin = null){
        if(oldPin === this.#securityPin){
            this.#securityPin = newPin;
            console.log("Pin changed successfully");
            return "Pin changed successfully";
        }
        else{
            console.error("Incorrect Pin");
            throw new Error("Incorrect Pin");
        }
    }

    unlockPhone(currPin = null){
        if(this.#securityPin === currPin){
            this.#unlocked = true;
            console.log("Phone unlocked");
            return "Phone Unlocked"
        }
        else{
            console.error("Incorrect Pin");
            throw new Error("Incorrect Pin");
        }
    }

    lockPhone(){
        this.#unlocked = false;
        console.log("Phone locked");
        return "Phone Locked";
    }

    IPhoneDetails() {
        const details = [
            { property: "IMEI", value: this.getIMEI() },
            { property: "Name", value: this.getPhoneName() },
            { property: "Type", value: this.getType() },
            { property: "OS", value: this.getOS() },
            { property: "Storage", value: `${this.getStorageCapacity()} GB` },
            { property: "Battery", value: `${this.getBatteryCapacity()} mAh` },
            { property: "Camera", value: `${this.getCameraSpecification()} MP` },
            { property: "SIM 1 Number", value: this.getSimNumber() },
            { property: "SIM 2 Number", value: this.getSim2Number() || "Not Available" },
            { property: "RAM", value: `${this.getRAM()} GB` },
            { property: "Touch Interface", value: "Yes" },
            { property: "GPS", value: this.#GPS ? "Enabled" : "Disabled" },
            { property: "Security Pin", value: this.#securityPin ? "Set" : "Not Set" },
            { property: "Unlocked", value: this.#unlocked ? "Yes" : "No" },
        ];
    
        console.log("iPhone Details:", details);
        return details;
    }
    
    screenCapture(){
        console.log("Screen Captured");
        this.addPhotos("Screen_Capture - "+(this.screenCapturesNumber + 1));
        this.screenCapturesNumber++;
        return "Screen Captured";
    }

    airdropTransfer(receiverPhone, documentName){
        const document = this.getDocument(documentName)[0];
        if(receiverPhone.getIMEI() === this.getIMEI()){
            console.error("Self transfer in Airdrop is not possible");
            throw new Error("Self transfer in Airdrop is not possible")
            return;
        }
        if(receiverPhone.getType() === 'IPHONE' && document){
            receiverPhone.saveDocument(documentName, document.content);
            return "Airdrop file transfer completed";
        }
        else if(receiverPhone.getType() === 'IPHONE'){
            console.error("File not found in the Iphone");
            throw new Error("File not found in the Iphone");
        }
        else if(document){
            console.error("Airdrop transfer can only be done between Iphones");
            throw new Error("Airdrop transfer can only be done between Iphones");
        }
    }

    downloadApps(appName){
        if(this.#unlocked){
            if(this.hasApp(appName)){
                console.log("App Already exist in your Iphone");
                return "App Already exist in your Iphone";
            }
            else{
                const fetchApp = INTERNET.com.apple.store.get(appName);
                if(fetchApp === undefined){
                    console.error("App not found in Apple store");
                    throw new Error("App not found in Apple store");
                }
                else{
                    console.log(fetchApp.name + " App Installed..");
                    this.saveApp(fetchApp);
                    return fetchApp.name + " App Installed..";
                }
            }
        }
        else console.log("Unlock the Iphone to perform task");
    }

    uninstallApps(appName){
        return this.deleteApp(appName);
    }

    uploadDocumentToDrive(documentName, driveProvider){
        const document = this.getDocument(documentName)[0];
        const driveAccess = INTERNET.com[driveProvider];
        if(document && driveAccess){
            driveAccess.drive.set(documentName, document);
            console.log("File uploaded into the Drive");
            return "File uploaded into the Drive";
        }
        else if(driveAccess){
            console.error("No such file exist to upload");
            throw new Error("No such file exist to upload")
        }
        else if(document){
            console.error("Incorrect Drive provider");
            throw new Error("Incorrect Drive provider");
        }
    } 

    downloadDocumentFromDrive(driveProvider, documentName){
        const driveAccess = INTERNET.com[driveProvider];
        if(driveAccess){
            let document = driveAccess.drive.get(documentName);
            if(document){
                this.saveDocument(documentName, document);
                console.log("Document saved from drive successfully");
                return "Document saved from drive successfully";
            }
            else{
                console.error("Document not found in the drive");
                throw new Error("Document not found in the drive");
            }
        }
        else{
            console.error("Incorrect Drive provider");
            throw new Error("Incorrect Drive provider");
        }
    }
}

export { IPhone };