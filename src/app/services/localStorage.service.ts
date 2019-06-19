import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Comment } from 'src/app/classes/comment';

@Injectable()
export class LocalStorageService {

     private comments: Comment[] = [];
     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
          //let comments=this.getComments();
     }

     //method 1
     // public addComments(url: string, content: string): void { 
     //      //console.log(this.comments);
     //      let comment = new Comment(url, content);
     //      let comments = this.getComments();
     //      this.comments.push(comment);

     //      this.setLocalStorageComments(comments);        
     // }

     // public getComments(): Comment[] {
     //      let localStorageItem = JSON.parse(localStorage.getItem('comments'));
     //      return localStorageItem == null ? [] : localStorageItem.comments;
     // }

     // private setLocalStorageComments(comments: Comment[]):void{
     //      localStorage.setItem('comments', JSON.stringify({comments}));
     // }

     //method 2
     public storeOnLocalStorage(detailUrl: string, comments: string): void {
          this.storage.set(detailUrl, comments);
     }

     public getLocalStorage(detailUrl: string): any {
          const commentsList = this.storage.get(detailUrl) || [];
          return commentsList;
     }

}