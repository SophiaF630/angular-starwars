import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class LocalStorageService {

     STORAGE_KEY = 'local_comments';
     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
     public storeOnLocalStorage(detailUrl: string, comments: string): void {
          
          // get array of comments from local storage
          const commentsList = this.storage.get(this.STORAGE_KEY) || [];
          
          // push new comments to array
          commentsList.push({
              key: detailUrl,
              value: comments
          });
          // insert updated array to local storage
          this.storage.set(this.STORAGE_KEY, commentsList);
          console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
     }
}