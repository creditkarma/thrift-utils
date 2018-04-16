import { expect } from 'code'
import * as Lab from 'lab'

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }

import { decoder, encoder } from '../main/codec'

import { Metadata } from './generated/com/creditkarma/common/metadata'

describe('codec', () => {
    let buffer: Buffer
    describe('when encoding Thrift object', () => {
        const metadata = new Metadata({ appId: 'thrift-utils', traceId: '1234' })
        it('resulting buffer has proper length', async () => {
            buffer = await encoder(metadata)
            expect(buffer.length).to.equal(31)
        })
    })

    describe('when decoding Thrift object', () => {
        it('resulting Thrift object should have a traceId with the proper value', async () => {
            const metadata = await decoder(buffer.toString(), Metadata)
            expect(metadata.traceId).to.equal('1234')
        })
    })
})
