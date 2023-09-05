interface Meta {
    Message: string
}

interface Data {
    Data: any
}

interface msgString {
    Meta: {
        Message: string
    }
}

interface msgData {
    data: msgString
}

export interface messageType {
    message: string,
    name: string,
    code: string,
    config: any,
    request: any,
    response: msgData,
    stack: string
}

export interface responseType {
    data: Data
    Meta: Meta
}

export class fetch {
    data: any
    message?: string | null

    result(data: responseType | any) {
        this.data = data.data.Data
        this.message = data.data.Meta
        return data.data.Data
    }

    getData(){
        return this.data
    }

    getSuccessMessage() {
        return this.message
    }

    getAxiosMessage(data: messageType | any) {
        return data.response.data.Meta.Message
    }
}