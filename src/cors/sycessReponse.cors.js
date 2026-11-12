
const statusCodesUtils = require('../utils/statusCodes.utils');
const reasonPhrasesUtils = require('../utils/reasonPhrases.utils');
const codeCustom = require('../utils/codeCustom.util');

class SuccessResponse {
    constructor(message, status, code, description, metadata) {
        this.message = message;
        this.status = status;
        this.code = code;
        this.description = description;
        this.timestamp = new Date().toISOString();
        this.metadata = metadata;
    }

    send(res) {
        return res.status(this.status).json(this);
    }
}

// 200 - OK
class Ok extends SuccessResponse {
    constructor({
        message = reasonPhrasesUtils.OK,
        status = codeCustom.SUCCESS.status || statusCodesUtils.OK,
        code,
        description,
        metadata = {},
        options = {}
    } = {}) {
        const definition = codeCustom.getByStatus(status);
        super(
            message,
            status,
            code ?? definition?.code ?? null,
            description ?? definition?.description ?? null,
            metadata
        );
        this.options = options;
    }
}

// 201 - CREATED
class Created extends SuccessResponse {
    constructor({
        message = reasonPhrasesUtils.CREATED,
        status = codeCustom.CREATED.status || statusCodesUtils.CREATED,
        code,
        description,
        metadata = {},
        options = {}
    } = {}) {
        const definition = codeCustom.getByStatus(status);
        super(
            message,
            status,
            code ?? definition?.code ?? null,
            description ?? definition?.description ?? null,
            metadata
        );
        this.options = options;
    }
}

// 202 - ACCEPTED
class Accepted extends SuccessResponse {
    constructor({
        message = reasonPhrasesUtils.ACCEPTED,
        status = codeCustom.ACCEPTED.status || statusCodesUtils.ACCEPTED,
        code,
        description,
        metadata = {},
        options = {}
    } = {}) {
        const definition = codeCustom.getByStatus(status);
        super(
            message,
            status,
            code ?? definition?.code ?? null,
            description ?? definition?.description ?? null,
            metadata
        );
        this.options = options;
    }
}

// 204 - NO CONTENT
class NoContent extends SuccessResponse {
    constructor({
        message = reasonPhrasesUtils.NO_CONTENT,
        status = codeCustom.NO_CONTENT.status || statusCodesUtils.NO_CONTENT,
        code,
        description
    } = {}) {
        const definition = codeCustom.getByStatus(status);
        super(
            message,
            status,
            code ?? definition?.code ?? null,
            description ?? definition?.description ?? null,
            null
        );
    }

    send(res) {
        return res.status(this.status).end();
    }
}

module.exports = {
    SuccessResponse,
    Ok,
    Created,
    Accepted,
    NoContent
};
