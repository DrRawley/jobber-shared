import JWT from 'jsonwebtoken';  // https://jwt.io/introduction
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

// Defines the properties allowed services that exist in the jwt, will possibly change
const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGatewayRequeset(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.gatewayToken) { //If request headers don't contain gateway token, throw error
        throw new NotAuthorizedError('Invalid Request',
            'verifyGatewayRequest() method: Request not coming from API gateway. 0');
    }
    //If it does come from an API gateway...
    const token: string = req.headers?.gatewayToken as string;
    if (!token) {
        throw new NotAuthorizedError('Invalid Request',
            'verifyGatewayRequest() method: Request not coming from API gateway. 1');
    }
    try {
        const payload: { id: string; iat: number } = JWT.verify(token, '') as { id: string; iat: number }; //Secret goes here.  Will be used in whole application
        if (!tokens.includes(payload.id)) {
            throw new NotAuthorizedError('Invalid Request',
                'verifyGatewayRequest() method: Request payload invalid.');
        }
    } catch (error) {
        throw new NotAuthorizedError('Invalid Request',
            'verifyGatewayRequest() method: Request not coming from API gateway. 3');
    }
}