
const reasonPhrasesUtils = require('../utils/reasonPhrases.utils');
const statusCodesUtils = require('../utils/statusCodes.utils');
const codeCustom = require('../utils/codeCustom.util');

class ErrorReasonPhrases extends Error {
  constructor(message, status, code, details = null) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.timestamp = new Date().toISOString();
    this.details = details;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

class BadRequestError extends ErrorReasonPhrases {
  constructor(message = reasonPhrasesUtils.BAD_REQUEST, details = null) {
    super(
      message,
      statusCodesUtils.BAD_REQUEST,
      'BAD_REQUEST',
      details
    );
  }
}

class ValidationError extends ErrorReasonPhrases {
  constructor(message = codeCustom.VALIDATION_ERROR.message, details = null) {
    super(
      message,
      codeCustom.VALIDATION_ERROR.status,
      'VALIDATION_ERROR',
      details
    );
  }
}

class NotFoundError extends ErrorReasonPhrases {
  constructor(message = reasonPhrasesUtils.NOT_FOUND, details = null) {
    super(
      message,
      statusCodesUtils.NOT_FOUND,
      'NOT_FOUND',
      details
    );
  }
}

class UnauthorizedError extends ErrorReasonPhrases {
  constructor(message = reasonPhrasesUtils.UNAUTHORIZED, details = null) {
    super(
      message,
      statusCodesUtils.UNAUTHORIZED,
      'UNAUTHORIZED',
      details
    );
  }
}

class ForbiddenError extends ErrorReasonPhrases {
  constructor(message = reasonPhrasesUtils.FORBIDDEN, details = null) {
    super(
      message,
      statusCodesUtils.FORBIDDEN,
      'FORBIDDEN',
      details
    );
  }
}

class InternalServerError extends ErrorReasonPhrases {
  constructor(message = reasonPhrasesUtils.INTERNAL_SERVER_ERROR, details = null) {
    super(
      message,
      statusCodesUtils.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR',
      details
    );
  }
}

module.exports = {
  ErrorReasonPhrases,
  BadRequestError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
};
