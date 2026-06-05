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
    const response = await fetch(`${DEMO_API_URL}${path}`, {
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
        error: "Failed to call FainPi demo server.",
        detail: getErrorMessage(error),
        hint: "Make sure the demo server is running on the configured API URL.",
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

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}