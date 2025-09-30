export interface Purpose {
  name: string;
}

export interface QueueItem {
  id: number;
  name: string;
  phone: string;
  purpose: Purpose;
  staff: string;
  ticket_number: number;
  status: "waiting" | "serving" | "completed";
  created_at: Date;
}

export interface QueuesStats {
  serving_count: number;
  waiting_count: number;
  completed_count: number;
}
