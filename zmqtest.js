'use strict';

const zmq = require( 'zmq' );
const message = require( './message' );
const Test = require( './test' );

class ZMQTest extends Test {
	run() {
		console.log( `Testing ZMQ req-rep with message size = ${this.messageLength} bytes` );

		// Responder
		const responder = zmq.socket( 'rep' );

		responder.on( 'message', ( msg ) => {
			responder.send( msg );
		} );

		responder.bind( 'tcp://*:5555', ( err ) => {
			if ( err ) {
				throw err;
			}
		} );

		// Requester
		const requester = zmq.socket( 'req' );

		requester.on( 'message', ( msg ) => {
			message.check( msg );
			this.counter++;
			sendMessage();
		} );

		requester.connect( 'tcp://localhost:5555', ( err ) => {
			if ( err ) {
				throw err;
			}
		} );

		const sendMessage = () => {
			requester.send( message.create( this.messageLength ) );
		};

		sendMessage();

		this.printResults();
	}
}

module.exports = ZMQTest;
