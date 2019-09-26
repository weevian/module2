import { Injectable } from '@angular/core';
// STEP 1: Import
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

// STEP 2: Inject
  constructor(public httpClient:HttpClient) { }

  // STEP 3: Implement
getKindergartens(){
  return this.httpClient.get(
    'https://wv-kindergarten-api.herokuapp.com/api/kindergartens'
  )
}
}
