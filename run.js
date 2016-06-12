'use strict';

function usage() {
	console.log(
		'Usage:\n' +
		'node run.js [rest|zmq] [message size in bytes]\n' +
		'e.g.\n' +
		'node run.js rest 512\n' +
		'node run.js zmq 512'
	);
}

const argv = process.argv;

if ( argv.length != 4 ) {
	usage();
	process.exit();
}

let testType = argv[ 2 ].toLowerCase();
let messageLength = parseInt( argv[ 3 ] );
let test = null;

switch ( testType ) {
	case 'rest':
		const RESTTest = require( './resttest' );
		test = new RESTTest( messageLength );
		break;
	case 'zmq':
		const ZMQTest = require( './zmqtest' );
		test = new ZMQTest( messageLength );
		break;
	default:
		usage();
		process.exit();
}

if ( test ) {
	test.run();
}