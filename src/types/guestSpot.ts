export interface GuestSpot {
  _id: string;

  startDate: Date;
  endDate: Date;

  startTime?: string;
  endTime?: string;

  location: {
    coordinates: [number, number];
    until: string;
  };
  stringLocation: string;

  isActive: boolean;
}
