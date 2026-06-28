'use strict';

function createRestClient({ baseUrl = '', timeoutMs = 10000, apiKey = '' } = {}) {
  async function request(path, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const mergedHeaders = { ...(options.headers || {}) };
      if (!Object.keys(mergedHeaders).some((header) => header.toLowerCase() === 'content-type')) {
        mergedHeaders['content-type'] = 'application/json';
      }

      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
          ...(apiKey ? { 'x-api-key': apiKey } : {}),
          ...mergedHeaders,
        },
        signal: controller.signal,
      });

      const bodyText = await response.text();
      return {
        ok: response.ok,
        status: response.status,
        body: bodyText,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    request,
    ping: () => request('/health', { method: 'GET' }),
  };
}

module.exports = {
  createRestClient,
};
