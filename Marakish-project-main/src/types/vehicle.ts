export interface Vehicle {
  id: string; // The specific VL0465 part from path or document ID
  crn: number;
  docsUrl: string;
  manufacturer: string;
  model: string;
  modelYear: number;
  mubayaStatus: string;
  parkingLocation: string;
  picsUrl: string;
  purchasingDate: any; // Timestamp
  serialNumber: string;
  soldStatus: string;
  totalAccruedCost: number;
  vehiclePurchaseCost: number;
  vendor: string;
  vinChassisNumber: string;
  color?: string;
}
