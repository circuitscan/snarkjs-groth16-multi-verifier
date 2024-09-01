import {readFileSync} from 'node:fs';
import * as assert from 'node:assert';

import {compileSol} from './helpers.js';

import {mergeVerifiers} from '../index.js';

describe('mergeVerifiers', () => {

  it('should support proofs for either circuit (2 public outputs)', async () => {
    const mergedSol = mergeVerifiers([
      readFileSync('./test/contracts/MultiTest5.sol', 'utf8'),
      readFileSync('./test/contracts/MultiTest6.sol', 'utf8'),
    ], 5);

    const contract = await compileSol(mergedSol);

    // Generated at:
    // https://circuitscan.org/chain/17000/address/0xba2a1e7dc9dfb8dbef1f529d575bb0500b7082bd
    assert.ok(await contract.verifyProof(
      [
        "0x1e31d7509147e19aac7cefe6c5bd22c6ddac49da72921e769eb461c629604147",
        "0x0701ad07c3869b4a6908df1688ecdf6d4bff472c3ab70d03fe24d299e0657910"
      ],
      [
        [
          "0x0a745e8828c061cb4c5631c206d7d07b32a450e358b8d44be0907f46ca1bab54",
          "0x2e380eead89c9e4906f86f3aee3843e681264e8edbc28e4da693029945c553e6"
        ],
        [
          "0x11fff0d907abefbe42f37c7370f3008478f7358440032a0427ae3a0cadbad55b",
          "0x2c8179aacd047bba26debbffaf20726437e0beaca2b9e06f710fe471fc686046"
        ]
      ],
      [
        "0x1ba843b31c41a23d1b0e7c23cbb0679eb3aad5851089e2c9a716ec3878d03dfe",
        "0x2c1c478132b4fdf596f07bc2459148be2d09b0b729dc0bdaa1ea0c0a5bde1255"
      ],
      [
        "0x000000000000000000000000000000000000000000000000000000000000000f"
      ],
      5 // verifier index
    ));

    // Generated at:
    // https://circuitscan.org/chain/17000/address/0x08e673f966cb25275db8cf02ff9966d66005709f
    assert.ok(await contract.verifyProof(
      [
        "0x1073b9c4db85ab971855d509fd5c998927e7cf3c5338c3c527f0ea07c873e3b4",
        "0x181c5f060cad1c1c5ccadfb5c400bf79cdf867c28dbc810f8b2976486f5fcf07"
      ],
      [
        [
          "0x2de22e9bb377aa6b41d50e0f7a9fa8cba722023d00b6a2326f50999950b2f6b5",
          "0x22f3765899ad803531e10a87b347fbf875596ca5875499b79be135b1afffbe88"
        ],
        [
          "0x06770ad8998028b9a58b58155f2957db428f3178a9d6f678d4c5c8be21248980",
          "0x1e573607af10cb4f81a6b67137b1439c617135eeecb2c5f58c95078994e4e5c3"
        ]
      ],
      [
        "0x283d1e19ff93935a57c4cc705c7212466a823cbb9dcf4cfed3ce9fe9f24c8590",
        "0x0466b1a38d846a2014a5b1849e6e025a42ea6409ba6f9b44ff4399c169b93160"
      ],
      [
        "0x000000000000000000000000000000000000000000000000000000000000001e"
      ],
      6 // verifier index
    ));

  });

});
