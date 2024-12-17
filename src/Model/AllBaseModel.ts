export type BaseModel = {
    id: string;
    description: string;
    createdDate: Date;  
}

export type Category = BaseModel & {
    Name : string;
}

export type Course = BaseModel & {
    Title : string;
    InstructorName : string;
    StartDate : Date;
    EndDate : Date;
    CategoryId: string;
    Category : Category ;
}