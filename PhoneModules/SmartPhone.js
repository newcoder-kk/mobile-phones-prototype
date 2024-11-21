import { CellPhone, phoneDirectory, IMEIset } from "./CellPhone.js";

const playStoreAppsObj = {
    "Calculator" : {
        name : "Calculator",
        add : (a, b)=> a+b,
        sub : (a, b)=> a-b,
        mul : (a, b)=> a*b,
        div : (a, b)=> a/b,
    }, 
    "Web_Browser" : {
        name : "Web_Browser",
        findURL(url){
            const urlArray = url.split('.').reverse();
            let res = INTERNET;
            for(let part of urlArray){
                if(res === undefined) break;
                res = res[part];
            }
            if(res === undefined){
                return "No results Found on Internet";
            }
            return res;
        } 
    }, 
    "Google_Search" : {
        name : "Google_Search",
        search(topic){
            const res = INTERNET.com.google.search[topic];
            if(res === undefined){
                return "No results Found in Google Search";
            }
            return res;
        }
    },
    "YouTube" : {name : "YouTube"},
    "WhatsApp" : {name : "WhatsApp"},
    "Instagram" : {name : "Instagram"},
    "Ola" : {name : "Ola"},
};
const PlayStoreAppsMap = new Map(Object.entries(playStoreAppsObj));

const AppStoreAppsObj = {
    "Calculator" : {
        name : "Calculator",
        add : (a, b)=> a+b,
        sub : (a, b)=> a-b,
        mul : (a, b)=> a*b,
        div : (a, b)=> a/b,
    }, 
    "Safari_Browser" : {
        name : "Safari_Browser",
        findURL(url){
            const urlArray = url.split('.').reverse();
            let res = INTERNET;
            for(let part of urlArray){
                if(res === undefined) break;
                res = res[part];
            }
            if(res === undefined){
                return "No results Found on Internet";
            }
            return res;
        } 
    }, 
    "Google_Search" : {
        name : "Google_Search",
        search(topic){
            const res = INTERNET.com.google.search[topic];
            if(res === undefined){
                return "No results Found in Google Search";
            }
            return res;
        }
    },
    "YouTube" : {name : "YouTube"},
    "WhatsApp" : {name : "WhatsApp"},
    "Instagram" : {name : "Instagram"},
    "Ola" : {name : "Ola"},
}
const AppStoreAppsMap = new Map(Object.entries(AppStoreAppsObj));

const INTERNET = {
    com : {
        google : {
            play : {
                Apps : PlayStoreAppsMap,
            },
            search : {
                cats : "Cats (Felis catus) are small, carnivorous mammals in the family Felidae, exhibiting solitary behavior, keen senses, and territorial instincts.",
                dogs : "Dogs (Canis lupus familiaris) are domesticated carnivorous mammals in the Canidae family, known for their loyalty, social behavior, and varied roles.",
            },
            drive : new Map(),
        },

        zoho : {
            inventory : {},
            drive : new Map(),        
        },

        apple : {
            store : AppStoreAppsMap,
        }
    }

};

class SmartPhone extends CellPhone{
    #Apps = new Map(Object.entries({
        "Calculator" : {
            name : "Calculator",
            add : (a, b)=> a+b,
            sub : (a, b)=> a-b,
            mul : (a, b)=> a*b,
            div : (a, b)=> a/b,
        }, 
        "Web_Browser" : {
            name : "Web_Browser",
            findURL(url){
                const urlArray = url.split('.').reverse();
                let res = INTERNET;
                for(let part of urlArray){
                    if(res === undefined) break;
                    res = res[part];
                }
                if(res === undefined){
                    return "No results Found on Internet";
                }
                return res;
            } 
        }, 
        "Google_Search" : {
            name : "Google_Search",
            search(topic){
                const res = INTERNET.com.google.search[topic];
                if(res === undefined){
                    return "No results Found in Google Search";
                }
                return res;
            }
        }
    }));

    #Documents = new Map(Object.entries({
        "sampleDocs.txt" : {
            name : "sampleDocs.txt",
            content : "This is the sample document"
        }
    }));

    #simNumber2;
    #videoCallRecords = [];
    #OS = "Sembian";
    #RAM;
    #touchInterface = true;

    constructor(name, storage, battery, camera, sim, RAM, sim2 = null){
        if(sim === sim2) {
            console.error("Duplicate sim numbers cannot exist");
            throw new Error("Duplicate sim numbers cannot exist")
        }
        super(name, storage, battery, camera, sim);
        if(sim2 !== null){
            if(phoneDirectory[sim2] === undefined){
                this.#simNumber2 = sim2;
                phoneDirectory[sim2] = this;
            }
            else{
                console.error("Duplicate sim numbers cannot exist");
                throw new Error("Duplicate sim numbers cannot exist")
            }
        }
        this.setType("SMART_PHONE");
        this.#RAM = RAM;
    }

    getOS(){
        return this.#OS;
    }

    getRAM(){
        return this.#RAM;
    }

    updateOS(newOS){
        this.#OS = newOS;
    }

    getSim2Number(){
        return this.#simNumber2 ? this.#simNumber2 : null;

    }

    smartPhoneDetails() {
        const details = [
            { property: "IMEI", value: this.getIMEI() },
            { property: "Name", value: this.getPhoneName() },
            { property: "Storage", value: `${this.getStorageCapacity()} GB` },
            { property: "Battery", value: `${this.getBatteryCapacity()} mAh` },
            { property: "Camera", value: `${this.getCameraSpecification()} MP` },
            { property: "SIM 1 Number", value: this.getSimNumber() },
            { property: "Type", value: this.getType() },
            { property: "OS", value: this.getOS() },
            { property: "RAM", value: `${this.#RAM} GB` },
            { property: "Touch Interface", value: this.#touchInterface ? "Yes" : "No" },
            { property: "SIM 2 Number", value: this.#simNumber2 || "Not Available" },
            // { property: "Internet Access", value: this.hasApp("Web_Browser") ? "Available" : "Unavailable" }
        ];
    
        console.log("SmartPhone Details:", details);
        return details;
    }
    
    

    addVideoCallRecord(senderIMEI, record){
        if(senderIMEI === this.getIMEI()){
            console.error("Cannot add self video call record");
            throw new Error("Cannot add self video call record")
        }
        else {
            this.#videoCallRecords.push(record);
        }
    }

    hasApp(appName){
        return this.#Apps.has(appName);
    }

    openApp(appName){
        let selectedApp = this.#Apps.get(appName);
        if(selectedApp !== undefined){
            console.log("Opening", selectedApp.name);
        }
        else{
            console.error("App not found on your device");
            throw new Error("App not found on your device");
        }
        return selectedApp;
    }

    saveApp(app){
        this.#Apps.set(app.name,app);
    }

    deleteApp(appName){
        if(!this.#Apps.has(appName)){
            console.error("App not found in the phone");
            throw new Error("App not found in the phone")
        } 
        else{
            this.#Apps.delete(appName);
            console.log(`${appName} deleted successfully`);
            return `${appName} deleted successfully`;
        }
    }

    getAllAppNames(){
        let res = [];
        this.#Apps.forEach((ele, ind)=>{
            console.log(ele.name);
            res.push({"name" : ele.name});
        })
        return res;
    }

    viewAllApps(){
        console.log("");
        console.log("Showing all Apps : ");
        let res = [];
        if(this.#Apps.size === 0){
            console.log("No Apps found");
            return "NO Apps Found";
        }
        this.#Apps.forEach((ele, ind)=>{
            console.log(ele.name);
            res.push({"name" : ele.name});
        })
        console.log("");
        return res;
    }

    saveDocument(documentName, documentContent){
        if(!this.#Documents.has(documentName)){
            console.log("New document successfull saved");
            this.#Documents.set(documentName, {name : documentName, content : documentContent});
            return "New document successfull saved";
        }
        else{
            console.log("Existing Document updated");
            this.#Documents.set(documentName, {name : documentName, content : documentContent});
            return "New document successfull saved";
        }
    }

    deleteDocument(documentName){
        if(this.#Documents.has(documentName)){
            this.#Documents.delete(documentName);
            console.log("Document deleted successfully");
            return "Document deleted successfully";
        }
        else{
            console.log("No such file found to be deleted");
            throw new Error("No such file found to be deleted");
        }
    }

    getDocument(documentName){
        if(this.#Documents.has(documentName)){
            console.log("file found");
            // return [{"name" : documentName, "document" : this.#Documents.get(documentName)}];
            return [this.#Documents.get(documentName)];

        }
        else{
            console.log("No such file found");
            throw new Error("No such file found");
        }
    }

    getAllDocumentNames(){
        const res = [];
        this.#Documents.forEach((ele)=>{
            console.log(ele.name);
            res.push({"name" : ele.name});
        })
        return res;
    }

    viewAllDocuments(){
        console.log("");
        console.log("Showing all Documents : ");
        const res = [];
        this.#Documents.forEach((ele, ind)=>{
            console.log(ele.name);
            res.push({"name" : ele.name});
        })
        if(this.#Documents.size === 0){
            console.log("No documents found");
            throw new Error("No documents found");
        }
        console.log("");
        return res;
    }

    makeVideoCall(receiverNumber, content, simChoice = 1){
        let receiverPhoneObject = phoneDirectory[receiverNumber];
        let callingNumber = null;
        if(simChoice == 2 && this.#simNumber2){
            callingNumber = this.#simNumber2;
        }

        if(receiverPhoneObject === undefined){
            console.error("Phone with phone number not found");
            throw new Error("Phone with phone number not found")
        }
        else if(receiverPhoneObject === this){
            console.error("Video call to self is not possible");
            throw new Error("Video call to self is not possible")
        }
        else if(receiverPhoneObject.getType() === "CELL_PHONE"){
            console.error("Cannot make Video call to cell Phone");
            throw new Error("Cannot make Video call to cell Phone")
        }
        else{
            this.#videoCallRecords.push({
                from : callingNumber === null ? this.getSimNumber() : callingNumber,
                to : receiverNumber,
                content : content
            });
            receiverPhoneObject.addVideoCallRecord(this.getIMEI(), {
                from : callingNumber === null ? this.getSimNumber() : callingNumber,
                to : receiverNumber,
                content : content
            });

            console.log(`Video Call made from ${callingNumber === null ? this.getSimNumber() : callingNumber} to ${receiverNumber} with Video content "${content}"`);
            return `Video Call made from ${callingNumber === null ? this.getSimNumber() : callingNumber} to ${receiverNumber} with Video content "${content}"`;
        }
    }

    viewAllVideoCallRecords(){
        console.log("");
        console.log("Showing all Video call records : ")
        const res = [];
        if(this.#videoCallRecords.length === 0){
            throw new Error("No Video call records found");
        }
        for(let i = this.#videoCallRecords.length - 1; i >= 0; i--){
            console.log(this.#videoCallRecords[i]);
            res.push(this.#videoCallRecords[i]);
        }
        console.log("");
        return res;
    }

    accessTheInternet(urlToSearch){
        const browser = this.#Apps.get("Web_Browser");
        if(!browser){
            console.log("Browser has been deleted. Cannot access Internet");
            throw new Error("Browser has been deleted. Cannot access Internet");
        }
        else{
            const res = browser.findURL(urlToSearch);
            if(res === undefined){
                throw new Error("No results Found on Internet");
            }
            else{
                console.log("Fetching content from Internet");
                return [{"result" : res}];
            }
        }
    }

    changeSim2Number(newSimNumber2){
        if(phoneDirectory[newSimNumber2] === undefined){
            delete phoneDirectory[this.#simNumber2];
            this.#simNumber2 = newSimNumber2;
            phoneDirectory[newSimNumber2] = this;
            console.log("SIM number updated");
            return "SIM - 2 number updated"
        }
        else{
            console.error("sim number cannot be duplicate");
            throw new Error("sim number cannot be duplicate");
        }
    }

    makeVoiceCall(reciverNumber, content, simChoice = 1){ 
        if(simChoice == 2 && this.#simNumber2){
            return super.makeVoiceCall(reciverNumber, content, this.#simNumber2);
        }
        else{
            return super.makeVoiceCall(reciverNumber, content);
        }
    }

    sendTextMessage(reciverNumber, message, simChoice = 1){
        if(simChoice == 2 && this.#simNumber2){
            return super.sendTextMessage(reciverNumber, message, this.#simNumber2);
        }
        else{
            return super.sendTextMessage(reciverNumber, message);
        }
    }
}

export { SmartPhone, INTERNET };