<h2 align="center">AssemblyScript SCALE Codec</h2>


[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Tests](https://github.com/LimeChain/as-scale-codec/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/as-scale-codec?color=light-green&label=npm%20package)](https://img.shields.io/npm/v/as-scale-codec?color=light-green&label=npm%20package)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/LimeChain/as-scale-codec)

**as-scale-codec** is AssemblyScript implementation of Polkadot SCALE Codec. The codec is used as a communication mechanism between Polkadot Hosts and Polkadot Runtimes.

More detailed information about the SCALE codec specification can be found [here](https://substrate.dev/docs/en/knowledgebase/advanced/codec).

This AssemblyScript implementation of the codec is funded by [Web3 Foundation](https://web3.foundation/) via their [Open Grants Program](https://github.com/w3f/Open-Grants-Program)! :pray:
![WEB3 Badge](./web3_badge_black.png)
# Supported types
The following table shows the status of the types and their arrays:

|       Type        |       Support      | Array Support | 
|----------------------|:--------------------:|:------:|
| `Fixed width number` | ✅ | ✅ |
| `Compact Int`        | ✅ |✅ |
| `Big Integer` | :small_orange_diamond: *Limited Support* | :small_orange_diamond: *Limited Support* |
| `Byte` |✅ |✅ | 
| `Bool` | ✅| ✅|
| `Hash` |✅ | :heavy_minus_sign: |
| `String` | ✅|✅ | 

The following table shows the status of the fixed width numbers:

| Тype | `8` | `16` | `32` | `64` | `128` | `256` | 
|--|:--:|:--:|:--:|:--:|:--:|:--:|
| `int` | ✅ | ✅| ✅|✅ | :heavy_minus_sign:|  :heavy_minus_sign:|
| `uint` | ✅ | ✅| ✅|✅ |✅ |:heavy_minus_sign:|


## Special Types

- **Compact Int** - [Documentation](https://substrate.dev/docs/en/knowledgebase/advanced/codec#compactgeneral-integers)


## **Getting Started**  
*You can find more information on AssemblyScript and how to get started with it in the AssemblyScript docs -> [https://www.assemblyscript.org/introduction.html](https://www.assemblyscript.org/introduction.html)*

1. In your AssemblyScript project execute:

    ```bash
    npm install as-scale-codec
    ```
2. Once you have the library installed in your AssemblyScript project you can use it in your `assembly` files by importing the files from `as-scale-codec`.
 
Detailed examples of the exported by the library types are listed below:
  

## Types

### Encoding

Every type has а **toU8a** function . It encodes type value into an array of bytes

```jsx
import { Bool, Byte, ScaleString, Hash, CompactInt } from "as-scale-codec"
import { Int8, Int16, Int32, Int64 } from "as-scale-codec"
import { UInt8, UInt16, UInt32, UInt64, UInt128 } from "as-scale-codec"

// Bool
const scaleBool = new Bool(true);
scaleBool.toU8a() // => [0x01]

// Byte
const scaleByte = new Byte(0x01);
scaleByte.toU8a() // => [0x01]

// String
const scaleString = new ScaleString("a");
scaleString.toU8a() // => [0x04, 0x61] 

// Hash
const scaleHash = new Hash([0xff, 0x00, 0xab]);
scaleHash.toU8a() // => [0xff, 0x00, 0xab, 0x00, ... 0x00] (32 bytes long)

// Compact Int
const scaleCompactInt = new CompactInt(1);
scaleCompactInt.toU8a() // => [0x04]

// Int
const scaleInt8 = new Int8(-1);
scaleInt8.toU8a() // => [0xff]

const scaleInt16 = new Int16(-1);
scaleInt16.toU8a() // => [0xff, 0xff]

const scaleInt32 = new Int32(-1);
scaleInt32.toU8a() // => [0xff, 0xff, 0xff, 0xff]

const scaleInt64 = new Int64(-1);
scaleInt64.toU8a() // => [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]

// UInt
const scaleUInt8 = new UInt8(1);
scaleUInt8.toU8a() // => [0x01]

const scaleUInt16 = new UInt16(1);
scaleUInt16.toU8a() // => [0x01, 0x00]

const scaleUInt32 = new UInt32(1);
scaleUInt32.toU8a() // => [0x01, 0x00, 0x00, 0x00]

const scaleUInt64 = new UInt64(1);
scaleUInt64.toU8a() // => [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

const scaleUInt128 = new UInt128(u128.fromU64(18446744073709551615));
scaleUInt128.toU8a() // => [0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
```

### Decoding

Every type has a **static** function **fromU8a**. It decodes an array of bytes to the desired type

```jsx
import { Bool, Byte, ScaleString, Hash, CompactInt } from "as-scale-codec"
import { Int8, Int16, Int32, Int64 } from "as-scale-codec"
import { UInt8, UInt16, UInt32, UInt64, UInt128 } from "as-scale-codec"

// Bool
Bool.fromU8a([0x01]); // => new Bool(true)

// Byte
Byte.fromU8a([0x01]); // => new Byte(0x01)

// String
Byte.fromU8a([0x04, 0x61]); // => new ScaleString('a')

// Hash
Hash.fromU8a([0xff, 0x00, 0xab]); 
// => [0xff, 0x00, 0xab, 0x00, ... 0x00] (32 bytes long)

// Compact Int
CompactInt.fromU8a([0x04]); // => new CompactInt(1)

// Int
Int8.fromU8a([0xff]); // => new Int8(-1)
Int16.fromU8a([0xff, 0xff]); // => new Int16(-1)
Int32.fromU8a([0xff, 0xff, 0xff, 0xff]); // => new Int32(-1)
Int64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]); // => new Int64(-1)

// UInt
UInt8.fromU8a([0x01]); // => new UInt8(1)
UInt16.fromU8a([0x01, 0x00]); // => new UInt16(1)
UInt32.fromU8a([0x01, 0x00, 0x00, 0x00]); // => new UInt32(1)
UInt64.fromU8a([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]); // => new UInt64(1)
UInt128.fromU8a([0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
// => 340282366920938463444927863358058659840
```

## Arrays

### Encoding

Every array has **toU8a** function. It encodes the array values into an array of SCALE encoded bytes.

```jsx
import { BoolArray, ByteArray, IntArray, StringArray } from "as-scale-codec"

// Bool Array
const boolArray = new BoolArray([true, false, true]);
boolArray.toU8a(); // => [0x0c, 0x01, 0x00, 0x01]

// Byte Array
const byteArray = new ByteArray([0x01, 0x01, 0x01]);
byteArray.toU8a(); // => [0x0c, 0x01, 0x01, 0x01]

// Int Array
const intArray = new IntArray([16384, 2, 3, 4]);
intArray.toU8a() // => [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10]

// String Array
const stringArray = new StringArray(["hello", "world"]);
stringArray.toU8a() // => [0x08, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64]
```

### Decoding

Every array has a **static** function **fromU8a**. It decodes an array of SCALE encoded bytes and creates an array instance of the desired type.

```jsx
import { BoolArray, ByteArray, IntArray, StringArray } from "as-scale-codec"

// Bool Array
BoolArray.fromU8a([0x0c, 0x01, 0x00, 0x01]); 
// => new BoolArray([true, false, true])

// Byte Array
ByteArray.fromU8a([0x0c, 0x01, 0x01, 0x01])
// => new ByteArray([0x01, 0x01, 0x01])

// Int Array
IntArray.fromU8a([0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10])
// => new IntArray([16384, 2, 3, 4])

// String Array
StringArray.fromU8a([0x08, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64])
// => new StringArray(["hello", "world"])
```

# Miscellaneous

### Convert bytes to hash

```jsx
Hash.bytesToHash([0xff, 0x00, 0xab]); 
// => [0x00, ... , 0x00, 0xff, 0x00, 0xab] (32 bytes long)

Hash.bytesToHash([0xff, 0x00, ..., 0x00]); // (32 bytes long)
// => [0xff, ... , 0x00] (32 bytes long)
```

# **Tests**

In order to run the unit tests, one must perform:

```bash
npm run test
```

# **License**
This repository is licensed under [Apache 2.0 license](https://github.com/LimeChain/as-scale-codec/blob/master/LICENSE)
