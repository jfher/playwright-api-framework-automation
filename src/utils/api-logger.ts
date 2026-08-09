import type { TestInfo } from '@playwright/test';

export interface ApiLog {
  method: string;
  url: string;
  status: number;
  duration: number;
  requestBody?: unknown;
  responseBody?: unknown;
}

function serializeBody(body: unknown): string {
  if (body === undefined) {
    return '';
  }

  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
}

function sanitizeBody(body: unknown): unknown {
  if (!body || typeof body !== 'object') {
    return body;
  }

  const clone = JSON.parse(JSON.stringify(body)) as Record<string, unknown>;

  const sensitiveFields = ['password', 'token', 'authorization', 'cookie'];

  for (const field of sensitiveFields) {
    if (field in clone) {
      clone[field] = '[REDACTED]';
    }
  }

  return clone;
}

export async function logApiInteraction(testInfo: TestInfo, log: ApiLog): Promise<void> {
  const sanitizedRequest = sanitizeBody(log.requestBody);
  const sanitizedResponse = sanitizeBody(log.responseBody);

  console.log(
    [
      '',
      '========== API REQUEST ==========',
      `${log.method} ${log.url}`,
      `Status: ${log.status}`,
      `Duration: ${log.duration} ms`,
      '',
      'Request body:',
      serializeBody(sanitizedRequest),
      '',
      'Response body:',
      serializeBody(sanitizedResponse),
      '=================================',
      '',
    ].join('\n'),
  );

  await testInfo.attach('api-request', {
    body: Buffer.from([`${log.method} ${log.url}`, '', 'Request body:', serializeBody(sanitizedRequest)].join('\n')),
    contentType: 'text/plain',
  });

  await testInfo.attach('api-response', {
    body: Buffer.from([`Status: ${log.status}`, `Duration: ${log.duration} ms`, '', 'Response body:', serializeBody(sanitizedResponse)].join('\n')),
    contentType: 'text/plain',
  });
}
