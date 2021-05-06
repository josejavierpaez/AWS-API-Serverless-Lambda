'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getTodo = (event, context, callback) => {
	const params = {
		TableName: 'TodoListTable',
		Key: {
			id: event.pathParameters.id
		},
	};

	dynamoDb.get(params, (error, data) => {
		if (error) {
			console.error(error);
			callback(new Error(error));
			return;
		}

		const response = data.Item
			? {
					statusCode: 200,
					body: JSON.stringify(data.Item),
			  }
			: {
					statusCode: 404,
					body: JSON.stringify({ message: 'Task not found' }),
			  };

		callback(null, response);
	});
};
