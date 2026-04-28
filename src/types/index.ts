// ─── LINE ────────────────────────────────────────────────
export type LineProfile = {
  userId: string;
  displayName: string;
  pictureUrl: string;
};

// ─── Registration ─────────────────────────────────────────
export type RegisterPayload = {
  line_id: string;
  title: string;
  name: string;
  nickname?: string;
  phone: string;
  national_id: string;
  birth_date?: string;
  national_id_image?: string;
  line_display_name: string;
  // Step 2 — ข้อมูลมัคคุเทศก์
  licence_no?: string;
  licence_expiry?: string;
  languages?: string[];
  work_areas?: string[];
};

// ─── Guide ───────────────────────────────────────────────
export type GuideProfile = {
  id: number;
  title: string;
  name: string;
  nickname: string | null;
  phone: string;
  guide_type: string;
  line_id: string;
  image: string | null;
  license: { id: number; license_no: string } | null;
};

// ─── Tour ────────────────────────────────────────────────
export type TourStatus = 'pending' | 'completed';

export type GuideStatus =
  | 'pending'
  | 'arranged'
  | 'waiting'
  | 'approved'
  | 'cancelled';

export type CheckInStatus = 'pending' | 'check-in' | 'no-show';

export type TourItem = {
  id: number;
  booking_code: string;
  customer_name: string;
  phone: string | null;
  language: string | null;
  option: string | null;
  pax: number;
  remark: string | null;
  zone: string | null;
  zone_item: string | null;
  pick_up_time: string | null;
  check_in_status: CheckInStatus;
  check_in_pax: number | null;
  no_show_pax: number | null;
  no_show_condition: string | null;
  check_in_time: string | null;
};

export type GuideTask = {
  id: number | null;
  name: string | null;
  nickname: string | null;
  phone: string | null;
  position: string;
  guide_type: string | null;
};

export type GuidePortalTour = {
  id: number;
  trip_code: string;
  tour_date: string;
  tour_time: string;
  tour_status: TourStatus;
  guide_status: GuideStatus;
  tour_type: string;
  tour_direction: string | null;
  program_name: string | null;
  program_list_name: string | null;
  group_type_name: string | null;
  capacity: number | null;
  total_pax: number;
  check_in_remark: string | null;
  guide_task: GuideTask[];
  vehicle_task: Record<string, unknown>[];
  driver_task: Record<string, unknown>[];
  tour_items: TourItem[];
};

// ─── API Requests ────────────────────────────────────────
export type UpdateCheckInPayload = {
  check_in_status: CheckInStatus;
  check_in_pax?: number;
  no_show_pax?: number;
  no_show_condition?: string;
};
