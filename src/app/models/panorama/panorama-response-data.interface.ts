export interface GetPanoramaResponseData {
  "Panorama_panoramaId": number;
  "Panorama_ruinsAge": string;
  "Panorama_panoramaLatitude": number;
  "Panorama_panoramaLongitude": number;
}

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

export interface PanoramaImage {
  "panoramaImages_panoramaImageId": number;
  "panoramaImages_imageUrl": string;
  "panoramaImages_panoramaPanoramaId": number;
}

export interface TargetPanoramaImage {
  "targetPanoramaImage_panoramaImageId": number;
  "targetPanoramaImage_imageUrl": string;
  "targetPanoramaImage_panoramaPanoramaId": number;
}

export interface MiniMapPoint {
  "miniMapPoints_id": number;
  "miniMapPoints_x": number;
  "miniMapPoints_y": number;
  "miniMapPoints_panoramaPanoramaId": number;
  "miniMapPoints_targetPanoramaImagePanoramaImageId": number;
  "targetPanoramaImage?": TargetPanoramaImage;
}

export interface GetPanoramaByIdResponseData {
  "panorama_panoramaId": number;
  "panorama_ruinsImage": string;
  "panorama_ruinsName": string;
  "panorama_ruinsAge": string;
  "panorama_ruinsLocation": string;
  "panorama_ruinsInformation": string;
  "panorama_panoramaLatitude": number;
  "panorama_panoramaLongitude": number;
  "panorama_minimapImage": string;
  "panoramaImages": PanoramaImage[];
  "miniMapPoints": MiniMapPoint[];
}
