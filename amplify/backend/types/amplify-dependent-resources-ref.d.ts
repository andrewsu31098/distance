export type AmplifyDependentResourcesAttributes = {
    "function": {
        "calculateDistance": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "distanceAPI": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "cityAPI": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "distance426efeb7": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "citybannerstorage": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}