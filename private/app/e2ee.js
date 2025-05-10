// utils.js
export async function generateKeyPair() {
    return crypto.subtle.generateKey(
      { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['encrypt', 'decrypt']
    )
  }
  
  export async function deriveKeyFromPassword(password, salt) {
    const enc = new TextEncoder()
    const baseKey = await crypto.subtle.importKey(
      'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
    )
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )
  }
  
  export async function encryptPrivateKey(privateKey, password) {
    const enc = new TextEncoder()
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const key = await deriveKeyFromPassword(password, salt)
    const exported = await crypto.subtle.exportKey('pkcs8', privateKey)
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      exported
    )
    return {
      salt: Array.from(salt),
      iv: Array.from(iv),
      ciphertext: Array.from(new Uint8Array(ciphertext))
    }
  }
  
  export async function decryptPrivateKey(encrypted, password) {
    const { salt, iv, ciphertext } = encrypted
    const key = await deriveKeyFromPassword(password, new Uint8Array(salt))
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) },
      key,
      new Uint8Array(ciphertext)
    )
    return crypto.subtle.importKey(
      'pkcs8',
      decrypted,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['decrypt']
    )
  }
  