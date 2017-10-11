import { TBinaryProtocol, TBufferedTransport } from 'thrift'

export const encoder = (thriftObject): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const transport = new TBufferedTransport(new Buffer(''), resolve)
        const protocol = new TBinaryProtocol(transport)
        thriftObject.write(protocol)
        protocol.flush()
    })
}

export const decoder = (buffer: string, ThriftClass): Promise<any> => {
    return new Promise((resolve, reject) => {
        const receiver = TBufferedTransport.receiver((transport, seqid) => {
            const input = new TBinaryProtocol(transport)
            const decoded = new ThriftClass()
            decoded.read(input)
            resolve(decoded)
        }, 0)
        receiver(new Buffer(buffer))
    })
}
