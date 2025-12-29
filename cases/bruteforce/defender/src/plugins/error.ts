// Import Third-party Dependencies
import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest
} from "fastify";
import fp from "fastify-plugin";

export interface HttpErrorOptions {
  statusCode: number;
  message: string;
  cause?: Error;
}

export class HttpError extends Error {
  public code: string;
  public statusCode: number;
  public properties: Record<string, any>;
  public override cause?: Error;

  constructor(
    code: string,
    options: HttpErrorOptions
  ) {
    const { statusCode, message, cause } = options;
    super(message);

    this.code = code;
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

async function errorHandler(server: FastifyInstance): Promise<void> {
  server.setErrorHandler(errorLogger);
}

async function errorLogger(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  let message = "Internal Server Error";
  let code = "INTERNAL-ERROR";
  let statusCode = 500;

  if (error instanceof HttpError) {
    code = error.code;
    statusCode = error.statusCode;
    message = error.message;
  }

  request.server.log.error(error);
  reply.statusCode = statusCode;

  return {
    code,
    message
  };
}

export const errorPlugin: FastifyPluginAsync<ErrorOptions> = fp(
  errorHandler,
  { name: "error" }
);
