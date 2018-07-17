import { BinaryProtocol, BufferedTransport,
    CompactProtocol, StructLike, TProtocol } from '@creditkarma/thrift-server-core'

export interface IStructConstructor<T extends StructLike> {
    new (args?: any): T
    read(input: TProtocol): T
}

export const encoder = (thriftObject: StructLike, useCompactProtocol: boolean = false): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const transport = new BufferedTransport(Buffer.from(''))
        const protocol = useCompactProtocol ? new CompactProtocol(transport) : new BinaryProtocol(transport)
        thriftObject.write(protocol)
        resolve(protocol.flush())
    })
}

export function decoder<T extends StructLike>(buffer: string,
                                              ThriftClass: IStructConstructor<T>,
                                              useCompactProtocol: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
        const receiver: BufferedTransport = BufferedTransport.receiver(Buffer.from(buffer))
        const input = useCompactProtocol ? new CompactProtocol(receiver) :  new BinaryProtocol(receiver)
        const decoded = ThriftClass.read(input)
        resolve(decoded)
    })
}
