declare global {
  interface Window {
    _env_: {
      VITE_API_BASE_URL: string;
      VITE_SOURCE_TYPE: string;
      VITE_STORAGE_ACCOUNT: string;
      VITE_CONTAINER_NAME: string;
      VITE_KEYCLOAK_BASE_URL: string;
      VITE_KEYCLOAK_CLIENT_ID: string;
      VITE_KEYCLOAK_REALM: string;
      VITE_RUN_IN_STRICT_MODE: string;
      VITE_COPILOT_ID: string;
      VITE_LETTER_TYPE_SIZE_UPLOAD_LIMIT_MB: number;
      VITE_THEME_VARIANT: string;
      VITE_SUB_APP_PATH: string;
      VITE_CLIENT_NAME: string;
      VITE_TIME_ZONE: string;
      VITE_CLIENT_ID: string;
      VITE_APP_IS_TEST_READY: boolean;
      // Advanced Edit configuration (legacy)
      VITE_ADVANCED_EDIT_URL: string;
      VITE_USE_ADVANCED_EDIT: string;
      VITE_MAX_FILE_SIZE_FOR_UPLOAD: string;
      VITE_APP_ENV: string;
      VITE_USER_MANAGEMENT_URL: string;
      VITE_PRODUCT_VERSION: string;
      VITE_RELEASE_VERSION: string;
      VITE_IMPACTED_LETTER_TYPE_APPROVAL: string;
      VITE_UM_RELEASE: string;
      [key: string]: any; // for any other properties you might have on _env_
    };
  }
}

// const env = window._env_ ? window._env_ : process.env;
const env = process.env;
export const envConfig = {
  apiBaseUrl: env.NEXT_PUBLIC_DOCX_CONVERTER_API,
  sourceType: env.VITE_SOURCE_TYPE,
  storageAccount: env.VITE_STORAGE_ACCOUNT,
  containerName: env.VITE_CONTAINER_NAME,
  keycloakBaseUrl: env.VITE_KEYCLOAK_BASE_URL,
  keycloakClientId: env.VITE_KEYCLOAK_CLIENT_ID,
  keycloakRealm: env.VITE_KEYCLOAK_REALM,
  runInStrictMode: env.VITE_RUN_IN_STRICT_MODE,
  copilotId: env.VITE_COPILOT_ID,
  letterTypeFileSizeLimitMb: env.VITE_LETTER_TYPE_SIZE_UPLOAD_LIMIT_MB,
  themeVariant: env.VITE_THEME_VARIANT,
  clientName: env.VITE_CLIENT_NAME || "molina",
  appSubPath: env.VITE_SUB_APP_PATH || "",
  timeZone: env.VITE_TIME_ZONE || "America/Los_Angeles",
  fallbackClientId: env.VITE_CLIENT_ID,
  // Advanced Edit configuration (with legacy env var fallback)
  advancedEditUrl: env.VITE_ADVANCED_EDIT_URL || env.VITE_COLLABORA_URL || "http://localhost:9980",
  useAdvancedEdit: env.VITE_USE_ADVANCED_EDIT === "true" || env.VITE_USE_COLLABORA === "true",
  maxFileSizeForUpload: env.VITE_MAX_FILE_SIZE_FOR_UPLOAD || 100,
  appEnv: env.VITE_APP_ENV || "DEV",
  appIsTestReady: env.VITE_APP_IS_TEST_READY,
  userManagementUrl: env.VITE_USER_MANAGEMENT_URL,
  productVersion: env.VITE_PRODUCT_VERSION || "v1.0.0",
  releaseVersion: env.VITE_RELEASE_VERSION || "26.03.25",
  impactedLetterTypeApproval: env.VITE_IMPACTED_LETTER_TYPE_APPROVAL || "false",
  umRelease: env.VITE_UM_RELEASE || "false"
  
};