import z from "zod";
import { BusinessType } from "@prisma/client";
const postLazy = z.lazy(() => post);
const customerLazy = z.lazy(() => customer);
const businessLazy = z.lazy(() => business);
const address = z.object({
    id: z.number().int().nonnegative().optional(),
    country: z.string().max(255),
    region: z.string().max(255).optional(),
    city: z.string().max(255),
    zip: z.string().max(20),
    street: z.string().max(255),
    latitude: z.string().max(255).optional(),
    longitude: z.string().max(255).optional(),
});
const customer = z.object({
    id: z.number().int().nonnegative(),
    email: z.string().email(),
    fullName: z.string().max(60),
    password: z.string().min(8).max(60),
    address: address,
    pfp: z.string().url().optional(),
    rating: z.number().int().nonnegative(),
    balance: z.number().int().nonnegative(),
    totalRewards: z.number().int().nonnegative(),
    visitedPlaces: z.number().int().nonnegative(),
    soldImages: z.number().int().nonnegative(),
    posts: z.array(postLazy).optional(),
});
const business = z.object({
    id: z.number().int().nonnegative(),
    email: z.string().email(),
    name: z.string().max(60),
    password: z.string().min(8).max(60),
    address: address,
    pfp: z.string().url().optional(),
    headerPic: z.string().url().optional(),
    type: z.nativeEnum(BusinessType),
    posts: z.array(postLazy).optional(),
});
const post = z.object({
    id: z.number().int().nonnegative(),
    customerId: z.number().int().nonnegative(),
    businessId: z.number().int().nonnegative(),
    url: z.string().url().optional(),
});
export const registerCustomer = z
    .object({
    email: customer.shape.email,
    password: customer.shape.password,
})
    .strict();
export const loginCustomer = z
    .object({
    email: customer.shape.email,
    password: customer.shape.password,
})
    .strict();
export const registerBusiness = z
    .object({
    email: business.shape.email,
    password: business.shape.password,
})
    .strict();
export const loginBusiness = z
    .object({
    email: business.shape.email,
    password: business.shape.password,
})
    .strict();
export const updateLoggedInCustomer = z
    .object({
    email: customer.shape.email.optional(),
    fullName: customer.shape.fullName.optional(),
    password: customer.shape.password.optional(),
    address: address.partial(),
    pfp: customer.shape.pfp.optional(),
})
    .strict();
export const updateLoggedInBusiness = z
    .object({
    email: business.shape.email.optional(),
    name: business.shape.name.optional(),
    password: business.shape.password.optional(),
    address: address.partial(),
    pfp: business.shape.pfp.optional(),
    header: business.shape.headerPic.optional(),
})
    .strict();
const extendedBusinessType = z.union([
    z.nativeEnum(BusinessType),
    z.literal("ANY"),
]);
export const getRandomBusinesses = z
    .object({
    amount: z.string().max(3),
    type: extendedBusinessType,
})
    .strict();
