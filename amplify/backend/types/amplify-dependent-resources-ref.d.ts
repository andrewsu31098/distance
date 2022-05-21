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
    }
}