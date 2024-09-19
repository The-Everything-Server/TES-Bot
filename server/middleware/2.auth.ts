import { Payload, generateToken, verifyToken } from '~/server/utils/security/Jwt'

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)
    const pathname = new URL(url).pathname

    if (!pathname.startsWith('/api')) {
        return
    }

    const unprotectedPaths = [ '/api/auth/', '/api/user/', '/api/otp/']

    if (unprotectedPaths.some(path => pathname.includes(path))) {
        console.log(pathname)
        return
    }

    const token = getRequestHeader(event, 'Authorization')

    if (!token ||!verifyToken(token)) {
        console.log('unauthorized')
        return new Response('Unauthorized', { status: 401 })
    }

    event.context.user = verifyToken(token) as Payload

    return
})