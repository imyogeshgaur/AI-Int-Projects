export type EventType = {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: string;
  price: string;
  createdBy: string;
};

export type EventUpdateType = {
  title?: string;
  description?: string;
  date?: Date;
  location?: string;
  capacity?: string;
  price?: string;
};
