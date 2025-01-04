import z from "zod";
import { FastifyTypedInstance } from "./types";

interface User {
    name: string;
    age: number;
}

const user: User[] = []

export async function routes(app: FastifyTypedInstance) {
  app.get('/users', {
    schema: {
        tags: ['users'],
        description: 'Get all users',
        response: {
            200: z.object({
                users: z.array(z.object({
                    name: z.string(),
                    age: z.number(),
                }))
            }).describe('List of users'),
        }
    }
  }, async (request, reply) => {
    return reply.status(200).send({ users: user });
  });

  app.post('/users', {
    schema: {
        tags: ['users'],
        description: 'Create a new user',
        body: z.object({
            name: z.string(),
            age: z.number(),
        }),
        response: {
            201: z.null().describe('User Created'),
        }
    }
  }, async (request, reply) => {
    const { name, age } = request.body;

    user.push({ name, age });
    return reply.status(201).send();
  })
}