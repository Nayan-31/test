export interface ApiResponse {
    data ?: object; //Agar tum ? hata doge then , TypeScript bolta hai ki har response me data aur error dono dene hi padenge.
    success : boolean;
    message : string;
    error ?: object
}