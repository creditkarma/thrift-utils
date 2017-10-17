# Thrift Utils

A set of utility functions for using Thrift in TypeScript projects.  This module is part of the Credit Karma Thrift TypeScript project.

Features include:

* Easily encode / decode Thrift objects

## Installation

Include in your module with the following command

```bash
> npm i --save @creditkarma/thrift-utils
```

## Getting started

Encode Thrift object to a buffer
```typescript
import { encoder } from '@creditkarma/thrift-utils'
import { Metadata } from './generated/metadata'

const metadata = new Metadata({appId: 'thrift-utils', traceId: '1234'})
buffer = encoder(metadata).then(buffer => console.dir(buffer))
```

Decode buffer into a Thrift object
```typescript
import { decoder } from '@creditkarma/thrift-utils'
import { Metadata } from './generated/metadata'

decoder(buffer, Metadata).then(metadata => console.dir(metadata))
```

## Contributing

For more information about contributing new features and bug fixes, see our [Contribution Guidelines](https://github.com/creditkarma/CONTRIBUTING.md).
External contributors must sign Contributor License Agreement (CLA)

## License

This project is licensed under [Apache License Version 2.0](./LICENSE)