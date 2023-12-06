const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

async function getSecret() {
  const secretName = "accessS3Bucket";
  const client = new SecretsManagerClient({ region: "us-west-1" });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
    console.log("Secret fetched successfully:", response);
    return response.SecretString;
  } catch (error) {
    console.error("Error fetching secret:", error);
    throw error;
  }
}

getSecret()
  .then((secretString) => {
    console.log("The secret is:", secretString);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
