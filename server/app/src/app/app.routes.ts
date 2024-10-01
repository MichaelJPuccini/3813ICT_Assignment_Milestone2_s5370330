import { Routes } from '@angular/router';
import { ReadComponent } from './pages/products/read/read.component';
import { AddComponent } from './pages/products/add/add.component';
import { RemoveComponent } from './pages/products/remove/remove.component';
import { UpdateComponent } from './pages/products/update/update.component';

import { LoginComponent } from './pages/users/login/login.component';
import { LogoutComponent } from './pages/users/logout/logout.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { RemoveUserComponent } from './pages/users/remove-user/remove-user.component';
import { UpdateUserComponent } from './pages/users/update-user/update-user.component';
import { ReadUsersComponent } from './pages/users/read-users/read-users.component';

import { AddGroupComponent } from './pages/groups/add-group/add-group.component';
import { RemoveGroupComponent } from './pages/groups/remove-group/remove-group.component';
import { UpdateGroupComponent } from './pages/groups/update-group/update-group.component';
import { ReadGroupsComponent } from './pages/groups/read-groups/read-groups.component';

import { AddChannelComponent } from './pages/channels/add-channel/add-channel.component';
import { RemoveChannelComponent } from './pages/channels/remove-channel/remove-channel.component';
import { UpdateChannelComponent } from './pages/channels/update-channel/update-channel.component';
import { ReadChannelsComponent } from './pages/channels/read-channels/read-channels.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'users/add', component: AddUserComponent},
    {path: 'users/update/:id', component: UpdateUserComponent},
    {path: 'users/remove/:id', component: RemoveUserComponent},
    {path: 'users', component: ReadUsersComponent},

    {path: 'groups/add', component: AddGroupComponent},
    {path: 'groups/update/:id', component: UpdateGroupComponent},
    {path: 'groups/remove/:id', component: RemoveGroupComponent},
    {path: 'groups', component: ReadGroupsComponent},

    {path: 'channels/add', component: AddChannelComponent},
    {path: 'channels/update/:id', component: UpdateChannelComponent},
    {path: 'channels/remove/:id', component: RemoveChannelComponent},
    {path: 'channels', component: ReadChannelsComponent},

    {path: 'products/add', component: AddComponent},
    {path: 'products/remove/:id', component: RemoveComponent},
    {path: 'products/update/:id', component: UpdateComponent},
    {path: 'products', component: ReadComponent},
    {path: '', component: ReadComponent},
];
