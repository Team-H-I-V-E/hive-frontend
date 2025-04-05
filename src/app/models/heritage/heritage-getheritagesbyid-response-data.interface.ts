export interface GetHeritagesByIdResponseData {
  "heritageId": number;
  "heritageName": string;
  "heritageDescription": string;
  "heritageLocation": string;
  "heritageLatitude": number;
  "heritageLongitude": number;
  "heritage3DModel": {
    "heritage3dModelId": number; 
    "modelFileUrl": string;
  };
}
