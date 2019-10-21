import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CometChat } from '@cometchat-pro/chat';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { AuthService } from '../core/auth.service';
import { NotificationsService } from '../core/notifications.service';
import { ChatService } from './chat.service';

const listenerId = 'ChatScreenListener';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedUser: CometChat.UserObj;
  messages: CometChat.TextMessage[] | null = null;

  constructor(
    readonly authService: AuthService,
    readonly chatService: ChatService,
    readonly notificationsService: NotificationsService,
    readonly snackBar: MatSnackBar,
    readonly afMessaging: AngularFireMessaging,
  ) {}

  ngOnInit() {
    this.chatService.listenForMessages(listenerId, msg => {
      console.log('New message: ', msg);
      this.messages = [...this.messages, msg];
    });

    this.requestPermissions();
    this.notificationsService.listenForMessages();
  }

  ngOnDestroy() {
    this.chatService.removeMessageListener(listenerId);
  }

  requestPermissions() {
    this.notificationsService.enableNotifications().subscribe(
      _ =>
        this.snackBar.open('Notifications enabled!', 'Close', {
          duration: 1000,
        }),
      err => console.log('Error enabling notifications: ' + err),
    );
  }

  async onUserSelected(usr: CometChat.UserObj) {
    this.selectedUser = usr;
    const messages = await this.chatService.getPreviousMessages(usr.uid);
    console.log('Previous messages', messages);

    this.messages = (messages as any[]).filter(msg => msg.type === 'text');
  }

  async onSendMessage(message: string) {
    console.log('sending message: ', message);
    const sentMessage = await this.chatService.sendMessage(
      this.selectedUser.uid,
      message,
    );

    console.log({ sentMessage });

    if (sentMessage) {
      this.messages = [...this.messages, sentMessage as any];
    }
  }
}
