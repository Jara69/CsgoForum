import { Observable } from "rxjs";
import { HttpClient, HttpEvent, HttpParams } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'


@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {

    }
  
  
    public uploadImage(image: File): Observable<any> {
      const formData = new FormData();
  
      formData.append('image', image);
  
      return this.http.post('//localhost:4200/Profile-component', formData);
    }
  }