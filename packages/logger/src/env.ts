type TEnv = {
  grafanaLokiUrl: string | 'NA'
  grafanaLokiAuthToken: string | 'NA'
  enableGrafanaLokiLogging: boolean
}

export const env: TEnv = {
  grafanaLokiUrl: process.env.GRAFANA_LOKI_URL || 'NA',
  grafanaLokiAuthToken: process.env.GRAFANA_LOKI_AUTH_TOKEN || 'NA',
  enableGrafanaLokiLogging: process.env.ENABLE_GRAFANA_LOKI_LOGGING === 'true'
}
