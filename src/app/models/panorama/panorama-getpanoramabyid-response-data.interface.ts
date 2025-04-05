export interface GetPanoramaByIdResponseData {
  "Panorama_panoramaId": number;
  "Panorama_ruinsName": string;
  "Panorama_ruinsAge": string;
  "Panorama_ruinsLocation": string;
  "Panorama_ruinsInformation": string;
  "Panorama_panoramaLatitude": number;
  "Panorama_panoramaLongitude": number;
  "Panorama_panoramaImage": {
    "panoramaImage": string;
  }[];
}