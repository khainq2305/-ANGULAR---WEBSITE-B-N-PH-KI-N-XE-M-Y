export interface ICategory{
    name: string,
    id: number;  
    status: number; 
}
export interface ICategoryResponse {
    data: ICategory[];
    message: string;
    status: number;
  }