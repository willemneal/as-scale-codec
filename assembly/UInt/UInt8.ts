// Copyright 2020 LimeChain Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { BIT_LENGTH } from "../utils/Bytes";
import { AbstractInt } from "../AbstractInt";

/** Representation for a UInt8 value in the system. */
export class UInt8 extends AbstractInt<u8> {

    constructor (value: u8) {
        super(value, BIT_LENGTH.INT_8)
    }

    /** Instantiates new UInt8 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): UInt8 {
        assert(value.length == 1, 'Uint8: cannot decode invalid u8 encoded value');
        return new UInt8(value[0]);
    }
}
