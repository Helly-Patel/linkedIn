import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Post } from '../../../models/post';
import { Subscription } from 'rxjs';
import { LinkedInService } from '../../../service/linked-in.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  linkedInForm: FormGroup;
  isSubmit: boolean;
  private savePostSubscription: Subscription;
  imgURL: any;

  public get postControl(): AbstractControl {
    return this.linkedInForm.get('postText');
  }

  constructor(private form: FormBuilder,private linkedinService: LinkedInService) { 

    this.linkedInForm = this.form.group({
      postText: ['', [Validators.required]],

    });
  }

  ngOnInit() {
  }


  savePost() {
  
     this.isSubmit = true;

    if (this.linkedInForm.invalid) {
      return;
    }
    
    const savePost = new Post();
    savePost.content = this.linkedInForm.controls["postText"].value;
    savePost.photo = this.imgURL;
    
    this.savePostSubscription = this.linkedinService.addLinkedInPost(savePost).subscribe(
      (response) => {
        
        window.alert("Post created successfully.");
      },
      (error) => {
        console.error("Post is not saving...", error);
      }
    );
    this.linkedInForm.controls["postText"].setValue(null);
  }

  preview(evt: any) {

    if (!evt.target.files || evt.target.files.length <= 0) {
      return;
    }

    const file = evt.target.files[0] as File;
   
    const reader = new FileReader();
    
    reader.onload = (_event) => {

      this.imgURL = reader.result as string;
      
    };
    reader.readAsDataURL(file);
  }

}
