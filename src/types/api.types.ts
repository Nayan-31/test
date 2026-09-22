export interface ApiResponse {
    success : boolean;
    message : string;
    data ?: object; //Agar tum ? hata doge then , TypeScript bolta hai ki har response me data aur error dono dene hi padenge.
    error ?: object
}