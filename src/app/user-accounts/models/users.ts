

//Using type alias
export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    title: string;
    archived: boolean;
};

//This makes a New User without an ID
export type NewUser = Omit<User, "id">;