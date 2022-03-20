import { IKomentar } from "./Ikomentar";

export interface IForum {
    nadpis: string;
    obsah: string;
    komentare: Array<IKomentar>;
    username: string;
    id: string;
  }

  export interface IOtazkaData {
    obsah: string
    nadpis: string
  }