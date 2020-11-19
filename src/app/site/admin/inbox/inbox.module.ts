import { NgModule } from '@angular/core';
import { InboxComponent } from './inbox.component';
import { SharedModule } from './../../../shared/modules/shared.module';
import { InboxRoutingModule } from './inbox-routing.module';
import { UnreadMessageComponent } from './components/unread-message/unread-message.component';
import { OtherMessageComponent } from './components/other-message/other-message.component';



@NgModule({
  declarations: [InboxComponent, UnreadMessageComponent, OtherMessageComponent],
  imports: [
    SharedModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
