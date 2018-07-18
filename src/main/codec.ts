import { BinaryProtocol,
    BufferedTransport,
    CompactProtocol,
    IProtocolConstructor,
    StructLike,
    TProtocol,
} from '@creditkarma/thrift-server-core'

export interface IStructConstructor<T extends StructLike> {
    new (args?: any): T
    read(input: TProtocol): T
}

export const encoder = (thriftObject: StructLike,
                        ProtocolType: IProtocolConstructor = BinaryProtocol): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const transport = new BufferedTransport(Buffer.from(''))
        const protocol =  new ProtocolType(transport)
        thriftObject.write(protocol)
        resolve(protocol.flush())
    })
}

export function decoder<T extends StructLike>(buffer: string,
                                              ThriftClass: IStructConstructor<T>,
                                              ProtocolType: IProtocolConstructor = BinaryProtocol): Promise<any> {
    return new Promise((resolve, reject) => {
        const receiver: BufferedTransport = BufferedTransport.receiver(Buffer.from(buffer))
        const input = new ProtocolType(receiver)
        const decoded = ThriftClass.read(input)
        resolve(decoded)
    })
}
