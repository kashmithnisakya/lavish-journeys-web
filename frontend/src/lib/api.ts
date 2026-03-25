const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gdt2yjoph4.execute-api.us-east-2.amazonaws.com';

export interface InquiryPayload {
  email: string;
  inquiry_type: string;
  name: string;
  phone: string;
  question: string;
}

export interface InquiryResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

const MAX_RETRIES = 2;

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = MAX_RETRIES
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      // Don't retry client errors (4xx), only server errors (5xx) and network issues
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }
      if (attempt === retries) return response;
    } catch (error) {
      if (attempt === retries) throw error;
    }
    await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
  }
  throw new Error('Request failed after retries');
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed. Please try again.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    throw error;
  }
}
