/**
 * Multi-step registration form store
 * - step1: ข้อมูลทั่วไป
 * - step2: ข้อมูลมัคคุเทศก์
 */

import { create } from 'zustand';

export type RegisterStep1 = {
  title: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  nationalId: string;
  nationalIdImageFile: File | null;
};

export type RegisterStep2 = {
  licenceNo: string;
  licenceExpiry: string;
  languages: string[];
  workAreas: string[];
  licenceImageFile: File | null;
};

type RegisterFormStore = {
  step1: Partial<RegisterStep1>;
  step2: Partial<RegisterStep2>;
  setStep1: (data: RegisterStep1) => void;
  setStep2: (data: Partial<RegisterStep2>) => void;
  resetForm: () => void;
};

export const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  step1: {},
  step2: { languages: [], workAreas: [] },
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) =>
    set((prev) => ({ step2: { ...prev.step2, ...data } })),
  resetForm: () => set({ step1: {}, step2: { languages: [], workAreas: [] } }),
}));
