import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { switchMap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    readonly afMessaging: AngularFireMessaging,
    readonly authService: AuthService,
    readonly http: HttpClient,
    readonly snackBar: MatSnackBar,
  ) {}

  enableNotifications() {
    return this.afMessaging.requestToken.pipe(
      map(token => this.getTopicUrl(token)),
      switchMap(url => this.http.post(url, { appId: environment.appId })),
    );
  }

  listenForMessages() {
    this.afMessaging.messages.subscribe(
      ({ data }: { data: any }) =>
        this.snackBar.open(`${data.title} - ${data.alert}`, 'Close', {
          duration: 1000,
        }),
      err => console.log(err),
    );
  }

  private getTopicUrl(token: string) {
    const topic = `${environment.appId}_user_${this.authService.currentUser.uid}`;

    return `https://ext-push-notifications.cometchat.com/fcmtokens/${token}/topics/${topic}`;
  }
}
