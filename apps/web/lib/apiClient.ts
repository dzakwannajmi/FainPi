import {
  DEMO_API_URL,
  FAINPI_PAYMENT_HEADER,
  FAINPI_PAYMENT_HEADER_VALUE,
} from "@/lib/constants";
import type { ApiRequestOptions, ApiResult } from "@/types/api";

export async function callDemoEndpoint(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ApiResult> {
  try {
    const response = await fetch(createApiUrl(path), {
      headers: options.paid
        ? {
            [FAINPI_PAYMENT_HEADER]: FAINPI_PAYMENT_HEADER_VALUE,
          }
        : {},
    });

    const body = await response.json();

    return {
      status: response.status,
      body,
    };
  } catch (error) {
    return {
      status: null,
      body: {
        error: "Failed to call FainPi demo API.",
        detail: getErrorMessage(error),
        hint: "Make sure the API route is available or the configured API URL is valid.",
      },
    };
  }
}

export function createEmptyApiResult(message = "No request yet."): ApiResult {
  return {
    status: null,
    body: message,
  };
}

function createApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = DEMO_API_URL.trim();

  // Default mode for Vercel: use same-origin Next.js API routes.
  if (!baseUrl || baseUrl === "/") {
    return normalizedPath;
  }

  // Only allow absolute HTTP URLs for external demo servers.
  if (baseUrl.startsWith("http://") || baseUrl.startsWith("https://")) {
    return `${baseUrl.replace(/\/$/, "")}${normalizedPath}`;
  }

  // Safety fallback: avoid malformed URLs like "api/premium-data/api/free".
  return normalizedPath;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}