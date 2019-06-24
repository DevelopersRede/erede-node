"use strict";

const Transaction = require('../transaction');
const RedeError = require('../exception/RedeError');
const http = require('https');
const bl = require('bl');

module.exports = class TransactionService {
    constructor(store) {
        this.store = store;
    }

    static get POST() {
        return 'POST';
    }

    static get GET() {
        return 'GET';
    }

    static get PUT() {
        return 'PUT';
    }

    getUrl() {
        let endpoint = this.store.environment.endpoint;

        return `${endpoint}/transactions`;
    }

    async execute() {
        throw new Error('Ńão implementado');
    }

    sendRequest(method, body = "") {
        const url = new URL(this.getUrl());
        const options = {
            hostname: url.hostname,
            post: 443,
            path: url.pathname,
            method: method,
            auth: this.store.filiation + ':' + this.store.token,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        return new Promise((resolve, reject) => {
            let client = http.request(options, response => {
                response.setEncoding('utf8');
                response.pipe(bl((error, data) => {
                    if (error) {
                        reject(error);
                    }

                    let json = JSON.parse(data.toString());

                    if (response.statusCode >= 400) {
                        if (!json || json.returnMessage === undefined) {
                            json = {};
                            json.returnMessage = 'Alguma coisa aconteceu';
                            json.returnCode = '-1';
                        }

                        reject(new RedeError(json.returnMessage, json.returnCode));
                    }

                    resolve(Transaction.fromJSON(json));
                }));
            });

            client.write(body);
            client.end();
        });
    }
};