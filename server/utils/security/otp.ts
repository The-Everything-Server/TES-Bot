import * as crypto from 'crypto'

/**
 * Generates a TOTP
 * @param secret - Secret key used to generate OTP
 * @param window - Amount of time to use OTP (Default is 90)
 * @param digits - Length of OTP (Default is 6)
 */
export function generateTOTP(secret: string, window: number = 90, digits: number = 6) {
    const epoch = Math.floor(Date.now() / 1000)
    const timeStep = Math.floor(epoch / window)

    const timeBuffer = Buffer.alloc(8)
    timeBuffer.writeUInt32BE(timeStep, 4)

    const secretBuffer = Buffer.from(secret, 'hex')

    const hmac = crypto.createHmac('sha1', secretBuffer)
    hmac.update(timeBuffer)

    const hmacResult = hmac.digest()

    const offset = hmacResult[hmacResult.length - 1] & 0xf

    const code = (hmacResult.readUInt32BE(offset) & 0x7fffffff % Math.pow(10, digits))

    return code.toString().padStart(digits, '0')
}

export function verifyTOTP(token: string, secret: string, window: number = 90, digits: number = 6): boolean {
    for(let i = -1; i <= 1; i++) {
        const currentTime = Math.floor(Date.now() / 1000) + i * window
        const generatedToken = generateTOTP(secret, window, digits)

        if (token === generatedToken) {
            return true
        }

        return false
    }
}

/**
 * Generates random hex code for OTP or other functions
 * @returns string
 */
export function generateHex() {
    return crypto.randomBytes(32).toString("hex")
}