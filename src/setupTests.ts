import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

// Polyfill TextEncoder and TextDecoder if not present
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}
