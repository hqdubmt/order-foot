class ErrorReponser {
  constructor({ status, code, message, description }) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.description = description;
    this.timestamp = new Date().toISOString();
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

module.exports = {
  ErrorReponser
};
