import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Comment } from 'src/app/classes/comment';

@Injectable()
export class LocalStorageService {

     private comments: Comment[];
     private nextId: number;

     constructor(){
          let comments=this.getComments();
          this.nextId = 0;
     }

     public addComments(url: string, content: string): void { 
          console.log(this.comments);
          let comment = new Comment(this.nextId, url, content);
          let comments = this.getComments();
          this.comments.push(comment);

          this.setLocalStorageComments(comments);        
          this.nextId ++;
     }

     public getComments(): Comment[] {
          let localStorageItem = JSON.parse(localStorage.getItem('comments'));
          return localStorageItem == null ? [] : localStorageItem.comments;
     }

     private setLocalStorageComments(comments: Comment[]):void{
          localStorage.setItem('comments', JSON.stringify({comments: comments}));
     }

     // STORAGE_KEY = 'local_comments';
     // constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
     // public storeOnLocalStorage(detailUrl: string, comments: string): void {

     //      // get array of comments from local storage
     //      const commentsList = this.storage.get(this.STORAGE_KEY) || [];

     //      // push new comments to array
     //      commentsList.push({
     //           key: detailUrl,
     //           value: comments
     //      });
     //      // insert updated array to local storage
     //      this.storage.set(this.STORAGE_KEY, commentsList);
     //      console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
     // }
}