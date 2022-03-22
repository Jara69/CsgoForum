import { IKomentar } from "./Ikomentar";

export interface IForum {
    nadpis: string;
    obsah: string;
    komentare: Array<IKomentar>;
    username: string;
    id: string;
    user_id: string;
    date: string;
  }

  export interface IOtazkaData {
    obsah: string
    nadpis: string
    username: string
    id: string
    date: string
    
  }