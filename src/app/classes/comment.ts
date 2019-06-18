export class Comment{
    id: number;
    url: string;
    content: string;

    constructor(id: number, url: string, content: string){
        this.id = id;
        this.url = url;
        this.content = content;
    }
}