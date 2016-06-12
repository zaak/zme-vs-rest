'use strict';

const Hapi = require( 'hapi' );
const request = require( 'request' );
const message = require( './message' );
const Test = require( './test' );

class RESTTest extends Test {
	run() {
		console.log( `Testing REST with message size = ${this.messageLength} bytes` );

		// Server setup
		const server = new Hapi.Server();

		server.connection( {
			host: 'localhost',
			port: 5555
		} );

		server.route( {
			path: '/',
			method: 'POST',
			config: {
				payload: {
					parse: false,
					maxBytes: 1048576 * 20 // 20 MB
				}
			},
			handler: ( request, reply ) => {
				reply( request.payload );
			}
		} );

		server.start( ( err ) => {
			if ( err ) {
				throw err;
			}
		} );

		// Client setup
		const sendMessage = () => {
			request.post( 'http://localhost:5555', { body: message.create( this.messageLength ) }, ( err, response, body ) => {
				message.check( body );
				this.counter++;
				sendMessage();
			} );
		};

		sendMessage();

		this.printResults();
	}
}

module.exports = RESTTest;

