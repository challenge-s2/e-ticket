import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { throwError } from "rxjs";

@Catch()
export class AppFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost) {
        if (exception instanceof BadRequestException) {
            return throwError(() => {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: exception.message
                }
            });
        }

        return throwError(() => {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: String(exception)
            }
        });
    }
}
