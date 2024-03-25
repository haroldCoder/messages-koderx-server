interface User{
    id: string,
    username: string,
    email: string,
    password: string,
    tel: string
}

interface Contact{
    id: string,
    user1Id: string,
    user2Id: string
}

interface Messages{
    id?: string,
    messages: string,
    contactid: string
}