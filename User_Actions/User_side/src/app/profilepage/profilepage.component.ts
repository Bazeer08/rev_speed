import { Component ,OnInit} from '@angular/core';
import {ProfileService } from './Profileservice.service'; 
import { Iuser } from '../users';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent implements OnInit{
  public userProfile !: Iuser ;
  public profileForm : FormGroup;
  public isEnabled = true;
  public buttonText = 'Edit';
  updatedProfile !:Iuser;

  constructor(private UserProfileService: ProfileService, private fb: FormBuilder) { 
    this.profileForm = this.fb.group({
      customername:[{ value:'',disabled: this.isEnabled}, Validators.required],
      phoneNumber: [{ value:'',disabled: this.isEnabled}, Validators.required],
      emailId: [{value:'', disabled: true}, Validators.required],
      address: [{ value:'',disabled: this.isEnabled}, Validators.required],
      pass:[{value:'',disabled: true},Validators.required],
      planid: [{value:'', disabled: true}, Validators.required],
      plantype: [{value:'', disabled: true}, Validators.required],
    });

}
ngOnInit() {
  console.log("im on it");
    const id:number=3;  
   this.UserProfileService.getUserProfile(id).subscribe(data=>{
    
    this.userProfile=data;
    console.log(this.userProfile.customer_phone);
    console.log(this.userProfile.customer_address);
    this.UserProfileService.setdetails(this.userProfile);
    this.UserProfileService.setPlanid(this.userProfile.plan_id);
    this.UserProfileService.setPlanname(this.userProfile.plan_type);
  
   this.profileForm.patchValue({
    customername: data.customer_name,
   phoneNumber: data.customer_phone,
   emailId: data.customer_email,
   address: data.customer_address,
   pass:data.customer_pass,
   planid: data.plan_id,
   plantype: data.plan_type



  });
  this.UserProfileService.setPlanid(this.userProfile.plan_id);
  
});
this.profileForm.get('name')?.valueChanges.subscribe((name: string) => {
  if (!this.isEnabled) {
    this.userProfile.customer_name= name;
  }
});
}

toggleEdit()
{
    this.isEnabled = !this.isEnabled;
    this.buttonText = this.isEnabled ? 'Edit' : 'Save';

    if (!this.isEnabled) {
      // Enable form controls for editing
      this.profileForm.enable();
    } else {
      // Disable form controls and update the user profile
      this.profileForm.disable();
      console.log('Updating profile...', this.profileForm.value);
      // Create a copy of the form values to avoid two-way binding issues
      let updatedProfile: Iuser = { ...this.profileForm.value, id: this.userProfile.id };
      // Save the changes to the backend using your service
      // Example: this.userProfileService.saveUserProfile(this.profileForm.value);
      this.UserProfileService.updateUserProfile(updatedProfile).subscribe(
        updatedProfile => {
          this.updatedProfile = updatedProfile;

          console.log('Profile updated successfully',updatedProfile);
         // Update the local profile with the server response
      },
        error => console.error('Error updating profile', error)
      );
    }
  }

  // delete()
  // {
  //    this.UserProfileService.delete(this.userProfile).subscribe(
  //     updatedProfile => {
  //       this.updatedProfile = updatedProfile;
  //       console.log('Profile updated successfully',updatedProfile);
  //     },
  //     error=> console.error('Error Deleting Plan',error));
  // }
}







