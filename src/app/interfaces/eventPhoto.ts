import { Photo } from "./photo";

class eventPhoto implements Photo {
    id: number;
    link: string;
    width: number;
    height: number;
    title: string;
    caption: string
    etag: string;

    constructor() {}

    public setid(id : number): void {
        this.id = id;
    }

    public setwidth(width : number): void {
        this.width = width;
    }

    public setHeight(height : number): void {
        this.height = height;
    }

    public setLink(link : string): void {
        this.link = link;
    }

    public setTitle(title : string): void {
        this.title = title;
    }

    public setCaption(caption : string): void {
        this.caption = caption;
    }

    public setEtag(etag: string): void {
        this.etag = etag;
    }

    public getId(): number {
        return this.id;
    }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }
    public getLink(): string {
        return this.link;
    }

    public getTitle(): string {
        return this.title;
    }

    public getCaption(): string {
        return this.caption;
    }

    public getEtag(): string {
        return this.etag;
    }
    
  }
