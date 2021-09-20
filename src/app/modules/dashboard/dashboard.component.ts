import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { Comment } from '../../models/comments';
import { LinkedInService } from '../../service/linked-in.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public postList: Post[] = [];
  public comments: Comment[] = [];
  private listSubscription: Subscription;
  private postLikeSubscription: Subscription;
  private commentSubscription : Subscription;
  private deleteSubscription: Subscription;
  commentform: FormGroup;
  commentArea : boolean;
  imagePath: any;
  

  constructor(private linkedinService: LinkedInService,private Commentform: FormBuilder,private _sanitizer: DomSanitizer) {

    this.commentform = this.Commentform.group({
      comment: ['']
    });
   }

  ngOnInit() {
    this.listLinkedInPost();
    this.commentArea = false;
 
  }

  listLinkedInPost() {
    
    this.listSubscription = this.linkedinService.listLinkedInPost().subscribe(
      (response) => {
        
        this.postList = response;
        response.forEach(element => {
        this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
          + element.photo.base64string);
        });
        
      },
      (error) => {
        console.error("No data found.", error);
      }
    );
  }

  

  deletePost(postId) {

    this.deleteSubscription = this.linkedinService.deletePost(postId).subscribe(
      (response) => {
        this.listLinkedInPost();
        window.alert("Post deleted successfully.");
      },
      (error) => {
        console.error("Post is not deleted.");
      }
    );
  }

  likePost(LinkedInpost: Post) {

    this.postLikeSubscription = this.linkedinService.likePost(LinkedInpost.id).subscribe(
      (response) => {
        LinkedInpost.likeCount = LinkedInpost.likeCount + 1;
      },
      (error) => {
        console.error("Post is not like by user",error);
      }
    );
  }

  Comment(PostId)
  {
    
    this.commentArea = true;
    this.commentform.controls["comment"].setValue(null);
    this.listcomment(PostId);
  }

  addComment(postid) {

    const postcomments  = new Comment();
    
    postcomments.Content = this.commentform.controls["comment"].value;
      this.commentSubscription = this.linkedinService.addPostComment(postid,postcomments).subscribe(
        (response) => {
          
          window.alert("Comment added successfully.");
          
        },
        (error) => {
          console.error("Error occured while add the comment.");
        }
      );
      this.commentArea = false;
     
    }
  
    listcomment(PostId) {
    
      
      this.listSubscription = this.linkedinService.listcomments(PostId).subscribe(
        (response) => {
          this.comments = response;
        },
        (error) => {
          console.error("Error occured while fetching comment list.", error);
        }
      );
    }
  

}
