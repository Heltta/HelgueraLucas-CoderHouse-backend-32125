
class Message {
    constructor(socketid, content, userEmail, date){
        this.socketId= socketid || "",
        this.content= content || "",
        this.user= userEmail || "",
        this.date= date ||  Date.now()
    }

    static tableFields = [
        {key:'id', type: 'increments'},
        {key: 'socketId', type: 'string'},
        {key: 'content', type: 'text'},
        {key: 'user', type: 'string'},
        {key: 'date', type: 'unsigned biginteger'}
    ]
}

export default Message;
