interface IServer {

    id: number
    name: string
    description: string
    category: string
    channel_server: IChannel[]
    icon: string
    banner: string

}


interface IChannel {
    id: number
    name: string
    server: number
    topic: string
    owner: number
    icon: string
}

export {IChannel, IServer}