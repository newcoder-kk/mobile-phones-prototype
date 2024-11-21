const phoneDirectory = {};
const IMEIset = new Set();

function generateIMEI(){
    let res = "";
    for(let i = 0; i < 15; i++){
        res += Math.floor(Math.random() * 10);
    }

    if(IMEIset.has(res)){
        return generateIMEI();
    }
    else return res;
}

class CellPhone{
    #IMEI;
    #phoneName;
    #storage; //GB
    #battery; //mAh
    #camera;  //mp
    #simNumber;
    #type = "CELL_PHONE";
    #messageRecords = [];
    #callRecords = [];
    #photos = [];
    #contacts = new Map();
    #reverseContacts = new Map();
    photoCount = 0;

    constructor(name, storage, battery, camera, sim){
        // if(!IMEIset.has(IMEI)){
        //     this.#IMEI = IMEI;
        //     IMEIset.add(IMEI);
        // }
        // else{
        //     throw new Error("Duplicate IMEI numbers cannot exist");
        // }
        this.#IMEI = generateIMEI();
        this.#phoneName = name;
        this.#storage = storage;
        this.#battery = battery;
        this.#camera = camera;
        if(phoneDirectory[sim] === undefined){
            this.#simNumber = sim;
            phoneDirectory[sim] = this;
        }
        else{
            throw new Error("Duplicate sim numbers cannot exist");
        }
    }
    getPhoneName(){
        return this.#phoneName;
    }

    getType(){
        return this.#type;
    }
    
    setType(newType){
        this.#type = newType;
    }
    
    getIMEI(){
        return this.#IMEI;
    }

    getStorageCapacity(){
        return this.#storage;
    }

    getBatteryCapacity(){
        return this.#battery;
    }

    getCameraSpecification(){
        return this.#camera;
    }

    getSimNumber(){
        return this.#simNumber;
    }

    cellPhoneDetails() {
        const details = [
            { "Name": "IMEI", "Detail": this.#IMEI },
            { "Name": "Phone Name", "Detail": this.#phoneName },
            { "Name": "Phone Type", "Detail": this.#type },
            { "Name": "Storage Capacity", "Detail": `${this.#storage} GB` },
            { "Name": "Battery Capacity", "Detail": `${this.#battery} mAh` },
            { "Name": "Camera Specification", "Detail": `${this.#camera} MP` },
            { "Name": "SIM Number", "Detail": this.#simNumber },
        ];
    
        console.log("Cell Phone Details:");
        details.forEach(item => {
            console.log(`${item.Name}: ${item.Detail}`);
        });
    
        return details;
    }
    

    addCallRecord(senderIMEI, callRecord){
        if(senderIMEI === this.#IMEI){
            console.error("Cannot add self call record");
            throw new Error("Cannot add self call record");
        }
        else {
            this.#callRecords.push(callRecord);
        }
    }

    addMessageRecord(senderIMEI, messageRecord){
        if(senderIMEI === this.#IMEI){
            console.error("Cannot add self message record");
            throw new Error("Cannot add self message record")
        }
        else {
            this.#messageRecords.push(messageRecord);
        }
    }

    addPhotos(Photo){
        this.#photos.push(Photo);
    }

    addContact(contactName, contactNumber){
        const hasName = this.#contacts.has(contactName);
        const hasNumber = this.#reverseContacts.has(contactNumber);

        if(hasName){
            console.error("Contact with this name already exist. Choose another name or update existing");
            throw new Error("Contact with this name already exist. Choose another name or update existing")
        }
        else if(hasNumber){
            console.error("Contact with this number already exist.");
            throw new Error("Contact with this number already exist.")
        }
        else {
            this.#contacts.set(contactName, contactNumber);
            this.#reverseContacts.set(contactNumber, contactName);
            console.log("Contact added successfully");
            return "Contact added successfully";

        }
    }

    viewAllContacts(){
        console.log("");
        console.log("Shpwing all contacts : ");
        let num = 1;
        if(this.#contacts.size === 0){
            console.log("No contacts to be shown");
            throw new Error("No contacts to be shown");
        }
        const res = [];
        this.#contacts.forEach((val, key)=>{
            console.log(`${num}. ${key} - ${val}`);
            let temp = {};
            temp["name"] = key;
            temp["number"] = val;
            res.push(temp);
            num++;
        });
        console.log("");
        return res;
    }

    getContact(contactName){
        const contactNumber = this.#contacts.get(contactName);
        if(contactNumber === undefined){
            console.error("No contact found");
            throw new Error("No contact found")
        }
        else {
            console.log("Contact found");
            return [{"name" : contactName, "number" : contactNumber}];
        }
    }

    updateContact(currContactName, newContactName, newContactNumber = null){
        let currContactNumber = this.#contacts.get(currContactName);
        if(currContactNumber === undefined){
            console.error("No Contact found to update");
            throw new Error("No Contact found to update")
        }
        else{
            this.#contacts.delete(currContactName);
            this.#reverseContacts.delete(currContactNumber);

            if(newContactName){
                currContactName = newContactName;
            }
            if(newContactNumber){
                currContactNumber = newContactNumber;
            }
            this.#contacts.set(currContactName, currContactNumber);
            this.#reverseContacts.set(currContactNumber, currContactName);
            console.log("Contact Updated successfully");
            return "Contact Updated successfully";

        }
    }

    deleteContact(contactName){
        const contactNumber = this.#contacts.get(contactName);

        if(contactNumber){
            this.#contacts.delete(contactName);
            this.#reverseContacts.delete(contactNumber);
            console.log("Contact deleted successfully");
            return "Contact deleted successfully";

        }
        else{
            console.error("No contact found to delete.");
            throw new Error("No contact found to delete.")
        }
    }

    makeVoiceCall(receiverNumber, content, callingNumber = null){
        let receiverPhoneObject = phoneDirectory[receiverNumber];

        if(receiverPhoneObject === undefined){
            console.error("Phone with phone number not found");
            throw new Error("Phone with phone number not found")
        }
        else if(receiverPhoneObject === this){
            console.error("call to self is not possible");
            throw new Error("call to self is not possible")
        }
        else if(callingNumber && this.#type === "CELL_PHONE"){
            console.error("Dual SIM feature not supported in cell phone");
            throw new Error("Dual SIM feature not supported in cell phone")
        }
        else{
            this.#callRecords.push({
                from : callingNumber === null ? this.#simNumber : callingNumber,
                to : receiverNumber,
                content : content
            });
            receiverPhoneObject.addCallRecord(this.#IMEI, {
                from : callingNumber === null ? this.#simNumber : callingNumber,
                to : receiverNumber,
                content : content
            });

            console.log(`Call made from ${callingNumber === null ? this.#simNumber : callingNumber} to ${receiverNumber} with content "${content}"`);
            return `Call made from ${callingNumber === null ? this.#simNumber : callingNumber} to ${receiverNumber} with content "${content}"`;
        }
    }

    viewAllVoiceCallRecord(){
        console.log("");
        console.log("Showing all call records of : ", this.#IMEI);
        const res = [];
        if(this.#callRecords.length === 0){
            throw new Error("No Call Records Found");
        }
        for(let i = this.#callRecords.length - 1; i >= 0; i--){
            console.log(this.#callRecords[i]);
            res.push(this.#callRecords[i]);
        }
        console.log("");
        return res;
    }

    sendTextMessage(receiverNumber, message, callingNumber = null){
        let receiverPhoneObject = phoneDirectory[receiverNumber];
        if(receiverPhoneObject === undefined){
            console.error("Phone with phone number not found");
            throw new Error("Phone with phone number not found")
        }
        else if(receiverPhoneObject === this){
            console.error("Message to self is disallowed");
            throw new Error("Message to self is disallowed")
        }
        else if(callingNumber && this.#type === "CELL_PHONE"){
            console.error("Dual SIM feature not supported in cell phone");
            throw new Error("Dual SIM feature not supported in cell phone")
        }
        else{
            this.#messageRecords.push({
                from : callingNumber === null ? this.#simNumber : callingNumber,
                to : receiverNumber,
                message : message
            })
            receiverPhoneObject.addMessageRecord(this.#IMEI, {
                from : callingNumber === null ? this.#simNumber : callingNumber,
                to : receiverNumber,
                message : message
            })
            console.log(`Message sent from ${callingNumber === null ? this.#simNumber : callingNumber} to ${receiverNumber} with message "${message}"`);
            return `Message sent from ${callingNumber === null ? this.#simNumber : callingNumber} to ${receiverNumber} with message "${message}"`;
        }
    }
    
    viewAllMessageRecord(){
        console.log("");
        console.log("Showing all message records : ");
        const res = [];
        if(this.#messageRecords.length === 0){
            throw new Error("No Message Records Found");
        }
        for(let i = this.#messageRecords.length - 1; i >= 0; i--){
            console.log(this.#messageRecords[i]);
            res.push(this.#messageRecords[i]);
        }
        console.log("");
        return res;
    }

    capturePhoto(){
        this.#photos.push(`Photo - ${this.photoCount+1}`);
        this.photoCount++;
        console.log("Photo captured");
        return "Photo captured";
    }

    viewAllPhotos(){
        console.log("");
        console.log("Showing all Photos of : ", this.#IMEI);
        const res = [];
        for(let i = this.#photos.length - 1; i >= 0; i--){
            console.log(this.#photos[i]);
            res.push(this.#photos[i]);
        }
        console.log("");
        return res;
    }

    changeSimNumber(newSimNumber){
        if(phoneDirectory[newSimNumber] === undefined){
            delete phoneDirectory[this.#simNumber];
            this.#simNumber = newSimNumber;
            phoneDirectory[newSimNumber] = this;
            console.log("SIM number updated");
            return "SIM number updated";
        }
        else{
            console.error("This sim already exist, try another sim number");
            throw new Error("This sim already exist, try another sim number");
        }
    }
}

export {CellPhone, phoneDirectory, IMEIset};
