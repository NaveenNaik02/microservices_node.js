export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  CREATED: 201,
};

export const TYPES = {
  USER_REPOSITORY: Symbol.for("User Repository"),
  USER_SERVICE: Symbol.for("User Service"),
};
