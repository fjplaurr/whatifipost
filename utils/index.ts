import * as fs from 'fs';

export function readSecret(secretName: string) {
  try {
    const secretWithLineBreaks: string = fs.readFileSync(`../run/secrets/${secretName}`, 'utf8');
    const secretWithoutLineBreaks: string = secretWithLineBreaks.replace(/[\r\n]+/gm, '');
    return secretWithoutLineBreaks;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.log(`An error occurred while trying to read the secret: ${secretName}. Err: ${err}`);
    } else {
      console.log(`Could not find the secret, probably not running in swarm mode: ${secretName}. Err: ${err}`);
    }
    return '';
  }
}
