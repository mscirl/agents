import { fastifyCors } from '@fastify/cors';
import fastify from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { getRoomsRoute } from './http/routes/get-rooms';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Check server health
app.get('/health', () => {
    return 'OK' ;
});

app.register(getRoomsRoute);


app.listen({ port: env.PORT })