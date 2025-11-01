const API_BASE_URL = 'https://api.lavishtravelsandtours.online';

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

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    throw error;
  }
}
