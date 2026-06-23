export interface Vehicle {
  id: string;
  auctionNo: string;
  name: string;
  year: number;
  registrationNo: string;
  location: string;
  ownerType: string;
  kmDriven: string;
  fuelType: string;
  highestBid: number;
  fairMarketValue: number;
  image: string;
  timeLeftSeconds: number;
  isAcceptingBids: boolean;
  transmission: string;
}

export type RootStackParamList = {
  Main: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Auctions: undefined;
  Notifications: undefined;
  Settings: undefined;
};
