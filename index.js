import {readFileSync} from 'node:fs';
import * as assert from 'node:assert';
import {compile, render} from 'ejs';

const tpl = readFileSync('./template.ejs', 'utf8');
const mustMatch = Object.fromEntries(
  'r,q,alphax,alphay,betax1,betax2,betay1,betay2,gammax1,gammax2,gammay1,gammay2'
    .split(',')
    .map(key => [key, true])
);

function mergeVerifiers(sources) {
  // Extract the constant values from the Solidity code
  const constants = sources.map(sourceCode =>
    Array.from(sourceCode.matchAll(
      /uint256 constant ([a-zA-Z0-9]+)\s+=\s+(\d+);/g
    )).reduce((out, match) => {
      out[match[1]] = match[2];
      return out;
    }, {})
  );

  // Build the new file
  const data = formatConstants(constants);
  console.log(data);
  return render(tpl, data);
}

function formatConstants(arr) {
  if (arr.length < 2) throw new Error('minimum_two_verifiers');

  const data = { verifiers: [] };

  // Ensure all objects have the same keys
  const referenceKeys = Object.keys(arr[0]);
  if (!arr.every(obj =>
      referenceKeys.length === Object.keys(obj).length
        && referenceKeys.every(key => key in obj))
  ) throw new Error('constant_key_mismatch');

  // Store common properties
  for (let prop of Object.keys(mustMatch)) {
    data[prop] = arr[0][prop];
  }

  // Ensure the given set of properties are equal across all objects
  for (let i = 0; i < arr.length; i++) {
    const thesePoints = [];
    for (let prop of referenceKeys) {
      if(prop in mustMatch) {
        if (i > 0 && arr[i][prop] !== arr[0][prop]) throw new Error('constant_value_mismatch');
      } else {
        thesePoints.push(arr[i][prop]);
      }
    }
    data.verifiers.push(thesePoints);
  }

  return data;
}

console.log(mergeVerifiers([
  readFileSync('./test/contracts/MultiTest5.sol', 'utf8'),
  readFileSync('./test/contracts/MultiTest6.sol', 'utf8'),
]));
