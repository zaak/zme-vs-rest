'use strict';

const crypto = require( 'crypto' );

module.exports = {
	create: ( messageLength ) => {
		const buf = 'a'.repeat( messageLength );

		let message = {
			payload: buf,
			checksum: crypto.createHash( 'md5' ).update( buf ).digest( 'hex' )
		};

		return JSON.stringify( message );
	},
	check: ( msg ) => {
		let message = JSON.parse( msg );
		let checksum = crypto.createHash( 'md5' ).update( message.payload ).digest( "hex" );

		if ( message.checksum !== checksum ) {
			throw Error( 'Invalid checksum!' );
		}
	}
};

