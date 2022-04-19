export interface ConsulServiceConfig {
  app: ConsulAppConfig;
  database: ConsulDatabaseConfig;
  redis: ConsulRedisConfig;
  eventstore: ConsulEventstoreConfig;
}

export interface ConsulAppConfig {
  port: number;
  grpcPort: number;
}

export interface ConsulDatabaseConfig {
  type: string;
  host: string;
  port: number;
  database_name: string;
  user: string;
  password: string;
}

export interface ConsulEventstoreConfig {
  poolMax: any;
  poolMin: any;
  streamProtocol: string;
  hostname: string;
  httpPort: number;
  httpPotocol: string;
  tcpPassword: string;
  tcpUsername: string;
  tcpPort: number;
  tcpProtocol: string;
}

export interface ConsulRedisConfig {
  host: string;
  port: string;
  password: string;
}

export interface ConsulKeycloakConfig {
  authServerUrl: string;
  realm: string;
  resource?: string;
  clientId: string;
  secret?: string;
  public?: boolean;
  bearerOnly?: boolean;
  realmPublicKey?: string
}
