import { Injectable, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { Video } from  '../video.service/Video';
import { Photo } from '../interfaces/photo';

@Injectable()
export class VideoService {

  private VIDEO_KEY: StateKey<number>;

  constructor( @Inject(PLATFORM_ID) private platformId: Object, private transferState: TransferState) {}

  getVideos(artist: string): Video[] {

   let videos: Video[] = [];

    if (artist === "Daniel Chong") {
        videos = [
            {"id": "video1", "source": "https://s3.eu-west-2.amazonaws.com/bachadiff-videos/danielVide.mp4", "artist": artist, "caption": "amazing"}
        ];
    }
    else {
        videos = [ 
            {"id": "video1", "source": "https://s3.eu-west-2.amazonaws.com/bachadiff-videos/Fernando.mp4", "artist": artist, "caption": "amazing"}
        ];
    }
   
    this.transferState.set(this.VIDEO_KEY, videos.length);
    return videos;
      
  }
}
