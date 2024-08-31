import { Payload, generateToken, verifyToken } from '~/utils/security/Jwt'

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

    const unprotectedPaths = [ '/api/auth/' ]

    if (unprotectedPaths.includes(url.pathname.toString())) {
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