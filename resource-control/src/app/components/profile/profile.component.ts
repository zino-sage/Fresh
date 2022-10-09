import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$;
  constructor(private authService: AuthenticationService, private imageUploadService: ImageUploadService,
    private toast: HotToastService) { }

  ngOnInit(): void {
  }

  uploadImage(event: any, user: User){
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        loading: 'Uploading image...',
        success: 'Image uploaded',
        error :  ({message}) => `${message}` + ' Upload failed'
      }
      ),
      concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
    ).subscribe();
  }
}
