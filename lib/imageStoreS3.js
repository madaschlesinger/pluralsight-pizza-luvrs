'use strict';
const AWS = require( 'aws-sdk');
const s3  = new AWS.S3() ;


module.exports.save = (name, data, callback ) => {
    let params = {
      Bucket : 'mada.schlesinger.pizza-luvrs',
      Key: `pizzas/${name}.png`,
      Body: new Buffer( data, 'base64'),
      ContentEncoding: 'base64'
    };

    s3.putObject( params, (err, data) => {
      callback(err, `//s3.amazonaws.com/mada.schlesinger.pizza-luvrs/pizzas/${params.Key}`);
    })
};
