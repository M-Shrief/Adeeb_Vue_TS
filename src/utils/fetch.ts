
export const apiURL = (relativeURL: string) => import.meta.env.VITE_API_URL + relativeURL;

export enum ContentType {
    JSON='application/json;charset=utf-8'
}