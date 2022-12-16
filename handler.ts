'use strict';

export async function viewSpotFinder(event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
        context,
      },
      null,
      2
    ),
  };
};
