export type BaseModel = {
    id: string | null;
    description: string;
    createdDate: Date;  
}

export type Category = BaseModel & {
    name : string;
}
export type Course = BaseModel & {  
    title : string;
    instructorName : string;
    categoryId: string;
    category : Category | null;
}