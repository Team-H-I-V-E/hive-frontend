import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
    production: false,
    kakaoMapApiKey: process.env['API_KEY'],
};
