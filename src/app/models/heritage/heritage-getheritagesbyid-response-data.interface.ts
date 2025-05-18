export interface GetHeritagesByIdResponseData {
  "heritageId": number;
  "heritageName": string;
  "heritageDescription": string;
  "heritageYear": string;
  "heritageLocation": string;
  "heritageLatitude": number;
  "heritageLongitude": number;
  "heritage3DModel": {
    "heritage3dModelId": number; 
    "modelFileUrl": string;
  };
  "heritageImageUrl": string;
"heritageType": string;      
  "heritageCategory": string;
  "heritagePeriodArea": string;
  "designationDate": Date | null;
}
