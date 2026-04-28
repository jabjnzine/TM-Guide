import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  const tenant = process.env.NEXT_PUBLIC_TENANT_ID;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (tenant) {
    config.headers['x-tenant-id'] = tenant;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

// ─── API functions ───────────────────────────────────────

export const authApi = {
  liffLogin: (lineAccessToken: string) =>
    api.post<{ access_token: string; guide: import('@/types').GuideProfile }>(
      '/auth/liff',
      { line_access_token: lineAccessToken },
    ),
};

export const guidePortalApi = {
  getProfile: () =>
    api.get<import('@/types').GuideProfile>('/guide-portal/profile'),

  getTours: (date?: string) =>
    api.get<import('@/types').GuidePortalTour[]>('/guide-portal/tours', {
      params: date ? { date } : undefined,
    }),

  getTourDetail: (id: number) =>
    api.get<import('@/types').GuidePortalTour>(`/guide-portal/tours/${id}`),

  acceptTour: (id: number) =>
    api.patch<{ message: string; guide_status: string }>(
      `/guide-portal/tours/${id}/accept`,
    ),

  updateCheckIn: (
    tourId: number,
    itemId: number,
    payload: import('@/types').UpdateCheckInPayload,
  ) =>
    api.patch<{ message: string }>(
      `/guide-portal/tours/${tourId}/check-in/${itemId}`,
      payload,
    ),
};
