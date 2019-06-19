import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Comment } from 'src/app/classes/comment';

@Injectable()
export class LocalStorageService {

     private comments: Comment[] = [];
     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
     }

     public storeOnLocalStorage(detailUrl: string, comments: string): void {
          this.storage.set(detailUrl, comments);
     }

     public getLocalStorage(detailUrl: string): any {
          const commentsList = this.storage.get(detailUrl) || [];
          return commentsList;
     }

}