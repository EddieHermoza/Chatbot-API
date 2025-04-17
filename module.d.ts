declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    DATABASE_URL: string;
    STACK_AI_API_PRIVATE_KEY: string;
    STACK_AI_API_KEY: string;
  }
}
