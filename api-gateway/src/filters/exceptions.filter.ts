import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { z } from "zod";

const errorSchema = z.object({
    statusCode: z.number(),
    error: z.string()
});

@Catch()
export class AppFilter implements ExceptionFilter {
    public catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const parsedError = errorSchema.safeParse(exception);

        if (parsedError.success) {
            return response.status(parsedError.data.statusCode).send({
                error: parsedError.data.error
            });
        }

        response.status(500).send({
            error: String(exception)
        });
    }
}
