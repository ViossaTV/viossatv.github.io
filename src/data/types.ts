export type Product = {
    title: string;
    picture: string;
    gameURI?: string;
    markDown?: string;
    github?: string;
    level: number;
    gallery?: [string[] | undefined, string[] | undefined];
    tags?: number;
    playable?: boolean;
};
