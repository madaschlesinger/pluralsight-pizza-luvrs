const AWS = require( 'aws-sdk');
AWS.config.update( { region: 'us-east-1' } ) ;

const dynamodb = new AWS.DynamoDB();

function putItem ( table, item, callback ) {

  console.log( 'dynamoStore.putItem( ' + table + ' ).' );

  let params = {
    TableName :table,
    Item: {}
  };

  for( let key of Object.keys(item)) {
    let val;
    if (typeof item[key] === 'string' ) {
      val = { S: item[key] } ;
    } else if (typeof item[key] === 'number' ) {
      val = { N: '' + item[key] } ;
    } else if (item[key] instanceof Array ) {
      val = { SS: item[key] } ;
    }
    else {
      console.log( 'dynamoStore.putItem( type error ).' );
    }
    params.Item[key] = val;
  }

  // console.log( 'dynamoStore.putItem( val:' + val + ' ).' );

  dynamodb.putItem( params , callback );
}

function getAllItems ( table,  callback ) {
  let params = {
    TableName :table
  };

  // console.log( 'dynamoStore.getAllItems( ' + table + ' ).' );

  dynamodb.scan( params , callback );

  // console.log( 'dynamoStore.getAllItems( ' + callback + ' ). After Scan' );

}



function getItem ( table,  idName, id, callback ) {
  let params = {
    TableName :table,
    Key: {}
  };
  console.log( 'dynamoStore.getItem( ' + table + ' ).' );

  params.Key[idName] = { S: id };
  dynamodb.getItem( params , callback );
}

module.exports.putItem = putItem ;
module.exports.getItem = getItem ;
module.exports.getAllItems = getAllItems ;
