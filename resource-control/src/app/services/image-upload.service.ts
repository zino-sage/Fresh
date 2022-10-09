import { Injectable } from '@angular/core';
import {  } from '@firebase/util';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage'
import {  } from '@firebase/storage';
import { from, switchMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage) { }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(
      switchMap((result) => getDownloadURL(result.ref))
      );
  }
}
