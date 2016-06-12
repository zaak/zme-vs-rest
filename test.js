'use strict';

class Test {
	constructor( messageLength ) {
		this.messageLength = messageLength;
		this.counter = 0;
		this.results = [];
	}

	printResults() {
		setInterval( () => {
			console.log( `${this.counter} msg/s` );
			this.results.push( this.counter );
			this.counter = 0;
		}, 1000 );

		process.on( 'SIGINT', this.sumUp.bind( this ) );
	}

	sumUp() {
		var sum = 0;

		for ( var i = 0; i < this.results.length; i++ ) {
			sum += this.results[ i ];
		}

		var avg = parseInt( sum / this.results.length, 10 );
		console.log( `\nAverage msg/s: ${avg}` );

		process.exit();
	}

	run() {
		throw Error( 'Not implemented' );
	}
}

module.exports = Test;
