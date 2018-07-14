import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProfileService } from './editProfile.service';
import { map } from 'rxjs/operators';
import { Profile, createProfile } from './profileinfo-model';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss']
})

export class EditProfileComponent {
  
  profile: Profile;
  profileForm:  FormGroup;
  profileUpdating: boolean;
  imageUploadMode:boolean = false;
  storageLink:string;
  
  // file to upload
  selectedImage: File;
  uploadedImage: any; // uploaded image data from backend


  
  
  constructor(private fb: FormBuilder, private editProfileService: EditProfileService, public snackBar: MatSnackBar) {
        this.profile = createProfile(); // generate empty profileinfo
        this.createForm();
  }
  
  
  ngOnInit() {
        this.getProfile();  
        this.storageLink = environment.apiUrl+'/storage';
  }
  
  
  outputTags(e) {
   this.profileForm.patchValue({
     tags: e
   })
  }
  
  createForm() {
    this.profileForm = this.fb.group({
      avatar: this.profile.avatar,
      tags: [this.profile.tags],      
      birth_date: this.profile.birth_date,
      alcohol: this.profile.preferences.alcohol,
      food: this.profile.preferences.food,
      email_notifications: this.profile.preferences.email_notifications,
      email: [this.profile.email, Validators.required],
      password: null,
    })
  }
  
  
  getProfile() {
    this.editProfileService.getProfile()
    .subscribe((data:any) => { 
      this.profile = data.data;
      this.createForm(); // update form with current values
    });

  }
  


  onSubmit() {
    this.profileUpdating = true;
    this.editProfileService.updateProfile(this.profileForm.value)
    .subscribe(data => {
      this.profileUpdating = false;
      this.snackBar.open('Profile updated successfully',null,{ duration: 2000});
    })
  }




  // when file is selected by user in view
  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
    this.editProfileService.uploadImage(this.selectedImage).subscribe(data => {
      this.profile.avatar = data;
      this.profileForm.patchValue({'avatar': data});
      });
  }
  
  
}
