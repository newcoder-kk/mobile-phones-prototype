import { SmartPhone , INTERNET} from "./SmartPhone.js";

class AndroidPhone extends SmartPhone{
    #GPS = true;
    #extStorage = 0;
    #securityPin = null;
    #unlocked = false;
    screenCapturesNumber = 0;
    constructor(name, storage, battery, camera, sim, RAM, sim2 = null, extStorage = null){
        super(name, storage, battery, camera, sim, RAM, sim2);
        this.updateOS("Android");
        if(extStorage){
            this.#extStorage = extStorage;
        }
        this.#unlocked = true;
        this.setType("ANDROID_PHONE");
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
            // call : (target, thisArg, argList) => {
            //     if(target === "changeSecurityPin") return Reflect.apply(target, thisArg, argList);
            //     if(target === "lockPhone") return Reflect.apply(target, thisArg, argList); 
            //     if(target === "unlockPhone") return Reflect.apply(target, thisArg, argList);
            //     if(this.isUnlocked()){
            //         return Reflect.apply(target ,thisArg, argList)
            //     }
            //     else console.log("Unlock the phone to perform task");
            // }
        })
    }

    isUnlocked(){
        return this.#unlocked;
    }

    androidPhoneDetails() {
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
            { property: "Touch Interface", value: "Yes"},
            // { property: "GPS", value: this.#GPS ? "Enabled" : "Disabled" },
            { property: "External Storage", value: this.#extStorage > 0 ? `${this.#extStorage} GB` : "Not Available" },
            { property: "Security Pin", value: this.#securityPin ? "Set" : "Not Set" },
            { property: "Unlocked", value: this.#unlocked ? "Yes" : "No" },
        ];
    
        console.log("Android Phone Details:", details);
        return details;
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

    screenCapture(){
        // if(this.#unlocked){
            console.log("Screen Captured");
            this.addPhotos("Screen_Capture - "+(this.screenCapturesNumber + 1));
            this.screenCapturesNumber++;
            return "Screen Captured";
        // }
        // else console.log("Unlock the phone to perform task");
    }

    bluetoothFileTransfer(receiverPhone, documentName){
        // if(this.#unlocked){
            const document = this.getDocument(documentName)[0];
            if(receiverPhone.getIMEI() === this.getIMEI()){
                console.error("Self transfer in bluetooth is not possible");
                throw new Error("Self transfer in bluetooth is not possible")
                return;
            }
            if(receiverPhone.getType() === 'ANDROID_PHONE' && document){
                receiverPhone.saveDocument(documentName, document.content);
                return "Bluetooth file transfer completed";
            }
            else if(receiverPhone.getType() === 'ANDROID_PHONE'){
                console.error("File not found in the phone");
                throw new Error("File not found in the phone");
            }
            else if(document){
                console.error("Bluetooth transfer can only be done between android phones");
                throw new Error("Bluetooth transfer can only be done between android phones");
            }
        // }
        // else console.log("Unlock the phone to perform task");
    }

    downloadApps(appName){
        // if(this.#unlocked){
            if(this.hasApp(appName)){
                console.log("App Already exist in your phone");
                return "App Already exist in your phone";
            }
            else{
                const fetchApp = INTERNET.com.google.play.Apps.get(appName);
                if(fetchApp === undefined){
                    console.error("App not found in Google play store");
                    throw new Error("App not found in Google play store")
                }
                else{
                    console.log(fetchApp.name + " App Installed..");
                    this.saveApp(fetchApp);
                    return fetchApp.name + " App Installed.."
                }
            }
        // }
        // else console.log("Unlock the phone to perform task");
    }

    uninstallApps(appName){
        // if(this.#unlocked){
        return this.deleteApp(appName);
        // }
        // else console.log("Unlock the phone to perform task");
    }

    uploadDocumentToDrive(documentName, driveProvider){
        // if(this.#unlocked){
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
        // }
        // else console.log("Unlock the phone to perform task");
    } 

    downloadDocumentFromDrive(driveProvider, documentName){
        // if(this.#unlocked){
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
        // }
        // else console.log("Unlock the phone to perform task");
    }
}

export { AndroidPhone };