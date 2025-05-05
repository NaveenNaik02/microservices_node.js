import { STATUS_CODES } from "../constants";

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly message: string;

  constructor(name: string, status: number, description: string) {
    super(description);
    this.name = name;
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

//500 internal server error
export class APIError extends BaseError {
  static readonly DEFAULT_NAME = "api internal server error";
  constructor(description = APIError.DEFAULT_NAME) {
    super(APIError.DEFAULT_NAME, STATUS_CODES.INTERNAL_ERROR, description);
  }
}

//400 validation error
export class ValidationError extends BaseError {
  static readonly DEFAULT_NAME = "bad request";
  constructor(description = ValidationError.DEFAULT_NAME) {
    super(ValidationError.DEFAULT_NAME, STATUS_CODES.BAD_REQUEST, description);
  }
}

//403 authorize error
export class AuthorizeError extends BaseError {
  static readonly DEFAULT_NAME = "authentication error";
  constructor(description = AuthorizeError.DEFAULT_NAME) {
    super(AuthorizeError.DEFAULT_NAME, STATUS_CODES.UN_AUTHORIZED, description);
  }
}

//404 not found error
export class NotFoundError extends BaseError {
  static readonly DEFAULT_NAME = "not found";
  constructor(description = NotFoundError.DEFAULT_NAME) {
    super(NotFoundError.DEFAULT_NAME, STATUS_CODES.NOT_FOUND, description);
  }
}
