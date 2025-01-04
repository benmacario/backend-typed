import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { routes } from './routes';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'My Backend typed with Zod',
            version: '0.1.0',
        },
    },
    transform: jsonSchemaTransform
})
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})


app.register(routes)

app.listen({ port: 3000 }).then(() => {
    console.log('Server running on http://localhost:3000');
})