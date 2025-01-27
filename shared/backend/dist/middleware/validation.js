import * as schemas from "./schemas.js";
const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        next(result.error);
        return;
    }
    next();
};
const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        next(result.error);
        return;
    }
    next();
};
export const registerCustomer = validateBody(schemas.registerCustomer);
export const registerBusiness = validateBody(schemas.registerBusiness);
export const loginCustomer = validateBody(schemas.loginCustomer);
export const loginBusiness = validateBody(schemas.loginBusiness);
export const updateLoggedInCustomer = validateBody(schemas.updateLoggedInCustomer);
export const updateLoggedInBusiness = validateBody(schemas.updateLoggedInBusiness);
export const getRandomBusinesses = validateQuery(schemas.getRandomBusinesses);
