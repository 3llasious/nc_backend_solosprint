//the original class for error is built into js

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = NotFoundError;
  }
}

module.exports = NotFoundError;
