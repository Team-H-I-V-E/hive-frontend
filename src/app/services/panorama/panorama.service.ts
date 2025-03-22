import { Injectable } from "@angular/core";

export interface PanoramaViewer {
    panoramaViewerID: number;
    ruinsName: string;
    ruinsAge: string;
    ruinsLocation: string;
    ruinsInformation: string;
    panoramaViewerImage: string;
    panoramaViewerCoordinate: Point;
}

interface Point {
    x: number;
    y: number;
}

interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

@Injectable ({
    providedIn: 'root'
})
export class PanoramaViewerService {
    private apiUrl = 'http://localhost:3000/api/panoramaViewers';

    async getAllPanoramaViewers(): Promise<ApiResponse<PanoramaViewer[]>> {
        try {
            const response = await fetch(`${this.apiUrl}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: ApiResponse<PanoramaViewer[]> = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error: ', error);
            throw error;
        }
    }

    async getPanoramaViewerDetail(panoramaViewerID: number): Promise<ApiResponse<PanoramaViewer>> {
        try {
            const response = await fetch(`${this.apiUrl}/${panoramaViewerID}`)
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const data: ApiResponse<PanoramaViewer> = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error: ', error);
            throw error;
        }
    }

}