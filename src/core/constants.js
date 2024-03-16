export const CDK = {
  ACCOUNT: {
    DEVELOPMENT: "development",
    MANAGEMENT: "management",
    OPERATIONS: "operations",
    PRODUCTION: "production",
    SANDBOX: "sandbox",
    SECURITY: "security",
    STAGE: "stage",
  },
  BUILD: {
    CONFIG: {
      ALL: "all",
      API: "api",
      INFRASTRUCTURE: "infrastructure",
      NONE: "none",
      WEB: "web",
    },
    EPHEMERAL: "ephemeral",
    STATIC: "static",
  },
  CREATION: {
    CDK: "cdk",
    CLOUDFORMATION_TEMPLATE: "template",
    MANUAL: "manual",
  },
  DEFAULT: {
    REGION: "us-east-1",
  },
  DURATION: {
    EXPRESS_API: 30,
    LAMBDA_WORKER: 120,
  },
  ENV: {
    LOCAL: "local",
    MAIN: "main",
    META: "meta",
    PRODUCTION: "production",
    SANDBOX: "sandbox",
  },
  HOST: {
    APEX: "@",
  },
  IMPORT: {
    OIDC_PROVIDER: "github-oidc-provider",
  },
  LAMBDA: {
    LOG_RETENTION: 90,
    MEMORY_SIZE: 1024,
  },
  PROJECT: {
    INFRASTRUCTURE: "infrastructure",
  },
  ROLE: {
    API: "api",
    DEPLOY: "deploy",
    HOSTING: "hosting",
    MONITORING: "monitoring",
    NETWORKING: "networking",
    PROCESSING: "processing",
    SECURITY: "security",
    STACK: "stack",
    STORAGE: "storage",
    TOY: "toy",
  },
  SERVICE: {
    INFRASTRUCTURE: "infrastructure",
    LIBRARIES: "libraries",
    NONE: "none",
    TRACE: "trace",
  },
  TAG: {
    BUILD_DATE: "buildDate",
    BUILD_HEX: "buildHex",
    BUILD_NUMBER: "buildNumber",
    BUILD_TIME: "buildTime",
    BUILD_TYPE: "buildType",
    COMMIT: "commit",
    CREATION: "creation",
    ENV: "env",
    NONCE: "nonce",
    PROJECT: "project",
    ROLE: "role",
    SERVICE: "service",
    SPONSOR: "sponsor",
    STACK: "stack",
    STACK_SHA: "stackSha",
    VENDOR: "vendor",
    VERSION: "version",
  },
};

export const JAYPIE = {
  LIB: {
    AWS: "@jaypie/aws",
    CDK: "@jaypie/cdk",
    CORE: "@jaypie/core",
    EXPRESS: "@jaypie/express",
    JAYPIE: "jaypie",
    LAMBDA: "@jaypie/lambda",
    MONGOOSE: "@jaypie/mongoose",
    TESTKIT: "@jaypie/testkit",
    VUEKIT: "@jaypie/vuekit",
  },
  LAYER: {
    EXPRESS: "express",
    HANDLER: "handler",
    JAYPIE: "jaypie",
    LAMBDA: "lambda",
    MODULE: "module",
  },
  UNKNOWN: "unknown",
};

export const PROJECT = {
  SPONSOR: {
    FINLAYSON: "finlaysonstudio",
    JAYPIE: "jaypie",
    KNOWDEV: "knowdev.studio",
  },
};
