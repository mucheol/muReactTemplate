export type ReservationStatus = 'pending' | 'confirmed' | 'canceled';

export interface ReservationItem {
  id: string;
  customerName: string;
  date: string; // ISO or YYYY-MM-DD
  time: string; // HH:mm
  people: number;
  status: ReservationStatus;
  memo?: string;
}