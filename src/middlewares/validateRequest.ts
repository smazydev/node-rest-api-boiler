import { AnySchema, ValidationError } from 'yup';
import { Request, Response, NextFunction} from 'express';
import log  from '../logger';


export const validate  = (schema: AnySchema) => async (req:Request,res:Response,next:NextFunction) => {
    log.info(`Middleware for request on route: ${req.route.path} was called`);
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        log.info(`Request validated on route: ${req.route.path}`);
        return next();
    } catch (error:any) {
        log.error(`${error.name}: ${error.message}. Route: ${req.route.path}`);
        return res.status(400).send(`${error.name}: ${error.message}`);
    }

}
